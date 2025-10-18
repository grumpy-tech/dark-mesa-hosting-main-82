import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Navigation } from "@/components/Navigation";
import { DomainChecker } from "@/components/DomainChecker";
import { ScrollIndicator } from "@/components/ScrollIndicator";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Zap, Shield, Clock, Globe, Server, Code, 
  ArrowRight, CheckCircle2, FileText, Calendar,
  TrendingUp, Users, Database
} from "lucide-react";

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    { icon: Zap, title: "Lightning Fast", desc: "Under 1s load speed" },
    { icon: Shield, title: "99.9% Uptime", desc: "Always online" },
    { icon: Clock, title: "Quick Launch", desc: "Live in under 1 week" },
  ];

  const howItWorks = [
    { step: 1, title: "Get a Quote", desc: "Fill out our quick form to get an instant estimate", icon: FileText },
    { step: 2, title: "We Build", desc: "Our team creates your beautiful, modern website", icon: Code },
    { step: 3, title: "Review & Launch", desc: "Approve the final design and go live instantly", icon: Calendar },
    { step: 4, title: "Ongoing Support", desc: "We keep your site fast, secure, and up to date", icon: TrendingUp },
  ];

  const pricingPlans = [
    {
      name: "Basic One-Pager",
      price: 249,
      hosting: 12,
      description: "Perfect for new businesses",
      features: [
        "Single-page site",
        "Mobile optimized",
        "Contact form",
        "Basic SEO",
        "1-week delivery",
      ],
    },
    {
      name: "Standard Multi-Page",
      price: 499,
      hosting: 12,
      description: "Best for growing businesses",
      features: [
        "Up to 3 pages",
        "Custom design",
        "Stock images included",
        "Enhanced SEO",
        "Social media integration",
      ],
      popular: true,
    },
    {
      name: "Premium Multi-Page",
      price: 749,
      hosting: 18,
      description: "For established businesses",
      features: [
        "Up to 5 pages",
        "E-commerce basics",
        "Blog functionality",
        "Advanced SEO",
        "Priority support",
      ],
    },
  ];

  const blogPosts = [
    {
      title: "Top 5 things businesses forget when launching online",
      excerpt: "Avoid these common mistakes when building your first website...",
      date: "Jan 15, 2025",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
    },
    {
      title: "How to choose the right domain for your brand",
      excerpt: "Your domain name is your digital identity. Here's how to pick the perfect one...",
      date: "Jan 10, 2025",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop",
    },
    {
      title: "How we deliver websites in under a week",
      excerpt: "Behind the scenes of our streamlined development process...",
      date: "Jan 5, 2025",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <AnimatedBackground />
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="block text-gradient">Design. Speed. Reliability.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional websites from <span className="text-primary font-semibold">$249</span> + hosting at{" "}
              <span className="text-primary font-semibold">$12/month</span>. Delivered in under a week.
            </p>
            <DomainChecker />
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Link to="/pricing">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary">
                  View Plans <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-border hover:bg-accent/10">
                  Get Free Quote
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
        <ScrollIndicator />
      </section>

      {/* Performance Indicators */}
      <section className="py-16 bg-card/50 backdrop-blur-sm border-y border-border">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center p-6 rounded-lg bg-background/50 border border-border hover:border-primary/50 transition-colors"
              >
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From concept to launch in 4 simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Card className="p-6 h-full border-border hover:border-primary/50 transition-colors bg-card">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                      {step.step}
                    </div>
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.desc}</p>
                </Card>
                {i < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-border" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="inline-block p-3 bg-primary/10 rounded-lg">
                <Globe className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold">Website Building</h3>
              <p className="text-muted-foreground text-lg">
                Custom-designed websites built with modern technology. Fast, responsive, and beautiful.
              </p>
              <ul className="space-y-3">
                {["Mobile-first design", "SEO optimized", "Lightning fast", "Easy to update"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/website-building">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  Learn More <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="inline-block p-3 bg-accent/10 rounded-lg">
                <Server className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-3xl font-bold">Hosting Services</h3>
              <p className="text-muted-foreground text-lg">
                Reliable, secure hosting with 99.9% uptime. Your site will always be online when you need it.
              </p>
              <ul className="space-y-3">
                {["99.9% uptime guarantee", "SSL certificate included", "Daily backups", "24/7 monitoring"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/hosting">
                <Button variant="outline" className="border-accent text-accent hover:bg-accent/10">
                  Learn More <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that fits your needs. All plans include hosting options.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, i) => (
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
                  } relative`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                    <p className="text-muted-foreground">{plan.description}</p>
                    <div>
                      <div className="text-4xl font-bold text-primary">${plan.price}</div>
                      <div className="text-sm text-muted-foreground">one-time build</div>
                    </div>
                    <div className="text-lg">
                      <span className="font-semibold">${plan.hosting}/mo</span>
                      <span className="text-muted-foreground"> hosting</span>
                    </div>
                    <ul className="space-y-3 py-4">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to="/contact" state={{ plan: plan.name }}>
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
          <div className="text-center mt-12">
            <Link to="/pricing">
              <Button size="lg" variant="outline">
                View All Plans & Bundles <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Get Your Free Quote */}
      <section className="py-20 bg-gradient-to-b from-card/50 to-background">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <Card className="p-12 border-2 border-primary/20 bg-card/80 backdrop-blur-sm hover:border-primary/40 transition-all glow-primary">
              <Users className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Your Free Quote</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Answer a few quick questions to get an instant estimate tailored to your business needs
              </p>
              <Link to="/contact">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary">
                  Get Instant Estimate <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <Database className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-4xl md:text-5xl font-bold mb-4">From the Server Room</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tips, insights, and guides to help your business thrive online
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {blogPosts.map((post, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden border-border hover:border-primary/50 transition-all group cursor-pointer">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-muted-foreground mb-2">{post.date}</div>
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground">{post.excerpt}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Let's build something amazing together. Get in touch today for a free consultation.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Contact Us <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/faq">
                <Button size="lg" variant="outline">
                  View FAQ
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-card border-t border-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center gap-6">
            <div className="flex gap-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Facebook
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                LinkedIn
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                X/Twitter
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Instagram
              </a>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gradient mb-2">Dark Mesa</p>
              <p className="text-sm text-muted-foreground">Design. Speed. Reliability.</p>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 Dark Mesa. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
