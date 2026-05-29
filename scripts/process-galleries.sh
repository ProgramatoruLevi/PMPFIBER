#!/usr/bin/env bash
# Extrage ZIP-urile cu poze din root, le convertește în WebP (q82, max 1800px,
# fără upscale) și le organizează în /public/images/<folder>/img-1..N.webp.
# Dedup pe conținut (md5) în interiorul fiecărui folder. Ignoră __MACOSX.
set -euo pipefail

ROOT="/Users/darius/Documents/PMPFIBER SITE"
IMG_DIR="$ROOT/public/images"
cd "$ROOT"

# folder|zip1|zip2... (zip-urile fără extensia .zip)
MAP=(
  "base-200|PMPFiber base 200 model simplu"
  "comfort-200|PMPFiber confort 200"
  "luxury-200|PMPFiber luxury 200"
  "family-225-base|PMPFiber family base 225 model simplu"
  "family-225-comfort|PMPFiber family 225 confort"
  "family-225-luxury|PMPFiber family 225 luxury"
  "premium-225-base|PMPFiber 225 base soba integrata"
  "premium-225-comfort|PMPFiber premium 225 soba integrata confort"
  "premium-225-luxury|PMPFiber premium 225 soba integrata luxury"
  "square-base|PMPFiber square spa base 200x200 model simplu"
  "square-comfort|PMPFiber square spa confort 200x200"
  "square-luxury|PMPFiber square spa luxury 200x200|PMPFiber square spa luxury 200x200(inca cateva poze)"
  "cuve|cuve_din_sticla"
  "incastrabil|incastrabile"
  "icetube|icetube"
)

convert_one() {
  # $1 = source image, $2 = destination .webp
  local src="$1" dst="$2" w h max
  w=$(sips -g pixelWidth  "$src" 2>/dev/null | awk '/pixelWidth/{print $2}')
  h=$(sips -g pixelHeight "$src" 2>/dev/null | awk '/pixelHeight/{print $2}')
  max=$(( w > h ? w : h ))
  if [ "$max" -gt 1800 ]; then
    if [ "$w" -ge "$h" ]; then
      cwebp -quiet -q 82 -m 6 -resize 1800 0 "$src" -o "$dst"
    else
      cwebp -quiet -q 82 -m 6 -resize 0 1800 "$src" -o "$dst"
    fi
  else
    cwebp -quiet -q 82 -m 6 "$src" -o "$dst"
  fi
}

echo "FOLDER|IMAGES|SKIPPED_DUPES"
for entry in "${MAP[@]}"; do
  IFS='|' read -r folder z1 z2 z3 <<< "$entry"
  dest="$IMG_DIR/$folder"
  rm -rf "$dest"; mkdir -p "$dest"

  tmp=$(mktemp -d)
  for z in "$z1" "$z2" "$z3"; do
    [ -z "$z" ] && continue
    sub=$(mktemp -d)
    unzip -o -j "$z.zip" -x "__MACOSX/*" -d "$sub" >/dev/null 2>&1 || { echo "MISSING ZIP: $z" >&2; }
    # mută pozele reale (ignoră resource forks ._*) în tmp, prefixate cu indexul zip-ului
    n=0
    while IFS= read -r f; do
      n=$((n+1))
      cp "$f" "$tmp/$(printf '%s_%03d_%s' "$z" "$n" "$(basename "$f")")"
    done < <(find "$sub" -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' \) ! -name '._*' | LC_ALL=C sort)
    rm -rf "$sub"
  done

  idx=0; dupes=0
  declare -a seen=()
  while IFS= read -r f; do
    sum=$(md5 -q "$f")
    is_dupe=0
    for s in ${seen[@]+"${seen[@]}"}; do [ "$s" = "$sum" ] && is_dupe=1 && break; done
    if [ "$is_dupe" -eq 1 ]; then dupes=$((dupes+1)); continue; fi
    seen+=("$sum")
    idx=$((idx+1))
    convert_one "$f" "$dest/img-$idx.webp"
  done < <(find "$tmp" -type f | LC_ALL=C sort)
  unset seen
  rm -rf "$tmp"

  echo "$folder|$idx|$dupes"
done
