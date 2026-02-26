import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  CheckCircle2, ArrowRight, Star, ChevronDown,
} from "lucide-react";
import { SEO } from "@/components/SEO";
import { organizationSchema, localBusinessSchema } from "@/lib/structuredData";
import { PortfolioCardWithModal } from "@/components/DemoWebsiteModal";

const fade = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

const plans = [
  { name: "Starter", price: 39, annual: 468, pages: "3 pages", buildPrice: 349 },
  { name: "Business", price: 69, annual: 828, pages: "6 pages", buildPrice: 599, popular: true },
  { name: "Pro", price: 99, annual: 1188, pages: "9 pages", buildPrice: 999 },
];


const steps = [
  { step: 1, title: "Tell us about your business", body: "Fill out our 60-second quote form. Tell us what you need and we'll send you a custom proposal." },
  { step: 2, title: "We build your website", body: "Our team designs and builds your website in 5–14 business days. You review and request changes." },
  { step: 3, title: "Launch and grow", body: "We launch your site, handle all hosting and maintenance, and support you as your business grows." },
];

const faqs = [
  { q: "Do I really get the website built for free?", a: "Yes — when you sign up for any annual hosting plan, we build your website at no extra charge (saves you $349–$999). Month-to-month plans carry a one-time build fee." },
  { q: "How long until my site is live?", a: "Most sites are ready in 5–14 business days depending on the plan. Simple 3-page sites are often done in 5 days." },
  { q: "What if I need changes after launch?", a: "Minor updates (text, images, small tweaks) are included in your plan. Major new pages or redesigns are quoted separately—always before any work begins." },
  { q: "Can I cancel anytime?", a: "Yes. No long-term lock-in. If you cancel you own your website and we'll help you move it." },
  { q: "Do you use templates or custom design?", a: "We use professional templates customized to your brand—giving you a custom look without the $5,000+ price tag of fully bespoke development." },
];

const HomePage = () => {
  const [billing, setBilling] = useState<"monthly" | "annual">("annual");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Free Website Design for Small Business | Hosting from $39/mo – Dark Mesa"
        description="Get your small business website built FREE when you host with us. Professional design, unlimited updates, and 24/7 support starting at $39/month. No contracts."
        keywords="small business website design, free website design, affordable web hosting, website builder for small business"
        canonical="https://darkmesahosting.com"
        ogImage="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop"
        schemas={[organizationSchema, localBusinessSchema]}
      />

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 text-center overflow-hidden" style={{ background: 'radial-gradient(ellipse at center, hsl(210 14% 92%), hsl(var(--background)))' }}>
        <div className="relative z-10 max-w-3xl mx-auto space-y-7">
          {/* Headline */}
          <motion.h1
            variants={fade}
            initial="hidden"
            animate="show"
            custom={0}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Websites That Work While You Do.
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            variants={fade}
            initial="hidden"
            animate="show"
            custom={1}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Custom design, hosting, and maintenance for{" "}
            <strong className="text-foreground">$39/mo</strong>. No technical headaches, just results.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fade}
            initial="hidden"
            animate="show"
            custom={2}
            className="flex flex-col sm:flex-row gap-3 justify-center pt-2"
          >
            <Link to="/quote">
              <Button size="lg" className="w-full sm:w-auto h-12 px-8 font-semibold shadow-md" style={{ background: 'linear-gradient(135deg, hsl(174 70% 41%), hsl(177 50% 30%))', border: 'none' }}>
                Get My Free Quote
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link to="/website-building">
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 font-semibold border-2">
                See Example Websites
              </Button>
            </Link>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            variants={fade}
            initial="hidden"
            animate="show"
            custom={3}
            className="flex flex-wrap justify-center gap-6 pt-4 text-sm text-muted-foreground"
          >
            {["No credit card", "Free consultation", "Cancel anytime"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                {t}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Scroll cue */}
        <a
          href="#portfolio"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors animate-bounce"
          aria-label="Scroll down"
        >
          <ChevronDown className="w-6 h-6" />
        </a>
      </section>


      {/* ─── PORTFOLIO ─── */}
      <section id="portfolio" className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">See what you'll get</h2>
            <p className="text-muted-foreground">Professional website designs built for businesses like yours</p>
          </motion.div>

          <PortfolioCardWithModal />

          <div className="text-center mt-8">
            <Link to="/website-building">
              <Button variant="outline" size="sm" className="border-2 font-semibold">
                Browse all website examples
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-16 md:py-24 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">How it works</h2>
            <p className="text-muted-foreground">Your new website in three simple steps</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                variants={fade}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={i}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg mb-4">
                  {s.step}
                </div>
                <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COST COMPARISON ─── */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Save thousands on web design</h2>
            <p className="text-muted-foreground">All-in-one pricing vs. traditional agencies</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Traditional */}
            <motion.div
              variants={fade}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={0}
            >
              <Card className="p-6 border-2 border-destructive/20 h-full">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold text-lg">Traditional Agency</h3>
                  <span className="text-xs bg-destructive/10 text-destructive px-2 py-0.5 rounded font-semibold">EXPENSIVE</span>
                </div>
                <ul className="space-y-2.5 text-sm mb-6">
                  {[
                    "Design: $2,000 – $10,000",
                    "Hosting: $20 – $100/mo",
                    "SSL certificate: $50 – $200/yr",
                    "Updates: $100 – $200/mo",
                    "Backups & security: $30 – $100/mo",
                    "Support: $75 – $150/hr",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <span className="text-destructive mt-0.5 flex-shrink-0">✗</span>
                      <span className="text-muted-foreground">{t}</span>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-border pt-4">
                  <p className="font-bold text-destructive">Year one: $4,000 – $14,000+</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Then $2,000 – $4,000 per year ongoing</p>
                </div>
              </Card>
            </motion.div>

            {/* Dark Mesa */}
            <motion.div
              variants={fade}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={1}
            >
              <Card className="p-6 border-2 border-primary h-full" style={{ boxShadow: '0 0 30px -5px hsl(177 60% 40% / 0.15)' }}>
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold text-lg">Dark Mesa All-Inclusive</h3>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded font-semibold">SMART CHOICE</span>
                </div>
                <ul className="space-y-2.5 text-sm mb-6">
                  {[
                    "Website design: FREE with annual plan",
                    "Fast hosting: Included",
                    "SSL certificate: Included",
                    "Monthly updates: Included",
                    "Daily backups & security: Included",
                    "Priority support: Included",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-border pt-4">
                  <p className="font-bold text-primary">Year one: $468 – $1,188</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Save $3,500 – $12,800 in year one</p>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── PRICING PREVIEW ─── */}
      <section className="py-16 md:py-24 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Simple, transparent pricing</h2>
            <p className="text-muted-foreground">All-inclusive packages — no hidden fees</p>
          </motion.div>

          {/* Toggle */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center bg-background border border-border rounded-full p-1 shadow-sm">
              {(["monthly", "annual"] as const).map((b) => (
                <button
                  key={b}
                  onClick={() => setBilling(b)}
                  className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 capitalize ${
                    billing === b
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {b === "monthly" ? "Month-to-month" : "Annual (save)"}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                variants={fade}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={i}
              >
                <Card
                  className={`p-6 relative h-full transition-shadow hover:shadow-lg ${
                    plan.popular ? "border-2 border-primary" : "border border-border"
                  }`}
                  style={plan.popular ? { boxShadow: '0 0 40px -8px hsl(177 60% 40% / 0.2)' } : undefined}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-0.5 rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" /> Most Popular
                    </div>
                  )}
                  <h3 className="font-bold text-lg mb-1">{plan.name}</h3>
                  <p className="text-3xl font-bold mb-0.5">
                    ${plan.price}
                    <span className="text-base font-normal text-muted-foreground">/mo</span>
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">{plan.pages}</p>

                  {billing === "annual" ? (
                    <div className="bg-primary/8 border border-primary/20 rounded-md p-2.5 mb-5 text-center">
                      <p className="text-sm font-bold text-primary">Website design included FREE</p>
                      <p className="text-xs text-muted-foreground">${plan.annual}/year billed annually</p>
                    </div>
                  ) : (
                    <div className="bg-muted rounded-md p-2.5 mb-5 text-center">
                      <p className="text-sm font-semibold">+ ${plan.buildPrice} one-time build fee</p>
                      <p className="text-xs text-muted-foreground">Then ${plan.price}/month</p>
                    </div>
                  )}

                  <Link to="/quote" className="block">
                    <Button
                      className="w-full font-semibold"
                      variant={plan.popular ? "default" : "outline"}
                    >
                      Get Started
                    </Button>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-6">
            <Link to="/pricing" className="text-sm text-primary font-semibold hover:underline">
              View full feature comparison →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Common questions</h2>
            <p className="text-muted-foreground">Everything you need to know before getting started</p>
          </motion.div>

          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                variants={fade}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={i}
              >
                <Card className="border border-border overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between p-5 text-left font-semibold text-sm hover:bg-muted/50 transition-colors"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    {faq.q}
                    <ChevronDown
                      className={`w-4 h-4 flex-shrink-0 ml-4 text-muted-foreground transition-transform duration-200 ${
                        openFaq === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">
                      {faq.a}
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/faq" className="text-sm text-primary font-semibold hover:underline">
              View all FAQs →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-16 md:py-24 text-primary-foreground" style={{ background: 'linear-gradient(135deg, hsl(0 0% 20%), hsl(0 0% 15%))' }}>
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl text-center">
          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready for your professional website?
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Get a custom quote in 60 seconds. No sales calls, no pressure.
            </p>
            <Link to="/quote">
              <Button
                size="lg"
                variant="secondary"
                className="h-12 px-8 font-bold shadow-lg hover:shadow-xl transition-shadow"
              >
                Get My Free Quote
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <p className="text-xs mt-5 opacity-60">
              No credit card required · Free consultation · Cancel anytime
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
