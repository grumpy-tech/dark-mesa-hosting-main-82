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
import { DollarSign, Send, CheckCircle2, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type PrepayOption = "" | "6months" | "12months";
type ServiceType = "build" | "hosting" | "bundle";

export default function Quote() {
  const { toast } = useToast();
  const estimateRef = useRef<HTMLDivElement | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [calculating, setCalculating] = useState(false);
  const [estimate, setEstimate] = useState<number | null>(null);
  const [estimateBreakdown, setEstimateBreakdown] = useState<Record<string, number>>({});
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const [form, setForm] = useState({
    companyName: "",
    email: "",
    phone: "",
    location: "",
    employees: "",
    companyOverview: "",
    servicesOffered: "",
    specialRequirements: "",
    colorScheme: "",
    competitors: "",
    industry: "other",
    analyticsOptIn: false,
    serviceType: "bundle" as ServiceType,
    planTier: "Starter",
    prepayOption: "12months" as PrepayOption,
    turnaroundTime: "standard",
  });

  const buildPrices = { Starter: 349, Business: 599, Pro: 999 };
  const monthlyHosting = { Starter: 39, Business: 69, Pro: 99 };
  const rushFees = { Starter: 199, Business: 299, Pro: 399 };

  const update = (partial: Partial<typeof form>) =>
    setForm((f) => ({ ...f, ...partial }));

  const calculateEstimate = () => {
    setCalculating(true);

    setTimeout(() => {
      const buildBase = buildPrices[form.planTier] ?? 0;
      const hostMonthly = monthlyHosting[form.planTier] ?? 0;
      const rushFee =
        form.turnaroundTime === "rush" ? rushFees[form.planTier] ?? 0 : 0;

      let buildCost = buildBase;
      let hostingPayment = hostMonthly;

      if (form.prepayOption === "6months") {
        hostingPayment = hostMonthly * 6;
        buildCost = Math.round(buildCost * 0.5);
      }

      if (form.prepayOption === "12months") {
        hostingPayment = hostMonthly * 12;
        buildCost = 0;
      }

      if (form.serviceType === "build") hostingPayment = 0;
      if (form.serviceType === "hosting") buildCost = 0;

      const totalNow = Math.round(buildCost + hostingPayment + rushFee);

      setEstimateBreakdown({
        buildCost,
        hostingPayment,
        rushFee,
      });

      setEstimate(totalNow);
      setCalculating(false);

      estimateRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 400);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.companyName || !form.email || !form.companyOverview) {
      toast({
        title: "Missing required fields",
        description: "Company name, email, and overview are required.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, String(v)));
      if (logoFile) formData.append("logo", logoFile);
      formData.append("estimate", String(estimate ?? 0));
      formData.append("estimateBreakdown", JSON.stringify(estimateBreakdown));

      const res = await fetch("/send_quote.php", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed");

      setIsSubmitted(true);
      toast({ title: "Quote sent successfully" });
    } catch {
      toast({
        title: "Submission Failed",
        description: "Server error. Try again.",
        variant: "destructive",
      });
    }

    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <div className="container mx-auto px-6 py-32 text-center">
        <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-2">Quote Submitted Successfully!</h2>
        <p className="text-muted-foreground">
          We’ll review your request and contact you within 24 hours.
        </p>
      </div>
    );
  }

  const isRegulated = ["healthcare", "finance", "legal"].includes(form.industry);

  return (
    <div className="container mx-auto px-6 py-16 max-w-4xl">
      <Card className="p-8">
        <h2 className="text-3xl font-bold mb-4">Get Your Free Quote</h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* CONTACT */}
          <div className="grid md:grid-cols-2 gap-4">
            <Input placeholder="Company Name *" value={form.companyName} onChange={(e) => update({ companyName: e.target.value })} />
            <Input placeholder="Email *" value={form.email} onChange={(e) => update({ email: e.target.value })} />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Input placeholder="Phone" value={form.phone} onChange={(e) => update({ phone: e.target.value })} />
            <Input placeholder="Location" value={form.location} onChange={(e) => update({ location: e.target.value })} />
          </div>

          {/* BUSINESS INFO */}
          <Textarea placeholder="Company Overview *" value={form.companyOverview} onChange={(e) => update({ companyOverview: e.target.value })} />
          <Textarea placeholder="Services Offered" value={form.servicesOffered} onChange={(e) => update({ servicesOffered: e.target.value })} />
          <Textarea placeholder="Special Requirements" value={form.specialRequirements} onChange={(e) => update({ specialRequirements: e.target.value })} />

          {/* INDUSTRY */}
          <Select value={form.industry} onValueChange={(v) => update({ industry: v })}>
            <SelectTrigger><SelectValue placeholder="Select Industry" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="retail">Retail</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="legal">Legal</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>

          {isRegulated && (
            <div className="bg-yellow-50 border border-yellow-200 p-3 rounded text-sm flex gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              This industry may require legal compliance (HIPAA, PCI, etc).
            </div>
          )}

          {/* SERVICE */}
          <div className="grid md:grid-cols-3 gap-4">
            <Select value={form.serviceType} onValueChange={(v) => update({ serviceType: v as ServiceType })}>
              <SelectTrigger><SelectValue placeholder="Service Type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="build">Build Only</SelectItem>
                <SelectItem value="hosting">Hosting Only</SelectItem>
                <SelectItem value="bundle">Bundle</SelectItem>
              </SelectContent>
            </Select>

            <Select value={form.planTier} onValueChange={(v) => update({ planTier: v })}>
              <SelectTrigger><SelectValue placeholder="Plan Tier" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Starter">Starter</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
                <SelectItem value="Pro">Pro</SelectItem>
              </SelectContent>
            </Select>

            <Select value={form.turnaroundTime} onValueChange={(v) => update({ turnaroundTime: v })}>
              <SelectTrigger><SelectValue placeholder="Delivery Speed" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="rush">Rush</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* PREPAY */}
          <div className="flex items-center gap-2">
            <Checkbox checked={form.prepayOption !== ""} onCheckedChange={(c) => update({ prepayOption: c ? "12months" : "" })} />
            Prepay hosting for discounts
          </div>

          {/* FILE */}
          <Input type="file" onChange={(e) => setLogoFile(e.target.files?.[0] || null)} />

          {/* BUTTONS */}
          <Button type="button" onClick={calculateEstimate} variant="outline" className="w-full">
            {calculating ? "Calculating..." : "Calculate Estimate"}
          </Button>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            <Send className="w-4 h-4 mr-2" /> Submit Quote
          </Button>
        </form>
      </Card>

      {estimate !== null && (
        <Card ref={estimateRef} className="mt-6 p-6 border-2 border-primary bg-primary/5">
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <DollarSign className="w-5 h-5" /> Estimated Due Now
          </h3>

          <div className="text-3xl font-bold text-primary mb-3">${estimate}</div>

          <div className="text-sm text-muted-foreground space-y-1">
            <div>Build: ${estimateBreakdown.buildCost}</div>
            <div>Hosting: ${estimateBreakdown.hostingPayment}</div>
            <div>Rush: ${estimateBreakdown.rushFee}</div>
          </div>
        </Card>
      )}
    </div>
  );
}
