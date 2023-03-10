<?
$recepient = "r.n.gaponov@yandex.ru";
$siteName = "Ajax-форма";
$email = trim($_POST["email"]);
$name = trim($_POST["name"]);
$phone = trim($_POST["tel"]);
$message = "От: $email \r\n Имя: $name \r\n Телефон: $phone";
$pagetitle = "Заявка с сайта \"$siteName\"";
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");
?>














?>