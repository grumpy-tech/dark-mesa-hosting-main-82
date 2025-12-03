<?php
// Prevent direct access
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Enable CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Get form data
$companyName = isset($_POST['companyName']) ? strip_tags(trim($_POST['companyName'])) : '';
$companyCategory = isset($_POST['companyCategory']) ? strip_tags(trim($_POST['companyCategory'])) : '';
$customCategory = isset($_POST['customCategory']) ? strip_tags(trim($_POST['customCategory'])) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$phone = isset($_POST['phone']) ? strip_tags(trim($_POST['phone'])) : '';
$location = isset($_POST['location']) ? strip_tags(trim($_POST['location'])) : '';
$googleMapsLink = isset($_POST['googleMapsLink']) ? trim($_POST['googleMapsLink']) : '';
$employees = isset($_POST['employees']) ? strip_tags(trim($_POST['employees'])) : '';
$existingWebsite = isset($_POST['existingWebsite']) ? strip_tags(trim($_POST['existingWebsite'])) : '';
$businessUrl = isset($_POST['businessUrl']) ? trim($_POST['businessUrl']) : '';
$serviceCategory = isset($_POST['serviceCategory']) ? strip_tags(trim($_POST['serviceCategory'])) : '';
$serviceType = isset($_POST['serviceType']) ? strip_tags(trim($_POST['serviceType'])) : '';
$hostingPlan = isset($_POST['hostingPlan']) ? strip_tags(trim($_POST['hostingPlan'])) : '';
$needsDomainAssistance = isset($_POST['needsDomainAssistance']) ? $_POST['needsDomainAssistance'] : 'false';
$domainName = isset($_POST['domainName']) ? strip_tags(trim($_POST['domainName'])) : '';
$needsDomainHandling = isset($_POST['needsDomainHandling']) ? $_POST['needsDomainHandling'] : 'false';
$companyOverview = isset($_POST['companyOverview']) ? strip_tags(trim($_POST['companyOverview'])) : '';
$services = isset($_POST['services']) ? strip_tags(trim($_POST['services'])) : '';
$specialRequirements = isset($_POST['specialRequirements']) ? strip_tags(trim($_POST['specialRequirements'])) : '';
$turnaroundTime = isset($_POST['turnaroundTime']) ? strip_tags(trim($_POST['turnaroundTime'])) : '';
$colorScheme = isset($_POST['colorScheme']) ? strip_tags(trim($_POST['colorScheme'])) : '';
$estimate = isset($_POST['estimate']) ? strip_tags(trim($_POST['estimate'])) : 'Not calculated';

// Validate required fields
if (empty($companyName) || empty($email) || empty($phone) || empty($companyOverview)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please fill in all required fields']);
    exit;
}

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email address']);
    exit;
}

// YOUR COMPANY EMAIL (Change this to your actual email)
$to = 'info@darkmesahosting.com';

// Email subject
$subject = 'New Quote Request from ' . $companyName;

// Build detailed email content
$email_content = "=== COMPANY INFORMATION ===\n";
$email_content .= "Company: $companyName\n";
$email_content .= "Category: $companyCategory" . ($customCategory ? " ($customCategory)" : "") . "\n";
$email_content .= "Email: $email\n";
$email_content .= "Phone: $phone\n";
if (!empty($location)) {
    $email_content .= "Location: $location\n";
}
if (!empty($googleMapsLink)) {
    $email_content .= "Google Maps: $googleMapsLink\n";
}
if (!empty($employees)) {
    $email_content .= "Employees: $employees\n";
}
if (!empty($existingWebsite)) {
    $email_content .= "Existing Website: " . ucfirst($existingWebsite) . "\n";
}
if (!empty($businessUrl)) {
    $email_content .= "Current Website: $businessUrl\n";
}

$email_content .= "\n=== SERVICE DETAILS ===\n";
$email_content .= "Service Type: $serviceCategory\n";
if (!empty($serviceType)) {
    $email_content .= "Website Package: $serviceType\n";
}
if (!empty($hostingPlan)) {
    $hostingLabel = $hostingPlan === 'basic' ? 'Basic Hosting - $129/year' : 'Advanced Hosting - $194/year';
    $email_content .= "Hosting Plan: $hostingLabel\n";
}
if (!empty($turnaroundTime)) {
    $email_content .= "Turnaround Time: $turnaroundTime\n";
}

$email_content .= "\n=== DOMAIN INFORMATION ===\n";
$email_content .= "Needs Domain Assistance: " . ($needsDomainAssistance === 'true' ? 'Yes' : 'No') . "\n";
if (!empty($domainName)) {
    $email_content .= "Selected Domain: $domainName\n";
}
$email_content .= "Domain Handling Service: " . ($needsDomainHandling === 'true' ? 'Yes (+$18)' : 'No') . "\n";

$email_content .= "\n=== DESIGN PREFERENCES ===\n";
if (isset($_FILES['logo']) && $_FILES['logo']['error'] === UPLOAD_ERR_OK) {
    $email_content .= "Has Logo: Yes (file attached)\n";
} else {
    $email_content .= "Has Logo: No\n";
}
if (!empty($colorScheme)) {
    $email_content .= "Color Scheme: $colorScheme\n";
}

$email_content .= "\n=== PROJECT DETAILS ===\n";
$email_content .= "Company Overview:\n$companyOverview\n";

if (!empty($services)) {
    $email_content .= "\nProducts/Services:\n$services\n";
}

if (!empty($specialRequirements)) {
    $email_content .= "\nSpecial Requirements:\n$specialRequirements\n";
}

$email_content .= "\n=== ESTIMATED COST ===\n";
$email_content .= "Total Estimate: $$estimate\n";
$email_content .= "\nNote: Domain registration cost and special requirements may add additional charges\n";

// Email headers
$headers = "From: $companyName <$email>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Handle logo attachment if present
$attachmentSaved = false;
if (isset($_FILES['logo']) && $_FILES['logo']['error'] === UPLOAD_ERR_OK) {
    // Note: For file attachments, you may want to use PHPMailer library instead
    // This basic implementation will just note the logo was uploaded
    $attachmentSaved = true;
}

// Send email
if (mail($to, $subject, $email_content, $headers)) {
    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'Quote request sent successfully!']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Sorry, there was an error sending your quote request. Please try again.']);
}
?>
