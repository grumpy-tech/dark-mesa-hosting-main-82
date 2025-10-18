import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Globe, Zap, Smartphone, Search, Code, Palette, CheckCircle2, ArrowRight } from "lucide-react";

const WebsiteBuilding = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      name: "Basic One-Pager",
      price: 249,
      description: "Perfect for new businesses needing a fast online presence",
      features: [
        "Single-page responsive site",
        "Contact form integration",
        "Basic SEO setup",
        "Mobile optimization",
        "Social media links",
        "1-week delivery",
      ],
    },
    {
      name: "Standard Multi-Page",
      price: 499,
      description: "Best for growing businesses",
      features: [
        "Up to 3 custom pages",
        "Professional design",
        "Stock images included",
        "Enhanced SEO",
        "Contact forms & maps",
        "Social media integration",
        "Google Analytics setup",
      ],
      popular: true,
    },
    {
      name: "Premium Multi-Page",
      price: 749,
      description: "For established businesses",
      features: [
        "Up to 5 custom pages",
        "E-commerce basics (up to 20 products)",
        "Blog functionality",
        "Advanced SEO package",
        "Newsletter integration",
        "Priority support",
        "Performance optimization",
      ],
    },
    {
      name: "Custom Enterprise",
      price: "999+",
      description: "Tailored solutions for complex needs",
      features: [
        "Unlimited pages",
        "Advanced features",
        "Custom integrations",
        "User authentication",
        "Booking/scheduling systems",
        "Advanced e-commerce",
        "Dedicated project manager",
      ],
    },
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

      {/* Process */}
      <section className="py-20 bg-background">
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
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Website Building Packages</h2>
            <p className="text-lg text-muted-foreground">
              Choose the package that fits your needs and budget
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
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
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                      Popular
                    </div>
                  )}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold">{pkg.name}</h3>
                    <div>
                      <div className="text-3xl font-bold text-primary">
                        {typeof pkg.price === "number" ? `$${pkg.price}` : pkg.price}
                      </div>
                      <div className="text-sm text-muted-foreground">one-time payment</div>
                    </div>
                    <p className="text-sm text-muted-foreground">{pkg.description}</p>
                    <ul className="space-y-2">
                      {pkg.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to="/contact" state={{ plan: pkg.name }}>
                      <Button className="w-full mt-4">Get Started</Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-sm text-muted-foreground mb-4">
              Need hosting? Check out our hosting plans or save with a bundle!
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/hosting">
                <Button variant="outline">View Hosting Plans</Button>
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
            <Link to="/contact">
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

export default WebsiteBuilding;
