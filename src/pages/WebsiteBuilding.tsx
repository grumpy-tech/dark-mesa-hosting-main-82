import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Globe, Star } from "lucide-react";

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
      "Mobile & tablet friendly",
      "Basic contact form",
      "Google search visibility setup",
      "Fast loading speeds",
      "Ongoing hosting & maintenance",
      "Security & daily monitoring",
    ],
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
      "Fully custom branding",
      "Advanced contact forms",
      "Local Google SEO setup",
      "Google Analytics tracking",
      "Priority support",
      "Daily backups & security",
    ],
    popular: true,
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
      "High-conversion design",
      "Advanced SEO & tracking",
      "Automation & lead funnels",
      "Blog or online store",
      "Instant support access",
      "Full security & backups",
    ],
  },
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
          <Link to="/quote">
            <Button size="lg">
              Get Your Free Quote <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">
          {[
            ["1", "Tell Us About Your Business"],
            ["2", "We Build Your Website"],
            ["3", "You Go Live & Get Customers"],
          ].map(([num, text]) => (
            <Card key={num} className="p-8">
              <div className="text-3xl font-bold text-primary mb-3">{num}</div>
              <p className="text-lg font-medium">{text}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* PLANS */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Simple, Honest Pricing</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              One-time website build + affordable monthly hosting. No hidden fees.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg) => (
              <Card
                key={pkg.id}
                className={`p-8 border-2 ${
                  pkg.popular ? "border-primary shadow-lg" : "border-border"
                } relative`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Star className="w-4 h-4" /> Most Popular
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className="text-3xl mb-2">{pkg.emoji}</div>
                  <h3 className="text-2xl font-bold">{pkg.name}</h3>
                  <p className="text-muted-foreground mt-1">{pkg.pages}</p>
                </div>

                {/* BUILD */}
                <div className="bg-muted/40 p-4 rounded-lg text-center mb-4">
                  <div className="text-sm text-muted-foreground uppercase mb-1">
                    One-Time Website Build
                  </div>
                  <div className="text-3xl font-bold">${pkg.buildPrice}</div>
                </div>

                {/* HOSTING */}
                <div className="bg-primary/10 p-4 rounded-lg text-center mb-6">
                  <div className="text-sm text-muted-foreground uppercase mb-1">
                    Monthly Hosting & Support
                  </div>
                  <div className="text-3xl font-bold text-primary">
                    ${pkg.monthlyPrice}/mo
                  </div>
                </div>

                {/* FREE BUILD OFFER */}
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-center mb-6">
                  <div className="text-sm font-semibold text-green-600">
                    🎁 SPECIAL BONUS
                  </div>
                  <div className="font-bold">Pay 12 Months Upfront</div>
                  <div className="text-green-500 font-bold text-lg">
                    WEBSITE BUILD FREE
                  </div>
                  <div className="text-xs text-muted-foreground">
                    (Save ${pkg.buildPrice})
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex gap-2 items-start text-sm">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link to="/quote" state={{ plan: pkg.name }}>
                  <Button className="w-full">Get Started</Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 text-center bg-card/30">
        <h2 className="text-4xl font-bold mb-4">
          Ready To Get Your Website Live?
        </h2>
        <p className="text-muted-foreground mb-8">
          We’ll handle everything — from design to launch.
        </p>
        <Link to="/quote">
          <Button size="lg">
            Get Your Free Quote <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </Link>
      </section>
    </>
  );
};

export default WebsiteBuilding;
