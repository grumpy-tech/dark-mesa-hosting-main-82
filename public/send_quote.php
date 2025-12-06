<?php
// send_quote.php - updated to accept new fields and create a detailed project summary email

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// CORS headers (adjust origin for security in prod)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

// Simple helper to get POST value safely
function post($key, $default = '') {
    return isset($_POST[$key]) ? trim($_POST[$key]) : $default;
}

// Fetch basic fields
$companyName = strip_tags(post('companyName'));
$email = filter_var(post('email'), FILTER_SANITIZE_EMAIL);
$phone = strip_tags(post('phone'));
$location = strip_tags(post('location'));
$googleMapsLink = strip_tags(post('googleMapsLink'));
$employees = strip_tags(post('employees'));
$existingWebsite = strip_tags(post('existingWebsite'));
$businessUrl = strip_tags(post('businessUrl'));

// New / content fields
$companyOverview = strip_tags(post('companyOverview'));
$services = strip_tags(post('servicesOffered'));
$specialRequirements = strip_tags(post('specialRequirements'));
$colorScheme = strip_tags(post('colorScheme'));
$competitors = strip_tags(post('competitors'));

// Product / pricing fields
$serviceType = strip_tags(post('serviceType'));
$planTier = strip_tags(post('planTier'));
$turnaroundTime = strip_tags(post('turnaroundTime'));
$prepayOption = strip_tags(post('prepayOption')); // 6months | 12months | ""
$needsDomain = isset($_POST['needsDomain']) && $_POST['needsDomain'] === 'true' ? 'Yes' : 'No';
$domainName = strip_tags(post('domainName'));
$needsDomainHandling = isset($_POST['needsDomainHandling']) && $_POST['needsDomainHandling'] === 'true' ? 'Yes' : 'No';

$estimate = strip_tags(post('estimate', 'Not calculated'));
$estimateBreakdown = post('estimateBreakdown', ''); // JSON string if present

$industry = strip_tags(post('industry'));
$analyticsOptIn = isset($_POST['analyticsOptIn']) && $_POST['analyticsOptIn'] === 'true' ? 'Yes' : 'No';

// Basic validation
if (empty($companyName) || empty($email) || empty($companyOverview)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please fill in required fields: company name, email, company overview.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email address']);
    exit;
}

// Recipient - change to your real inbox
$to = 'info@darkmesahosting.com';

// Subject
$subject = "New Quote Request: $companyName";

// Build email message
$message = "=== NEW QUOTE REQUEST ===\n\n";
$message .= "Submitted: " . date('Y-m-d H:i:s') . "\n\n";

$message .= "=== COMPANY DETAILS ===\n";
$message .= "Company: $companyName\n";
$message .= "Email: $email\n";
$message .= "Phone: $phone\n";
if ($location) $message .= "Location: $location\n";
if ($googleMapsLink) $message .= "Google Maps: $googleMapsLink\n";
if ($employees) $message .= "Employees: $employees\n";
$message .= "Existing Website: " . ($existingWebsite ? ucfirst($existingWebsite) : 'No') . "\n";
if ($businessUrl) $message .= "Current Website: $businessUrl\n";

$message .= "\n=== PROJECT SUMMARY ===\n";
$message .= "Industry: " . ($industry ? $industry : 'Not specified') . "\n";
$message .= "Service Type: " . ($serviceType ? $serviceType : 'Not specified') . "\n";
$message .= "Plan Tier: " . ($planTier ? $planTier : 'Not specified') . "\n";
$message .= "Turnaround Preference: " . ($turnaroundTime ? $turnaroundTime : 'Standard') . "\n";
$message .= "Prepay Option: " . ($prepayOption ? $prepayOption : 'None (pay monthly)') . "\n";
$message .= "Analytics Opt-In: $analyticsOptIn\n";

$message .= "\n=== DESIGN & CONTENT ===\n";
$message .= "Company Overview:\n$companyOverview\n\n";
if ($services) $message .= "Services / Products:\n$services\n\n";
if ($specialRequirements) $message .= "Special Requirements:\n$specialRequirements\n\n";
if ($colorScheme) $message .= "Preferred Colors: $colorScheme\n";
if ($competitors) $message .= "Competitor / Inspiration Links: $competitors\n";

// Domain
$message .= "\n=== DOMAIN ===\n";
$message .= "Needs Domain: $needsDomain\n";
if ($domainName) $message .= "Desired Domain: $domainName\n";
$message .= "Domain Handling Service: $needsDomainHandling\n";
$message .= "Note: First-year domain registration is free when eligible per offer. Renewal billed separately.\n";

// Estimate details
$message .= "\n=== ESTIMATE ===\n";
$message .= "Total Estimate (due now): $" . $estimate . "\n";
if ($estimateBreakdown) {
    $message .= "Estimate Breakdown (JSON):\n" . $estimateBreakdown . "\n";
}

// File upload handling note
$hasLogo = (isset($_FILES['logo']) && $_FILES['logo']['error'] === UPLOAD_ERR_OK) ? 'Yes' : 'No';
$message .= "\nHas Logo File: $hasLogo\n";
if ($hasLogo === 'Yes') {
    // Save uploaded file to a safe directory with timestamped name (optional)
    $uploadDir = __DIR__ . '/uploads';
    if (!is_dir($uploadDir)) mkdir($uploadDir, 0755, true);
    $fileTmp = $_FILES['logo']['tmp_name'];
    $fileName = basename($_FILES['logo']['name']);
    $safeName = preg_replace('/[^a-zA-Z0-9._-]/', '_', $fileName);
    $target = $uploadDir . '/' . time() . '_' . $safeName;
    if (move_uploaded_file($fileTmp, $target)) {
        $message .= "Logo file saved to: $target\n";
    } else {
        $message .= "Logo file uploaded but failed to save on server.\n";
    }
}

// Add compliance note
if ($industry) {
    $regulated = in_array(strtolower($industry), ['healthcare', 'medical', 'finance', 'legal', 'financial']);
    if ($regulated) {
        $message .= "\n*** Compliance Notice: Client selected a regulated industry. Client is responsible for regulatory compliance (HIPAA, PHIPA, PCI, etc.). Developer will implement technical safeguards on request but is not legal counsel. ***\n";
    }
}

// Email headers
$headers = "From: $companyName <$email>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Send email (note: for production use authenticated SMTP/PHPMailer)
$sent = mail($to, $subject, $message, $headers);

if ($sent) {
    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'Quote request sent successfully']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to send quote request via mail()']);
}
?>
