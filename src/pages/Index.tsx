import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { DomainChecker } from "@/components/DomainChecker";
import { ScrollIndicator } from "@/components/ScrollIndicator";
import { BlogModal } from "@/components/BlogModal";
import { blogArticles } from "@/components/blogContent";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Globe, Server, Code, ArrowRight, CheckCircle2, FileText, Calendar, TrendingUp, Users, Database, Zap, Repeat2 } from "lucide-react";

// Define a type for the pricing view toggle
type PriceView = "annual_bundle" | "monthly_separate";

const Index = () => {
  const [activeBlog, setActiveBlog] = useState<string | null>(null);
  // New state for pricing view switch
  const [priceView, setPriceView] = useState<PriceView>("annual_bundle");

  const howItWorks = [{
    step: 1,
    title: "Get a Quote",
    desc: "Fill out our quick form to get an instant estimate",
    icon: FileText
  }, {
    step: 2,
    title: "We Build",
    desc: "Our team creates your beautiful, modern website",
    icon: Code
  }, {
    step: 3,
    title: "Review & Launch",
    desc: "Approve the final design and go live instantly",
    icon: Calendar
  }, {
    step: 4,
    title: "Ongoing Support",
    desc: "We keep your site fast, secure, and up to date",
    icon: TrendingUp
  }];
  const pricingPlans = [{
    name: "Starter",
    emoji: "🟢",
    monthly: 39, // Monthly hosting cost
    annual: 399, // Annual hosting cost (discounted)
    buildPrice: 349, // One-time build cost
    description: "Perfect for new businesses",
    features: ["3 pages included", "Template-based design", "Mobile optimized", "Basic SEO", "Monthly backups"]
  }, {
    name: "Business",
    emoji: "🔵",
    monthly: 69,
    annual: 699,
    buildPrice: 599,
    description: "Best for growing businesses",
    features: ["Up to 6 pages", "Full custom branding", "Enhanced SEO", "Multi-step forms", "Priority support"],
    popular: true
  }, {
    name: "Pro",
    emoji: "🔴",
    monthly: 99,
    annual: 999,
    buildPrice: 999,
    description: "For established businesses",
    features: ["Up to 9 pages", "Bespoke UI/UX", "Full local SEO pack", "Blog OR e-commerce included", "Same-day support"]
  }];
  const blogPosts = [{
    title: "Top 5 things businesses forget when launching online",
    excerpt: "Avoid these common mistakes when building your first website...",
    date: "Jan 15, 2025",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
    key: "top5"
  }, {
    title: "How to choose the right domain for your brand",
    excerpt: "Your domain name is your digital identity. Here's how to pick the perfect one...",
    date: "Jan 10, 2025",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop",
    key: "domain"
  }, {
    title: "Why having a business website helps",
    excerpt: "Discover the essential benefits of establishing your online presence...",
    date: "Jan 5, 2025",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop",
    key: "business"
  }];

  // Helper function to calculate annual price and savings
  const getAnnualBundlePrice = (plan: typeof pricingPlans[0]) => {
    const annualHosting = plan.monthly * 12; // 12 months hosting at monthly rate
    const totalBundleCost = annualHosting; // Total cost is just 12 months hosting
    const totalCostSeparate = annualHosting + plan.buildPrice; // Cost without the 'free build'
    const savings = plan.buildPrice; // Savings is the cost of the build
    return { totalBundleCost, savings };
  };

  return <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <AnimatedBackground />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }} className="space-y-3 sm:space-y-4">
            <h2 className="font-semibold bg-gradient-to-b from-foreground/70 to-foreground/10 bg-clip-text text-transparent text-[2.5rem] sm:text-[3.5rem] md:text-[5rem] lg:text-[6.5rem] leading-tight mb-6 pb-2 whitespace-nowrap">
              Dark Mesa Hosting
            </h2>
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 leading-tight px-2 text-foreground">
              Professional Websites Built Fast
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-2 font-semibold px-2" style={{
            color: "hsl(178 93% 60%)"
          }}>
              Design. Speed. Reliability.
            </p>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-2 px-2">
              Professional websites from <span className="text-primary font-semibold">$349</span> + hosting from{" "}
              <span className="text-primary font-semibold">$39/month</span>. Prepay 12 months = FREE build!
            </p>
            <DomainChecker />
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center pt-4 px-2">
              <Link to="/pricing" className="w-full sm:w-auto">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary w-full sm:w-auto text-sm sm:text-base">
                  View Plans <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </Link>
              <Link to="/quote" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="border-border hover:bg-accent/10 w-full sm:w-auto text-sm sm:text-base">
                  Get Free Quote
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
        <ScrollIndicator />
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
            {howItWorks.map((step, i) => <motion.div key={i} initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: i * 0.15,
            duration: 0.6
          }} viewport={{
            once: true
          }} className="relative">
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
                {i < howItWorks.length - 1 && <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-border" />}
              </motion.div>)}
          </div>
        </div>
      </section>


      {/* Services Overview */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div initial={{
            opacity: 0,
            x: -30
          }} whileInView={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.6
          }} viewport={{
            once: true
          }}>
              <Card className="p-8 h-full border-border hover:border-primary/50 transition-all space-y-6 border-2">
                <div className="inline-block p-3 bg-primary/10 rounded-lg">
                  <Globe className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-3xl font-bold">Website Building</h3>
                <p className="text-muted-foreground text-lg mb-6">
                  Custom-designed websites built with modern technology. Fast, responsive, and beautiful.
                </p>
                <ul className="space-y-3">
                  {["Mobile-first design", "SEO optimized", "Lightning fast", "Easy to update"].map(item => <li key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <span>{item}</span>
                    </li>)}
                </ul>
                <div className="pt-4">
                  <Link to="/website-building">
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                      Learn More <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                </div>
              </Card>
            </motion.div>

            <motion.div initial={{
            opacity: 0,
            x: 30
          }} whileInView={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.6
          }} viewport={{
            once: true
          }}>
              <Card className="p-8 h-full border-border hover:border-accent/50 transition-all space-y-6 border-2">
                <div className="inline-block p-3 bg-accent/10 rounded-lg">
                  <Server className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-3xl font-bold">Hosting Services</h3>
                <p className="text-muted-foreground text-lg mb-6">
                  Reliable, secure hosting with 99.9% uptime. Your site will always be online when you need it.
                </p>
                <ul className="space-y-3">
                  {["99.9% uptime guarantee", "SSL certificate included", "Weekly backups", "24/7 monitoring"].map(item => <li key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-accent" />
                      <span>{item}</span>
                    </li>)}
                </ul>
                <div className="pt-4">
                  <Link to="/hosting">
                    <Button variant="outline" className="border-accent text-accent hover:bg-accent/10">
                      Learn More <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Plans - AMENDED SECTION */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              Choose your package: Best-Value Annual Bundle or Flexible Monthly Hosting.
            </p>
          </div>

          {/* Pricing Toggle Switch */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex rounded-full bg-muted p-1">
              <Button
                variant={priceView === "annual_bundle" ? "default" : "ghost"}
                onClick={() => setPriceView("annual_bundle")}
                className={`rounded-full px-6 py-2 transition-all duration-300 ${priceView === "annual_bundle" ? "bg-primary text-primary-foreground hover:bg-primary/90" : "text-muted-foreground hover:bg-background"}`}
              >
                <Zap className="w-4 h-4 mr-2" /> Annual Bundle (Save Big!)
              </Button>
              <Button
                variant={priceView === "monthly_separate" ? "default" : "ghost"}
                onClick={() => setPriceView("monthly_separate")}
                className={`rounded-full px-6 py-2 transition-all duration-300 ${priceView === "monthly_separate" ? "bg-primary text-primary-foreground hover:bg-primary/90" : "text-muted-foreground hover:bg-background"}`}
              >
                <Repeat2 className="w-4 h-4 mr-2" /> Monthly (Hosting + Separate Build)
              </Button>
            </div>
          </div>
          {/* End Pricing Toggle Switch */}

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, i) => {
              const { totalBundleCost, savings } = getAnnualBundlePrice(plan);

              // Dynamic pricing text based on the toggle
              let mainPrice, subtitle, savingsDisplay, callToAction, linkState;

              if (priceView === "annual_bundle") {
                mainPrice = `$${totalBundleCost}`;
                subtitle = "Prepaid Annually";
                savingsDisplay = (
                  <div className="text-center pt-3 border-t border-border">
                    <div className="text-xl font-bold text-green-500 dark:text-green-400">
                      FREE Website Build!
                    </div>
                    <div className="text-sm text-green-700 dark:text-green-300 font-medium">
                      SAVINGS: ${savings}
                    </div>
                  </div>
                );
                callToAction = "Select Annual Bundle";
                linkState = { plan: plan.name, serviceCategory: "bundle", serviceType: plan.name, duration: "annual" };
              } else { // monthly_separate view
                mainPrice = `$${plan.monthly}<span className="text-lg text-muted-foreground">/mo</span>`;
                subtitle = "Monthly Hosting Cost";
                savingsDisplay = (
                  <div className="text-center pt-3 border-t border-border">
                    <div className="text-sm text-muted-foreground">One-Time Website Build</div>
                    <div className="text-2xl font-bold text-accent">${plan.buildPrice}</div>
                  </div>
                );
                callToAction = "Start Monthly Hosting";
                linkState = { plan: plan.name, serviceCategory: "hosting", serviceType: plan.name, duration: "monthly" };
              }

              return (
                <motion.div key={i} initial={{
                opacity: 0,
                y: 30
              }} whileInView={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: i * 0.15,
                duration: 0.6
              }} viewport={{
                once: true
              }}>
                  <Card className={`p-8 h-full border-2 ${plan.popular ? "border-primary shadow-lg shadow-primary/20" : "border-border"} relative`}>
                    {plan.popular && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                      ⭐ Most Popular
                    </div>}
                    <div className="space-y-4">
                      <div className="text-center">
                        <span className="text-2xl mr-2">{plan.emoji}</span>
                        <h3 className="text-2xl font-bold inline">{plan.name}</h3>
                      </div>
                      <p className="text-muted-foreground text-center">{plan.description}</p>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground font-semibold uppercase">{subtitle}</div>
                        {/* The main price display - uses dangerouslySetInnerHTML for the /mo in monthly view */}
                        <div
                          className="text-4xl font-bold text-primary"
                          dangerouslySetInnerHTML={{ __html: mainPrice }}
                        />
                      </div>

                      {/* Savings/Build Price Display */}
                      {savingsDisplay}

                      {/* Features remain the same */}
                      <ul className="space-y-3 py-4">
                        {plan.features.map(feature => <li key={feature} className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{feature}</span>
                          </li>)}
                      </ul>
                      <Link to="/quote" state={linkState}>
                        <Button className={`w-full ${plan.popular ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}>
                          {callToAction}
                        </Button>
                      </Link>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
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
      <section className="py-14 bg-gradient-to-b from-card/50 to-background">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} viewport={{
          once: true
        }} className="max-w-3xl mx-auto">
            <Card className="p-10 border-2 border-primary/20 bg-card/80 backdrop-blur-sm hover:border-primary/40 transition-all glow-primary">
              <Users className="w-12 h-12 text-primary mx-auto mb-5" />
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Get Your Free Quote</h2>
              <p className="text-base text-muted-foreground mb-6">
                Answer a few quick questions to get an instant estimate tailored to your business needs
              </p>
              <Link to="/quote">
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
            {blogPosts.map((post, i) => <motion.div key={i} initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: i * 0.15,
            duration: 0.6
          }} viewport={{
            once: true
          }}>
                <Card onClick={() => setActiveBlog(post.key)} className="overflow-hidden border-border hover:border-primary/50 transition-all group cursor-pointer">
                  <div className="aspect-video overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-muted-foreground mb-2">{post.date}</div>
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground">{post.excerpt}</p>
                  </div>
                </Card>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} viewport={{
          once: true
        }} className="max-w-3xl mx-auto">
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
      
      {/* Blog Modals */}
      {activeBlog && <BlogModal isOpen={!!activeBlog} onClose={() => setActiveBlog(null)} title={blogPosts.find(p => p.key === activeBlog)?.title || ""} content={blogArticles[activeBlog as keyof typeof blogArticles]} />}
    </>;
};
export default Index;
