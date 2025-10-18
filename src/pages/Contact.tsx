import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Send, DollarSign } from "lucide-react";
import { DomainChecker } from "@/components/DomainChecker";

const Contact = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [calculating, setCalculating] = useState(false);
  const [estimate, setEstimate] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    companyName: "",
    companyCategory: "",
    email: "",
    phone: "",
    location: "",
    employees: "",
    existingWebsite: "",
    businessUrl: "",
    serviceType: location.state?.plan || "",
    needsHosting: false,
    domainName: "",
    needsDomain: false,
    hasLogo: "",
    companyOverview: "",
    services: "",
    specialRequirements: "",
    turnaroundTime: "standard",
  });

  const calculateEstimate = () => {
    setCalculating(true);
    
    setTimeout(() => {
      let total = 0;
      
      // Base price based on service type
      if (formData.serviceType.includes("Basic")) total += 249;
      else if (formData.serviceType.includes("Standard")) total += 499;
      else if (formData.serviceType.includes("Premium")) total += 749;
      else if (formData.serviceType.includes("Custom")) total += 999;
      else total += 249; // default
      
      // Hosting
      if (formData.needsHosting) {
        total += 129; // 1 year basic hosting
      }
      
      // Domain
      if (formData.needsDomain) {
        total += 25; // domain + handling
      }
      
      // Rush delivery
      if (formData.turnaroundTime === "rush") {
        total += 150;
      }
      
      setEstimate(total);
      setCalculating(false);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Quote Request Sent!",
      description: "We'll get back to you within 24 hours with a detailed proposal.",
    });
    
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <div className="container mx-auto px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Get Your Free Quote</h1>
            <p className="text-lg text-muted-foreground">
              Fill out the form below and get an instant estimate for your project
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <Card className="p-6 border-border">
                <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-medium">Email</div>
                      <a href="mailto:hello@darkmesa.com" className="text-sm text-muted-foreground hover:text-primary">
                        hello@darkmesa.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-medium">Phone</div>
                      <a href="tel:+1234567890" className="text-sm text-muted-foreground hover:text-primary">
                        (123) 456-7890
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-medium">Location</div>
                      <div className="text-sm text-muted-foreground">Remote & Global</div>
                    </div>
                  </div>
                </div>
              </Card>

              {estimate !== null && (
                <Card className="p-6 border-2 border-primary bg-primary/5">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <DollarSign className="w-6 h-6 text-primary" />
                    Your Estimate
                  </h3>
                  <div className="text-4xl font-bold text-primary mb-2">
                    ${estimate}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Total estimated cost based on your selections
                  </p>
                </Card>
              )}
            </div>

            {/* Quote Form */}
            <Card className="lg:col-span-2 p-8 border-border">
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
                      onValueChange={(value) => setFormData({ ...formData, companyCategory: value })}
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
                </div>

                <div>
                  <Label htmlFor="serviceType">Select Service Package *</Label>
                  <Select
                    value={formData.serviceType}
                    onValueChange={(value) => setFormData({ ...formData, serviceType: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a package" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Basic One-Pager">Basic One-Pager - $249</SelectItem>
                      <SelectItem value="Standard Multi-Page">Standard Multi-Page - $499</SelectItem>
                      <SelectItem value="Premium Multi-Page">Premium Multi-Page - $749</SelectItem>
                      <SelectItem value="Custom Enterprise">Custom Enterprise - $999+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="needsHosting"
                      checked={formData.needsHosting}
                      onCheckedChange={(checked) => setFormData({ ...formData, needsHosting: checked as boolean })}
                    />
                    <Label htmlFor="needsHosting" className="cursor-pointer">
                      I need hosting (+$129/year for basic hosting)
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="needsDomain"
                      checked={formData.needsDomain}
                      onCheckedChange={(checked) => setFormData({ ...formData, needsDomain: checked as boolean })}
                    />
                    <Label htmlFor="needsDomain" className="cursor-pointer">
                      I need help with domain registration (+$25 handling fee)
                    </Label>
                  </div>
                </div>

                {formData.needsDomain && (
                  <div>
                    <Label>Check Domain Availability</Label>
                    <div className="mt-2">
                      <DomainChecker />
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
                  <Label htmlFor="hasLogo">Do you have a logo?</Label>
                  <Select
                    value={formData.hasLogo}
                    onValueChange={(value) => setFormData({ ...formData, hasLogo: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes, I have a logo</SelectItem>
                      <SelectItem value="no">No, I need a logo ($75 add-on)</SelectItem>
                    </SelectContent>
                  </Select>
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
                  />
                </div>

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
                      <SelectItem value="standard">Standard (5-7 days)</SelectItem>
                      <SelectItem value="rush">Rush (2-3 days) +$150</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

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
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Submit Quote Request
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
