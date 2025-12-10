import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Server, Shield, Clock, Zap, CheckCircle2, ArrowRight, Coffee, Wrench, FileCheck, Star } from "lucide-react";

const Hosting = () => {
  const benefits = [
    {
      icon: Coffee,
      title: "Set and Forget",
      description: "We handle all the technical stuff so you can focus on your business. No maintenance headaches."
    },
    {
      icon: Clock,
      title: "Always Online",
      description: "Your site stays up 99.9% of the time. We monitor it 24/7 so you don't have to worry."
    },
    {
      icon: Shield,
      title: "Secure & Protected",
      description: "We keep hackers out with advanced security. Your site and customer data stay safe."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Fast loading = happy customers. We optimize everything for maximum speed."
    },
    {
      icon: Wrench,
      title: "Free Monthly Updates",
      description: "Need to change your hours, add a new photo, or update text? We handle it for you."
    },
    {
      icon: FileCheck,
      title: "Automatic Backups",
      description: "We save copies of your site regularly. If anything goes wrong, we can restore it instantly."
    }
  ];

  const plans = [
    {
      name: "Starter",
      emoji: "🟢",
      monthly: 39,
      annual: 468,
      description: "Perfect for simple websites",
      features: [
        "Your site stays online 99.9% of time",
        "1 small update per month (30 min)",
        "Monthly backups kept safe",
        "Basic security monitoring",
        "Email support within 48-72 hours"
      ]
    },
    {
      name: "Business",
      emoji: "🔵",
      monthly: 69,
      annual: 828,
      description: "Best for growing businesses",
      features: [
        "Your site stays online 99.99% of time",
        "Up to 5 updates per month (2 hrs total)",
        "Twice-monthly backups",
        "Advanced firewall protection",
        "Priority email support within 24 hours",
        "1 professional email inbox included"
      ],
      popular: true
    },
    {
      name: "Pro",
      emoji: "🔴",
      monthly: 99,
      annual: 1188,
      description: "For established businesses",
      features: [
        "Your site stays online 99.99% of time",
        "Unlimited updates (4 hrs/month fair use)",
        "Weekly + daily backups",
        "Proactive security scans & instant fixes",
        "Same-day support + phone/text available",
        "Up to 5 professional email inboxes"
      ]
    }
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Faded "HOSTING" background text */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 text-[10rem] md:text-[18rem] font-bold bg-gradient-to-b from-foreground/3 to-foreground/0 bg-clip-text text-transparent select-none pointer-events-none">
          HOSTING
        </div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <div className="inline-block p-4 bg-accent/10 rounded-full mb-4 hover:scale-110 transition-transform">
              <Server className="w-12 h-12 text-accent" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold">
              Hosting That Just Works
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Reliable, fast, and secure hosting with zero technical headaches. We keep your site running 24/7 while you focus on your business.
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Link to="/quote" className="group">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 hover:scale-105 hover:shadow-xl transition-all duration-300">
                  Get Started <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/pricing" className="group">
                <Button size="lg" variant="outline" className="hover:scale-105 hover:border-accent/50 hover:shadow-lg transition-all duration-300">
                  See All Plan Details
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What's Included - Benefits Grid */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-muted/30" />
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }} />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What You Get With Every Plan</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Professional hosting with everything you need to keep your business online
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full border-border hover:border-accent/50 hover:shadow-xl hover:scale-105 transition-all duration-300 backdrop-blur-sm bg-card/80 group">
                  <div className="inline-block p-3 bg-accent/10 rounded-lg mb-4 group-hover:scale-110 group-hover:bg-accent/20 transition-all">
                    <benefit.icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Updates Section - Highlight */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Card className="p-10 border-2 border-accent/20 bg-accent/5 backdrop-blur-sm hover:border-accent/40 hover:shadow-2xl transition-all duration-300">
              <div className="text-center space-y-4">
                <Wrench className="w-12 h-12 text-accent mx-auto" />
                <h2 className="text-3xl font-bold">Need Changes? We've Got You Covered</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Every hosting plan includes free monthly updates. Change your hours, add new photos, update text — just let us know and we'll handle it.
                </p>
                <div className="grid md:grid-cols-3 gap-6 pt-6">
                  {[
                    { name: "Starter", updates: "1 update/month", time: "(up to 30 min)" },
                    { name: "Business", updates: "5 updates/month", time: "(up to 2 hrs total)" },
                    { name: "Pro", updates: "Unlimited updates", time: "(4 hrs/month fair use)" }
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      className="text-center p-4 rounded-lg bg-background/50 hover:bg-background/80 transition-colors"
                    >
                      <div className="text-2xl font-bold text-accent mb-1">{item.name}</div>
                      <div className="text-sm text-muted-foreground">{item.updates}</div>
                      <div className="text-xs text-muted-foreground">{item.time}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Hosting Plans */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background to-primary/10" />
        
        {/* Faded plan names */}
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 text-[8rem] font-bold bg-gradient-to-b from-green-500/5 to-green-500/0 bg-clip-text text-transparent select-none pointer-events-none rotate-[-15deg]">
          STARTER
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] font-bold bg-gradient-to-b from-blue-500/8 to-blue-500/0 bg-clip-text text-transparent select-none pointer-events-none">
          BUSINESS
        </div>
        <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 text-[8rem] font-bold bg-gradient-to-b from-purple-500/5 to-purple-500/0 bg-clip-text text-transparent select-none pointer-events-none rotate-[15deg]">
          PRO
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Hosting Plan</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              All plans include hosting, maintenance, and support. Pay 12 months upfront = FREE website build!
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  className={`p-8 h-full border-2 ${
                    plan.popular ? "border-accent shadow-2xl" : "border-border"
                  } relative flex flex-col backdrop-blur-sm bg-card/80 hover:scale-105 hover:shadow-2xl transition-all duration-300`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1 shadow-lg animate-pulse">
                      <Star className="w-4 h-4" /> Most Popular
                    </div>
                  )}
                  
                  <div className="flex-1 space-y-6">
                    <div className="text-center">
                      <span className="text-3xl mr-2">{plan.emoji}</span>
                      <h3 className="text-2xl font-bold inline">{plan.name}</h3>
                      <p className="text-muted-foreground mt-2">{plan.description}</p>
                    </div>

                    <div className="text-center py-6 border-y border-border">
                      <div className="text-4xl font-bold text-accent mb-2">
                        ${plan.monthly}<span className="text-lg text-muted-foreground">/mo</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        or ${plan.annual}/year
                      </div>
                    </div>

                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-6 border-t border-border">
                    <Link
                      to="/quote"
                      state={{
                        plan: plan.name,
                        serviceCategory: "hosting"
                      }}
                      className="group"
                    >
                      <Button
                        className={`w-full ${
                          plan.popular
                            ? "bg-accent text-accent-foreground hover:bg-accent/90"
                            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                        } hover:scale-105 hover:shadow-xl transition-all duration-300`}
                      >
                        Get Started
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12 space-y-4">
            <p className="text-muted-foreground">
              Want to see the full breakdown of features?
            </p>
            <Link to="/pricing" className="group inline-block">
              <Button size="lg" variant="outline" className="hover:scale-105 hover:border-accent/50 hover:shadow-lg transition-all duration-300">
                View Complete Feature Comparison <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 bg-accent text-accent-foreground overflow-hidden">
        {/* Faded "RELIABLE" text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[6rem] md:text-[12rem] font-bold opacity-5 select-none pointer-events-none">
          RELIABLE
        </div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg mb-8 opacity-90">
              Let us handle the technical stuff while you focus on growing your business
            </p>
            <Link to="/quote" className="group inline-block">
              <Button size="lg" variant="secondary" className="hover:scale-110 hover:shadow-2xl transition-all duration-300">
                Get Your Free Quote <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Hosting;
