<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST["nombre"];
    $email = $_POST["email"];
    $telefono = $_POST["telefono"];
    $mensaje = $_POST["mensaje"];

    $to = "yubesrock@gmail.com";
    $subject = "Nuevo mensaje de contacto de $nombre";
    $message = "Nombre: $nombre\n";
    $message .= "Email: $email\n";
    $message .= "Teléfono: $telefono\n";
    $message .= "Mensaje:\n$mensaje";

    $headers = "From: $email" . "\r\n" .
        "Reply-To: $email" . "\r\n" .
        "X-Mailer: PHP/" . phpversion();

    if (mail($to, $subject, $message, $headers)) {
        echo "¡Gracias por tu mensaje! Te contactaremos pronto.";
    } else {
        echo "Hubo un error al enviar el mensaje. Por favor, intenta de nuevo más tarde.";
    }
}