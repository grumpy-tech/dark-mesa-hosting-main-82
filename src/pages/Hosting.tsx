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
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <div className="inline-block p-4 bg-accent/10 rounded-full mb-4">
              <Server className="w-12 h-12 text-accent" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold">
              Hosting That Just Works
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Reliable, fast, and secure hosting with zero technical headaches. We keep your site running 24/7 while you focus on your business.
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Link to="/quote">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  Get Started <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button size="lg" variant="outline">
                  See All Plan Details
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What's Included - Benefits Grid */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-6">
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
                <Card className="p-6 h-full border-border hover:border-accent/50 transition-all">
                  <div className="inline-block p-3 bg-accent/10 rounded-lg mb-4">
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
            <Card className="p-10 border-2 border-accent/20 bg-card/80 backdrop-blur-sm hover:border-accent/40 transition-all">
              <div className="text-center space-y-4">
                <Wrench className="w-12 h-12 text-accent mx-auto" />
                <h2 className="text-3xl font-bold">Need Changes? We've Got You Covered</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Every hosting plan includes free monthly updates. Change your hours, add new photos, update text — just let us know and we'll handle it.
                </p>
                <div className="grid md:grid-cols-3 gap-6 pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent mb-1">Starter</div>
                    <div className="text-sm text-muted-foreground">1 update/month</div>
                    <div className="text-xs text-muted-foreground">(up to 30 min)</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent mb-1">Business</div>
                    <div className="text-sm text-muted-foreground">5 updates/month</div>
                    <div className="text-xs text-muted-foreground">(up to 2 hrs total)</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent mb-1">Pro</div>
                    <div className="text-sm text-muted-foreground">Unlimited updates</div>
                    <div className="text-xs text-muted-foreground">(4 hrs/month fair use)</div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Hosting Plans */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-6">
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
                    plan.popular ? "border-accent shadow-lg shadow-accent/20" : "border-border"
                  } relative flex flex-col`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
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
                    >
                      <Button
                        className={`w-full ${
                          plan.popular
                            ? "bg-accent text-accent-foreground hover:bg-accent/90"
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

          <div className="text-center mt-12 space-y-4">
            <p className="text-muted-foreground">
              Want to see the full breakdown of features?
            </p>
            <Link to="/pricing">
              <Button size="lg" variant="outline">
                View Complete Feature Comparison <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Let us handle the technical stuff while you focus on growing your business
            </p>
            <Link to="/quote">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                Get Your Free Quote <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Hosting;
