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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { DollarSign, Send, CheckCircle2, Info, Sparkles, Globe } from "lucide-react";

const Quote = () => {
  const location = useLocation();
  const { toast } = useToast();
  const estimateRef = useRef<HTMLDivElement>(null);
  const [calculating, setCalculating] = useState(false);
  const [estimate, setEstimate] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [domainInput, setDomainInput] = useState("");
  const [domainStatus, setDomainStatus] = useState<"idle" | "checking" | "available" | "taken">("idle");

  const [formData, setFormData] = useState({
    companyName: "",
    companyCategory: "",
    email: "",
    phone: "",
    location: "",
    purchaseOption: "",
    planLevel: "",
    needsNewDomain: false,
    domainName: "",
    needsDomainHandling: false,
    existingWebsite: "",
    businessUrl: "",
    deliverySpeed: "standard",
    companyOverview: "",
    services: "",
    specialRequirements: "",
  });

  useEffect(() => {
    const state = location.state as { plan?: string } | null;
    if (state?.plan) {
      setFormData(prev => ({
        ...prev,
        planLevel: state.plan,
        purchaseOption: "prepay-12months"
      }));
    }
  }, [location.state]);

  const getPricing = (planLevel: string) => {
    const pricing = {
      Starter: { monthly: 39, annual: 468, build: 349 },
      Business: { monthly: 69, annual: 828, build: 599 },
      Pro: { monthly: 99, annual: 1188, build: 999 }
    };
    return pricing[planLevel as keyof typeof pricing] || { monthly: 0, annual: 0, build: 0 };
  };

  const getDeliveryDetails = () => {
    const details: any = {
      Starter: { standard: "5-7 business days", rush: { days: "3 days", fee: 199 } },
      Business: { standard: "7-10 business days", rush: { days: "5 days", fee: 299 } },
      Pro: { standard: "10-14 business days", rush: { days: "7 days", fee: 399 } }
    };
    return details[formData.planLevel] || { standard: "TBD", rush: { days: "TBD", fee: 0 } };
  };

  const handleDomainCheck = () => {
    if (!domainInput.trim()) return;
    
    setDomainStatus("checking");
    
    // Simulate check - replace with real API
    setTimeout(() => {
      const available = Math.random() > 0.3;
      setDomainStatus(available ? "available" : "taken");
      if (available) {
        setFormData({ ...formData, domainName: domainInput });
      }
    }, 1200);
  };

  const calculateEstimate = () => {
    if (!formData.planLevel || !formData.purchaseOption) {
      toast({
        title: "Missing Information",
        description: "Please select both a plan and purchase option.",
        variant: "destructive"
      });
      return;
    }

    setCalculating(true);
    
    setTimeout(() => {
      const pricing = getPricing(formData.planLevel);
      let buildCost = 0;
      let hostingCost = 0;
      let rushFee = 0;
      let domainFee = 0;
      let savings = 0;

      if (formData.purchaseOption === "website-only") {
        buildCost = pricing.build;
      } else if (formData.purchaseOption === "hosting-only") {
        hostingCost = pricing.annual;
      } else if (formData.purchaseOption === "prepay-6months") {
        buildCost = pricing.build * 0.5;
        hostingCost = pricing.monthly * 6;
        savings = pricing.build * 0.5;
      } else if (formData.purchaseOption === "prepay-12months") {
        buildCost = 0;
        hostingCost = pricing.annual;
        savings = pricing.build;
      }

      if (formData.deliverySpeed === "rush" && formData.purchaseOption !== "hosting-only") {
        rushFee = getDeliveryDetails().rush.fee;
      }

      if (formData.needsDomainHandling) {
        domainFee = 18;
      }

      const total = buildCost + hostingCost + rushFee + domainFee;

      setEstimate({ buildCost, hostingCost, rushFee, domainFee, savings, total });
      setCalculating(false);
      
      setTimeout(() => {
        estimateRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }, 800);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key as keyof typeof formData].toString());
      });
      if (estimate) formDataToSend.append('estimate', JSON.stringify(estimate));

      await fetch('/send_quote.php', { method: 'POST', body: formDataToSend });
      
      setShowSuccessMessage(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send quote. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccessMessage) {
    return (
      <div className="container mx-auto px-6 py-32">
        <div className="max-w-3xl mx-auto">
          <Card className="p-12 border-2 border-primary bg-primary/5">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20">
                <CheckCircle2 className="w-12 h-12 text-primary" />
              </div>
              <h1 className="text-4xl font-bold">Quote Request Received!</h1>
              <p className="text-lg text-muted-foreground">
                We've received your request and will respond within 24 hours.
              </p>
              
              <div className="space-y-4 text-left max-w-xl mx-auto pt-6">
                <h3 className="font-bold text-lg mb-3">What Happens Next:</h3>
                
                {[
                  { num: "1", title: "Review & Questions (24 hrs)", desc: "We'll review and reach out if we need clarification." },
                  { num: "2", title: "Proposal (48 hrs)", desc: "Exact pricing, timeline, and payment link via email." },
                  { num: "3", title: "50% Deposit", desc: "Pay deposit to begin. We start immediately." },
                  { num: "4", title: "First Draft", desc: "Review and request revisions." },
                  { num: "5", title: "Launch!", desc: "Final payment, approval, and we handle setup." }
                ].map(step => (
                  <div key={step.num} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="font-bold text-primary text-sm">{step.num}</span>
                    </div>
                    <div>
                      <strong className="block">{step.title}</strong>
                      <span className="text-sm text-muted-foreground">{step.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-border">
                <p className="font-semibold">Check: <span className="text-primary">{formData.email}</span></p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-32 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Get Your Free Quote</h1>
        <p className="text-lg text-muted-foreground mb-4">
          Tell us about your project and get an instant estimate
        </p>
        <Alert className="max-w-2xl mx-auto bg-primary/5 border-primary/20">
          <Sparkles className="h-4 w-4 text-primary" />
          <AlertDescription className="text-sm">
            <strong>Tip:</strong> More details = better first draft. We'll clarify before starting!
          </AlertDescription>
        </Alert>
      </div>

      <Card className="p-8 border-border mb-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">1</span>
              Contact Information
            </h3>
            
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Company Name *</Label>
                  <Input required value={formData.companyName} onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} placeholder="Your Company" />
                </div>
                
                <div>
                  <Label>Business Type *</Label>
                  <Select value={formData.companyCategory} onValueChange={(v) => setFormData({ ...formData, companyCategory: v })} required>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="services">Services</SelectItem>
                      <SelectItem value="tech">Technology</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="restaurant">Restaurant</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Email *</Label>
                  <Input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="you@company.com" />
                  <p className="text-xs text-muted-foreground mt-1">We'll send your proposal here</p>
                </div>
                
                <div>
                  <Label>Phone *</Label>
                  <Input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="(123) 456-7890" />
                </div>
              </div>

              <div>
                <Label>Location *</Label>
                <Input required value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} placeholder="City, Province/State" />
                <p className="text-xs text-muted-foreground mt-1">Helps with local SEO</p>
              </div>
            </div>
          </div>

          {/* Package */}
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">2</span>
              Choose Your Package
            </h3>

            <div className="space-y-4">
              <div>
                <Label>Payment Option *</Label>
                <Select value={formData.purchaseOption} onValueChange={(v) => setFormData({ ...formData, purchaseOption: v })} required>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="prepay-12months">💰 Prepay 12 Months = FREE Build (Best Value!)</SelectItem>
                    <SelectItem value="prepay-6months">⭐ Prepay 6 Months = 50% Off Build</SelectItem>
                    <SelectItem value="website-only">🌐 Website Only (I'll handle hosting)</SelectItem>
                    <SelectItem value="hosting-only">🖥️ Hosting Only (I have a website)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Plan Level *</Label>
                <Select value={formData.planLevel} onValueChange={(v) => setFormData({ ...formData, planLevel: v })} required>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Starter">🟢 Starter - 3 pages</SelectItem>
                    <SelectItem value="Business">🔵 Business - 6 pages ⭐ Popular</SelectItem>
                    <SelectItem value="Pro">🔴 Pro - 9 pages</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.planLevel && (
                <Card className="p-4 bg-muted/30">
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between"><span className="text-muted-foreground">Build:</span><span className="font-semibold">${getPricing(formData.planLevel).build}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Hosting:</span><span className="font-semibold">${getPricing(formData.planLevel).monthly}/mo</span></div>
                  </div>
                </Card>
              )}
            </div>
          </div>

          {/* Domain */}
          {formData.purchaseOption && formData.purchaseOption !== "hosting-only" && (
            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">3</span>
                Domain Setup
              </h3>

              <div className="space-y-4">
                <div>
                  <Label>Do you have a domain? *</Label>
                  <Select value={formData.existingWebsite} onValueChange={(v) => { setFormData({ ...formData, existingWebsite: v, needsNewDomain: v === "no" }); setDomainStatus("idle"); }} required>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no">No - I need one</SelectItem>
                      <SelectItem value="yes">Yes - I have one</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.existingWebsite === "yes" && (
                  <div>
                    <Label>Your Domain *</Label>
                    <Input required value={formData.businessUrl} onChange={(e) => setFormData({ ...formData, businessUrl: e.target.value })} placeholder="yourdomain.com" />
                  </div>
                )}

                {formData.needsNewDomain && (
                  <div className="space-y-4">
                    <div>
                      <Label>Check Availability</Label>
                      <div className="flex gap-2">
                        <Input value={domainInput} onChange={(e) => setDomainInput(e.target.value)} placeholder="yourbusiness.com" />
                        <Button type="button" onClick={handleDomainCheck} disabled={domainStatus === "checking"}>
                          {domainStatus === "checking" ? "..." : "Check"}
                        </Button>
                      </div>
                      
                      {domainStatus === "available" && (
                        <div className="mt-2 p-3 bg-green-500/10 border border-green-500/20 rounded-md">
                          <p className="text-sm text-green-600 dark:text-green-400 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" /> <strong>{domainInput}</strong> is available!
                          </p>
                        </div>
                      )}
                      
                      {domainStatus === "taken" && (
                        <div className="mt-2 p-3 bg-red-500/10 border border-red-500/20 rounded-md">
                          <p className="text-sm text-red-600 dark:text-red-400">
                            <strong>{domainInput}</strong> is not available. Try another.
                          </p>
                        </div>
                      )}
                    </div>

                    {domainStatus === "available" && (
                      <div className="flex items-start space-x-3 p-4 bg-muted/50 rounded-lg border">
                        <Checkbox id="needsDomainHandling" checked={formData.needsDomainHandling} onCheckedChange={(c) => setFormData({ ...formData, needsDomainHandling: c as boolean })} />
                        <div>
                          <Label htmlFor="needsDomainHandling" className="cursor-pointer font-semibold">Register for me (+$18 fee)</Label>
                          <p className="text-xs text-muted-foreground">We'll buy and set up {domainInput}. Domain cost ($15-35/yr) added to invoice.</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Timeline */}
          {formData.planLevel && formData.purchaseOption && formData.purchaseOption !== "hosting-only" && (
            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">4</span>
                Timeline
              </h3>

              <div className="space-y-4">
                <div>
                  <Label>Delivery Speed *</Label>
                  <Select value={formData.deliverySpeed} onValueChange={(v) => setFormData({ ...formData, deliverySpeed: v })} required>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard ({getDeliveryDetails().standard}) - Included</SelectItem>
                      <SelectItem value="rush">Rush ({getDeliveryDetails().rush.days}) - +${getDeliveryDetails().rush.fee}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Alert className="bg-primary/5 border-primary/20">
                  <Info className="h-4 w-4 text-primary" />
                  <AlertDescription className="text-sm">
                    Timeline starts when we receive your content (text, photos, logo).
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          )}

          {/* About Business */}
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">5</span>
              About Your Business
            </h3>

            <div className="space-y-4">
              <div>
                <Label>Company Overview *</Label>
                <Textarea required value={formData.companyOverview} onChange={(e) => setFormData({ ...formData, companyOverview: e.target.value })} placeholder="What do you do? What makes you unique?" rows={5} />
                <p className="text-xs text-muted-foreground mt-1">Helps us write compelling copy</p>
              </div>

              <div>
                <Label>Products/Services *</Label>
                <Textarea required value={formData.services} onChange={(e) => setFormData({ ...formData, services: e.target.value })} placeholder="What should visitors see on your site?" rows={4} />
              </div>

              <div>
                <Label>Special Features</Label>
                <Textarea value={formData.specialRequirements} onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })} placeholder="Booking system? E-commerce? (may incur extra charges)" rows={3} />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-4 pt-4 border-t border-border">
            <Button type="button" variant="outline" onClick={calculateEstimate} disabled={calculating} className="w-full">
              {calculating ? "Calculating..." : "Calculate Estimate"}
            </Button>
            <Button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90">
              <Send className="w-4 h-4 mr-2" />
              {isSubmitting ? "Sending..." : "Get Your Quote"}
            </Button>
          </div>
        </form>
      </Card>

      {/* Estimate */}
      {estimate && (
        <Card ref={estimateRef} className="p-8 border-2 border-primary bg-primary/5 mb-8">
          <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <DollarSign className="w-8 h-8 text-primary" />
            Your Estimate
          </h3>
          <div className="text-5xl font-bold text-primary mb-4">${estimate.total}</div>
          <div className="space-y-2 text-sm">
            {estimate.buildCost > 0 && <div className="flex justify-between"><span>Website Build:</span><span>${estimate.buildCost}</span></div>}
            {estimate.hostingCost > 0 && <div className="flex justify-between"><span>Hosting:</span><span>${estimate.hostingCost}</span></div>}
            {estimate.rushFee > 0 && <div className="flex justify-between"><span>Rush Fee:</span><span>${estimate.rushFee}</span></div>}
            {estimate.domainFee > 0 && <div className="flex justify-between"><span>Domain Handling:</span><span>${estimate.domainFee}</span></div>}
            {estimate.savings > 0 && <div className="flex justify-between text-green-600 dark:text-green-400 font-semibold"><span>You Save:</span><span>${estimate.savings}</span></div>}
          </div>
        </Card>
      )}

      {/* Terms */}
      <Card className="p-6 border-border bg-card/50">
        <h3 className="text-lg font-bold mb-4">Payment Terms</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {[
            "50% deposit required to start",
            "12-month prepay = FREE website build",
            "6-month prepay = 50% off build",
            "Domain costs billed separately"
          ].map(item => (
            <li key={item} className="flex gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default Quote;
