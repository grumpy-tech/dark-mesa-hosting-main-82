<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Configuration
$to_email = "quote@darkmesahosting.com"; // CHANGE THIS to your actual email
$from_email = "noreply@darkmesahosting.com"; // CHANGE THIS to your domain email
$from_name = "Dark Mesa Hosting Quote System";

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

try {
    // Get form data
    $companyName = isset($_POST['companyName']) ? sanitize($_POST['companyName']) : '';
    $companyCategory = isset($_POST['companyCategory']) ? sanitize($_POST['companyCategory']) : '';
    $email = isset($_POST['email']) ? filter_var($_POST['email'], FILTER_SANITIZE_EMAIL) : '';
    $phone = isset($_POST['phone']) ? sanitize($_POST['phone']) : '';
    $location = isset($_POST['location']) ? sanitize($_POST['location']) : '';
    $googleBusinessUrl = isset($_POST['googleBusinessUrl']) ? sanitize($_POST['googleBusinessUrl']) : '';
    $purchaseOption = isset($_POST['purchaseOption']) ? sanitize($_POST['purchaseOption']) : '';
    $planLevel = isset($_POST['planLevel']) ? sanitize($_POST['planLevel']) : '';
    $needsNewDomain = isset($_POST['needsNewDomain']) ? $_POST['needsNewDomain'] : 'false';
    $domainName = isset($_POST['domainName']) ? sanitize($_POST['domainName']) : '';
    $existingWebsite = isset($_POST['existingWebsite']) ? sanitize($_POST['existingWebsite']) : '';
    $businessUrl = isset($_POST['businessUrl']) ? sanitize($_POST['businessUrl']) : '';
    $deliverySpeed = isset($_POST['deliverySpeed']) ? sanitize($_POST['deliverySpeed']) : '';
    $companyOverview = isset($_POST['companyOverview']) ? sanitize($_POST['companyOverview']) : '';
    $services = isset($_POST['services']) ? sanitize($_POST['services']) : '';
    $specialRequirements = isset($_POST['specialRequirements']) ? sanitize($_POST['specialRequirements']) : '';
    
    // Parse estimate if provided
    $estimate = null;
    if (isset($_POST['estimate'])) {
        $estimate = json_decode($_POST['estimate'], true);
    }

    // Validate required fields
    if (empty($companyName) || empty($email) || empty($phone) || empty($companyOverview)) {
        throw new Exception('Missing required fields');
    }

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Invalid email address');
    }

    // Map purchase options to readable text
    $purchaseOptionText = [
        'prepay-12months' => '💰 Prepay 12 Months = FREE Build (Best Value!)',
        'prepay-6months' => '⭐ Prepay 6 Months = 50% Off Build',
        'website-only' => '🌐 Website Only (Client handles hosting)',
        'hosting-only' => '🖥️ Hosting Only (Client has existing website)'
    ];

    // Build email subject
    $subject = "New Quote Request: " . $companyName . " - " . $planLevel;

    // Build email body
    $message = "
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #0891b2; color: white; padding: 20px; text-align: center; }
            .section { margin: 20px 0; padding: 15px; background: #f5f5f5; border-radius: 5px; }
            .section-title { font-size: 18px; font-weight: bold; color: #0891b2; margin-bottom: 10px; }
            .field { margin: 10px 0; }
            .label { font-weight: bold; display: inline-block; width: 180px; }
            .value { display: inline-block; }
            .estimate-box { background: #dcfce7; border: 2px solid #22c55e; padding: 15px; border-radius: 8px; margin: 15px 0; }
            .estimate-total { font-size: 32px; font-weight: bold; color: #16a34a; }
            .estimate-line { display: flex; justify-between; margin: 8px 0; }
            .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #ddd; color: #666; }
            .urgent { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 10px; margin: 10px 0; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>New Quote Request</h1>
                <p>Dark Mesa Hosting</p>
            </div>

            <div class='section'>
                <div class='section-title'>📋 Contact Information</div>
                <div class='field'><span class='label'>Company Name:</span> <span class='value'>" . htmlspecialchars($companyName) . "</span></div>
                <div class='field'><span class='label'>Business Type:</span> <span class='value'>" . htmlspecialchars($companyCategory) . "</span></div>
                <div class='field'><span class='label'>Email:</span> <span class='value'><a href='mailto:" . htmlspecialchars($email) . "'>" . htmlspecialchars($email) . "</a></span></div>
                <div class='field'><span class='label'>Phone:</span> <span class='value'>" . htmlspecialchars($phone) . "</span></div>
                <div class='field'><span class='label'>Location:</span> <span class='value'>" . htmlspecialchars($location) . "</span></div>";
    
    if (!empty($googleBusinessUrl)) {
        $message .= "<div class='field'><span class='label'>Google Business:</span> <span class='value'><a href='" . htmlspecialchars($googleBusinessUrl) . "'>View Profile</a></span></div>";
    }
    
    $message .= "</div>";

    // Package Selection
    $message .= "
            <div class='section'>
                <div class='section-title'>📦 Package Selection</div>
                <div class='field'><span class='label'>Purchase Option:</span> <span class='value'>" . ($purchaseOptionText[$purchaseOption] ?? $purchaseOption) . "</span></div>";
    
    if ($purchaseOption !== 'hosting-only') {
        $message .= "<div class='field'><span class='label'>Plan Level:</span> <span class='value'>" . htmlspecialchars($planLevel) . "</span></div>";
    } else {
        $message .= "<div class='urgent'><strong>⚠️ HOSTING-ONLY:</strong> Existing website needs to be reviewed to determine exact hosting plan and pricing.</div>";
    }
    
    $message .= "</div>";

    // Domain Information
    if ($purchaseOption !== 'hosting-only') {
        $message .= "
            <div class='section'>
                <div class='section-title'>🌐 Domain Information</div>
                <div class='field'><span class='label'>Has Existing Domain:</span> <span class='value'>" . ($existingWebsite === 'yes' ? 'Yes' : 'No') . "</span></div>";
        
        if ($existingWebsite === 'yes') {
            $message .= "<div class='field'><span class='label'>Domain/Website:</span> <span class='value'>" . htmlspecialchars($businessUrl) . "</span></div>";
        } else if (!empty($domainName)) {
            $message .= "<div class='field'><span class='label'>Desired Domain:</span> <span class='value'>" . htmlspecialchars($domainName) . "</span></div>";
            if ($purchaseOption !== 'website-only') {
                $message .= "<div class='field' style='color: #16a34a;'><strong>✨ FREE domain for first year included!</strong></div>";
            }
        }
        
        $message .= "</div>";
    }

    // Timeline (if applicable)
    if ($purchaseOption !== 'hosting-only' && !empty($deliverySpeed)) {
        $message .= "
            <div class='section'>
                <div class='section-title'>⏱️ Timeline</div>
                <div class='field'><span class='label'>Delivery Speed:</span> <span class='value'>" . ($deliverySpeed === 'rush' ? '🚀 RUSH DELIVERY' : 'Standard Delivery') . "</span></div>
            </div>";
    }

    // Business Information
    $message .= "
            <div class='section'>
                <div class='section-title'>💼 Business Information</div>
                <div class='field'><span class='label'>Company Overview:</span><br><span class='value'>" . nl2br(htmlspecialchars($companyOverview)) . "</span></div>";
    
    if (!empty($services)) {
        $message .= "<div class='field'><span class='label'>Products/Services:</span><br><span class='value'>" . nl2br(htmlspecialchars($services)) . "</span></div>";
    }
    
    if (!empty($specialRequirements)) {
        $message .= "<div class='field'><span class='label'>Special Requirements:</span><br><span class='value'>" . nl2br(htmlspecialchars($specialRequirements)) . "</span></div>";
    }
    
    $message .= "</div>";

    // Estimate
    if ($estimate) {
        $isHostingOnly = ($purchaseOption === 'hosting-only');
        $message .= "
            <div class='estimate-box'>
                <div class='section-title'>💰 Estimated Cost</div>";
        
        if ($isHostingOnly) {
            $monthlyRate = round($estimate['total'] / 12);
            $message .= "<div class='estimate-total'>$" . number_format($estimate['total'], 2) . " /year</div>";
            $message .= "<div style='font-size: 18px; color: #666;'>($" . $monthlyRate . "/month)</div>";
            $message .= "<div style='color: #f59e0b; margin-top: 10px;'><strong>* Final price to be determined after website review</strong></div>";
        } else {
            $message .= "<div class='estimate-total'>$" . number_format($estimate['total'], 2) . "</div>";
        }
        
        $message .= "<div style='margin-top: 15px; padding-top: 15px; border-top: 1px solid #ddd;'>";
        
        if (!$isHostingOnly && $estimate['buildCost'] >= 0) {
            if ($estimate['savings'] > 0) {
                $originalBuild = $estimate['buildCost'] + $estimate['savings'];
                $message .= "<div class='estimate-line'><span>Website Build:</span><span style='text-decoration: line-through; color: #999;'>$" . number_format($originalBuild, 2) . "</span></div>";
                $message .= "<div class='estimate-line'><span>Discounted Build:</span><span style='color: #16a34a; font-weight: bold;'>" . ($estimate['buildCost'] === 0 ? 'FREE!' : '$' . number_format($estimate['buildCost'], 2)) . "</span></div>";
            } else if ($estimate['buildCost'] > 0) {
                $message .= "<div class='estimate-line'><span>Website Build:</span><span>$" . number_format($estimate['buildCost'], 2) . "</span></div>";
            }
        }
        
        if ($estimate['hostingCost'] > 0) {
            $message .= "<div class='estimate-line'><span>Hosting:</span><span>$" . number_format($estimate['hostingCost'], 2) . "</span></div>";
        }
        
        if ($estimate['rushFee'] > 0) {
            $message .= "<div class='estimate-line'><span>Rush Fee:</span><span>$" . number_format($estimate['rushFee'], 2) . "</span></div>";
        }
        
        if ($estimate['savings'] > 0) {
            $message .= "<div class='estimate-line' style='color: #16a34a; font-weight: bold; border-top: 1px solid #ddd; padding-top: 10px; margin-top: 10px;'><span>💰 Total Savings:</span><span>-$" . number_format($estimate['savings'], 2) . "</span></div>";
        }
        
        $message .= "</div></div>";
    }

    $message .= "
            <div class='footer'>
                <p><strong>Next Steps:</strong></p>
                <p>1. Review client information and requirements<br>
                2. Respond within 24 hours with any clarifying questions<br>
                3. Send detailed proposal with payment link within 48 hours</p>
                <p style='margin-top: 20px;'>Quote submitted on: " . date('F j, Y \a\t g:i A') . "</p>
            </div>
        </div>
    </body>
    </html>";

    // Email headers
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: " . $from_name . " <" . $from_email . ">" . "\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";

    // Send email
    if (mail($to_email, $subject, $message, $headers)) {
        // Log successful submission (optional)
        $log_entry = date('Y-m-d H:i:s') . " - Quote from: " . $companyName . " (" . $email . ")\n";
        file_put_contents('quote_log.txt', $log_entry, FILE_APPEND);

        echo json_encode([
            'success' => true,
            'message' => 'Quote request sent successfully'
        ]);
    } else {
        throw new Exception('Failed to send email');
    }

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}

// Helper function to sanitize input
function sanitize($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
?>
