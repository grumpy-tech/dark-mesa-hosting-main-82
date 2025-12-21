<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Configuration
$to_email = "quote@darkmesahosting.com"; // CHANGE THIS to your actual email
$from_email = "quote@darkmesahosting.com"; // CHANGE THIS to your domain email
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
    $domainName = isset($_POST['domainName']) ? sanitize($_POST['domainName']) : '';
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
    if (empty($companyName) || empty($email) || empty($phone)) {
        throw new Exception('Missing required fields');
    }

    // Validate services field (mandatory)
    if (empty($services) && $purchaseOption !== 'hosting-only') {
        throw new Exception('Services/Products field is required');
    }

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Invalid email address');
    }

    // Map purchase options to readable text
    $purchaseOptionText = [
        'prepay-12months' => '💰 Prepay 12 Months = FREE Build + FREE Domain (Best Value!)',
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
            .domain-highlight { background: #dcfce7; border-left: 4px solid #22c55e; padding: 10px; margin: 10px 0; }
            .text-block { background: white; padding: 12px; border-radius: 5px; margin: 10px 0; border: 1px solid #ddd; }
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

    // Domain Information - Only for 12-month prepay
    if ($purchaseOption === 'prepay-12months' && !empty($domainName)) {
        $message .= "
            <div class='section'>
                <div class='section-title'>🌐 Domain Information</div>
                <div class='domain-highlight'>
                    <strong>✨ FREE DOMAIN INCLUDED (12-Month Plan)</strong>
                </div>
                <div class='field'><span class='label'>Preferred Domain:</span> <span class='value'><strong>" . htmlspecialchars($domainName) . ".com</strong></span></div>
                <div class='field' style='color: #f59e0b;'><strong>⚠️ ACTION REQUIRED:</strong> Check domain availability and contact client with options if unavailable.</div>
            </div>";
    }

    // Timeline (if applicable)
    if ($purchaseOption !== 'hosting-only' && !empty($deliverySpeed)) {
        $message .= "
            <div class='section'>
                <div class='section-title'>⏱️ Timeline</div>
                <div class='field'><span class='label'>Delivery Speed:</span> <span class='value'>" . ($deliverySpeed === 'rush' ? '🚀 RUSH DELIVERY' : 'Standard Delivery') . "</span></div>
            </div>";
    }

    // Business Information - Services/Products (Mandatory)
    $message .= "
            <div class='section'>
                <div class='section-title'>💼 What They Offer (Required)</div>
                <div class='field'><strong>Services, Products, or Offerings:</strong></div>
                <div class='text-block'>" . nl2br(htmlspecialchars($services)) . "</div>";
    
    if (!empty($companyOverview)) {
        $message .= "
                <div class='field' style='margin-top: 15px;'><strong>Company Overview:</strong></div>
                <div class='text-block'>" . nl2br(htmlspecialchars($companyOverview)) . "</div>";
    }
    
    if (!empty($specialRequirements)) {
        $message .= "
                <div class='field' style='margin-top: 15px;'><strong>Special Requirements:</strong></div>
                <div class='text-block'>" . nl2br(htmlspecialchars($specialRequirements)) . "</div>";
    }
    
    $message .= "</div>";

    // Estimate
    if ($estimate) {
        $isHostingOnly = ($purchaseOption === 'hosting-only');
        $message .= "
            <div class='estimate-box'>
                <div class='section-title'>💰 Estimated Cost</div>";
        
        if ($isHostingOnly) {
            $message .= "<div style='color: #f59e0b; margin-bottom: 10px;'><strong>⚠️ ESTIMATE ONLY - Final price after website review</strong></div>";
            $message .= "
                <div style='margin-top: 15px;'>
                    <strong>Possible Hosting Plans:</strong>
                    <div style='margin: 10px 0; padding: 10px; background: white; border-radius: 5px;'>
                        <div><strong>Starter:</strong> $39/mo or $468/year (up to 3 pages)</div>
                        <div style='margin-top: 5px;'><strong>Business:</strong> $69/mo or $828/year (up to 6 pages) ⭐ Most Common</div>
                        <div style='margin-top: 5px;'><strong>Pro:</strong> $99/mo or $1,188/year (up to 9 pages)</div>
                    </div>
                </div>";
        } else {
            $message .= "<div class='estimate-total'>$" . number_format($estimate['total'], 2) . "</div>";
        }
        
        if (!$isHostingOnly) {
            $message .= "<div style='margin-top: 15px; padding-top: 15px; border-top: 1px solid #ddd;'>";
            
            if ($estimate['buildCost'] >= 0) {
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
            
            // Highlight FREE domain for 12-month plan
            if ($purchaseOption === 'prepay-12months') {
                $message .= "<div class='estimate-line' style='color: #16a34a; font-weight: bold;'><span>FREE Domain (Year 1):</span><span>Included! (up to $20 value)</span></div>";
            }
            
            $message .= "</div>";
        }
        
        $message .= "</div>";
    }

    $message .= "
            <div class='footer'>
                <p><strong>Next Steps:</strong></p>
                <p>1. Review client information and requirements<br>";
    
    if ($purchaseOption === 'prepay-12months' && !empty($domainName)) {
        $message .= "2. <strong style='color: #f59e0b;'>CHECK DOMAIN AVAILABILITY: " . htmlspecialchars($domainName) . ".com</strong><br>
                3. Respond within 24 hours with domain status and any clarifying questions<br>
                4. Send detailed proposal with payment link within 48 hours</p>";
    } else {
        $message .= "2. Respond within 24 hours with any clarifying questions<br>
                3. Send detailed proposal with payment link within 48 hours</p>";
    }
    
    $message .= "
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
        $log_entry = date('Y-m-d H:i:s') . " - Quote from: " . $companyName . " (" . $email . ") - " . $purchaseOption . " - " . $planLevel;
        if ($purchaseOption === 'prepay-12months' && !empty($domainName)) {
            $log_entry .= " - Domain: " . $domainName . ".com";
        }
        $log_entry .= "\n";
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
