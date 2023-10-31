<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["nombre"];
    $email = $_POST["email"];
    $subject = $_POST["telefono"];
    $message = $_POST["mensaje"];
    error_log(print_r($_POST, true));

    // Validación de reCAPTCHA
    $secretAPIkey = '6Lc43eUoAAAAAEth8I45VAjLymQtAfzoZT0fCJRc';
    $verifyResponse = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret=' . $secretAPIkey . '&response=' . $_POST['g-recaptcha-response']);
    $response = json_decode($verifyResponse);

    if ($response->success) {
        $to = "yubesrock@gmail.com";

        $response = array(
            "status" => "success",
            "message" => "¡Muchas gracias! Pronto nos pondremos en contacto. También puedes visitar nuestras redes sociales para recibir una respuesta rápida. ¡Saludos!"
        );
    } else {
        $response = array(
            "status" => "error",
            "message" => "Verificación de reCAPTCHA fallida. Inténtalo de nuevo."
        );
    }

    // Devuelve la respuesta como JSON
    header('Content-Type: application/json');
    echo json_encode($response);
}
?>
