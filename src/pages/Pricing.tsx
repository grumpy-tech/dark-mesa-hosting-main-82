import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, DollarSign, Sparkles, X, Star } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      emoji: "🟢",
      monthly: 39,
      annual: 399,
      annualSavings: "~15%",
      buildPrice: 349,
      buildNote: "exactly 3 pages",
      prepay6: "Build 50% off",
      prepay12: "Build FREE",
      features: [
        { name: "Pages Included", value: "3 pages" },
        { name: "Custom Branding & Design", value: "Template-based" },
        { name: "Mobile & Speed Optimized", value: true },
        { name: "SEO Structure", value: "Basic" },
        { name: "Lead Capture Forms", value: "Basic form" },
        { name: "Google Analytics + Search Console", value: "Optional add-on" },
        { name: "Blog OR Basic E-commerce (≤25 products)", value: false },
        { name: "Edits / Updates per Month", value: "1 small (≤30 min)" },
        { name: "Core/Plugin Updates", value: "Monthly" },
        { name: "Backups", value: "Monthly" },
        { name: "Security & Malware Removal", value: "Basic monitoring" },
        { name: "Support SLA", value: "Email 48–72 hrs" },
        { name: "Professional Email Inboxes", value: "None" },
        { name: "Uptime Guarantee", value: "99.9%" },
        { name: "Satisfaction Guarantee", value: "30-day money-back on hosting" },
      ],
    },
    {
      name: "Business",
      emoji: "🔵",
      popular: true,
      monthly: 69,
      annual: 699,
      annualSavings: "~15%",
      buildPrice: 599,
      buildNote: "up to 6 pages",
      prepay6: "Build 50% off",
      prepay12: "Build FREE",
      features: [
        { name: "Pages Included", value: "Up to 6 pages" },
        { name: "Custom Branding & Design", value: "Full custom branding" },
        { name: "Mobile & Speed Optimized", value: true },
        { name: "SEO Structure", value: "Enhanced (schema, local signals)" },
        { name: "Lead Capture Forms", value: "Multi-step forms" },
        { name: "Google Analytics + Search Console", value: "Basic setup included" },
        { name: "Blog OR Basic E-commerce (≤25 products)", value: "Optional add-on" },
        { name: "Edits / Updates per Month", value: "Up to 5 edits (≤2 hrs total)" },
        { name: "Core/Plugin Updates", value: "Daily" },
        { name: "Backups", value: "Bi-weekly (30-day retention)" },
        { name: "Security & Malware Removal", value: "Advanced firewall + cleanup" },
        { name: "Support SLA", value: "Priority email 24 hrs" },
        { name: "Professional Email Inboxes", value: "1 inbox" },
        { name: "Uptime Guarantee", value: "99.99% with credits" },
        { name: "Satisfaction Guarantee", value: "Unlimited revisions on build" },
      ],
    },
    {
      name: "Pro",
      emoji: "🔴",
      monthly: 99,
      annual: 999,
      annualSavings: "~15%",
      buildPrice: 999,
      buildNote: "up to 9 pages",
      prepay6: "Build 50% off",
      prepay12: "Build FREE",
      features: [
        { name: "Pages Included", value: "Up to 9 pages" },
        { name: "Custom Branding & Design", value: "Bespoke UI/UX + conversion focus" },
        { name: "Mobile & Speed Optimized", value: "Yes + advanced caching" },
        { name: "SEO Structure", value: "Advanced + full local SEO pack" },
        { name: "Lead Capture Forms", value: "Multi-step + automation & integrations" },
        { name: "Google Analytics + Search Console", value: "Advanced funnel tracking" },
        { name: "Blog OR Basic E-commerce (≤25 products)", value: "Included" },
        { name: "Edits / Updates per Month", value: "Unlimited (≤4 hrs fair use)" },
        { name: "Core/Plugin Updates", value: "Daily + staging environment" },
        { name: "Backups", value: "Weekly off-site + daily on-site" },
        { name: "Security & Malware Removal", value: "Proactive scans + instant fix" },
        { name: "Support SLA", value: "Same-day + phone/text/WhatsApp" },
        { name: "Professional Email Inboxes", value: "Up to 5 inboxes" },
        { name: "Uptime Guarantee", value: "99.99% with credits" },
        { name: "Satisfaction Guarantee", value: "Unlimited revisions + 90-day post-launch support" },
      ],
    },
  ];

  const renderFeatureValue = (value: string | boolean) => {
    if (value === true) return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    if (value === false) return <X className="w-5 h-5 text-muted-foreground/50" />;
    return <span className="text-sm">{value}</span>;
  };

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
              <DollarSign className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold">Simple, Transparent Pricing</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to build and maintain your online presence. No hidden fees.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  className={`p-8 h-full ${
                    plan.popular ? "border-2 border-primary shadow-lg shadow-primary/20" : "border-border"
                  } relative`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <Star className="w-4 h-4" /> Most Popular
                    </div>
                  )}
                  <div className="space-y-6">
                    <div className="text-center">
                      <span className="text-3xl mr-2">{plan.emoji}</span>
                      <h3 className="text-2xl font-bold inline">{plan.name}</h3>
                    </div>

                    {/* Monthly/Annual Pricing */}
                    <div className="text-center space-y-2">
                      <div>
                        <span className="text-4xl font-bold text-primary">${plan.monthly}</span>
                        <span className="text-muted-foreground">/mo</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        or <span className="font-semibold">${plan.annual}/yr</span> (save {plan.annualSavings})
                      </div>
                    </div>

                    {/* One-Time Build */}
                    <div className="border-t border-b border-border py-4 space-y-2">
                      <div className="text-center">
                        <div className="text-lg font-semibold">One-Time Website Build</div>
                        <div className="text-2xl font-bold text-accent">${plan.buildPrice}</div>
                        <div className="text-sm text-muted-foreground">({plan.buildNote})</div>
                      </div>
                    </div>

                    {/* Prepay Discounts */}
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Prepay 6 months:</span>
                        <span className="font-medium text-green-600 dark:text-green-400">{plan.prepay6}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Prepay 12 months:</span>
                        <span className="font-medium text-green-600 dark:text-green-400">{plan.prepay12}</span>
                      </div>
                    </div>

                    <Link
                      to="/quote"
                      state={{
                        plan: plan.name,
                        serviceCategory: "bundle",
                        serviceType: plan.name,
                      }}
                    >
                      <Button
                        className={`w-full ${
                          plan.popular
                            ? "bg-primary text-primary-foreground hover:bg-primary/90"
                            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                        }`}
                      >
                        Get Started
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Feature Comparison</h2>
            <p className="text-lg text-muted-foreground">
              See exactly what's included in each plan
            </p>
          </div>

          <div className="max-w-6xl mx-auto overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-semibold">Feature</th>
                  {plans.map((plan) => (
                    <th key={plan.name} className="p-4 text-center font-semibold">
                      <span className="mr-1">{plan.emoji}</span> {plan.name}
                      {plan.popular && (
                        <span className="block text-xs text-primary mt-1">⭐ Most Popular</span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {plans[0].features.map((feature, fi) => (
                  <tr key={fi} className="border-b border-border/50 hover:bg-card/50">
                    <td className="p-4 text-sm font-medium">{feature.name}</td>
                    {plans.map((plan) => (
                      <td key={plan.name} className="p-4 text-center">
                        {renderFeatureValue(plan.features[fi].value)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Payment Terms */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <Card className="p-8 border-border">
              <h3 className="text-2xl font-bold mb-6 text-center">Payment Terms & Notes</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>50% deposit required on website builds, balance due on launch</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Prepay 6 months hosting = 50% off your website build</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Prepay 12 months hosting = FREE website build!</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>
                    Domain registration at registrar's cost + handling fee (typically $25-35 for .com first year)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>3% processing fee for card payments; taxes extra where applicable</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Free initial consultation to discuss your needs</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Get a free consultation and detailed quote for your project
            </p>
            <Link to="/quote">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Get Free Quote <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Pricing;
