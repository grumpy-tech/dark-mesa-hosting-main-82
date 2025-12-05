import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, DollarSign, X, Star, Info } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      emoji: "🟢",
      monthly: 39,
      annual: 468,
      buildPrice: 349,
      description: "Perfect for new businesses",
      features: [
        { name: "Pages Included", value: "3 pages" },
        { name: "Design Style", value: "Professional templates" },
        { name: "Works on Phones & Tablets", value: true },
        { name: "Get Found on Google", value: "Basic setup" },
        { name: "Contact Forms", value: "Basic form" },
        { name: "Analytics Setup", value: false },
        { name: "Blog or Online Store", value: false },
        { name: "Free Updates Per Month", value: "1 update (30 min)" },
        { name: "Site Backups", value: "Monthly" },
        { name: "Security Protection", value: "Basic monitoring" },
        { name: "Support Speed", value: "48-72 hours" },
        { name: "Professional Email", value: "None included" },
        { name: "Uptime Guarantee", value: "99.9%" }
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
      features: [
        { name: "Pages Included", value: "Up to 6 pages" },
        { name: "Design Style", value: "Custom for your brand" },
        { name: "Works on Phones & Tablets", value: true },
        { name: "Get Found on Google", value: "Enhanced setup" },
        { name: "Contact Forms", value: "Advanced forms" },
        { name: "Analytics Setup", value: true },
        { name: "Blog or Online Store", value: "Add-on available" },
        { name: "Free Updates Per Month", value: "5 updates (2 hrs)" },
        { name: "Site Backups", value: "Twice monthly" },
        { name: "Security Protection", value: "Advanced firewall" },
        { name: "Support Speed", value: "24 hours" },
        { name: "Professional Email", value: "1 inbox" },
        { name: "Uptime Guarantee", value: "99.99%" }
      ]
    },
    {
      name: "Pro",
      emoji: "🔴",
      monthly: 99,
      annual: 1188,
      buildPrice: 999,
      description: "For established businesses",
      features: [
        { name: "Pages Included", value: "Up to 9 pages" },
        { name: "Design Style", value: "Unique design" },
        { name: "Works on Phones & Tablets", value: true },
        { name: "Get Found on Google", value: "Full local SEO" },
        { name: "Contact Forms", value: "Advanced + automation" },
        { name: "Analytics Setup", value: true },
        { name: "Blog or Online Store", value: "Included" },
        { name: "Free Updates Per Month", value: "Unlimited (4 hrs)" },
        { name: "Site Backups", value: "Weekly + daily" },
        { name: "Security Protection", value: "Proactive scans" },
        { name: "Support Speed", value: "Same day" },
        { name: "Professional Email", value: "Up to 5 inboxes" },
        { name: "Uptime Guarantee", value: "99.99%" }
      ]
    }
  ];

  const renderValue = (value: string | boolean) => {
    if (value === true) return <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />;
    if (value === false) return <X className="w-5 h-5 text-muted-foreground/40 mx-auto" />;
    return <span className="text-sm text-center block">{value}</span>;
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
              Everything you need to build and maintain your website. No hidden fees, no surprises.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Plan</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Pay 12 months upfront and get your website built completely FREE!
            </p>
          </div>

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
                  className={`p-8 h-full border-2 ${
                    plan.popular ? "border-primary shadow-lg shadow-primary/20" : "border-border"
                  } relative flex flex-col`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <Star className="w-4 h-4" /> Most Popular
                    </div>
                  )}

                  <div className="flex-1 space-y-6">
                    <div className="text-center space-y-2">
                      <div>
                        <span className="text-3xl mr-2">{plan.emoji}</span>
                        <h3 className="text-2xl font-bold inline">{plan.name}</h3>
                      </div>
                      <p className="text-muted-foreground text-sm">{plan.description}</p>
                    </div>

                    {/* Monthly Price */}
                    <div className="text-center pb-4 border-b border-border">
                      <div className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
                        Monthly Hosting
                      </div>
                      <div className="text-4xl font-bold text-primary">
                        ${plan.monthly}
                        <span className="text-lg text-muted-foreground">/mo</span>
                      </div>
                    </div>

                    {/* Build Price */}
                    <div className="text-center pb-4 border-b border-border">
                      <div className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
                        Website Build (One-Time)
                      </div>
                      <div className="text-3xl font-bold text-foreground">${plan.buildPrice}</div>
                    </div>

                    {/* Special Offer */}
                    <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-500/30 rounded-lg p-4 text-center">
                      <div className="text-sm font-semibold text-green-600 dark:text-green-400 uppercase tracking-wide mb-1">
                        💰 SPECIAL OFFER
                      </div>
                      <div className="text-base font-bold mb-1">Pay 12 Months Upfront</div>
                      <div className="text-2xl font-bold text-primary mb-1">${plan.annual}</div>
                      <div className="text-base font-bold text-green-600 dark:text-green-400">
                        + Website Build FREE
                      </div>
                      <div className="text-xs text-muted-foreground mt-2">(Save ${plan.buildPrice})</div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-border">
                    <Link
                      to="/quote"
                      state={{
                        plan: plan.name,
                        serviceCategory: "bundle",
                        serviceType: plan.name
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

      {/* Feature Comparison */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <Info className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Compare Plans</h2>
            <p className="text-lg text-muted-foreground">
              See what's included in each plan at a glance
            </p>
          </div>

          {/* Mobile-friendly comparison */}
          <div className="max-w-6xl mx-auto">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="text-left p-4 font-semibold text-foreground">Feature</th>
                    {plans.map((plan) => (
                      <th key={plan.name} className="p-4 text-center">
                        <div className="space-y-1">
                          <div>
                            <span className="text-2xl mr-1">{plan.emoji}</span>
                            <span className="font-bold text-lg">{plan.name}</span>
                          </div>
                          {plan.popular && (
                            <span className="text-xs text-primary font-medium">⭐ Most Popular</span>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {plans[0].features.map((_, fi) => (
                    <tr
                      key={fi}
                      className="border-b border-border/50 hover:bg-card/30 transition-colors"
                    >
                      <td className="p-4 text-sm font-medium text-foreground">
                        {plans[0].features[fi].name}
                      </td>
                      {plans.map((plan) => (
                        <td key={plan.name} className="p-4 text-center">
                          {renderValue(plan.features[fi].value)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-6">
              {plans.map((plan) => (
                <Card key={plan.name} className="p-6 border-2 border-border">
                  <div className="text-center mb-4 pb-4 border-b border-border">
                    <span className="text-2xl mr-2">{plan.emoji}</span>
                    <h3 className="text-xl font-bold inline">{plan.name}</h3>
                    {plan.popular && (
                      <div className="text-xs text-primary font-medium mt-1">⭐ Most Popular</div>
                    )}
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature, fi) => (
                      <li key={fi} className="flex justify-between items-center gap-4 text-sm">
                        <span className="text-muted-foreground">{feature.name}</span>
                        <div className="flex-shrink-0">{renderValue(feature.value)}</div>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Payment Terms */}
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
                        We help you get your domain (typically $25-35/year)
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
