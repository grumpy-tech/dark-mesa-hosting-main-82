<?php
// Set headers for CORS and JSON response
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Allows requests from your React app
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Ensure the request is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit();
}

// 1. Get the JSON data from the request body
$json_data = file_get_contents('php://input');
$data = json_decode($json_data, true);

// Check if data was successfully decoded
if (empty($data)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid or empty data received.']);
    exit();
}

// 2. Data Extraction
$name = isset($data['name']) ? trim($data['name']) : '';
$email = isset($data['email']) ? trim($data['email']) : '';
$phone = isset($data['phone']) ? trim($data['phone']) : '';
$message = isset($data['message']) ? trim($data['message']) : '';

// 3. Basic Validation
if (empty($name) || empty($email) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Validation failed: Please fill out all required fields and ensure the email is valid.']);
    exit();
}

// 4. Email Configuration
$to = 'info@darkmesahosting.com'; // <-- *** CHANGE THIS TO YOUR REAL EMAIL ***
$subject = 'New Contact Form Submission from ' . $name;
$headers = "From: " . $name . " <" . $email . ">\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// 5. Construct Email Body
$email_body = "You have received a new message from your website contact form.\n\n";
$email_body .= "Name: " . $name . "\n";
$email_body .= "Email: " . $email . "\n";
if (!empty($phone)) {
    $email_body .= "Phone: " . $phone . "\n";
}
$email_body .= "Message:\n" . $message . "\n";

// 6. Send Email
if (mail($to, $subject, $email_body, $headers)) {
    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'Email successfully sent.']);
} else {
    // This often means there is a server-side issue (e.g., Hostinger mail configuration)
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Email sending failed on the server. Check mail logs.']);
}

?>
