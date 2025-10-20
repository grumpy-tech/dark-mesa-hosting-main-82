import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, DollarSign, Sparkles } from "lucide-react";

const Pricing = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const websitePackages = [
    {
      name: "Basic One-Pager",
      price: 249,
      features: [
        "Single-page responsive site",
        "Contact form",
        "Basic SEO",
        "Mobile optimization",
        "1-week delivery",
      ],
    },
    {
      name: "Standard Multi-Page",
      price: 499,
      features: [
        "Up to 5 pages",
        "Custom design",
        "Stock images",
        "Enhanced SEO",
        "Social media integration",
      ],
    },
    {
      name: "Premium Multi-Page",
      price: 749,
      features: [
        "Up to 10 pages",
        "E-commerce basics",
        "Blog functionality",
        "Advanced SEO",
        "Priority support",
      ],
    },
    {
      name: "Custom Enterprise",
      price: "999+",
      features: [
        "Unlimited pages",
        "Advanced features",
        "Custom integrations",
        "User authentication",
        "Dedicated manager",
      ],
    },
  ];

  const hostingPlans = [
    {
      name: "Basic Hosting",
      monthly: 12,
      yearly: 129,
      features: ["Up to 5 pages", "10GB storage", "SSL certificate", "Daily backups", "99.9% uptime"],
    },
    {
      name: "Advanced Hosting",
      monthly: 18,
      yearly: 194,
      features: ["Unlimited pages", "50GB storage", "Hourly backups", "Priority support", "CDN included"],
    },
  ];

  const bundles = [
    {
      name: "Basic Bundle",
      build: 212,
      hosting: 129,
      total: 341,
      features: [
        "Basic One-Pager",
        "Basic Hosting (1 year)",
        "15% build discount",
        "Free domain assistance",
      ],
    },
    {
      name: "Standard Bundle",
      build: 424,
      hosting: 129,
      total: 553,
      features: [
        "Standard Multi-Page",
        "Basic Hosting (1 year)",
        "15% build discount",
        "Free stock images",
      ],
      popular: true,
    },
    {
      name: "Premium Bundle",
      build: 637,
      hosting: 194,
      total: 831,
      features: [
        "Premium Multi-Page",
        "Advanced Hosting (1 year)",
        "15% build discount",
        "Free domain (first year)",
      ],
    },
    {
      name: "Custom Bundle",
      build: "849+",
      hosting: 194,
      total: "1,043+",
      features: [
        "Custom Enterprise Build",
        "Advanced Hosting (1 year)",
        "15% build discount",
        "Custom quote required",
      ],
    },
  ];

  const addOns = [
    { name: "Extra Page", price: 125 },
    { name: "Advanced SEO Package", price: 200 },
    { name: "Monthly Maintenance", price: 40, recurring: true },
    { name: "Domain Registration Assistance", price: 15 },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

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
              No hidden fees. No surprises. Choose the package that fits your needs and budget.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Website Building Packages */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Website Building Packages</h2>
            <p className="text-lg text-muted-foreground">One-time build costs</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {websitePackages.map((pkg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full border-border hover:border-primary/50 transition-colors">
                  <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                  <div className="text-3xl font-bold text-primary mb-4">
                    {typeof pkg.price === "number" ? `$${pkg.price}` : pkg.price}
                  </div>
                  <ul className="space-y-2">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/quote" state={{ plan: pkg.name }}>
                    <Button className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
                      Get Started
                    </Button>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hosting Plans */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Hosting Plans</h2>
            <p className="text-lg text-muted-foreground">Recurring costs for reliable hosting</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {hostingPlans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 border-border hover:border-accent/50 transition-colors">
                  <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-bold text-accent">${plan.monthly}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <div className="text-sm text-muted-foreground mb-4">
                    or ${plan.yearly}/year (save 10%)
                  </div>
                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/quote" state={{ plan: plan.name, needsHosting: true }}>
                    <Button className="w-full mt-4 bg-accent text-accent-foreground hover:bg-accent/90">
                      Get Started
                    </Button>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bundle Packages */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Bundle Packages (Save 15%!)</h2>
            <p className="text-lg text-muted-foreground">
              Get both website building and hosting together for the best value
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {bundles.map((bundle, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
              >
                <Card
                  className={`p-6 h-full ${
                    bundle.popular ? "border-2 border-primary shadow-lg shadow-primary/20" : "border-border"
                  } relative`}
                >
                  {bundle.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                      Best Value
                    </div>
                  )}
                  <h3 className="text-xl font-bold mb-4">{bundle.name}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Build: </span>
                      <span className="font-semibold">
                        {typeof bundle.build === "number" ? `$${bundle.build}` : bundle.build}
                      </span>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Hosting: </span>
                      <span className="font-semibold">${bundle.hosting}/year</span>
                    </div>
                    <div className="pt-2 border-t border-border">
                      <div className="text-2xl font-bold text-primary">
                        {typeof bundle.total === "number" ? `$${bundle.total}` : `$${bundle.total}`}
                      </div>
                      <div className="text-xs text-muted-foreground">total upfront</div>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-4">
                    {bundle.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact" state={{ plan: bundle.name }}>
                    <Button
                      className={`w-full ${
                        bundle.popular ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      Get Started
                    </Button>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-Ons */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Optional Add-Ons</h2>
            <p className="text-lg text-muted-foreground">Enhance your package with additional services</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Card className="divide-y divide-border">
              {addOns.map((addon, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="p-4 flex items-center justify-between"
                >
                  <div>
                    <div className="font-semibold">{addon.name}</div>
                    {addon.recurring && <div className="text-xs text-muted-foreground">per month</div>}
                  </div>
                  <div className="text-xl font-bold text-primary">
                    ${addon.price}
                    {addon.recurring && <span className="text-sm">/mo</span>}
                  </div>
                </motion.div>
              ))}
            </Card>
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
                  <span>Yearly hosting prepaid for 10% discount</span>
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
                  <span>No refunds after website launch</span>
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
    </div>
  );
};

export default Pricing;
