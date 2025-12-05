import { useState, useRef, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { DollarSign, Send, Upload, CheckCircle2, Info } from "lucide-react";
import { DomainChecker } from "@/components/DomainChecker"; // Assuming this is functional

// --- CONSTANTS AND CONFIGURATION ---

const PLAN_PRICING = {
  Starter: { build: 349, monthly: 39, annual: 399, rushFee: 199, standardDays: "5–7", rushDays: "3" },
  Business: { build: 599, monthly: 69, annual: 699, rushFee: 299, standardDays: "7–10", rushDays: "5" },
  Pro: { build: 999, monthly: 99, annual: 999, rushFee: 399, standardDays: "10–14", rushDays: "7" },
};

const DOMAIN_COST_LIMIT = 20; // Max value for the free domain

// --- COMPONENT START ---

const Quote = () => {
  const location = useLocation();
  const { toast } = useToast();
  const estimateRef = useRef<HTMLDivElement>(null);
  const [calculating, setCalculating] = useState(false);
  const [estimate, setEstimate] = useState<number | null>(null);
  const [logo, setLogo] = useState<File | null>(null);
  const [domainAvailable, setDomainAvailable] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); // New state for confirmation message

  const [formData, setFormData] = useState({
    companyName: "",
    companyCategory: "",
    customCategory: "",
    email: "",
    phone: "",
    location: "",
    googleMapsLink: "",
    employees: "",
    existingWebsite: "no", // Set default to 'no'
    businessUrl: "",
    serviceCategory: "", // web_building, hosting, bundle
    serviceType: "", // Starter, Business, Pro, or Hosting Tier
    hostingPaymentCycle: "annual", // New state for hosting payment (needed for bundle discount logic)
    needsDomain: "", // yes/no
    domainName: "",
    hasLogo: "",
    companyOverview: "",
    services: "",
    specialRequirements: "",
    turnaroundTime: "standard",
    colorScheme: "",
  });

  // Reset serviceType if serviceCategory changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      serviceType: "",
      turnaroundTime: "standard",
    }));
  }, [formData.serviceCategory]);

  // Handle pre-population from navigation state (if coming from a pricing page click)
  useEffect(() => {
    const state = location.state as {
      plan?: string;
      serviceCategory?: string;
      serviceType?: string;
    } | null;

    if (state?.plan && ["Starter", "Business", "Pro"].includes(state.plan)) {
      setFormData((prev) => ({
        ...prev,
        serviceCategory: "bundle",
        serviceType: state.plan,
        turnaroundTime: "standard",
      }));
    }
  }, [location.state]);

  // Logic to dynamically determine plan selection options
  const getServiceTypeOptions = useMemo(() => {
    if (formData.serviceCategory === "web_building" || formData.serviceCategory === "bundle") {
      const options = [
        { value: "Starter", label: "Starter Website Build" },
        { value: "Business", label: "Business Website Build (Popular)" },
        { value: "Pro", label: "Pro Website Build" },
      ];
      if (formData.serviceCategory === "bundle") {
        options[0].label += " + Hosting (Pay 50% Off)";
        options[1].label += " + Hosting (Pay 50% Off)";
        options[2].label += " + Hosting (Pay 50% Off)";
        // Note: Full pre-pay for free site is handled in calculation/discount description
      }
      return options;
    }

    if (formData.serviceCategory === "hosting") {
      return [
        { value: "HostStarter", label: "Starter Hosting Only" },
        { value: "HostBusiness", label: "Business Hosting Only" },
        { value: "HostPro", label: "Pro Hosting Only" },
      ];
    }

    return [];
  }, [formData.serviceCategory]);

  // Get turnaround options based on service type
  const getTurnaroundOptions = useMemo(() => {
    const type = formData.serviceType as keyof typeof PLAN_PRICING;

    if (PLAN_PRICING[type]) {
      const planData = PLAN_PRICING[type];
      return [
        { value: "standard", label: `Standard (${planData.standardDays} business days)` },
        { value: "rush", label: `Rush (${planData.rushDays} days) +$${planData.rushFee}` },
      ];
    }

    // Default fallback (e.g., for hosting only or not selected)
    return [{ value: "standard", label: "N/A" }];
  }, [formData.serviceType]);

  const calculateEstimate = () => {
    setCalculating(true);

    setTimeout(() => {
      let buildCost = 0;
      let hostCost = 0;
      let rushFee = 0;
      let domainDiscount = 0;

      const planKey = formData.serviceType as keyof typeof PLAN_PRICING;
      const planData = PLAN_PRICING[planKey];

      if (formData.serviceCategory === "web_building" && planData) {
        buildCost = planData.build;
      } else if (formData.serviceCategory === "hosting" && planData) {
        // Assume annual payment for estimate if not specified, use monthly cost for estimation clarity
        hostCost = formData.hostingPaymentCycle === "annual" ? planData.annual : planData.monthly * 12;
      } else if (formData.serviceCategory === "bundle" && planData) {
        buildCost = planData.build;
        hostCost = planData.annual; // Calculate based on annual hosting

        // Apply bundle discount logic: 50% off build if paying monthly, FREE site if paying annual hosting upfront.
        if (formData.hostingPaymentCycle === "annual") {
          buildCost = 0; // FREE website if paying annual hosting upfront
        } else {
          buildCost = buildCost / 2; // 50% off build if paying monthly hosting
        }
      }

      // Add rush fee
      if (formData.turnaroundTime === "rush" && planData) {
        rushFee = planData.rushFee;
      }

      // Domain Logic: Free domain for first year if new
      if (formData.needsDomain === "yes" && formData.existingWebsite === "no") {
        // Give a discount equal to the domain cap for the first year
        domainDiscount = DOMAIN_COST_LIMIT;
      }

      // Total calculation: Build Cost + Hosting Cost (1 year) + Rush Fee - Domain Discount (first year only)
      const total = buildCost + hostCost + rushFee - domainDiscount;

      setEstimate(Math.max(0, total)); // Ensure estimate isn't negative
      setCalculating(false);

      setTimeout(() => {
        estimateRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }, 1000);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogo(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    // Placeholder submission logic (simulated success)
    try {
      // In a real app, this would send data to the backend via fetch
      // await fetch('/api/submit_quote', { method: 'POST', body: JSON.stringify(formData) });
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call

      setIsSubmitted(true); // Show confirmation message instead of form

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send quote request. Please try again or contact us directly.",
        variant: "destructive",
      });
      console.error("Error sending quote:", error);
      setIsSubmitting(false); // Keep the form visible on failure
    }
  };
  
  // Conditionally render the confirmation message
  if (isSubmitted) {
    return (
      <div className="container mx-auto px-6 py-32">
        <div className="max-w-xl mx-auto text-center">
          <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Quote Request Submitted!</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Thank you for providing the details for your new website. We've received your request and are excited to begin!
          </p>
          <Card className="p-6 border-2 border-primary/50 bg-primary/10 space-y-4 text-left">
            <h2 className="text-xl font-semibold text-primary">What Happens Next?</h2>
            <ul className="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300">
              <li>
                <strong>Review & Clarification:</strong> We will **personally review your submission** to clarify any details needed to ensure the first draft is perfect. Expect to hear from us within 1 business day.
              </li>
              <li>
                <strong>Deposit & Timeline:</strong> Once all details are confirmed, we will send you a **secure payment link for the 50% deposit** (based on your total estimate, if applicable).
              </li>
              <li>
                <strong>Project Start:</strong> Your **project timeline officially starts the business day after the 50% deposit and all initial content (text, photos, logo) are received**. We'll then get our head down and work quickly on your first draft!
              </li>
            </ul>
            <p className="text-sm italic mt-4 flex items-center gap-2 text-muted-foreground">
              <Info className="w-4 h-4 flex-shrink-0" />
              Keep an eye on your email for our follow-up!
            </p>
          </Card>
          <Button onClick={() => window.location.reload()} variant="link" className="mt-8">
            Go back to homepage
          </Button>
        </div>
      </div>
    );
  }

  // --- MAIN FORM RENDER ---
  return (
    <div className="container mx-auto px-6 py-32">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get Your Free Quote</h1>
          <p className="text-lg text-muted-foreground">
            Fill out the form below and get an instant estimate for your project
          </p>
        </div>

        <Card className="p-8 border-border mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Business Info (Remains the same) */}
            {/* ... (All fields from companyName to employees are the same) ... */}

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  required
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  placeholder="Your Company Inc."
                />
              </div>
              <div>
                <Label htmlFor="companyCategory">Business Category *</Label>
                <Select
                  value={formData.companyCategory}
                  onValueChange={(value) => setFormData({ ...formData, companyCategory: value, customCategory: value !== "other" ? "" : formData.customCategory })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="services">Services</SelectItem>
                    <SelectItem value="tech">Technology</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {formData.companyCategory === "other" && (
              <div>
                <Label htmlFor="customCategory">Specify Your Business Category *</Label>
                <Input
                  id="customCategory"
                  required
                  value={formData.customCategory}
                  onChange={(e) => setFormData({ ...formData, customCategory: e.target.value })}
                  placeholder="Enter your business category"
                />
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="hello@company.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(123) 456-7890"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="City, State/Country"
                />
              </div>
              <div>
                <Label htmlFor="googleMapsLink">Google Maps Link (Optional)</Label>
                <Input
                  id="googleMapsLink"
                  value={formData.googleMapsLink}
                  onChange={(e) => setFormData({ ...formData, googleMapsLink: e.target.value })}
                  placeholder="https://maps.google.com/..."
                />
              </div>
            </div>

            <div>
              <Label htmlFor="employees">Number of Employees</Label>
              <Select
                value={formData.employees}
                onValueChange={(value) => setFormData({ ...formData, employees: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-10">1-10</SelectItem>
                  <SelectItem value="11-50">11-50</SelectItem>
                  <SelectItem value="51-200">51-200</SelectItem>
                  <SelectItem value="200+">200+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <hr className="my-6" />

            {/* --- SERVICE SELECTION --- */}
            <h2 className="text-xl font-bold">Plan Details</h2>

            {/* Service Category Selection */}
            <div>
              <Label htmlFor="serviceCategory">Service Selection *</Label>
              <Select
                value={formData.serviceCategory}
                onValueChange={(value) => setFormData({ ...formData, serviceCategory: value, serviceType: "" })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose service type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="web_building">Website Build Only (One-time fee)</SelectItem>
                  <SelectItem value="hosting">Hosting Only</SelectItem>
                  <SelectItem value="bundle">Bundle: Website Build + Hosting</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Plan Tier Selection (Visible if serviceCategory selected) */}
            {formData.serviceCategory && (
              <div>
                <Label htmlFor="serviceType">Select Plan Tier *</Label>
                <Select
                  value={formData.serviceType}
                  onValueChange={(value) => setFormData({ ...formData, serviceType: value, turnaroundTime: "standard" })}
                  required
                  disabled={!formData.serviceCategory}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a plan tier" />
                  </SelectTrigger>
                  <SelectContent>
                    {getServiceTypeOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            
            {/* Hosting Payment Cycle (If Bundle Selected) */}
            {(formData.serviceCategory === "bundle" || formData.serviceCategory === "hosting") && (
              <div className="bg-blue-50 dark:bg-blue-900/50 p-4 rounded-md border border-blue-200 dark:border-blue-800">
                <Label htmlFor="hostingPaymentCycle">Hosting Payment Cycle *</Label>
                <Select
                  value={formData.hostingPaymentCycle}
                  onValueChange={(value) => setFormData({ ...formData, hostingPaymentCycle: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select monthly or annual" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly Hosting</SelectItem>
                    <SelectItem value="annual">Annual Hosting (BEST VALUE - Free Website Build if Bundle Selected!)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            
            {/* --- EXISTING WEBSITE & DOMAIN --- */}
            
            <hr className="my-6" />

            <div>
              <Label htmlFor="existingWebsite">Do you have an existing website?</Label>
              <Select
                value={formData.existingWebsite}
                onValueChange={(value) => {
                  setFormData({ 
                    ...formData, 
                    existingWebsite: value, 
                    // Reset domain selection if changing to 'yes'
                    needsDomain: value === "yes" ? "no" : formData.needsDomain, 
                    domainName: value === "yes" ? "" : formData.domainName,
                  })
                  setDomainAvailable(null);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes (Will need to transfer to us)</SelectItem>
                  <SelectItem value="no">No (New project)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.existingWebsite === "yes" && (
              <div>
                <Label htmlFor="businessUrl">Existing Website URL *</Label>
                <Input
                  id="businessUrl"
                  required
                  value={formData.businessUrl}
                  onChange={(e) => setFormData({ ...formData, businessUrl: e.target.value })}
                  placeholder="https://yourwebsite.com"
                />
              </div>
            )}

            {/* DOMAIN SECTION LOGIC - Only show if existingWebsite is NO */}
            {formData.existingWebsite === "no" && (
              <>
                <div className="mt-6">
                  <Label htmlFor="needsDomain">Do you need a new domain name (e.g., yourbusiness.com)? *</Label>
                  <Select
                    value={formData.needsDomain}
                    onValueChange={(value) => {
                      setFormData({ 
                        ...formData, 
                        needsDomain: value, 
                        domainName: value === "no" ? "" : formData.domainName,
                      });
                      setDomainAvailable(null);
                    }}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes, I need a new domain</SelectItem>
                      <SelectItem value="no">No, I have my own domain</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {formData.needsDomain === "yes" && (
                  <div className="space-y-4 p-4 bg-green-50 dark:bg-green-900/50 rounded-md border border-green-200 dark:border-green-800">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-green-700 dark:text-green-300 flex-shrink-0 mt-1" />
                      <p className="text-sm">
                        **Free Domain Offer:** We register any available domain worth up to **${DOMAIN_COST_LIMIT} completely free for the first year!** You own the domain 100% and can transfer it away anytime. From year 2, it renews at normal pricing ($\$18–\$22$/year depending on extension).
                      </p>
                    </div>

                    <Label>Check Domain Availability</Label>
                    <DomainChecker
                      onDomainSelect={(domain, available) => {
                        if (available) {
                          setFormData({ ...formData, domainName: domain });
                          setDomainAvailable(true);
                        } else {
                          setFormData({ ...formData, domainName: "" });
                          setDomainAvailable(false);
                        }
                      }}
                    />

                    {formData.domainName && domainAvailable && (
                      <div className="mt-3 p-3 bg-green-100 dark:bg-green-800/50 rounded-md">
                        <p className="text-sm text-green-700 dark:text-green-300 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" />
                          Selected domain: <strong>{formData.domainName}</strong>
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            <hr className="my-6" />

            {/* --- CONTENT & DESIGN DETAILS (Remains the same) --- */}
            
            <div className="bg-yellow-50 dark:bg-yellow-900/50 p-4 rounded-md border border-yellow-200 dark:border-yellow-800">
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                💡 **Content Tip:** The more detailed information and content you provide now, the closer your first draft will be to your vision, saving us both time!
              </p>
            </div>
            
            {/* Logo, Color Scheme, Overviews */}
            
            <div>
              <Label htmlFor="logo">Upload Your Logo (Optional)</Label>
              <div className="flex items-center gap-4 mt-2">
                <Input
                  id="logo"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="cursor-pointer"
                />
                {logo && (
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    {logo.name}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                If you don't have a logo yet, that's okay! We can discuss logo options during consultation.
              </p>
            </div>

            <div>
              <Label htmlFor="colorScheme">Preferred Color Scheme</Label>
              <Input
                id="colorScheme"
                value={formData.colorScheme}
                onChange={(e) => setFormData({ ...formData, colorScheme: e.target.value })}
                placeholder="e.g., Blue and white, Modern dark theme, etc."
              />
            </div>

            <div>
              <Label htmlFor="companyOverview">Company Overview *</Label>
              <Textarea
                id="companyOverview"
                required
                value={formData.companyOverview}
                onChange={(e) => setFormData({ ...formData, companyOverview: e.target.value })}
                placeholder="Tell us about your business, what you do, and what makes you unique..."
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="services">Products/Services Offered</Label>
              <Textarea
                id="services"
                value={formData.services}
                onChange={(e) => setFormData({ ...formData, services: e.target.value })}
                placeholder="List your main products or services..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="specialRequirements">Special Requirements or Features</Label>
              <Textarea
                id="specialRequirements"
                value={formData.specialRequirements}
                onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                placeholder="Any specific features, integrations, or requirements? (e.g., booking system, e-commerce, contact forms, etc.)"
                rows={4}
                maxLength={1000}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Note: Special requirements may include further charges
              </p>
            </div>


            {/* --- TURNAROUND TIME --- */}
            {(formData.serviceCategory === "web_building" || formData.serviceCategory === "bundle") && formData.serviceType && (
              <div>
                <h3 className="text-lg font-semibold mb-2">How Fast Will My Website Be Ready?</h3>
                <Label htmlFor="turnaroundTime">Desired Turnaround Time *</Label>
                <Select
                  value={formData.turnaroundTime}
                  onValueChange={(value) => setFormData({ ...formData, turnaroundTime: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    {getTurnaroundOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  **Timeline starts the business day after we receive your 50% deposit and all necessary initial content (text, photos, and logo).**
                </p>
              </div>
            )}
            
            <hr className="my-6" />

            {/* --- ESTIMATE & SUBMIT BUTTONS --- */}

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={calculateEstimate}
                disabled={!formData.serviceCategory || !formData.serviceType || calculating}
                className="w-full"
              >
                {calculating ? "Calculating..." : <><DollarSign className="w-4 h-4 mr-2" /> Calculate Initial Estimate</>}
              </Button>
              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={isSubmitting}
              >
                <Send className="w-4 h-4 mr-2" />
                {isSubmitting ? "Submitting..." : "Submit Quote Request"}
              </Button>
            </div>
            
            {/* ESTIMATE DISPLAY */}
            {estimate !== null && (
              <Card ref={estimateRef} className="p-6 border-2 border-primary bg-primary/5 mt-6">
                <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                  <DollarSign className="w-8 h-8 text-primary" />
                  Your Estimated Cost: <span className="text-primary">${estimate.toLocaleString()}</span>
                </h3>
                <p className="text-sm text-muted-foreground">
                  This estimate reflects the **Initial Build Cost + First Year of Hosting** (if applicable) **+ Rush Fee** (if selected), and includes your **Free First-Year Domain** (up to ${DOMAIN_COST_LIMIT}). Final pricing may vary based on domain registration costs over ${DOMAIN_COST_LIMIT} and any additional requirements discussed after submission.
                </p>
              </Card>
            )}

            {/* Payment Terms */}
            <Card className="p-6 border-border bg-card/50 mt-6">
              <h3 className="text-xl font-bold mb-4">Payment Terms & Notes</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>**50% deposit** required on website builds, balance due upon website launch.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Hosting is paid either monthly or annually, based on your selection above.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>All displayed prices are in **USD** and exclude local sales tax (which will be applied to your final invoice).</span>
                </li>
              </ul>
            </Card>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Quote;
