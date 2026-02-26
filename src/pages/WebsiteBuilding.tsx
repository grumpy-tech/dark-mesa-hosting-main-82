import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Globe, Star, Mail, FileText, Image, Smartphone } from "lucide-react";
import { SEO } from "@/components/SEO";
import { websiteBuildingService } from "@/lib/structuredData";

const fade = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.07 } }),
};

const packages = [
  {
    id: "starter", name: "Starter", buildPrice: 349, monthlyPrice: 39, pages: "3 pages",
    description: "Perfect for new businesses needing a clean professional presence.",
    features: ["3 professionally designed pages", "Mobile responsive", "Contact form", "Basic SEO", "Fast loading", "Hosting included"],
  },
  {
    id: "business", name: "Business", buildPrice: 599, monthlyPrice: 69, pages: "Up to 6 pages", popular: true,
    description: "For growing businesses that want stronger online visibility.",
    features: ["Up to 6 custom pages", "Custom brand design", "Advanced forms", "Enhanced SEO", "Analytics tracking", "Priority support"],
  },
  {
    id: "pro", name: "Pro", buildPrice: 999, monthlyPrice: 99, pages: "Up to 9 pages",
    description: "For established businesses wanting maximum performance.",
    features: ["Up to 9 premium pages", "Fully custom design", "Advanced SEO & tracking", "Lead capture automation", "Blog or online store", "Same-day support"],
  },
];

const extras = [
  { icon: Mail, title: "Professional email", desc: "your@yourbusiness.com (Business & Pro plans)" },
  { icon: FileText, title: "Custom forms", desc: "Contact, quote, and booking forms that reach your inbox" },
  { icon: Image, title: "Image optimisation", desc: "Photos that load fast without losing quality" },
  { icon: Smartphone, title: "Mobile perfect", desc: "Looks great on phones, tablets, and computers" },
];

const WebsiteBuilding = () => (
  <>
    <SEO
      title="Professional Website Design for Small Business — Dark Mesa"
      description="Custom website design starting at $349. Mobile-responsive, SEO-optimised, delivered in 5–14 days. Three packages for every budget."
      keywords="website building, custom website design, small business web design, professional website"
      canonical="https://darkmesahosting.com/website-building"
      schemas={[websiteBuildingService]}
    />

    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="pt-24 pb-12 px-4 sm:px-6 text-center">
        <motion.div variants={fade} initial="hidden" animate="show">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
            <Globe className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-3">
            A professional website that gets you customers
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-6">
            We design, build, host, and maintain everything — so you can focus on running your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/quote">
              <Button className="font-semibold">Get Free Quote <ArrowRight className="ml-2 w-4 h-4" /></Button>
            </Link>
            <Link to="/pricing">
              <Button variant="outline" className="font-semibold">See All Plans</Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Steps */}
      <section className="py-16 px-4 sm:px-6 bg-muted/30 border-y border-border">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-center mb-10">From idea to live in 3 steps</h2>
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            {[
              { n: 1, title: "Tell us about your business", desc: "Fill out our 60-second form. We send you a custom proposal." },
              { n: 2, title: "We design & build", desc: "Professional design tailored to your brand, ready in 5–14 days." },
              { n: 3, title: "Launch & grow", desc: "We handle hosting, maintenance, and support ongoing." },
            ].map((s, i) => (
              <motion.div key={s.n} variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}>
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center mx-auto mb-3">{s.n}</div>
                <h3 className="font-semibold text-sm mb-1">{s.title}</h3>
                <p className="text-xs text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-2">Choose your website package</h2>
            <p className="text-muted-foreground text-sm">Pay 12 months upfront and the build is FREE</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {packages.map((pkg, i) => (
              <motion.div key={pkg.id} variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}>
                <Card className={`p-6 h-full flex flex-col relative transition-shadow hover:shadow-lg ${pkg.popular ? "border-2 border-primary shadow-md" : "border border-border"}`}>
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-0.5 rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" /> Most Popular
                    </div>
                  )}

                  <div className="mb-4">
                    <h3 className="font-bold text-lg">{pkg.name}</h3>
                    <p className="text-xs text-muted-foreground">{pkg.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="bg-muted rounded-md p-3 text-center">
                      <p className="text-xs text-muted-foreground mb-0.5">One-time build</p>
                      <p className="font-bold text-lg">${pkg.buildPrice}</p>
                    </div>
                    <div className="bg-primary/8 border border-primary/20 rounded-md p-3 text-center">
                      <p className="text-xs text-muted-foreground mb-0.5">Monthly</p>
                      <p className="font-bold text-lg text-primary">${pkg.monthlyPrice}</p>
                    </div>
                  </div>

                  <div className="bg-primary/5 border border-primary/15 rounded-md p-2.5 mb-4 text-center">
                    <p className="text-xs font-bold text-primary">Annual plan: build included FREE (save ${pkg.buildPrice})</p>
                  </div>

                  <ul className="space-y-2 flex-1 mb-5">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link to="/quote" state={{ plan: pkg.name, serviceCategory: "bundle" }}>
                    <Button className="w-full font-semibold" variant={pkg.popular ? "default" : "outline"}>
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

      {/* What's included */}
      <section className="py-16 px-4 sm:px-6 bg-muted/30 border-y border-border">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-center mb-8">What's built into every website</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
            {extras.map((e, i) => (
              <motion.div key={e.title} variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i} className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full mb-3">
                  <e.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-sm mb-1">{e.title}</h3>
                <p className="text-xs text-muted-foreground">{e.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-4 sm:px-6 bg-primary text-primary-foreground text-center">
        <h2 className="text-2xl font-bold mb-2">Ready to get your website live?</h2>
        <p className="opacity-90 mb-6 text-sm">We handle everything — design, launch, and ongoing maintenance.</p>
        <Link to="/quote">
          <Button variant="secondary" className="font-bold">
            Get a Free Quote <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Link>
      </section>
    </div>
  </>
);

export default WebsiteBuilding;
