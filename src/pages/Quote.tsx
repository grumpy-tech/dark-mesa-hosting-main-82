import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { DollarSign, Send, CheckCircle2, Mail, Home, AlertTriangle } from "lucide-react";
import { DomainChecker } from "@/components/DomainChecker";
import { useToast } from "@/hooks/use-toast";

type PrepayOption = "" | "6months" | "12months";
type ServiceType = "build" | "hosting" | "bundle";

const Quote: React.FC = () => {
  const { toast } = useToast();
  const estimateRef = useRef<HTMLDivElement | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [calculating, setCalculating] = useState(false);
  const [estimate, setEstimate] = useState<number | null>(null);
  const [estimateBreakdown, setEstimateBreakdown] = useState<Record<string, number>>({});
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [domainAvailable, setDomainAvailable] = useState<boolean | null>(null);

  // Default prepay to 12 months per request
  const [form, setForm] = useState({
    companyName: "",
    email: "",
    phone: "",
    location: "",
    googleMapsLink: "",
    employees: "",
    existingWebsite: "no",
    businessUrl: "",
    companyOverview: "",
    servicesOffered: "",
    specialRequirements: "",
    colorScheme: "",
    competitors: "",
    industry: "", // e.g., healthcare, finance, legal, retail, other
    analyticsOptIn: false,
    serviceType: "bundle" as ServiceType, // build | hosting | bundle
    planTier: "Starter", // Starter | Business | Pro
    hostingTier: "monthly", // monthly | annual (kept for UI clarity)
    prepayOption: "12months" as PrepayOption, // default to 12 months
    needsDomain: false,
    domainName: "",
    needsDomainHandling: false,
    turnaroundTime: "standard", // standard | rush (selected timeline chooses rush fee)
  });

  // Turnaround table & rush fees mapping (from earlier spec)
  const turnaroundMap = {
    Starter: { standard: { label: "5–7 business days", fee: 0 }, rush: { label: "3 days", fee: 199 } },
    Business: { standard: { label: "7–10 business days", fee: 0 }, rush: { label: "5 days", fee: 299 } },
    Pro: { standard: { label: "10–14 business days", fee: 0 }, rush: { label: "7 days", fee: 399 } },
  } as const;

  // Pricing base numbers
  const buildPrices: Record<string, number> = { Starter: 349, Business: 599, Pro: 999 };
  const monthlyHosting: Record<string, number> = { Starter: 39, Business: 69, Pro: 99 };

  useEffect(() => {
    // Ensure prepay default is 12 months each time page mounts
    setForm((f) => ({ ...f, prepayOption: "12months" }));
  }, []);

  // Helpers
  const update = (partial: Partial<typeof form>) => setForm((f) => ({ ...f, ...partial }));

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setLogoFile(e.target.files[0]);
  };

  // DomainChecker callback - assumes DomainChecker calls with (domain, available)
  const onDomainSelect = (domain: string, available: boolean) => {
    update({ domainName: domain });
    setDomainAvailable(available);
  };

  // Calculate estimate with breakdown
  const calculateEstimate = () => {
    setCalculating(true);

    setTimeout(() => {
      const tier = form.planTier;
      const buildBase = buildPrices[tier] ?? 0;
      const hostMonthly = monthlyHosting[tier] ?? 0;

      // By default hosting cost we show as a paid upfront amount depending on prepay
      let buildCost = buildBase;
      let hostingPrepayAmount = 0;
      let hostingOngoingMonthly = 0;

      // Prepay handling:
      if (form.prepayOption === "6months") {
        // Prepay 6 months of hosting now, get 50% off build
        hostingPrepayAmount = hostMonthly * 6;
        buildCost = Math.round(buildCost * 0.5);
        hostingOngoingMonthly = hostMonthly; // after the 6-month prepaid period, they'd pay monthly
      } else if (form.prepayOption === "12months") {
        // Prepay full year now, get free build
        hostingPrepayAmount = hostMonthly * 12;
        buildCost = 0;
        hostingOngoingMonthly = hostMonthly; // after year, they'd renew
      } else {
        // No prepay: assume paying monthly, estimate will show first month
        hostingPrepayAmount = hostMonthly; // first month only
        hostingOngoingMonthly = hostMonthly;
      }

      // Service type logic
      if (form.serviceType === "hosting") {
        // Hosting only: buildCost 0
        buildCost = 0;
      } else if (form.serviceType === "build") {
        // Build only: hosting prepay 0 (no hosting selected)
        hostingPrepayAmount = 0;
        hostingOngoingMonthly = 0;
      } else if (form.serviceType === "bundle") {
        // bundle already accounted for by prepayOption above
      }

      // Rush fee depending on selected turnaroundTime
      const rushFee = form.turnaroundTime === "rush" ? turnaroundMap[tier].rush.fee : 0;

      // Domain handling: per your earlier preference, first-year domain free if 12-month prepay
      let domainCost = 0;
      if (form.needsDomain) {
        // If they selected prepay 12 months (free build) we still include domain cost as $0 first year per your offer
        if (form.prepayOption === "12months") domainCost = 0;
        else domainCost = 0; // we treat first-year domain as free always per earlier instruction; keep $0 here
      }
      // Additional handling fee option if they ticked needsDomainHandling (you used $18 earlier, but you said remove separate handling fee earlier — keep optional)
      let domainHandlingFee = form.needsDomainHandling ? 18 : 0;

      // Final total (amount due now)
      // Define what "now" means: for prepay, the hosting prepay amount + buildCost + rushFee + domainHandlingFee
      const totalNow = Math.round(buildCost + hostingPrepayAmount + rushFee + domainHandlingFee + domainCost);

      // Breakdown object
      const breakdown: Record<string, number> = {
        buildCost,
        hostingPrepayAmount,
        rushFee,
        domainHandlingFee,
        domainCost,
      };

      setEstimateBreakdown(breakdown);
      setEstimate(totalNow);
      setCalculating(false);

      setTimeout(() => {
        estimateRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 120);
    }, 500);
  };

  // Submit form to send_quote.php (multipart/form-data)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic required validation
    if (!form.companyName || !form.email || !form.companyOverview) {
      toast({ title: "Please fill required fields", description: "Company name, email, and company overview are required.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();

      // Append all form fields as strings
      Object.entries(form).forEach(([k, v]) => {
        formData.append(k, String((v as any) ?? ""));
      });

      // Append estimate & breakdown for your review
      formData.append("estimate", estimate !== null ? String(estimate) : "Not calculated");
      formData.append("estimateBreakdown", JSON.stringify(estimateBreakdown));

      // Logo file
      if (logoFile) formData.append("logo", logoFile);

      // Post to your PHP endpoint
      const resp = await fetch("/send_quote.php", {
        method: "POST",
        body: formData,
      });

      const json = await resp.json();

      if (resp.ok && json.success) {
        toast({ title: "Quote request sent", description: "We received your request and will review it within 24 hours." });
        setIsSubmitted(true);
      } else {
        toast({ title: "Error sending", description: json.message || "Failed to send quote request", variant: "destructive" });
      }
    } catch (err) {
      console.error(err);
      toast({ title: "Network error", description: "Failed to send quote request", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  // UI helpers
  const showIndustryWarning = (industry: string) => {
    const regulated = ["healthcare", "medical", "finance", "legal", "financial", "health"];
    return industry && regulated.includes(industry.toLowerCase());
  };

  if (isSubmitted) {
    // Final confirmation message specified earlier in the spec
    return (
      <div className="container mx-auto px-6 py-32">
        <div className="max-w-xl mx-auto text-center">
          <CheckCircle2 className="w-20 h-20 text-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">Quote Successfully Submitted!</h1>
          <p className="text-lg text-muted-foreground mb-4">
            Thank you for your request! We’ve received your project details and will personally review everything within the next 24 hours.
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            Before any work begins, we may reach out to clarify details. Once everything is confirmed, you will receive a secure payment link for your <strong>50% deposit</strong>, which officially locks in your project and starts your production timeline.
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            <strong>Important:</strong> Your project timeline begins the business day after both your deposit and all required initial content (text, photos, and logo) are received.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild><a href="/contact"><Mail className="w-4 h-4 mr-2" /> Contact Us</a></Button>
            <Button variant="outline" asChild><a href="/"><Home className="w-4 h-4 mr-2" /> Back to Homepage</a></Button>
          </div>
        </div>
      </div>
    );
  }

  // Main form render
  return (
    <div className="container mx-auto px-6 py-16 max-w-4xl">
      <Card className="p-8">
        <h2 className="text-3xl font-bold mb-4">Get Your Free Quote</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Fill out the form below. The more detail you give, the closer your first draft will be to your vision.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Company */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Company Name *</Label>
              <Input value={form.companyName} onChange={(e) => update({ companyName: e.target.value })} required />
            </div>
            <div>
              <Label>Email *</Label>
              <Input type="email" value={form.email} onChange={(e) => update({ email: e.target.value })} required />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Phone *</Label>
              <Input value={form.phone} onChange={(e) => update({ phone: e.target.value })} required />
            </div>
            <div>
              <Label>Location</Label>
              <Input value={form.location} onChange={(e) => update({ location: e.target.value })} placeholder="City, Province/State" />
            </div>
          </div>

          <div>
            <Label>Google Maps Link (optional)</Label>
            <Input value={form.googleMapsLink} onChange={(e) => update({ googleMapsLink: e.target.value })} placeholder="https://maps.google.com/..." />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Number of Employees</Label>
              <Input value={form.employees} onChange={(e) => update({ employees: e.target.value })} placeholder="e.g., 1-10" />
            </div>
            <div>
              <Label>Existing Website?</Label>
              <Select onValueChange={(v) => update({ existingWebsite: v })} value={form.existingWebsite}>
                <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="no">No</SelectItem>
                  <SelectItem value="yes">Yes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {form.existingWebsite === "yes" && (
            <div>
              <Label>Current Website URL</Label>
              <Input value={form.businessUrl} onChange={(e) => update({ businessUrl: e.target.value })} placeholder="https://yourwebsite.com" />
            </div>
          )}

          {/* Important message */}
          <div className="bg-primary/5 border border-primary/20 p-4 rounded-md text-sm">
            <strong>Important:</strong> The more detailed information you provide now, the closer your first draft will match your vision — saving time and revisions.
          </div>

          {/* Company overview */}
          <div>
            <Label>Company Overview *</Label>
            <Textarea
              value={form.companyOverview}
              onChange={(e) => update({ companyOverview: e.target.value })}
              required
              placeholder="Describe your business, customers, and what makes you different..."
              rows={4}
            />
          </div>

          <div>
            <Label>Products / Services Offered</Label>
            <Textarea value={form.servicesOffered} onChange={(e) => update({ servicesOffered: e.target.value })} rows={3} placeholder="List your main services or products..." />
          </div>

          <div>
            <Label>Special Requirements or Features</Label>
            <Textarea value={form.specialRequirements} onChange={(e) => update({ specialRequirements: e.target.value })} rows={3} placeholder="Booking, e-commerce, integrations, multilingual, etc." />
            <p className="text-xs text-muted-foreground mt-1">Note: Special requirements may include further charges.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Preferred Color Scheme</Label>
              <Input value={form.colorScheme} onChange={(e) => update({ colorScheme: e.target.value })} placeholder="e.g., Blue & white, dark theme" />
            </div>
            <div>
              <Label>Competitor Websites / Inspiration</Label>
              <Textarea value={form.competitors} onChange={(e) => update({ competitors: e.target.value })} rows={2} placeholder="Paste 1–3 links or describe styles you like" />
            </div>
          </div>

          {/* Industry & compliance */}
          <div>
            <Label>Industry (optional)</Label>
            <Select onValueChange={(v) => update({ industry: v })} value={form.industry}>
              <SelectTrigger><SelectValue placeholder="Select industry" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="">None / Other</SelectItem>
                <SelectItem value="retail">Retail</SelectItem>
                <SelectItem value="services">Services</SelectItem>
                <SelectItem value="healthcare">Healthcare / Medical</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="legal">Legal</SelectItem>
                <SelectItem value="restaurant">Restaurant / Food</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>

            {showIndustryWarning(form.industry) && (
              <div className="mt-2 p-3 rounded-md bg-yellow-50 border border-yellow-200 text-sm flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <strong>Industry Compliance Notice:</strong> Because you selected a regulated industry, we may need special safeguards (e.g., HIPAA / PHIPA, PCI, financial disclosure). We will not provide legal advice — you are responsible for compliance. We will implement technical safeguards on request.
                </div>
              </div>
            )}
          </div>

          {/* Analytics opt-in */}
          <div className="flex items-center gap-2">
            <Checkbox checked={form.analyticsOptIn} onCheckedChange={(c) => update({ analyticsOptIn: !!c })} id="analyticsOptIn" />
            <Label htmlFor="analyticsOptIn" className="cursor-pointer">Opt in to add Google Analytics & conversion tracking (we’ll only install after consent)</Label>
          </div>

          {/* Service selection / plan / prepay */}
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label>Service Type</Label>
              <Select value={form.serviceType} onValueChange={(v) => update({ serviceType: v as ServiceType })}>
                <SelectTrigger><SelectValue placeholder="Select service type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="build">Web Build Only</SelectItem>
                  <SelectItem value="hosting">Hosting Only</SelectItem>
                  <SelectItem value="bundle">Bundle (Build + Hosting)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Plan Tier</Label>
              <Select value={form.planTier} onValueChange={(v) => update({ planTier: v })}>
                <SelectTrigger><SelectValue placeholder="Starter, Business, Pro" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Starter">Starter (3 pages)</SelectItem>
                  <SelectItem value="Business">Business (up to 6 pages)</SelectItem>
                  <SelectItem value="Pro">Pro (up to 9 pages)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Turnaround</Label>
              <Select value={form.turnaroundTime} onValueChange={(v) => update({ turnaroundTime: v })}>
                <SelectTrigger><SelectValue placeholder="Select timeline" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">{turnaroundMap[form.planTier]?.standard.label ?? "Standard"}</SelectItem>
                  <SelectItem value="rush">{turnaroundMap[form.planTier]?.rush.label ?? "Rush"}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Prepay toggle (default 12 months) */}
          <div className="mt-2">
            <div className="flex items-center gap-2">
              <Checkbox checked={form.prepayOption !== ""} onCheckedChange={(c) => update({ prepayOption: c ? "12months" : "" })} id="prepayToggle" />
              <Label htmlFor="prepayToggle" className="cursor-pointer">Prepay hosting to unlock website discounts</Label>
            </div>

            {form.prepayOption !== "" && (
              <div className="mt-2">
                <Select value={form.prepayOption} onValueChange={(v) => update({ prepayOption: v as PrepayOption })}>
                  <SelectTrigger><SelectValue placeholder="Choose prepay" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6months">Prepay 6 months → 50% off website build</SelectItem>
                    <SelectItem value="12months">Prepay 12 months → Website build FREE (default)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">Default selection is 12 months (website build included).</p>
              </div>
            )}
          </div>

          {/* Domain */}
          <div>
            <div className="flex items-center gap-2">
              <Checkbox checked={form.needsDomain} onCheckedChange={(c) => update({ needsDomain: !!c })} id="needsDomain" />
              <Label htmlFor="needsDomain" className="cursor-pointer">Do you need a new domain name for this project?</Label>
            </div>

            {form.needsDomain && (
              <>
                <p className="text-xs text-muted-foreground mt-2">We register any available domain up to $20 free for the first year. You own the domain 100% and can transfer it anytime. Year 2 renewal is typically $18–$22/year depending on extension.</p>

                <div className="mt-3">
                  <DomainChecker onDomainSelect={onDomainSelect} />
                </div>

                <div className="mt-2 flex items-center gap-2">
                  <Checkbox checked={form.needsDomainHandling} onCheckedChange={(c) => update({ needsDomainHandling: !!c })} id="domainHandling" />
                  <Label htmlFor="domainHandling" className="cursor-pointer">I need help with domain registration process (+$18 handling fee)</Label>
                </div>

                {form.domainName && domainAvailable && (
                  <div className="mt-2 p-3 rounded-md bg-primary/10 border border-primary/20 text-sm">
                    <strong>Selected domain:</strong> {form.domainName} — available for registration.
                  </div>
                )}
              </>
            )}
          </div>

          {/* Logo upload */}
          <div>
            <Label>Upload Logo (optional)</Label>
            <Input type="file" accept="image/*" onChange={handleLogoUpload} />
            <p className="text-xs text-muted-foreground mt-1">If you don't have one, we can discuss logo options during consultation.</p>
          </div>

          {/* Analytics opt-in text displayed again before submit */}
          <div className="text-xs text-muted-foreground">
            {form.analyticsOptIn ? "You've opted into analytics installation." : "You have not opted into analytics installation."}
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            <Button type="button" variant="outline" onClick={calculateEstimate} className="w-full" disabled={calculating || !form.serviceType}>
              {calculating ? "Calculating..." : "Calculate Estimate"}
            </Button>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              <Send className="w-4 h-4 mr-2" /> {isSubmitting ? "Submitting..." : "Submit Quote Request"}
            </Button>
          </div>
        </form>
      </Card>

      {/* Estimate card */}
      {estimate !== null && (
        <Card ref={estimateRef} className="mt-6 p-6 border-2 border-primary bg-primary/5">
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2"><DollarSign className="w-6 h-6" /> Your Estimated Total (Due Now)</h3>

          <div className="text-3xl font-bold text-primary mb-2">${estimate}</div>

          <div className="text-sm text-muted-foreground space-y-1">
            <div>Build: ${estimateBreakdown.buildCost ?? 0}</div>
            <div>Hosting Prepay / First Payment: ${estimateBreakdown.hostingPrepayAmount ?? 0}</div>
            <div>Rush Fee: ${estimateBreakdown.rushFee ?? 0}</div>
            <div>Domain Handling: ${estimateBreakdown.domainHandlingFee ?? 0}</div>
          </div>

          <p className="text-xs text-muted-foreground mt-3">Note: Ongoing hosting renewals will be billed after the prepaid period (if applicable). Domain first-year registration is free when eligible; renewals billed separately.</p>
        </Card>
      )}
    </div>
  );
};

export default Quote;
