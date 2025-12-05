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
import { DollarSign, Send, Upload, CheckCircle2, Mail, Home } from "lucide-react";
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

    serviceType: "", // build | hosting | bundle
    planTier: "", // Starter | Business | Pro

    needsDomain: false,
    domainName: "",

    hasLogo: "",
    companyOverview: "",
    services: "",
    specialRequirements: "",
    turnaroundTime: "standard",
    colorScheme: "",
  });

  const getTurnaroundOptions = () => {
    if (formData.planTier === "Starter") {
      return [
        { value: "standard", label: "Standard (5–7 business days)" },
        { value: "rush", label: "Rush (3 days) +$199" },
      ];
    }

    if (formData.planTier === "Business") {
      return [
        { value: "standard", label: "Standard (7–10 business days)" },
        { value: "rush", label: "Rush (5 days) +$299" },
      ];
    }

    if (formData.planTier === "Pro") {
      return [
        { value: "standard", label: "Standard (10–14 business days)" },
        { value: "rush", label: "Rush (7 days) +$399" },
      ];
    }

    return [];
  };

  const calculateEstimate = () => {
    setCalculating(true);

    setTimeout(() => {
      let buildCost = 0;
      let hostingCost = 0;
      let rushFee = 0;

      if (formData.planTier === "Starter") {
        buildCost = 349;
        hostingCost = 399;
        if (formData.turnaroundTime === "rush") rushFee = 199;
      }

      if (formData.planTier === "Business") {
        buildCost = 599;
        hostingCost = 699;
        if (formData.turnaroundTime === "rush") rushFee = 299;
      }

      if (formData.planTier === "Pro") {
        buildCost = 999;
        hostingCost = 999;
        if (formData.turnaroundTime === "rush") rushFee = 399;
      }

      // SERVICE TYPE LOGIC
      if (formData.serviceType === "hosting") {
        buildCost = 0;
      }

      if (formData.serviceType === "bundle") {
        // Monthly = 50% off build | Annual = FREE build
        if (hostingCost >= 600) {
          buildCost = 0; // annual → FREE build
        } else {
          buildCost = buildCost / 2; // monthly → 50% off
        }
      }

      const total = buildCost + hostingCost + rushFee;
      setEstimate(total);
      setCalculating(false);

      setTimeout(() => {
        estimateRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }, 700);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      toast({
        title: "Quote Successfully Submitted",
        description: "We'll review your details and follow up shortly.",
      });

      setIsSubmitted(true);
      setIsSubmitting(false);
    }, 1200);
  };

  if (isSubmitted) {
    return (
      <div className="container mx-auto px-6 py-32 text-center max-w-xl">
        <CheckCircle2 className="w-20 h-20 text-primary mx-auto mb-6" />
        <h1 className="text-4xl font-bold mb-4">Quote Successfully Submitted!</h1>
        <p className="text-muted-foreground mb-6">
          Thank you for your request! We’ve received your project details and will personally review everything within the next 24 hours.
          <br /><br />
          Once all details are confirmed, you’ll receive a secure payment link for your <strong>50% deposit</strong>, which officially starts your timeline.
          <br /><br />
          <strong>Your project timeline begins the business day after both your deposit and all content are received.</strong>
        </p>

        <div className="flex flex-col gap-4">
          <Button asChild>
            <a href="/contact"><Mail className="w-4 h-4 mr-2" />Contact Us Directly</a>
          </Button>
          <Button variant="outline" asChild>
            <a href="/"><Home className="w-4 h-4 mr-2" />Back to Homepage</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-32 max-w-4xl">
      <Card className="p-8 space-y-6">

        {/* SERVICE TYPE */}
        <div>
          <Label>Select Service Type *</Label>
          <Select onValueChange={(v) => setFormData({ ...formData, serviceType: v, planTier: "" })}>
            <SelectTrigger><SelectValue placeholder="Choose service type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="build">Web Build Only</SelectItem>
              <SelectItem value="hosting">Hosting Only</SelectItem>
              <SelectItem value="bundle">Bundle (Build + Hosting)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* PLAN TIER */}
        {formData.serviceType && (
          <div>
            <Label>Select Plan Tier *</Label>
            <Select onValueChange={(v) => setFormData({ ...formData, planTier: v })}>
              <SelectTrigger><SelectValue placeholder="Choose a plan tier" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Starter">Starter</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
                <SelectItem value="Pro">Pro</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {/* DOMAIN LOGIC */}
        {formData.existingWebsite !== "yes" && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Checkbox checked={formData.needsDomain} onCheckedChange={(v) => setFormData({ ...formData, needsDomain: v as boolean })} />
              <Label>Do you need a new domain name for this project?</Label>
            </div>

            {formData.needsDomain && (
              <>
                <p className="text-xs text-muted-foreground">
                  We register any available domain worth up to $20 completely FREE for the first year. You own the domain 100%.
                </p>
                <DomainChecker onDomainSelect={(d, a) => {
                  setFormData({ ...formData, domainName: a ? d : "" });
                  setDomainAvailable(a);
                }} />
              </>
            )}
          </div>
        )}

        {/* TURNAROUND */}
        {formData.planTier && (
          <div>
            <Label>Desired Turnaround Time</Label>
            <Select onValueChange={(v) => setFormData({ ...formData, turnaroundTime: v })}>
              <SelectTrigger><SelectValue placeholder="Select timeline" /></SelectTrigger>
              <SelectContent>
                {getTurnaroundOptions().map(opt => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* ESTIMATE + SUBMIT */}
        <div className="flex gap-4">
          <Button variant="outline" onClick={calculateEstimate} className="w-full">Calculate Estimate</Button>
          <Button onClick={handleSubmit} disabled={isSubmitting} className="w-full">
            <Send className="w-4 h-4 mr-2" />
            Submit Quote
          </Button>
        </div>
      </Card>

      {estimate !== null && (
        <Card ref={estimateRef} className="p-6 mt-8 border-2 border-primary">
          <h2 className="text-xl font-bold mb-2">Estimated Total</h2>
          <div className="text-4xl font-bold text-primary">${estimate}</div>
        </Card>
      )}
    </div>
  );
};

export default Quote;
