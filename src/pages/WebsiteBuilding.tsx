import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Globe, Star, Mail, FileText, Image, Smartphone } from "lucide-react";

const packages = [
  {
    id: "starter",
    name: "Starter Website",
    emoji: "🟢",
    buildPrice: 349,
    monthlyPrice: 39,
    pages: "3 Pages",
    description: "Perfect for new businesses that need a clean, professional online presence.",
    features: [
      "3 professionally designed pages",
      "Works on all devices",
      "Basic contact form",
      "Get found on Google",
      "Fast loading speeds",
      "Hosting & maintenance included"
    ]
  },
  {
    id: "business",
    name: "Business Website",
    emoji: "🔵",
    buildPrice: 599,
    monthlyPrice: 69,
    pages: "Up to 6 Pages",
    description: "Best for growing businesses that want more content and stronger online visibility.",
    features: [
      "Up to 6 custom pages",
      "Custom design for your brand",
      "Advanced contact forms",
      "Better search rankings",
      "Analytics tracking included",
      "Priority support"
    ],
    popular: true
  },
  {
    id: "pro",
    name: "Pro Website",
    emoji: "🔴",
    buildPrice: 999,
    monthlyPrice: 99,
    pages: "Up to 9 Pages",
    description: "For established businesses that want maximum performance & lead generation.",
    features: [
      "Up to 9 premium pages",
      "Unique design just for you",
      "Advanced SEO & tracking",
      "Lead capture automation",
      "Blog or online store included",
      "Same-day support"
    ]
  }
];

const includedFeatures = [
  {
    icon: Mail,
    title: "Professional Email",
    description: "Get a professional email address like you@yourbusiness.com (Business & Pro plans)"
  },
  {
    icon: FileText,
    title: "Custom Forms",
    description: "Contact forms, quote requests, and booking forms that actually work and reach your inbox"
  },
  {
    icon: Image,
    title: "Image Optimization",
    description: "We make your photos load lightning-fast without losing quality"
  },
  {
    icon: Smartphone,
    title: "Mobile Perfection",
    description: "Your site looks and works great on phones, tablets, and computers — guaranteed"
  }
];

const WebsiteBuilding = () => {
  return (
    <>
      {/* HERO */}
      <section className="pt-32 pb-20 px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Globe className="w-14 h-14 text-primary mx-auto mb-5" />
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            A Professional Website That Gets You Customers
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            We design, build, host, and maintain your website — so you can focus on running your business.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/quote">
              <Button size="lg">
                Get Your Free Quote <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="outline">
                See All Plan Details
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground">
              From idea to launch in 3 simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { num: "1", title: "Tell Us About Your Business", desc: "Share your vision, we'll handle the rest" },
              { num: "2", title: "We Build Your Website", desc: "Professional design tailored to your brand" },
              { num: "3", title: "You Go Live & Get Customers", desc: "Launch fast and start growing" }
            ].map(({ num, title, desc }) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: parseInt(num) * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 text-center border-border hover:border-primary/50 transition-colors">
                  <div className="text-5xl font-bold text-primary mb-3">{num}</div>
                  <h3 className="text-xl font-semibold mb-2">{title}</h3>
                  <p className="text-muted-foreground">{desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need Included</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Professional features that make your website work for your business
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {includedFeatures.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full text-center border-border hover:border-primary/50 transition-all">
                  <div className="inline-block p-3 bg-primary/10 rounded-lg mb-4">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PLANS */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Website Package</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              One-time build + affordable monthly hosting. Pay 12 months upfront = FREE website build!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  className={`p-8 border-2 ${
                    pkg.popular ? "border-primary shadow-lg shadow-primary/20" : "border-border"
                  } relative flex flex-col h-full`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <Star className="w-4 h-4" /> Most Popular
                    </div>
                  )}

                  <div className="flex-1 space-y-6">
                    <div className="text-center space-y-2">
                      <div className="text-3xl mb-2">{pkg.emoji}</div>
                      <h3 className="text-2xl font-bold">{pkg.name}</h3>
                      <p className="text-sm text-muted-foreground">{pkg.pages}</p>
                      <p className="text-sm text-muted-foreground">{pkg.description}</p>
                    </div>

                    {/* BUILD */}
                    <div className="bg-muted/40 p-4 rounded-lg text-center">
                      <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                        One-Time Website Build
                      </div>
                      <div className="text-3xl font-bold">${pkg.buildPrice}</div>
                    </div>

                    {/* HOSTING */}
                    <div className="bg-primary/10 p-4 rounded-lg text-center">
                      <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                        Monthly Hosting & Support
                      </div>
                      <div className="text-3xl font-bold text-primary">
                        ${pkg.monthlyPrice}/mo
                      </div>
                    </div>

                    {/* FREE BUILD OFFER */}
                    <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-500/30 rounded-lg p-4 text-center">
                      <div className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wide mb-1">
                        💰 SPECIAL OFFER
                      </div>
                      <div className="text-sm font-bold mb-1">Pay 12 Months Upfront</div>
                      <div className="text-lg font-bold text-green-600 dark:text-green-400">
                        WEBSITE BUILD FREE
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        (Save ${pkg.buildPrice})
                      </div>
                    </div>

                    <ul className="space-y-3">
                      {pkg.features.map((feature) => (
                        <li key={feature} className="flex gap-2 items-start text-sm">
                          <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-6 border-t border-border">
                    <Link to="/quote" state={{ plan: pkg.name, serviceCategory: "bundle" }}>
                      <Button
                        className={`w-full ${
                          pkg.popular
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

          <div className="text-center mt-12 space-y-4">
            <p className="text-muted-foreground">
              Want to see the complete feature breakdown?
            </p>
            <Link to="/pricing">
              <Button size="lg" variant="outline">
                View Full Pricing & Features <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-background text-center">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready To Get Your Website Live?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              We'll handle everything — from design to launch to ongoing maintenance
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

export default WebsiteBuilding;
