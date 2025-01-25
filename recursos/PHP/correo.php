
<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = htmlspecialchars($_POST['nombre']);
    $empresa = htmlspecialchars($_POST['empresa']);
    $correo = filter_var($_POST['correo'], FILTER_SANITIZE_EMAIL);
    $asunto = htmlspecialchars($_POST['asunto']);
    $mensaje = htmlspecialchars($_POST['mensaje']);

    $recaptcha_response = $_POST['g-recaptcha-response'];
    $recaptcha_project_id = "btl-solutions-448901"; // Reemplázalo con tu ID de proyecto
    $recaptcha_api_key = "AIzaSyCDTi1__MLiuJ8iiiZsS6f9uDMyUgN9RYU"; // Reemplázalo con tu API Key

    // URL de la API de reCAPTCHA Enterprise
    $recaptcha_url = "https://recaptchaenterprise.googleapis.com/v1/projects/$recaptcha_project_id/assessments?key=$recaptcha_api_key";

    // Datos a enviar a la API
    $post_data = json_encode([
        "event" => [
            "token" => $recaptcha_response,
            "expectedAction" => "submit",
            "siteKey" => "6LfSmcIqAAAAAO-6gAVJWlC3hmUgbHlZnaE3-6jz"
            
        ]
    ]);

    // Configuración de cURL
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $recaptcha_url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ["Content-Type: application/json"]);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);

    $response = curl_exec($ch);
    curl_close($ch);

    // Decodificar respuesta JSON
    $response_keys = json_decode($response, true);

    // Depuración: Imprimir la respuesta de reCAPTCHA Enterprise
    echo "<pre>";
    print_r($response_keys);
    echo "</pre>";
    

    // Verificar si la respuesta es válida y el score es alto
    if (!isset($response_keys["tokenProperties"]["valid"]) || !$response_keys["tokenProperties"]["valid"]) {
        echo "Verificación de reCAPTCHA fallida, por favor intente nuevamente.";
        exit;
    }

    // Obtener la puntuación
    $score = $response_keys["riskAnalysis"]["score"] ?? 0;
    
    if ($score < 0.5) {
        echo "reCAPTCHA detectó actividad sospechosa. Intente nuevamente.";
        exit;
    }

    // Configuración del correo
    //$destinatario = 'soporte@btl-solutions.com.ar';
 $destinatario = 'luciano.barbinii@gmail.com';
    $subject = 'Nuevo mensaje sobre: ' . $asunto;

    $body = "Nombre: " . $nombre . "\n" .
            "Empresa: " . $empresa . "\n" .
            "Correo: " . $correo . "\n" .
            "Asunto: " . $asunto . "\n\n" .
            "Mensaje: " . $mensaje;

    $headers = "From: " . $correo . "\r\n" .
               "Reply-To: " . $correo . "\r\n" .
               "Content-Type: text/plain; charset=UTF-8\r\n";

    if (mail($destinatario, $subject, $body, $headers)) {
        echo "Correo enviado con éxito.";
    } else {
        echo "Error al enviar el correo.";
    }
    
}
  header("Location: ../../index.html?enviado=true");
  exit;
?>
