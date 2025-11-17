import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Server, Shield, Clock, TrendingUp, HardDrive, Lock, CheckCircle2, ArrowRight, Zap } from "lucide-react";
const Hosting = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const features = [{
    icon: TrendingUp,
    title: "99.9% Uptime",
    description: "Your website stays online when you need it most"
  }, {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized servers for maximum performance"
  }, {
    icon: Lock,
    title: "SSL Included",
    description: "Free SSL certificate for secure connections"
  }, {
    icon: HardDrive,
    title: "Weekly Backups",
    description: "Automatic weekly backups of your website"
  }, {
    icon: Shield,
    title: "DDoS Protection",
    description: "Advanced security to protect your site"
  }, {
    icon: Clock,
    title: "24/7 Monitoring",
    description: "Continuous monitoring and automatic alerts"
  }];
  const plans = [{
    name: "Basic Hosting",
    price: 12,
    yearlyPrice: 129,
    description: "Perfect for simple websites and landing pages",
    features: ["Up to 5 pages", "Unlimited bandwidth", "SSL certificate", "Weekly backups", "99.9% uptime", "Email support", "Domain assistance"]
  }, {
    name: "Advanced Hosting",
    price: 18,
    yearlyPrice: 194,
    description: "For feature-rich sites with higher traffic",
    features: ["Unlimited pages", "Unlimited bandwidth", "SSL certificate", "Weekly backups", "99.9% uptime", "Priority support", "Advanced security", "CDN included"],
    popular: true
  }];
  return <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="text-center space-y-6">
            <div className="inline-block p-4 bg-accent/10 rounded-full mb-4">
              <Server className="w-12 h-12 text-accent" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold">
              Reliable Website Hosting
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Fast, secure, and affordable hosting with 99.9% uptime guarantee. Keep your website online 24/7 with our
              premium hosting services.
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Link to="/contact">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  Get Started <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button size="lg" variant="outline">
                  View All Plans
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Hosting?</h2>
            <p className="text-lg text-muted-foreground">
              Enterprise-grade hosting features at affordable prices
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, i) => <motion.div key={i} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: i * 0.1
          }} viewport={{
            once: true
          }}>
                <Card className="p-6 h-full border-border hover:border-accent/50 transition-colors">
                  <feature.icon className="w-10 h-10 text-accent mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto text-center">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} className="border-2 border-border rounded-lg p-6">
              <div className="text-4xl font-bold text-accent mb-2">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime Guarantee</div>
            </motion.div>
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.1
          }} viewport={{
            once: true
          }} className="border-2 border-border rounded-lg p-6">
              <div className="text-4xl font-bold text-accent mb-2">&lt;1s</div>
              <div className="text-sm text-muted-foreground">Load Time</div>
            </motion.div>
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.2
          }} viewport={{
            once: true
          }} className="border-2 border-border rounded-lg p-6">
              <div className="text-4xl font-bold text-accent mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Monitoring</div>
            </motion.div>
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.3
          }} viewport={{
            once: true
          }} className="border-2 border-border rounded-lg p-6">
              <div className="text-4xl font-bold text-accent mb-2">Weekly



            </div>
              <div className="text-sm text-muted-foreground">Backups</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Hosting Plans */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Hosting Plans</h2>
            <p className="text-lg text-muted-foreground">
              Simple, transparent pricing with no hidden fees
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan, i) => <motion.div key={i} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: i * 0.1
          }} viewport={{
            once: true
          }}>
                <Card className={`p-8 h-full ${plan.popular ? "border-2 border-accent shadow-lg shadow-accent/20" : "border-border"} relative`}>
                  {plan.popular && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                    <p className="text-muted-foreground">{plan.description}</p>
                    <div>
                      <div className="text-4xl font-bold text-accent">${plan.price}</div>
                      <div className="text-sm text-muted-foreground">per month</div>
                    </div>
                    <div className="text-sm">
                      <span className="font-semibold">${plan.yearlyPrice}/year</span>
                      <span className="text-muted-foreground"> (save 10%)</span>
                    </div>
                    <ul className="space-y-3 py-4">
                      {plan.features.map(feature => <li key={feature} className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>)}
                    </ul>
                    <Link to="/quote" state={{
                  plan: plan.name
                }}>
                      <Button className={`w-full ${plan.popular ? "bg-accent text-accent-foreground hover:bg-accent/90" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}>
                        Get Started
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>)}
          </div>
          <div className="text-center mt-12">
            <p className="text-sm text-muted-foreground mb-4">
              Need a website too? Save 15% when you bundle with our website building services!
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/website-building">
                <Button variant="outline">View Website Packages</Button>
              </Link>
              <Link to="/pricing">
                <Button variant="outline">View All Bundles</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Reliable Hosting?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join hundreds of businesses trusting us with their online presence
            </p>
            <Link to="/quote">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                Get Started Today <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>;
};
export default Hosting;