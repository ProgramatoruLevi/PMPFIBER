<?php
// Endpoint formular contact PMPFIBER.
// Primește JSON din formularul React și trimite emailul la contact@pmpfiber.ro.
// Folosește mail() local (același server cPanel) — fără parole în cod.

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
  exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
  $data = $_POST; // fallback pentru form-encoded
}

$get = function (string $k) use ($data): string {
  return isset($data[$k]) ? trim((string) $data[$k]) : '';
};

// Honeypot anti-spam: câmp ascuns care trebuie să rămână gol.
if ($get('website') !== '') {
  echo json_encode(['ok' => true]); // răspuns „ok" fals pentru boți
  exit;
}

$name    = $get('name');
$phone   = $get('phone');
$email   = $get('email');
$model   = $get('model');
$message = $get('message');

// Validare minimă (identică cu cea din formular).
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

$to   = 'contact@pmpfiber.ro';
$from = 'contact@pmpfiber.ro';

$subject = 'Cerere site' . ($model !== '' ? ' — ' . $model : '') . ' — ' . $name;

$lines = [
  'Cerere nouă de pe pmpfiber.ro',
  '──────────────────────────────',
  'Nume:    ' . $name,
  'Telefon: ' . $phone,
  'Email:   ' . ($email !== '' ? $email : '—'),
  'Model:   ' . ($model !== '' ? $model : '—'),
  '',
  'Mesaj:',
  ($message !== '' ? $message : '—'),
  '',
  '──────────────────────────────',
  'IP: ' . ($_SERVER['REMOTE_ADDR'] ?? '—'),
  'Data: ' . date('d.m.Y H:i'),
];
$body = implode("\r\n", $lines);

$replyTo = $email !== '' ? $email : $from;
$headers = implode("\r\n", [
  'MIME-Version: 1.0',
  'Content-Type: text/plain; charset=UTF-8',
  'From: PMPFIBER Website <' . $from . '>',
  'Reply-To: ' . $replyTo,
  'X-Mailer: PMPFIBER-Form',
]);

$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
$ok = @mail($to, $encodedSubject, $body, $headers, '-f' . $from);

if ($ok) {
  echo json_encode(['ok' => true]);
} else {
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => 'Trimitere eșuată']);
}
