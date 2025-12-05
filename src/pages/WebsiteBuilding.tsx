import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { 
  Globe, Zap, Smartphone, Search, Code, Palette, CheckCircle2, ArrowRight, 
  ClipboardList, MailOpen, Calculator, Star 
} from "lucide-react";

// Helper component for alternating feature sections
interface FeatureSectionProps {
  title: string;
  description: string;
  imageIcon: React.ComponentType<{ className?: string }>;
  reverse: boolean;
}

const FeatureSection = ({ title, description, imageIcon: Icon, reverse }: FeatureSectionProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-12`}
  >
    <div className="flex-1 flex justify-center">
      <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-primary/10 flex items-center justify-center">
        <Icon className="w-16 h-16 md:w-20 md:h-20 text-primary" />
      </div>
    </div>
    <div className="flex-1 text-center md:text-left">
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

const WebsiteBuilding = () => {
  const [selectedPlan, setSelectedPlan] = useState<'starter' | 'business' | 'pro'>('business');
  const [prepayMonths, setPrepayMonths] = useState<0 | 6 | 12>(0);

  const features = [
    {
      icon: Smartphone,
      title: "Mobile-First Design",
      description: "Beautiful, responsive websites that work perfectly on all devices",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized for speed with under 1-second load times",
    },
    {
      icon: Search,
      title: "SEO Optimized",
      description: "Built-in SEO best practices to help you rank on Google",
    },
    {
      icon: Code,
      title: "Modern Technology",
      description: "Using the latest web technologies for reliability and performance",
    },
    {
      icon: Palette,
      title: "Custom Design",
      description: "Unique designs tailored to your brand and business goals",
    },
    {
      icon: CheckCircle2,
      title: "Quality Assurance",
      description: "Thoroughly tested across browsers and devices before launch",
    },
  ];

  const coreServices = [
    {
      title: "Integrated Client Forms",
      description: "Capture valuable customer leads and information effortlessly. We build professional, secure forms directly into your website, ensuring all client data is immediately and reliably sent to your company's dedicated email address.",
      icon: ClipboardList,
    },
    {
      title: "Professional Company Email & Auto-Response",
      description: "Establish instant credibility with a business email using your registered website domain (e.g., info@yourcompany.com). We set up an automatic 'Thank You' response, assuring clients their query has been received and you'll be in touch soon.",
      icon: MailOpen,
    },
    {
      title: "Search Engine Optimization (SEO) Explained",
      description: "SEO is the process of optimizing your website to rank higher on search engines like Google. We implement best practices—including fast loading times, proper keywords, and structure—to increase your visibility and drive more organic traffic to your business.",
      icon: Search,
    },
  ];

  const process = [
    {
      step: "1",
      title: "Discovery & Planning",
      description: "We learn about your business, goals, and target audience to create the perfect strategy.",
    },
    {
      step: "2",
      title: "Design & Development",
      description: "Our team designs and builds your website using modern tools and best practices.",
    },
    {
      step: "3",
      title: "Review & Refine",
      description: "You review the website and we make any necessary adjustments to perfect it.",
    },
    {
      step: "4",
      title: "Launch & Support",
      description: "We launch your site and provide ongoing support to ensure continued success.",
    },
  ];

  const packages = [
    {
      id: 'starter' as const,
      name: "Starter",
      emoji: "🟢",
      monthlyPrice: 39,
      annualPrice: 399,
      buildPrice: 349,
      pages: "exactly 3 pages",
      description: "Perfect for new businesses needing a professional online presence",
      features: [
        "3 pages included",
        "Template-based design",
        "Mobile & speed optimized",
        "Basic SEO structure",
        "Basic lead capture form",
        "1 small edit/month (≤30 min)",
        "Monthly backups",
        "Basic security monitoring",
        "Email support 48-72 hrs",
        "99.9% uptime guarantee",
        "30-day money-back on hosting",
      ],
    },
    {
      id: 'business' as const,
      name: "Business",
      emoji: "🔵",
      monthlyPrice: 69,
      annualPrice: 699,
      buildPrice: 599,
      pages: "up to 6 pages",
      description: "Best for growing businesses",
      features: [
        "Up to 6 pages",
        "Full custom branding",
        "Mobile & speed optimized",
        "Enhanced SEO (schema, local signals)",
        "Multi-step lead forms",
        "Google Analytics + Search Console",
        "Up to 5 edits/month (≤2 hrs)",
        "Daily updates + bi-weekly backups",
        "Advanced firewall + cleanup",
        "Priority email support 24 hrs",
        "1 professional email inbox",
        "99.99% uptime with credits",
        "Unlimited revisions on build",
      ],
      popular: true,
    },
    {
      id: 'pro' as const,
      name: "Pro",
      emoji: "🔴",
      monthlyPrice: 99,
      annualPrice: 999,
      buildPrice: 999,
      pages: "up to 9 pages",
      description: "For established businesses wanting maximum impact",
      features: [
        "Up to 9 pages",
        "Bespoke UI/UX + conversion focus",
        "Advanced caching optimization",
        "Advanced + full local SEO pack",
        "Multi-step forms + automation",
        "Advanced funnel tracking",
        "Blog OR basic e-commerce (≤25 products)",
        "Unlimited edits (≤4 hrs fair use)",
        "Daily updates + staging environment",
        "Weekly off-site + daily on-site backups",
        "Proactive scans + instant fix",
        "Same-day + phone/text/WhatsApp support",
        "Up to 5 email inboxes",
        "99.99% uptime with credits",
        "Unlimited revisions + 90-day support",
      ],
    },
  ];

  // Calculate savings based on prepay selection
  const calculateSavings = () => {
    const plan = packages.find(p => p.id === selectedPlan)!;
    const buildPrice = plan.buildPrice;
    const monthlyPrice = plan.monthlyPrice;
    
    if (prepayMonths === 6) {
      const regularCost = buildPrice + (monthlyPrice * 6);
      const prepayBuildDiscount = buildPrice * 0.5;
      const prepayCost = prepayBuildDiscount + (monthlyPrice * 6);
      return {
        regularCost,
        prepayCost,
        savings: regularCost - prepayCost,
        buildDiscount: "50% off",
      };
    } else if (prepayMonths === 12) {
      const regularCost = buildPrice + plan.annualPrice;
      const prepayCost = plan.annualPrice; // Build is FREE
      return {
        regularCost,
        prepayCost,
        savings: buildPrice,
        buildDiscount: "FREE",
      };
    }
    return { regularCost: 0, prepayCost: 0, savings: 0, buildDiscount: "" };
  };

  const savings = calculateSavings();

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
              <Globe className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold">
              Professional Website Building
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Fast, affordable, and beautiful websites built with modern technology. From simple landing pages to
              complex multi-page sites, we've got you covered.
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Link to="/contact">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Get Started <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button size="lg" variant="outline">
                  View Pricing
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Website Building?</h2>
            <p className="text-lg text-muted-foreground">
              We combine speed, quality, and affordability to deliver exceptional results
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full border-border hover:border-primary/50 transition-colors">
                  <feature.icon className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Services Included */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Core Services Available</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every website we build comes with essential features to help your business succeed online
            </p>
          </motion.div>
          <div className="max-w-4xl mx-auto space-y-16">
            {coreServices.map((service, i) => (
              <FeatureSection
                key={i}
                title={service.title}
                description={service.description}
                imageIcon={service.icon}
                reverse={i % 2 !== 0}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Process</h2>
            <p className="text-lg text-muted-foreground">
              From concept to launch in 4 streamlined steps
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {process.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Card className="p-6 h-full border-border">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </Card>
                {i < process.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-border" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Website Building Plans</h2>
            <p className="text-lg text-muted-foreground">
              Choose the plan that fits your needs — all include hosting
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  className={`p-6 h-full ${
                    pkg.popular ? "border-2 border-primary shadow-lg shadow-primary/20" : "border-border"
                  } relative`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <Star className="w-3 h-3" /> Most Popular
                    </div>
                  )}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{pkg.emoji}</span>
                      <h3 className="text-xl font-bold">{pkg.name}</h3>
                    </div>
                    <div className="space-y-1">
                      <div className="text-3xl font-bold text-primary">
                        ${pkg.monthlyPrice}<span className="text-lg font-normal text-muted-foreground">/mo</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        or ${pkg.annualPrice}/yr (save ~15%)
                      </div>
                      <div className="text-sm font-medium text-primary">
                        Build: ${pkg.buildPrice} ({pkg.pages})
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{pkg.description}</p>
                    <ul className="space-y-2">
                      {pkg.features.slice(0, 8).map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to="/quote" state={{ plan: pkg.name }}>
                      <Button className="w-full mt-4">Get Started</Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              Prepay 6 months = <span className="text-primary font-semibold">50% off build</span> | Prepay 12 months = <span className="text-primary font-semibold">FREE build</span>
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Calculator */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="text-center mb-8">
              <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
                <Calculator className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Prepay Savings Calculator</h2>
              <p className="text-lg text-muted-foreground">
                See how much you can save by prepaying your hosting
              </p>
            </div>
            
            <Card className="p-6 md:p-8">
              <div className="space-y-6">
                {/* Plan Selection */}
                <div>
                  <label className="block text-sm font-medium mb-3">Select Plan</label>
                  <div className="grid grid-cols-3 gap-3">
                    {packages.map((pkg) => (
                      <button
                        key={pkg.id}
                        onClick={() => setSelectedPlan(pkg.id)}
                        className={`p-3 rounded-lg border-2 transition-all text-center ${
                          selectedPlan === pkg.id
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <span className="text-lg">{pkg.emoji}</span>
                        <div className="text-sm font-medium">{pkg.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Prepay Selection */}
                <div>
                  <label className="block text-sm font-medium mb-3">Prepay Period</label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => setPrepayMonths(0)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        prepayMonths === 0
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="text-sm font-medium">Monthly</div>
                      <div className="text-xs text-muted-foreground">No prepay</div>
                    </button>
                    <button
                      onClick={() => setPrepayMonths(6)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        prepayMonths === 6
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="text-sm font-medium">6 Months</div>
                      <div className="text-xs text-primary">50% off build</div>
                    </button>
                    <button
                      onClick={() => setPrepayMonths(12)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        prepayMonths === 12
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="text-sm font-medium">12 Months</div>
                      <div className="text-xs text-primary">FREE build</div>
                    </button>
                  </div>
                </div>

                {/* Results */}
                {prepayMonths > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="pt-6 border-t border-border"
                  >
                    <div className="grid md:grid-cols-3 gap-4 text-center">
                      <div className="p-4 rounded-lg bg-muted/50">
                        <div className="text-sm text-muted-foreground mb-1">Regular Cost</div>
                        <div className="text-xl font-bold line-through text-muted-foreground">
                          ${savings.regularCost}
                        </div>
                      </div>
                      <div className="p-4 rounded-lg bg-primary/10">
                        <div className="text-sm text-muted-foreground mb-1">With Prepay</div>
                        <div className="text-xl font-bold text-primary">
                          ${savings.prepayCost}
                        </div>
                      </div>
                      <div className="p-4 rounded-lg bg-green-500/10">
                        <div className="text-sm text-muted-foreground mb-1">You Save</div>
                        <div className="text-xl font-bold text-green-500">
                          ${savings.savings}
                        </div>
                      </div>
                    </div>
                    <p className="text-center text-sm text-muted-foreground mt-4">
                      Build price: <span className="text-primary font-semibold">{savings.buildDiscount}</span>
                    </p>
                  </motion.div>
                )}
              </div>
            </Card>
          </motion.div>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Build Your Website?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Get started today and have your professional website live in under a week
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

export default WebsiteBuilding;
