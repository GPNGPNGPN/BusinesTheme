<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'PHPMailer/language/');
$mail->isHTML(true);

$mail->setFrom('BusinesTheme@mail.exmpl', 'Busines Theme');
$mail->addAddress('r.n.gaponov@yandex.ru');
$mail->Subject = 'Привет! Это Busines Theme';

$body = '';
$isTopForm = $_POST['isTopForm'];
// settype($isTopForm, bool);
if ($isTopForm == 'true') {
    $body .= '<h1>Письмо из верхней формы сайта Busines Theme</h1>';
    if (trim((!empty($_POST['name'])))) {
        $body .= '<p><strong>Имя:</strong> ' . $_POST['name'] . '</p>';
    }
    if (trim((!empty($_POST['email'])))) {
        $body .= '<p><strong>E-mail:</strong> ' . $_POST['email'] . '</p>';
    }
    if (trim((!empty($_POST['tel'])))) {
        $body .= '<p><strong>Телефон:</strong> ' . $_POST['tel'] . '</p>';
    }

} else {
    $body .= '<h1>Письмо из нижней формы сайта Busines Theme</h1>';
    if (trim((!empty($_POST['name'])))) {
        $body .= '<p><strong>Имя:</strong> ' . $_POST['name'] . '</p>';
    }

    if (trim((!empty($_POST['email'])))) {
        $body .= '<p><strong>E-mail:</strong> ' . $_POST['email'] . '</p>';
    }
}

$mail->Body = $body;

if (!$mail->send()) {
    $message = 'Ошибка';
} else {
    $message = 'Данные отправлены';
}

$response = ['message' => $message];
header('content-type: application/json');
echo json_encode($response);