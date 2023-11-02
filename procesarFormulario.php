<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST["nombre"];
    $email = $_POST["email"];
    $telefono = $_POST["telefono"];
    $mensaje = $_POST["mensaje"];

    // Clave secreta de reCAPTCHA v3
    $clave_secreta = "6LdjeOYoAAAAAE6Sv63qqL-NwNDgFe8DrvVgtned"; // Reemplaza con tu clave secreta

    // Verificación de reCAPTCHA
    $recaptcha_response = $_POST["g-recaptcha-response"];
    $url = 'https://www.google.com/recaptcha/api/siteverify';
    $data = [
        'secret' => $clave_secreta,
        'response' => $recaptcha_response
    ];
    $options = [
        'http' => [
            'method' => 'POST',
            'content' => http_build_query($data)
        ]
    ];
    $context = stream_context_create($options);
    $response = file_get_contents($url, false, $context);
    $recaptcha_data = json_decode($response);

    if ($recaptcha_data->success) {
        // Envía el correo
        $destinatario = "yubesrock@yubes.com.ar"; // Reemplaza con tu dirección de correo
        $asunto = "Nuevo mensaje de contacto de $nombre";
        $contenido = "Nombre: $nombre\nEmail: $email\nTeléfono: $telefono\nMensaje: $mensaje";

        // Usamos la función mail() para enviar el correo
        $enviado = mail($destinatario, $asunto, $contenido);

        if ($enviado) {
            echo "¡Mensaje enviado con éxito!";
        } else {
            echo "Error al enviar el mensaje. Por favor, inténtalo de nuevo.";
        }
    } else {
        echo "Error de verificación de reCAPTCHA. Por favor, intenta de nuevo.";
    }
}
?>
