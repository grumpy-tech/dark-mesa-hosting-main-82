import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Server, Shield, Clock, Zap, CheckCircle2, ArrowRight, Coffee, Wrench, FileCheck, Star } from "lucide-react";
import { SEO } from "@/components/SEO";
import { hostingService } from "@/lib/structuredData";

const fade = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.07 } }),
};

const benefits = [
  { icon: Coffee, title: "Set and forget", desc: "We handle all the technical details so you can focus on your business." },
  { icon: Clock, title: "Always online", desc: "99.9% uptime with 24/7 monitoring. Your site is always open for business." },
  { icon: Shield, title: "Secure & protected", desc: "Advanced security keeps hackers out. Your data and customers stay safe." },
  { icon: Zap, title: "Lightning fast", desc: "Optimised for speed — fast loading means happy customers and better SEO." },
  { icon: Wrench, title: "Free monthly updates", desc: "Change hours, add photos, update text. Just email us — we handle it." },
  { icon: FileCheck, title: "Automatic backups", desc: "Regular copies of your site. If anything breaks, we restore it instantly." },
];

const plans = [
  {
    name: "Starter", monthly: 39, annual: 468,
    description: "For simple business websites",
    features: ["99.9% uptime", "1 update/month (30 min)", "Monthly backups", "Basic security", "48–72 hr email support"],
  },
  {
    name: "Business", monthly: 69, annual: 828, popular: true,
    description: "For growing businesses",
    features: ["99.99% uptime", "5 updates/month (2 hrs)", "Twice-monthly backups", "Advanced firewall", "24 hr priority support", "1 professional email inbox"],
  },
  {
    name: "Pro", monthly: 99, annual: 1188,
    description: "For established businesses",
    features: ["99.99% uptime", "Unlimited updates (4 hrs/mo)", "Weekly + daily backups", "Proactive security scans", "Same-day support", "5 professional email inboxes"],
  },
];

const Hosting = () => (
  <>
    <SEO
      title="Managed Web Hosting from $39/mo — Dark Mesa"
      description="Reliable managed web hosting with 99.9% uptime, SSL, daily backups, and free monthly site updates. Plans from $39/month."
      keywords="web hosting, small business hosting, managed hosting, secure web hosting"
      canonical="https://darkmesahosting.com/hosting"
      schemas={[hostingService]}
    />

    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="pt-24 pb-12 px-4 sm:px-6 text-center">
        <motion.div variants={fade} initial="hidden" animate="show">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
            <Server className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-3">Hosting that just works</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-6">
            Reliable, fast, and secure — with zero technical headaches. We keep your site running while you run your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/quote">
              <Button className="font-semibold">Get Started <ArrowRight className="ml-2 w-4 h-4" /></Button>
            </Link>
            <Link to="/pricing">
              <Button variant="outline" className="font-semibold">See All Plans</Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4 sm:px-6 bg-muted/30 border-y border-border">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-center mb-10">What's included in every plan</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {benefits.map((b, i) => (
              <motion.div key={b.title} variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}>
                <Card className="p-5 h-full hover:shadow-md transition-shadow">
                  <div className="p-2.5 bg-primary/10 rounded-lg w-fit mb-3">
                    <b.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1 text-sm">{b.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{b.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-2">Choose your plan</h2>
            <p className="text-muted-foreground text-sm">Pay annually and your website design is included FREE</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {plans.map((plan, i) => (
              <motion.div key={plan.name} variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}>
                <Card className={`p-6 h-full flex flex-col relative transition-shadow hover:shadow-lg ${plan.popular ? "border-2 border-primary shadow-md" : "border border-border"}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-0.5 rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" /> Most Popular
                    </div>
                  )}
                  <h3 className="font-bold text-lg mb-0.5">{plan.name}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{plan.description}</p>
                  <div className="text-3xl font-bold mb-0.5">${plan.monthly}<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
                  <p className="text-xs text-muted-foreground mb-5">${plan.annual}/year billed annually</p>
                  <ul className="space-y-2 flex-1 mb-6">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link to="/quote" state={{ plan: plan.name, serviceCategory: "hosting" }}>
                    <Button className="w-full font-semibold" variant={plan.popular ? "default" : "outline"}>
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

      {/* CTA */}
      <section className="py-14 px-4 sm:px-6 bg-primary text-primary-foreground text-center">
        <h2 className="text-2xl font-bold mb-2">Ready to get started?</h2>
        <p className="opacity-90 mb-6 text-sm">We'll handle the technical details — you focus on growing.</p>
        <Link to="/quote">
          <Button variant="secondary" className="font-bold">
            Get a Free Quote <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Link>
      </section>
    </div>
  </>
);

export default Hosting;
