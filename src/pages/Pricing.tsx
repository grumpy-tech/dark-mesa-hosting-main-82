// Last updated: 2025-12-07 at 12:00 UTC
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, DollarSign, X, Star, Sparkles } from "lucide-react";
const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);
  const plans = [
    {
      name: "Starter",
      emoji: "🟢",
      monthly: 39,
      annual: 468,
      buildPrice: 349,
      description: "Perfect for new businesses",
      tagline: "Get online fast",
      color: "from-green-500/20 to-emerald-500/20",
      features: [
        { name: "Pages Included", value: "3 pages", included: true },
        { name: "Design Style", value: "Professional templates", included: true },
        { name: "Get Found on Google", value: "Basic setup", included: true },
        { name: "Contact Forms", value: "Basic form", included: true },
        { name: "Analytics Setup", value: false, included: false },
        { name: "Blog or Online Store", value: false, included: false },
        { name: "Free Updates Per Month", value: "1 update (30 min)", included: true },
        { name: "Site Backups", value: "Monthly", included: true },
        { name: "Security Protection", value: "Basic monitoring", included: true },
        { name: "Support Speed", value: "48-72 hours", included: true },
        { name: "Professional Email", value: "None included", included: false },
        { name: "Uptime Guarantee", value: "99.9%", included: true }
      ]
    },
    {
      name: "Business",
      emoji: "🔵",
      popular: true,
      monthly: 69,
      annual: 828,
      buildPrice: 599,
      description: "Best for growing businesses",
      tagline: "Everything you need to grow",
      color: "from-primary/20 to-blue-500/20",
      features: [
        { name: "Pages Included", value: "Up to 6 pages", included: true },
        { name: "Design Style", value: "Custom for your brand", included: true },
        { name: "Get Found on Google", value: "Enhanced setup", included: true },
        { name: "Contact Forms", value: "Advanced forms", included: true },
        { name: "Analytics Setup", value: true, included: true },
        { name: "Blog or Online Store", value: "Add-on available", included: true },
        { name: "Free Updates Per Month", value: "5 updates (2 hrs)", included: true },
        { name: "Site Backups", value: "Weekly", included: true },
        { name: "Security Protection", value: "Advanced firewall", included: true },
        { name: "Support Speed", value: "24 hours", included: true },
        { name: "Professional Email", value: "1 inbox", included: true },
        { name: "Uptime Guarantee", value: "99.99%", included: true }
      ]
    },
    {
      name: "Pro",
      emoji: "🔴",
      monthly: 99,
      annual: 1188,
      buildPrice: 999,
      description: "For established businesses",
      tagline: "Premium performance",
      color: "from-purple-500/20 to-pink-500/20",
      features: [
        { name: "Pages Included", value: "Up to 9 pages", included: true },
        { name: "Design Style", value: "Unique design", included: true },
        { name: "Get Found on Google", value: "Full local SEO", included: true },
        { name: "Contact Forms", value: "Advanced + automation", included: true },
        { name: "Analytics Setup", value: true, included: true },
        { name: "Blog or Online Store", value: "Included", included: true },
        { name: "Free Updates Per Month", value: "Unlimited (4 hrs)", included: true },
        { name: "Site Backups", value: "Daily", included: true },
        { name: "Security Protection", value: "Proactive scans", included: true },
        { name: "Support Speed", value: "Same day", included: true },
        { name: "Professional Email", value: "Up to 5 inboxes", included: true },
        { name: "Uptime Guarantee", value: "99.99%", included: true }
      ]
    }
  ];
  const renderFeatureValue = (feature: any) => {
    if (feature.value === true) {
      return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    }
    if (feature.value === false) {
      return <X className="w-5 h-5 text-red-500" />;
    }
    return <span className="text-sm font-medium">{feature.value}</span>;
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
            <h1 className="text-4xl md:text-6xl font-bold">Our Pricing Plans</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to build and maintain your website. No hidden fees, no surprises.
            </p>
          </motion.div>
        </div>
      </section>
      {/* Monthly/Yearly Toggle Section */}
      <section className="pb-8 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-center items-center gap-4 mb-8">
            <div className="inline-flex items-center bg-card border-2 border-border rounded-full p-1">
              <button
                onClick={() => setIsYearly(false)}
                className={`px-6 py-2 rounded-full font-medium text-sm transition-all ${
                  !isYearly
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Monthly
              </button>
              <div className="relative">
                <button
                  onClick={() => setIsYearly(true)}
                  className={`px-6 py-2 rounded-full font-medium text-sm transition-all ${
                    isYearly
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Yearly
                </button>
                {!isYearly && (
                  <span className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded-full shadow-md whitespace-nowrap">
                    Free Build!
                  </span>
                )}
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-sm">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <span className="font-semibold text-green-600 dark:text-green-400">
                {isYearly ? "Free website build included" : "Pay yearly for free website build"}
              </span>
            </div>
          </div>
        </div>
      </section>
      {/* Pricing Comparison Table */}
      <section className="pb-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden border-2 border-border rounded-xl bg-card">
                <table className="min-w-full divide-y divide-x divide-border">
                  <thead>
                    <tr className="bg-muted/30">
                      <th className="px-6 py-6 text-left">
                        <div className="text-lg font-bold text-foreground">Compare Plans</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          See what's included at each level
                        </div>
                      </th>
                      {plans.map((plan) => (
                        <th key={plan.name} className="px-6 py-6">
                          <div className={`rounded-2xl bg-gradient-to-br ${plan.color} p-6 border-2 ${plan.popular ? 'border-primary' : 'border-border'} relative`}>
                            {plan.popular && (
                              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                                <Star className="w-3 h-3" /> Most Popular
                              </div>
                            )}
                            <div className="text-center space-y-3">
                              <div className="text-4xl">{plan.emoji}</div>
                              <div>
                                <div className="text-xl font-bold text-foreground">{plan.name}</div>
                                <div className="text-xs text-muted-foreground mt-1">{plan.tagline}</div>
                              </div>
                              <div className="pt-2">
                                <div className="flex items-baseline justify-center gap-1">
                                  <span className="text-2xl font-bold text-foreground">$</span>
                                  <span className="text-5xl font-bold text-foreground">
                                    {isYearly ? plan.annual : plan.monthly}
                                  </span>
                                  <span className="text-sm text-muted-foreground">{isYearly ? "/year" : "/mo"}</span>
                                </div>
                                {isYearly && (
                                  <div className="text-xs text-muted-foreground mt-1">
                                    Billed annually
                                  </div>
                                )}
                              </div>
                              <div className="pt-2 border-t border-border/50">
                                <div className="text-xs text-muted-foreground">One-time build</div>
                                <div className="text-2xl font-bold text-foreground">
                                  {isYearly ? (
                                    <span className="text-green-600 dark:text-green-400">FREE (save ${plan.buildPrice})</span>
                                  ) : (
                                    `$${plan.buildPrice}`
                                  )}
                                </div>
                              </div>
                              <Link
                                to="/quote"
                                state={{
                                  plan: plan.name,
                                  serviceCategory: "bundle",
                                  serviceType: plan.name,
                                  billingCycle: isYearly ? "annual" : "monthly"
                                }}
                              >
                                <Button
                                  className={`w-full mt-4 ${
                                    plan.popular
                                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                                  }`}
                                >
                                  Get Started
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-x divide-border bg-background">
                    {plans[0].features.map((_, featureIndex) => (
                      <tr key={featureIndex} className="hover:bg-muted/20 transition-colors even:bg-muted/5">
                        <td className="px-6 py-4 text-sm font-medium text-foreground whitespace-nowrap">
                          {plans[0].features[featureIndex].name}
                        </td>
                        {plans.map((plan) => (
                          <td key={plan.name} className="px-6 py-4 text-center">
                            <div className="flex justify-center items-center">
                              {renderFeatureValue(plan.features[featureIndex])}
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* Mobile View - Stacked Cards */}
          <div className="lg:hidden space-y-8 mt-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Compare Plans</h2>
              <p className="text-muted-foreground">Swipe through to see all features</p>
            </div>
            {plans.map((plan) => (
              <Card key={plan.name} className={`p-6 border-2 ${plan.popular ? 'border-primary' : 'border-border'}`}>
                <div className="text-center mb-6 pb-6 border-b border-border">
                  <div className={`inline-block rounded-2xl bg-gradient-to-br ${plan.color} p-6 border-2 ${plan.popular ? 'border-primary' : 'border-border'} relative mb-4`}>
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <Star className="w-3 h-3" /> Most Popular
                      </div>
                    )}
                    <div className="text-3xl mb-2">{plan.emoji}</div>
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{plan.tagline}</p>
                    <div className="text-4xl font-bold mt-4">
                      ${isYearly ? plan.annual : plan.monthly}
                      <span className="text-lg text-muted-foreground">{isYearly ? "/year" : "/mo"}</span>
                    </div>
                    <div className="text-sm text-muted-foreground mt-2">
                      Build: {isYearly ? `FREE (save $${plan.buildPrice})` : `$${plan.buildPrice}`}
                    </div>
                  </div>
                  <Link to="/quote" state={{ plan: plan.name, billingCycle: isYearly ? "annual" : "monthly" }}>
                    <Button className={`w-full ${plan.popular ? 'bg-primary' : 'bg-secondary'}`}>
                      Get Started
                    </Button>
                  </Link>
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature, fi) => (
                    <li key={fi} className="flex justify-between items-center gap-4 text-sm">
                      <span className="text-muted-foreground">{feature.name}</span>
                      <div className="flex-shrink-0">{renderFeatureValue(feature)}</div>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Payment Terms - Good to Know */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 border-border">
              <h3 className="text-2xl font-bold mb-6 text-center">Good to Know</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold mb-1">Flexible Payments</div>
                      <p className="text-sm text-muted-foreground">
                        Pay monthly or prepay for big savings
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold mb-1">No Hidden Fees</div>
                      <p className="text-sm text-muted-foreground">
                        Price you see is what you pay
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold mb-1">Domain Included</div>
                      <p className="text-sm text-muted-foreground">
                        Free first year (up to $20 value), then $18-22/year
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold mb-1">Easy to Upgrade</div>
                      <p className="text-sm text-muted-foreground">
                        Start small and grow as your business grows
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold mb-1">Free Consultation</div>
                      <p className="text-sm text-muted-foreground">
                        Chat with us to find the right plan
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold mb-1">Money-Back Guarantee</div>
                      <p className="text-sm text-muted-foreground">
                        30 days on hosting, unlimited revisions on build
                      </p>
                    </div>
                  </div>
                </div>
              </div>
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
              Get a free quote tailored to your business needs
            </p>
            <Link to="/quote">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Get Your Free Quote <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};
export default Pricing;
