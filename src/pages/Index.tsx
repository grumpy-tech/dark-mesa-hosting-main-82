import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { DomainChecker } from "@/components/DomainChecker";
import { ScrollIndicator } from "@/components/ScrollIndicator";
// Removed BlogModal import as we are using a better inline Dialog structure
import { blogArticles } from "@/components/blogContent";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { Globe, Server, Code, ArrowRight, CheckCircle2, FileText, Calendar, TrendingUp, Users, BookOpen } from "lucide-react";

const Index = () => {
  const [activeBlog, setActiveBlog] = useState<string | null>(null);
  
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
    monthly: 39,
    annual: 468,
    buildPrice: 349,
    description: "Perfect for new businesses",
    features: ["3 pages included", "Professional template design", "Works on all devices", "Get found on Google", "Monthly website backups"]
  }, {
    name: "Business",
    emoji: "🔵",
    monthly: 69,
    annual: 828,
    buildPrice: 599,
    description: "Best for growing businesses",
    features: ["Up to 6 pages", "Custom design for your brand", "Better search rankings", "Contact forms that work", "Priority support"],
    popular: true
  }, {
    name: "Pro",
    emoji: "🔴",
    monthly: 99,
    annual: 1188,
    buildPrice: 999,
    description: "For established businesses",
    features: ["Up to 9 pages", "Unique design just for you", "Dominate local search results", "Online store OR blog included", "Same-day support"]
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

  // Helper to find the current active post
  const activePostData = blogPosts.find(p => p.key === activeBlog);
  
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
        }} className="space-y-6 sm:space-y-8">
            <h2 className="font-semibold bg-gradient-to-b from-foreground/70 to-foreground/10 bg-clip-text text-transparent text-[2.5rem] sm:text-[3.5rem] md:text-[5rem] lg:text-[6.5rem] leading-tight mb-4 pb-2 whitespace-nowrap">
              Dark Mesa Hosting
            </h2>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight px-2 text-foreground max-w-4xl mx-auto">
              Get A Professional Website Without The Headaches
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
              From <span className="text-primary font-semibold">$39/month</span> with hosting included.
              <br />
              <span className="text-green-600 dark:text-green-400 font-semibold">Pay 12 months upfront = FREE website build!</span>
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center pt-4 px-2">
              <Link to="/quote" className="w-full sm:w-auto">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary w-full sm:w-auto text-sm sm:text-base">
                  Get Free Quote <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </Link>
              <Link to="/pricing" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="border-border hover:bg-accent/10 w-full sm:w-auto text-sm sm:text-base">
                  View Plans
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
                  Modern, professional websites that make your business look great and work perfectly on every device.
                </p>
                <ul className="space-y-3">
                  {[
                    "Looks great on phones & tablets", 
                    "Customers can find you on Google", 
                    "Loads super fast", 
                    "Easy for you to update"
                  ].map(item => <li key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <span>{item}</span>
                    </li>)}
                </ul>
                <div className="pt-4">
                  <Link to="/website-building">
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                      Learn More <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
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
                  Reliable, secure hosting that keeps your website online 24/7. We handle all the technical stuff.
                </p>
                <ul className="space-y-3">
                  {[
                    "Your site stays online 99.9% of the time", 
                    "Secure & protected from hackers", 
                    "We save copies of your site weekly", 
                    "We watch your site around the clock"
                  ].map(item => <li key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-accent" />
                      <span>{item}</span>
                    </li>)}
                </ul>
                <div className="pt-4">
                  <Link to="/hosting">
                    <Button variant="outline" className="border-accent text-accent hover:bg-accent/10">
                      Learn More <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              Choose your hosting plan. Pay for 12 months upfront and get your website built completely FREE!
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, i) => <motion.div key={i} initial={{
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
                  <div className="space-y-5">
                    <div className="text-center">
                      <span className="text-2xl mr-2">{plan.emoji}</span>
                      <h3 className="text-2xl font-bold inline">{plan.name}</h3>
                    </div>
                    <p className="text-muted-foreground text-center">{plan.description}</p>
                    
                    {/* Monthly Hosting */}
                    <div className="text-center pb-4 border-b border-border">
                      <div className="text-sm text-muted-foreground uppercase tracking-wide mb-2">Monthly Hosting</div>
                      <div className="text-4xl font-bold text-primary">${plan.monthly}<span className="text-lg text-muted-foreground">/mo</span></div>
                    </div>

                    {/* Website Build Cost */}
                    <div className="text-center pb-4 border-b border-border">
                      <div className="text-sm text-muted-foreground uppercase tracking-wide mb-2">Website Build (One-Time)</div>
                      <div className="text-3xl font-bold text-foreground">${plan.buildPrice}</div>
                    </div>

                    {/* Special Offer */}
                    <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-500/30 rounded-lg p-4 text-center">
                      <div className="text-sm font-semibold text-green-600 dark:text-green-400 uppercase tracking-wide mb-1">
                        💰 SPECIAL OFFER
                      </div>
                      <div className="text-lg font-bold mb-1">Pay 12 Months Upfront</div>
                      <div className="text-2xl font-bold text-primary mb-1">${plan.annual}</div>
                      <div className="text-base font-bold text-green-600 dark:text-green-400">
                        + Website Build FREE
                      </div>
                      <div className="text-xs text-muted-foreground mt-2">
                        (Save ${plan.buildPrice})
                      </div>
                    </div>

                    <ul className="space-y-3 py-4">
                      {plan.features.map(feature => <li key={feature} className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>)}
                    </ul>
                    <Link to="/quote" state={{
                    plan: plan.name,
                    serviceCategory: "bundle",
                    serviceType: plan.name
                  }}>
                      <Button className={`w-full ${plan.popular ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}>
                        Get Started
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>)}
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
            <BookOpen className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Helpful Guides</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tips and insights to help your business succeed online
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
      
      {/* IMPROVED BLOG MODAL IMPLEMENTATION */}
      <Dialog open={!!activeBlog} onOpenChange={(open) => !open && setActiveBlog(null)}>
        <DialogContent className="sm:max-w-3xl max-h-[85vh] overflow-hidden flex flex-col p-0 gap-0">
          <div className="p-6 pb-4 border-b">
            <DialogHeader>
              <div className="flex items-center gap-2 text-sm text-primary font-medium mb-2">
                 <Calendar className="w-4 h-4" />
                 {activePostData?.date}
              </div>
              {/* Padding right ensures title doesn't overlap the close button */}
              <DialogTitle className="text-2xl font-bold leading-tight pr-8">
                 {activePostData?.title}
              </DialogTitle>
              <DialogDescription className="hidden">
                 {activePostData?.excerpt}
              </DialogDescription>
            </DialogHeader>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 pt-4">
              {activePostData?.image && (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-6 shadow-sm border bg-muted">
                   <img 
                     src={activePostData.image} 
                     alt={activePostData.title} 
                     className="w-full h-full object-cover"
                   />
                </div>
              )}
              <div className="prose prose-slate dark:prose-invert max-w-none text-base leading-relaxed text-muted-foreground">
                 {activeBlog && blogArticles[activeBlog as keyof typeof blogArticles]}
              </div>
          </div>
        </DialogContent>
      </Dialog>
    </>;
};

export default Index;
