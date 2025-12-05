import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { DollarSign, Send, Upload, CheckCircle2, Mail, Home } from "lucide-react"; // Added Mail and Home icons
import { DomainChecker } from "@/components/DomainChecker";

const Quote = () => {
  const location = useLocation();
  const { toast } = useToast();
  const estimateRef = useRef<HTMLDivElement>(null);
  const [calculating, setCalculating] = useState(false);
  const [estimate, setEstimate] = useState<number | null>(null);
  const [logo, setLogo] = useState<File | null>(null);
  const [domainAvailable, setDomainAvailable] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // NEW STATE: Tracks successful submission to show confirmation message
  const [isSubmitted, setIsSubmitted] = useState(false); 

  const [formData, setFormData] = useState({
    companyName: "",
    companyCategory: "",
    customCategory: "",
    email: "",
    phone: "",
    location: "",
    googleMapsLink: "",
    employees: "",
    existingWebsite: "",
    businessUrl: "",
    serviceCategory: "",
    serviceType: "",
    hostingPlan: "",
    needsDomainAssistance: false,
    domainName: "",
    needsDomainHandling: false,
    hasLogo: "",
    companyOverview: "",
    services: "",
    specialRequirements: "",
    turnaroundTime: "standard",
    colorScheme: "",
  });

  // Pre-populate form from navigation state
  useEffect(() => {
    const state = location.state as { 
      plan?: string; 
      serviceCategory?: string;
      serviceType?: string;
    } | null;
    
    if (state?.plan) {
      const plan = state.plan;
      
      // Handle new plan structure (Starter, Business, Pro)
      if (["Starter", "Business", "Pro"].includes(plan)) {
        setFormData(prev => ({
          ...prev,
          serviceCategory: "bundle",
          serviceType: plan,
          turnaroundTime: getDefaultTurnaround(plan),
        }));
      }
    }
    
    // Handle direct state props
    if (state?.serviceCategory && state?.serviceType) {
      setFormData(prev => ({
        ...prev,
        serviceCategory: state.serviceCategory || prev.serviceCategory,
        serviceType: state.serviceType || prev.serviceType,
      }));
    }
  }, [location.state]);

  // Get default turnaround based on service type
  const getDefaultTurnaround = (serviceType: string) => {
    if (serviceType === "Starter") return "standard";
    if (serviceType === "Pro") return "standard";
    return "standard";
  };

  // Handle plan selection
  const handleWebsitePackageChange = (value: string) => {
    setFormData({ 
      ...formData, 
      serviceType: value,
      turnaroundTime: getDefaultTurnaround(value),
    });
  };

  // Get turnaround options based on service type
  const getTurnaroundOptions = () => {
    const serviceType = formData.serviceType;
    
    if (serviceType === "Starter") {
      return [
        { value: "standard", label: "Standard (5-7 business days)" },
        { value: "rush", label: "Rush (3 days) +$199" },
      ];
    }
    
    if (serviceType === "Business") {
      return [
        { value: "standard", label: "Standard (7-10 business days)" },
        { value: "rush", label: "Rush (5 days) +$299" },
      ];
    }
    
    if (serviceType === "Pro") {
      return [
        { value: "standard", label: "Standard (10-14 business days)" },
        { value: "rush", label: "Rush (7 days) +$399" },
      ];
    }
    
    // Default fallback
    return [
      { value: "standard", label: "Standard (7-10 business days)" },
    ];
  };

  const calculateEstimate = () => {
    setCalculating(true);
    
    setTimeout(() => {
      let buildCost = 0;
      let annualCost = 0;
      
      // New pricing structure based on plan
      if (formData.serviceType === "Starter") {
        buildCost = 349;
        annualCost = 399; // $39/mo * 12 + $51 discount
      } else if (formData.serviceType === "Business") {
        buildCost = 599;
        annualCost = 699; // $69/mo * 12 + $129 discount
      } else if (formData.serviceType === "Pro") {
        buildCost = 999;
        annualCost = 999; // $99/mo * 12 + $189 discount
      }
      
      // Domain handling fee (FIXED to $18)
      if (formData.needsDomainHandling) {
        buildCost += 18; 
      }
      
      // Calculate total (build + first year hosting)
      const total = buildCost + annualCost;
      
      setEstimate(total);
      setCalculating(false);
      
      setTimeout(() => {
        estimateRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
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

    try {
      const formDataToSend = new FormData();
      
      // Add all form fields
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key as keyof typeof formData].toString());
      });
      
      // Add logo if uploaded
      if (logo) {
        formDataToSend.append('logo', logo);
      }
      
      // Add estimate if calculated
      if (estimate !== null) {
        formDataToSend.append('estimate', estimate.toString());
      }

      // Simulate API call for demonstration
      await new Promise(resolve => setTimeout(resolve, 1500)); 
      
      // SUCCESS LOGIC: 
      // In a real app, you'd check response.ok and then:
      // const response = await fetch('/send_quote.php', { /* ... */ });
      // const result = await response.json();
      // if (result.success) {
        toast({
          title: "Quote Request Sent!",
          description: "We've received your request and will follow up shortly.",
        });
        // Set success state to show confirmation message
        setIsSubmitted(true); 
      // } else {
      //    throw new Error(result.message || 'Failed to send quote request');
      // }
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send quote request. Please try again or contact us directly.",
        variant: "destructive",
      });
      console.error('Error sending quote:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleServiceCategoryChange = (value: string) => {
    setFormData({ 
      ...formData, 
      serviceCategory: value,
      serviceType: "",
      hostingPlan: "",
      turnaroundTime: "standard",
    });
  };

  // NEW CONDITIONAL RETURN FOR CONFIRMATION MESSAGE
  if (isSubmitted) {
    return (
      <div className="container mx-auto px-6 py-32">
        <div className="max-w-xl mx-auto text-center">
          <CheckCircle2 className="w-20 h-20 text-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
            Thank You for Your Submission!
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Your quote request has been successfully submitted. We've received the details and will be in touch with a detailed proposal within **24 hours**.
          </p>
          <div className="space-y-4">
            <Button className="w-full sm:w-auto" asChild>
              <a href="/contact">
                <Mail className="w-4 h-4 mr-2" />
                Contact Us Directly
              </a>
            </Button>
            <Button className="w-full sm:w-auto" variant="outline" asChild>
              <a href="/">
                <Home className="w-4 h-4 mr-2" />
                Back to Homepage
              </a>
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="restaurant">Restaurant/Food</SelectItem>
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


            <div>
              <Label htmlFor="serviceType">Select Plan *</Label>
              <Select
                value={formData.serviceType}
                onValueChange={handleWebsitePackageChange}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Starter">🟢 Starter - $39/mo (3 pages, $349 build)</SelectItem>
                  <SelectItem value="Business">🔵 Business - $69/mo (up to 6 pages, $599 build) ⭐ Popular</SelectItem>
                  <SelectItem value="Pro">🔴 Pro - $99/mo (up to 9 pages, $999 build)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="needsDomainAssistance"
                  checked={formData.needsDomainAssistance}
                  onCheckedChange={(checked) => {
                    setFormData({ 
                      ...formData, 
                      needsDomainAssistance: checked as boolean,
                      domainName: checked ? formData.domainName : "",
                      needsDomainHandling: checked ? formData.needsDomainHandling : false
                    });
                    if (!checked) {
                      setDomainAvailable(null);
                    }
                  }}
                />
                <Label htmlFor="needsDomainAssistance" className="cursor-pointer">
                  I need domain registration assistance
                </Label>
              </div>
            </div>

            {formData.needsDomainAssistance && (
              <div>
                <Label>Check Domain Availability</Label>
                <div className="mt-2">
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
                </div>
                {formData.domainName && domainAvailable && (
                  <div className="mt-3 p-3 bg-primary/10 rounded-md border border-primary/20">
                    <p className="text-sm text-primary flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      Selected domain: <strong>{formData.domainName}</strong>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Domain purchase cost varies depending on the domain.
                    </p>
                  </div>
                )}
              </div>
            )}

            {formData.needsDomainAssistance && formData.domainName && domainAvailable && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="needsDomainHandling"
                    checked={formData.needsDomainHandling}
                    onCheckedChange={(checked) => setFormData({ ...formData, needsDomainHandling: checked as boolean })}
                  />
                  <Label htmlFor="needsDomainHandling" className="cursor-pointer">
                    I need help with domain registration process (+$18 handling fee)
                  </Label>
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="existingWebsite">Do you have an existing website?</Label>
              <Select
                value={formData.existingWebsite}
                onValueChange={(value) => setFormData({ ...formData, existingWebsite: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.existingWebsite === "yes" && (
              <div>
                <Label htmlFor="businessUrl">Website URL or Google Business Link</Label>
                <Input
                  id="businessUrl"
                  value={formData.businessUrl}
                  onChange={(e) => setFormData({ ...formData, businessUrl: e.target.value })}
                  placeholder="https://yourwebsite.com"
                />
              </div>
            )}

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

            {(formData.serviceCategory === "website" || formData.serviceCategory === "bundle") && formData.serviceType && (
              <div>
                <Label htmlFor="turnaroundTime">Desired Turnaround Time</Label>
                <Select
                  value={formData.turnaroundTime}
                  onValueChange={(value) => setFormData({ ...formData, turnaroundTime: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    {getTurnaroundOptions().map(option => (
                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={calculateEstimate}
                disabled={!formData.serviceType || calculating}
                className="w-full"
              >
                {calculating ? "Calculating..." : "Calculate Estimate"}
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
          </form>
        </Card>

        {estimate !== null && (
          <Card ref={estimateRef} className="p-8 border-2 border-primary bg-primary/5 mb-8">
            <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <DollarSign className="w-8 h-8 text-primary" />
              Your Estimated Cost
            </h3>
            <div className="text-5xl font-bold text-primary mb-4">
              ${estimate}
            </div>
            <p className="text-muted-foreground mb-6">
              Total estimated cost based on your selections. Final pricing may vary based on domain registration costs and any additional requirements.
            </p>
          </Card>
        )}

        {/* Payment Terms */}
        <Card className="p-6 border-border bg-card/50">
          <h3 className="text-xl font-bold mb-4">Payment Terms & Notes</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <span>50% deposit required on website builds, balance due on launch</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <span>Hosting billed annually in advance</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <span>Domain registration cost billed separately based on domain extension</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <span>All prices in USD</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default Quote;
