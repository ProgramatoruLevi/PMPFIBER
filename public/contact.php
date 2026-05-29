<?php
// ════════════════════════════════════════════════════════════════════════
//  Endpoint formular contact PMPFIBER
//  Primește JSON din formularul React și trimite 2 emailuri prin SMTP
//  autentificat (PHPMailer), de pe contact@pmpfiber.ro:
//    1) notificare către firmă (contact@pmpfiber.ro), Reply-To = clientul
//    2) auto-reply branduit către client (dacă a lăsat email)
//  Parola SMTP NU e în repo — e injectată la build dintr-un secret GitHub.
// ════════════════════════════════════════════════════════════════════════

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/lib/PHPMailer/Exception.php';
require __DIR__ . '/lib/PHPMailer/PHPMailer.php';
require __DIR__ . '/lib/PHPMailer/SMTP.php';

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
  exit;
}

// ── Date firmă ────────────────────────────────────────────────────────────
const BRAND   = 'PMPFIBER';
const LEGAL   = 'PMPFIBER SRL';
const PHONE   = '+40 741 358 786';
const TELRAW  = '+40741358786';
const WA      = '40741358786';
const ADDR    = 'Loc. Unirea, nr. 66 A, jud. Bistrița-Năsăud, cod 420005';
const SCHEDULE = 'Luni – Vineri: 08:00 – 18:00 · Sâmbătă: 09:00 – 14:00';
const CUI     = '48756689';
const REGCOM  = 'J06/830/2023';
const MAILBOX = 'contact@pmpfiber.ro';
const SITEURL = 'https://www.pmpfiber.ro';
const LOGO    = 'https://www.pmpfiber.ro/email-logo.png';

// Parolă SMTP — placeholder înlocuit la deploy (vezi .github/workflows/deploy-ftp.yml).
$SMTP_PASS = '__MAIL_PASSWORD__';

// ── Input ───────────────────────────────────────────────────────────────
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
  $data = $_POST;
}
$get = static function (string $k) use ($data): string {
  return isset($data[$k]) ? trim((string) $data[$k]) : '';
};

// Honeypot anti-spam.
if ($get('website') !== '') {
  echo json_encode(['ok' => true]);
  exit;
}

$name    = $get('name');
$phone   = $get('phone');
$email   = $get('email');
$model   = $get('model');
$message = $get('message');

if (mb_strlen($name) < 2 || !preg_match('/^[0-9+\s().\-]{6,}$/', $phone)) {
  http_response_code(422);
  echo json_encode(['ok' => false, 'error' => 'Date invalide']);
  exit;
}
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(422);
  echo json_encode(['ok' => false, 'error' => 'Email invalid']);
  exit;
}

$e = static fn (string $s): string => htmlspecialchars($s, ENT_QUOTES, 'UTF-8');
$firstName = trim(explode(' ', $name)[0]);

// ── Șablon email branduit ─────────────────────────────────────────────────
$wrap = static function (string $contentHtml) use ($e): string {
  return '<!doctype html><html lang="ro"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>'
    . '<body style="margin:0;padding:0;background:#f1efe9;">'
    . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f1efe9;padding:24px 12px;">'
    . '<tr><td align="center">'
    . '<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,.08);font-family:Arial,Helvetica,sans-serif;">'
    // Header dark cu logo
    . '<tr><td align="center" bgcolor="#0E0F0D" style="background:#0E0F0D;padding:22px 24px;">'
    . '<img src="' . LOGO . '" alt="' . BRAND . '" width="190" style="display:block;height:auto;max-width:190px;">'
    . '</td></tr>'
    . '<tr><td style="height:4px;background:linear-gradient(90deg,#D6B06A,#B48A4A,#8C6A38);font-size:0;line-height:0;">&nbsp;</td></tr>'
    // Conținut
    . '<tr><td style="padding:28px 28px 8px;color:#1C1812;">' . $contentHtml . '</td></tr>'
    // Footer date firmă
    . '<tr><td style="padding:20px 28px 26px;border-top:1px solid #eee;color:#6b6b6b;font-size:12px;line-height:1.6;">'
    . '<strong style="color:#1C1812;">' . LEGAL . '</strong><br>'
    . $e(ADDR) . '<br>'
    . 'CUI ' . CUI . ' · Reg. Com. ' . REGCOM . '<br>'
    . 'Tel: <a href="tel:' . TELRAW . '" style="color:#8C6A38;">' . PHONE . '</a> · '
    . 'Email: <a href="mailto:' . MAILBOX . '" style="color:#8C6A38;">' . MAILBOX . '</a><br>'
    . $e(SCHEDULE) . '<br>'
    . '<a href="' . SITEURL . '" style="color:#8C6A38;">www.pmpfiber.ro</a>'
    . '</td></tr>'
    . '</table></td></tr></table></body></html>';
};

$row = static function (string $label, string $value) use ($e): string {
  return '<tr><td style="padding:8px 0;color:#8a8a8a;font-size:13px;width:90px;vertical-align:top;">' . $e($label) . '</td>'
    . '<td style="padding:8px 0;color:#1C1812;font-size:14px;font-weight:bold;">' . $value . '</td></tr>';
};

// ── 1) Email către firmă ────────────────────────────────────────────────
$phoneLink = '<a href="tel:' . $e($phone) . '" style="color:#8C6A38;text-decoration:none;">' . $e($phone) . '</a>';
$emailLink = $email !== '' ? '<a href="mailto:' . $e($email) . '" style="color:#8C6A38;text-decoration:none;">' . $e($email) . '</a>' : '—';
$businessContent =
  '<h1 style="margin:0 0 4px;font-size:20px;color:#1C1812;">Cerere nouă de pe site</h1>'
  . '<p style="margin:0 0 18px;color:#6b6b6b;font-size:13px;">Un client a trimis o cerere prin formularul de contact.</p>'
  . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0">'
  . $row('Nume', $e($name))
  . $row('Telefon', $phoneLink)
  . $row('Email', $emailLink)
  . $row('Model', $model !== '' ? $e($model) : '—')
  . '</table>'
  . '<div style="margin:16px 0 4px;color:#8a8a8a;font-size:13px;">Mesaj</div>'
  . '<div style="background:#f6f4ef;border-radius:10px;padding:14px 16px;color:#1C1812;font-size:14px;line-height:1.6;white-space:pre-wrap;">'
  . ($message !== '' ? nl2br($e($message)) : '—') . '</div>'
  . '<p style="margin:18px 0 0;color:#6b6b6b;font-size:13px;">Apasă „Răspunde" pentru a-i scrie direct clientului' . ($email !== '' ? '' : ' (sau sună-l la ' . $phoneLink . ')') . '.</p>';

// ── 2) Auto-reply către client ────────────────────────────────────────────
$btn = static function (string $href, string $label, string $bg, string $fg): string {
  return '<a href="' . $href . '" style="display:inline-block;background:' . $bg . ';color:' . $fg . ';text-decoration:none;font-weight:bold;font-size:14px;padding:12px 22px;border-radius:999px;margin:4px 6px 4px 0;">' . $label . '</a>';
};
$clientContent =
  '<h1 style="margin:0 0 10px;font-size:22px;color:#1C1812;">Bună, ' . $e($firstName) . '! Mulțumim că ne-ai contactat.</h1>'
  . '<p style="margin:0 0 16px;color:#3a352e;font-size:15px;line-height:1.7;">Am primit cererea ta și revenim cât mai curând cu o ofertă personalizată. Pentru un răspuns imediat, ne poți suna oricând.</p>'
  . '<div style="background:#f6f4ef;border-radius:12px;padding:16px 18px;margin:0 0 18px;">'
  . '<div style="color:#8a8a8a;font-size:12px;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">Cererea ta</div>'
  . ($model !== '' ? '<div style="color:#1C1812;font-size:14px;margin-bottom:6px;"><strong>Model:</strong> ' . $e($model) . '</div>' : '')
  . '<div style="color:#1C1812;font-size:14px;line-height:1.6;white-space:pre-wrap;">' . ($message !== '' ? nl2br($e($message)) : 'Cerere de ofertă') . '</div>'
  . '</div>'
  . '<div style="margin:0 0 6px;">'
  . $btn('tel:' . TELRAW, '📞 Sună acum · ' . PHONE, '#167a3c', '#ffffff')
  . $btn('https://wa.me/' . WA, 'WhatsApp', '#25D366', '#06351c')
  . '</div>'
  . '<p style="margin:18px 0 0;color:#6b6b6b;font-size:13px;line-height:1.6;">Toate prețurile includ TVA · garanție 2 ani · livrare în toată România.<br>Direct de la producător — preț corect pentru calitate premium.</p>';

// ── Trimitere SMTP ──────────────────────────────────────────────────────
function makeMailer(string $pass): PHPMailer {
  $m = new PHPMailer(true);
  $m->isSMTP();
  $m->Host = 'localhost';
  $m->SMTPAuth = true;
  $m->Username = MAILBOX;
  $m->Password = $pass;
  $m->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
  $m->Port = 465;
  $m->SMTPOptions = ['ssl' => ['verify_peer' => false, 'verify_peer_name' => false, 'allow_self_signed' => true]];
  $m->CharSet = 'UTF-8';
  $m->Encoding = 'base64';
  return $m;
}

try {
  // 1) Notificare firmă
  $biz = makeMailer($SMTP_PASS);
  $biz->setFrom(MAILBOX, BRAND . ' — Formular');
  $biz->addAddress(MAILBOX);
  if ($email !== '') {
    $biz->addReplyTo($email, $name);
  }
  $biz->isHTML(true);
  $biz->Subject = 'Cerere site' . ($model !== '' ? ' — ' . $model : '') . ' — ' . $name;
  $biz->Body = $wrap($businessContent);
  $biz->AltBody = "Cerere nouă\nNume: $name\nTelefon: $phone\nEmail: " . ($email ?: '—') . "\nModel: " . ($model ?: '—') . "\nMesaj: " . ($message ?: '—');
  $biz->send();

  // 2) Auto-reply client (best-effort)
  if ($email !== '') {
    try {
      $rep = makeMailer($SMTP_PASS);
      $rep->setFrom(MAILBOX, BRAND);
      $rep->addAddress($email, $name);
      $rep->addReplyTo(MAILBOX, BRAND);
      $rep->isHTML(true);
      $rep->Subject = 'Am primit cererea ta — ' . BRAND;
      $rep->Body = $wrap($clientContent);
      $rep->AltBody = "Bună, $firstName! Mulțumim că ne-ai contactat. Revenim curând cu o ofertă. Telefon: " . PHONE;
      $rep->send();
    } catch (Exception $ignored) {
      // dacă auto-reply-ul eșuează, cererea tot a ajuns la firmă
    }
  }

  echo json_encode(['ok' => true]);
} catch (Exception $ex) {
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => 'Trimitere eșuată']);
}
