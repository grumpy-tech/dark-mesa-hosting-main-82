import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, ArrowRight, Zap, Shield, Clock, DollarSign, Star, Quote, Globe, TrendingUp, Users, MessageSquare } from "lucide-react";

const HomePage = () => {
  const [billingType, setBillingType] = useState<"monthly" | "annual">("annual");

  const stats = [
    { value: "99.9%", label: "Uptime", icon: Shield },
    { value: "< 2s", label: "Load Time", icon: Zap },
    { value: "24/7", label: "Monitoring", icon: Clock },
    { value: "$0", label: "Setup Fees", icon: DollarSign },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      business: "Johnson & Co. Accounting",
      quote: "We went from nothing to a professional website in 2 weeks. The monthly updates mean I never have to worry about keeping things current.",
      rating: 5,
    },
    {
      name: "Mike Chen",
      business: "Chen's Auto Repair",
      quote: "I was paying $150/month to another company and getting nothing. Dark Mesa is half the price with better support. Finally found someone who actually responds.",
      rating: 5,
    },
    {
      name: "Jessica Martinez",
      business: "Bloom Floral Design",
      quote: "The annual plan with free build was a no-brainer. My site looks more expensive than it was, and I get peace of mind knowing it's backed up and secure.",
      rating: 5,
    },
  ];

  const quickComparison = [
    { feature: "Custom website design", us: true, diy: false, agency: true },
    { feature: "Hosting included", us: true, diy: false, agency: false },
    { feature: "Monthly updates & support", us: true, diy: false, agency: false },
    { feature: "Security & backups", us: true, diy: "paid", agency: "paid" },
    { feature: "No long-term contract", us: true, diy: true, agency: false },
  ];

  const portfolioSamples = [
    {
      business: "Local Restaurant",
      industry: "Food & Beverage",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop",
      features: ["Online menu", "Reservations", "Mobile-first"],
    },
    {
      business: "Law Firm",
      industry: "Professional Services",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop",
      features: ["Contact forms", "Case studies", "SEO optimized"],
    },
    {
      business: "Retail Store",
      industry: "E-commerce",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop",
      features: ["Product catalog", "Shopping cart", "Secure checkout"],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero - Above the Fold */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-6 pt-20 pb-16 overflow-hidden">
        {/* Subtle animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
        
        <div className="relative z-10 container mx-auto max-w-6xl">
          <div className="text-center space-y-8">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-700 dark:text-green-400 px-4 py-2 rounded-full text-sm font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              Trusted by 200+ Okanagan businesses
            </div>

            {/* Main headline - Clear value prop */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
              Your Website.<br />
              <span className="text-primary">Built, Hosted & Maintained.</span><br />
              <span className="text-3xl md:text-4xl text-muted-foreground font-normal">
                One monthly price.
              </span>
            </h1>

            {/* Clear benefit statement */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Stop paying separately for design, hosting, updates, and support. Get everything in one simple package starting at <span className="text-primary font-bold">$39/month</span>.
            </p>

            {/* Primary CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="h-16 px-10 text-lg font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25">
                See Your Price in 60 Seconds
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="h-16 px-10 text-lg font-bold border-2">
                View Sample Sites
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-8 pt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>Free consultation included</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-3">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Problem/Solution (Addresses Pain Points) */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Stop Juggling Multiple Vendors
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Most businesses waste time and money coordinating between a designer, hosting company, and developer. We handle everything.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Before - The Problem */}
            <Card className="p-8 border-2 border-red-500/20 bg-red-500/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                  <span className="text-2xl">😰</span>
                </div>
                <h3 className="text-2xl font-bold text-red-600 dark:text-red-400">The Old Way</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-red-600 font-bold text-sm">✗</span>
                  </div>
                  <span className="text-muted-foreground">Pay $2,000-$10,000 upfront for website design</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-red-600 font-bold text-sm">✗</span>
                  </div>
                  <span className="text-muted-foreground">Pay separate monthly hosting fees ($15-50/mo)</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-red-600 font-bold text-sm">✗</span>
                  </div>
                  <span className="text-muted-foreground">Pay $75-150/hour for updates and changes</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-red-600 font-bold text-sm">✗</span>
                  </div>
                  <span className="text-muted-foreground">Hope nothing breaks (it will)</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-red-600 font-bold text-sm">✗</span>
                  </div>
                  <span className="text-muted-foreground">Outdated within 6 months</span>
                </li>
              </ul>
              <div className="mt-6 pt-6 border-t border-red-500/20">
                <p className="font-bold text-red-600 dark:text-red-400">
                  First Year Cost: $2,700 - $11,000+
                </p>
              </div>
            </Card>

            {/* After - The Solution */}
            <Card className="p-8 border-2 border-green-500/40 bg-green-500/5 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">With Dark Mesa</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="font-medium">Pay 12 months hosting upfront = FREE website build</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="font-medium">Hosting, security, backups all included</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="font-medium">Monthly updates included (30 min - 4 hrs depending on plan)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="font-medium">We monitor and fix issues proactively</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="font-medium">Always current and secure</span>
                </li>
              </ul>
              <div className="mt-6 pt-6 border-t border-green-500/20">
                <p className="font-bold text-2xl text-green-600 dark:text-green-400">
                  First Year Cost: $468 - $1,188
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Save $2,232 - $9,812 in year one
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Preview (Simplified) */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Simple, Honest Pricing</h2>
            <p className="text-xl text-muted-foreground">
              Three plans. All include hosting, support, and security. Pick what fits your needs.
            </p>
          </div>

          {/* Toggle */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center bg-card border-2 border-border rounded-full p-1 shadow-lg">
              <button
                onClick={() => setBillingType("monthly")}
                className={`px-8 py-3 rounded-full font-bold transition-all ${
                  billingType === "monthly"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground"
                }`}
              >
                Month-to-Month
              </button>
              <button
                onClick={() => setBillingType("annual")}
                className={`px-8 py-3 rounded-full font-bold transition-all relative ${
                  billingType === "annual"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground"
                }`}
              >
                Annual
                <div className="absolute -top-2 -right-2 bg-green-500 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                  BEST
                </div>
              </button>
            </div>
          </div>

          {/* Simplified plan cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Starter", price: 39, pages: "3 pages", emoji: "🟢" },
              { name: "Business", price: 69, pages: "6 pages", emoji: "🔵", popular: true },
              { name: "Pro", price: 99, pages: "9 pages", emoji: "🔴" },
            ].map((plan) => (
              <Card
                key={plan.name}
                className={`p-6 text-center ${
                  plan.popular ? "border-2 border-primary shadow-lg" : "border border-border"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold">
                    MOST POPULAR
                  </div>
                )}
                <div className="text-4xl mb-3">{plan.emoji}</div>
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold text-primary mb-1">
                  ${plan.price}
                  <span className="text-lg text-muted-foreground">/mo</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{plan.pages} included</p>
                
                {billingType === "annual" ? (
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 mb-4">
                    <p className="text-sm font-bold text-green-600 dark:text-green-400">
                      Website Build: FREE
                    </p>
                    <p className="text-xs text-muted-foreground">with annual plan</p>
                  </div>
                ) : (
                  <div className="bg-muted border border-border rounded-lg p-3 mb-4">
                    <p className="text-sm font-semibold">+ Build Fee</p>
                    <p className="text-xs text-muted-foreground">One-time payment</p>
                  </div>
                )}
                
                <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                  Get Started
                </Button>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="link" className="text-primary text-lg">
              View detailed feature comparison →
            </Button>
          </div>
        </div>
      </section>

      {/* Social Proof - Testimonials */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-xl font-bold">4.9/5</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Businesses Love Working With Us
            </h2>
            <p className="text-xl text-muted-foreground">
              Don't just take our word for it
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <Card key={idx} className="p-6 border-border">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-primary/20 mb-3" />
                <p className="text-muted-foreground mb-4 italic">"{testimonial.quote}"</p>
                <div className="pt-4 border-t border-border">
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.business}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Samples */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              See What We Build
            </h2>
            <p className="text-xl text-muted-foreground">
              Real sites for real businesses in the Okanagan
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {portfolioSamples.map((sample, idx) => (
              <Card key={idx} className="overflow-hidden border-border hover:border-primary/50 transition-all group cursor-pointer">
                <div className="aspect-video overflow-hidden bg-muted">
                  <img
                    src={sample.image}
                    alt={sample.business}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{sample.business}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{sample.industry}</p>
                  <div className="flex flex-wrap gap-2">
                    {sample.features.map((feature, fidx) => (
                      <span
                        key={fidx}
                        className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button size="lg" variant="outline" className="border-2">
              View Full Portfolio
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <Users className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Stop Overpaying?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Get your free quote in 60 seconds. See exactly what you'll pay. No pressure, no sales calls.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="h-16 px-10 text-lg font-bold shadow-xl hover:scale-105 transition-transform"
          >
            Get Your Free Quote Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <p className="text-sm mt-6 opacity-75">
            Join 200+ Okanagan businesses who've already made the switch
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
