import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  CheckCircle2, ArrowRight, X, Star, Shield, Zap, DollarSign, AlertCircle,
} from "lucide-react";
import { SEO } from "@/components/SEO";
import { pricingProducts } from "@/lib/structuredData";

const fade = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.08 } }),
};

const plans = [
  {
    name: "Starter",
    monthly: 39,
    annual: 468,
    buildPrice: 349,
    description: "Perfect for new businesses getting online",
    bestFor: "Solo entrepreneurs & new businesses",
    features: [
      { label: "Pages included", value: "3 pages" },
      { label: "Mobile optimised", value: true },
      { label: "Basic SEO setup", value: true },
      { label: "Contact form", value: true },
      { label: "Monthly updates", value: "30 min/mo" },
      { label: "Support response", value: "48–72 hrs" },
      { label: "Analytics dashboard", value: false },
      { label: "Blog or store", value: false },
      { label: "Professional email", value: false },
    ],
  },
  {
    name: "Business",
    monthly: 69,
    annual: 828,
    buildPrice: 599,
    popular: true,
    description: "Everything a growing business needs",
    bestFor: "Small businesses ready to scale",
    features: [
      { label: "Pages included", value: "Up to 6 pages" },
      { label: "Custom brand design", value: true },
      { label: "Enhanced SEO", value: true },
      { label: "Advanced forms", value: true },
      { label: "Monthly updates", value: "2 hrs/mo" },
      { label: "Support response", value: "24 hrs" },
      { label: "Analytics dashboard", value: true },
      { label: "Blog or store add-on", value: true },
      { label: "Professional email", value: "1 inbox" },
    ],
  },
  {
    name: "Pro",
    monthly: 99,
    annual: 1188,
    buildPrice: 999,
    description: "Premium performance for established brands",
    bestFor: "Established businesses & high-traffic sites",
    features: [
      { label: "Pages included", value: "Up to 9 pages" },
      { label: "Fully custom design", value: true },
      { label: "Full local SEO", value: true },
      { label: "Form automation", value: true },
      { label: "Monthly updates", value: "4 hrs/mo" },
      { label: "Support response", value: "Same day" },
      { label: "Advanced analytics", value: true },
      { label: "Blog & store included", value: true },
      { label: "Professional email", value: "5 inboxes" },
    ],
  },
];

const included = [
  { icon: Shield, title: "Free SSL certificate", desc: "Secure browsing for your visitors" },
  { icon: Zap, title: "Fast hosting", desc: "99.9% uptime guarantee" },
  { icon: DollarSign, title: "Free domain (year 1)", desc: "$18–22/yr renewal after that" },
  { icon: CheckCircle2, title: "Regular backups", desc: "Your data is always safe" },
];

const honestFaqs = [
  { q: "What happens if I cancel?", a: "Monthly: cancel anytime. Annual: you've paid upfront so service continues for the full 12 months. You own your domain and content — we'll help you move everything if needed." },
  { q: "Are there any other costs?", a: "Domain renewal after year 1 ($18–22/yr). Extras like e-commerce, additional pages, or custom integrations are quoted separately — always before work begins. No surprise bills." },
  { q: "Why is the build free with annual?", a: "Your 12-month commitment gives us the certainty to invest time building your site. Monthly plans don't offer that, so there's a one-time build fee. It's a fair trade." },
  { q: "Can I upgrade or downgrade?", a: "Yes. Upgrades happen immediately (we prorate the difference). Downgrades take effect at the next billing cycle." },
];

const PricingPage = () => {
  const [isYearly, setIsYearly] = useState(true);
  const [showTable, setShowTable] = useState(false);

  return (
    <>
      <SEO
        title="Website Design & Hosting Pricing — Dark Mesa"
        description="Transparent pricing for website design and hosting. Starter $39/mo, Business $69/mo, Pro $99/mo. Pay annually and get your website built FREE."
        keywords="website pricing, web design cost, hosting prices, small business website cost"
        canonical="https://darkmesahosting.com/pricing"
        ogImage="https://images.unsplash.com/photo-1554224311-beee460201b4?w=1200&auto=format&fit=crop"
        schemas={pricingProducts}
      />

      <div className="min-h-screen bg-background">
        {/* ─── PAGE HEADER ─── */}
        <section className="pt-24 pb-10 px-4 sm:px-6 text-center">
          <motion.div variants={fade} initial="hidden" animate="show">
            <h1 className="text-4xl sm:text-5xl font-bold mb-3">Simple, transparent pricing</h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Design, hosting, maintenance, and support — all in one package. No hidden fees.
            </p>
          </motion.div>
        </section>

        {/* ─── TOGGLE ─── */}
        <section className="pb-10 px-4 sm:px-6">
          <div className="flex flex-col items-center gap-4">
            <div className="inline-flex items-center bg-muted border border-border rounded-full p-1">
              <button
                onClick={() => setIsYearly(false)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  !isYearly ? "bg-background shadow text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  isYearly ? "bg-background shadow text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Annual — save with free build
              </button>
            </div>
            {isYearly && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-primary font-semibold"
              >
                Pay annually and we build your website at no extra charge ($349–$999 value)
              </motion.p>
            )}
          </div>
        </section>

        {/* ─── PLAN CARDS ─── */}
        <section className="pb-16 px-4 sm:px-6">
          <div className="container mx-auto max-w-5xl">
            <div className="grid md:grid-cols-3 gap-6">
              {plans.map((plan, i) => (
                <motion.div
                  key={plan.name}
                  variants={fade}
                  initial="hidden"
                  animate="show"
                  custom={i}
                >
                  <Card
                    className={`relative p-6 h-full flex flex-col transition-shadow hover:shadow-lg ${
                      plan.popular
                        ? "border-2 border-primary shadow-md"
                        : "border border-border"
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-0.5 rounded-full flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" /> Most Popular
                      </div>
                    )}

                    {/* Header */}
                    <div className="mb-5">
                      <h2 className="text-xl font-bold">{plan.name}</h2>
                      <p className="text-sm text-muted-foreground mt-0.5">{plan.description}</p>
                    </div>

                    {/* Price */}
                    <div className="mb-5 pb-5 border-b border-border">
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold">${isYearly ? Math.round(plan.annual / 12) : plan.monthly}</span>
                        <span className="text-muted-foreground text-sm">/mo</span>
                      </div>
                      {isYearly ? (
                        <div className="mt-2">
                          <p className="text-xs text-muted-foreground">${plan.annual} billed annually</p>
                          <div className="mt-1.5 bg-primary/8 border border-primary/20 rounded-md px-2.5 py-1.5">
                            <p className="text-xs font-bold text-primary">Website design: FREE (save ${plan.buildPrice})</p>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-2">
                          <p className="text-xs text-muted-foreground">Billed monthly, cancel anytime</p>
                          <div className="mt-1.5 bg-muted rounded-md px-2.5 py-1.5">
                            <p className="text-xs font-semibold">+ ${plan.buildPrice} one-time build fee</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Features */}
                    <ul className="space-y-2.5 flex-1 mb-6">
                      {plan.features.map((f) => (
                        <li key={f.label} className="flex items-center justify-between gap-2 text-sm">
                          <span className="text-muted-foreground">{f.label}</span>
                          {typeof f.value === "boolean" ? (
                            f.value ? (
                              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            ) : (
                              <X className="w-4 h-4 text-muted-foreground/40 flex-shrink-0" />
                            )
                          ) : (
                            <span className="font-medium text-right">{f.value}</span>
                          )}
                        </li>
                      ))}
                    </ul>

                    <Link to="/quote" className="block mt-auto">
                      <Button
                        className="w-full font-semibold"
                        variant={plan.popular ? "default" : "outline"}
                      >
                        Choose {plan.name}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                    <p className="text-center text-xs text-muted-foreground mt-2">
                      {isYearly ? `$${plan.annual}/year total` : `$${plan.monthly * 12 + plan.buildPrice} first year total`}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Comparison table toggle */}
            <div className="text-center mt-8">
              <button
                onClick={() => setShowTable(!showTable)}
                className="text-sm text-primary font-semibold hover:underline"
              >
                {showTable ? "Hide" : "Show"} side-by-side feature comparison
              </button>
            </div>

            {showTable && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 overflow-x-auto rounded-lg border border-border"
              >
                <table className="w-full text-sm">
                  <thead className="bg-muted/60">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">Feature</th>
                      {plans.map((p) => (
                        <th key={p.name} className="px-4 py-3 text-center font-semibold">
                          {p.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {[
                      ["Pages", "3", "Up to 6", "Up to 9"],
                      ["Design", "Template", "Custom branded", "Fully custom"],
                      ["SEO", "Basic", "Enhanced", "Full local SEO"],
                      ["Updates", "30 min/mo", "2 hrs/mo", "4 hrs/mo"],
                      ["Support", "48–72 hrs", "24 hrs", "Same day"],
                      ["Analytics", "—", "✓", "✓"],
                      ["Blog / Store", "—", "Add-on", "Included"],
                      ["Email", "—", "1 inbox", "5 inboxes"],
                    ].map(([label, ...vals]) => (
                      <tr key={label} className="hover:bg-muted/20">
                        <td className="px-4 py-3 font-medium">{label}</td>
                        {vals.map((v, i) => (
                          <td key={i} className="px-4 py-3 text-center text-muted-foreground">{v}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            )}
          </div>
        </section>

        {/* ─── ALWAYS INCLUDED ─── */}
        <section className="py-16 px-4 sm:px-6 bg-muted/30 border-y border-border">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold text-center mb-8">Every plan includes</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
              {included.map((item, i) => (
                <motion.div
                  key={item.title}
                  variants={fade}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  custom={i}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-3">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── HONEST FAQ ─── */}
        <section className="py-16 px-4 sm:px-6">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-center mb-8">Honest answers</h2>
            <div className="space-y-4">
              {honestFaqs.map((faq, i) => (
                <motion.div
                  key={i}
                  variants={fade}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  custom={i}
                >
                  <Card className="p-5">
                    <div className="flex gap-3">
                      <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-sm mb-1">{faq.q}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="py-16 px-4 sm:px-6 bg-primary text-primary-foreground">
          <div className="container mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold mb-3">Ready to get your website?</h2>
            <p className="opacity-90 mb-7">Get a custom quote in 60 seconds. No sales calls, no pressure.</p>
            <Link to="/quote">
              <Button size="lg" variant="secondary" className="font-bold shadow-lg">
                Get My Free Quote
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <p className="text-xs mt-5 opacity-60">No credit card required · Free consultation · Cancel anytime</p>
          </div>
        </section>
      </div>
    </>
  );
};

export default PricingPage;
