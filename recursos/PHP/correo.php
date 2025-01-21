<?php
include "claves.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST['nombre'];
    $empresa = $_POST['empresa'];
    $correo = $_POST['correo'];
    $asunto = $_POST['asunto'];
    $mensaje = $_POST['mensaje'];

    $recaptcha_response = $_POST['g-recaptcha-response'];
    $recaptcha_url = 'https://www.google.com/recaptcha/api/siteverify';
    $response = file_get_contents($recaptcha_url . '?secret=' . $secretkey2 . '&response=' . $recaptcha_response);
    $response_keys = json_decode($response, true);

    if(intval($response_keys["success"]) !== 1) {
        echo "Verificación de reCAPTCHA fallida, por favor intente nuevamente.";
    } else {
        $destinatario = 'correo@destino.com';
        $subject = 'Nuevo mensaje sobre: ' . $asunto;

        $body = "Nombre: " . $nombre . "\n" .
                "Empresa: " . $empresa . "\n" .
                "Correo: " . $correo . "\n" .
                "Asunto: " . $asunto . "\n\n" .
                "Mensaje: " . $mensaje;

        $headers = "From: " . $correo . "\r\n" .
                   "Reply-To: " . $correo . "\r\n" .
                   "Content-Type: text/plain; charset=UTF-8\r\n";

        if(mail($destinatario, $subject, $body, $headers)) {
            echo "Correo enviado con éxito.";
        } else {
            echo "Error al enviar el correo.";
        }
    }
}
?>
