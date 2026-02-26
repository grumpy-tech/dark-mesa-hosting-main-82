import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Mail, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import { SEO } from "@/components/SEO";
import { localBusinessSchema } from "@/lib/structuredData";

const fade = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.07 } }),
};

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.message.length > 1000) {
      toast({ title: "Message too long", description: "Please limit to 1000 characters.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      const fd = new FormData();
      Object.entries(formData).forEach(([k, v]) => fd.append(k, v));
      const res = await fetch("/send_email.php", { method: "POST", body: fd });
      const result = await res.json();
      if (result.success) {
        toast({ title: "Message sent!", description: "We'll get back to you within 24 hours." });
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else throw new Error(result.message);
    } catch {
      toast({ title: "Couldn't send", description: "Please email us at info@darkmesahosting.com", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Contact Us — Dark Mesa Hosting"
        description="Get in touch with Dark Mesa Hosting. We respond within 24 hours."
        keywords="contact web designer, website quote, hosting support"
        canonical="https://darkmesahosting.com/contact"
        schemas={[localBusinessSchema]}
      />

      <div className="min-h-screen bg-background">
        {/* Header */}
        <section className="pt-24 pb-10 px-4 sm:px-6 text-center">
          <motion.div variants={fade} initial="hidden" animate="show">
            <h1 className="text-4xl sm:text-5xl font-bold mb-3">Get in touch</h1>
            <p className="text-muted-foreground text-lg max-w-md mx-auto">
              Questions, quotes, or just want to chat — we respond within 24 hours.
            </p>
          </motion.div>
        </section>

        {/* Info cards */}
        <section className="pb-10 px-4 sm:px-6">
          <div className="container mx-auto max-w-3xl">
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: Mail, label: "Email", value: "info@darkmesahosting.com", href: "mailto:info@darkmesahosting.com" },
                { icon: Clock, label: "Response time", value: "Within 24 hours" },
                { icon: MapPin, label: "Location", value: "Remote — serving clients worldwide" },
              ].map((item, i) => (
                <motion.div key={item.label} variants={fade} initial="hidden" animate="show" custom={i}>
                  <Card className="p-4 flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-md flex-shrink-0">
                      <item.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground font-medium">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-sm font-semibold text-primary hover:underline break-all">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm font-semibold">{item.value}</p>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Form */}
        <section className="pb-16 px-4 sm:px-6">
          <div className="container mx-auto max-w-2xl">
            <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <Card className="p-6 sm:p-8">
                <h2 className="text-xl font-bold mb-6">Send us a message</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium">Name *</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your name"
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@email.com"
                        className="mt-1.5"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium">Phone (optional)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(123) 456-7890"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-sm font-medium">Message *</Label>
                    <Textarea
                      id="message"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="How can we help?"
                      rows={5}
                      maxLength={1000}
                      className="mt-1.5"
                    />
                    <p className="text-xs text-muted-foreground mt-1">{formData.message.length}/1000</p>
                  </div>
                  <Button type="submit" className="w-full font-semibold" disabled={isSubmitting}>
                    <Send className="w-4 h-4 mr-2" />
                    {isSubmitting ? "Sending…" : "Send Message"}
                  </Button>
                </form>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Perks */}
        <section className="py-12 px-4 sm:px-6 bg-muted/30 border-t border-border">
          <div className="container mx-auto max-w-3xl">
            <div className="grid sm:grid-cols-3 gap-6 text-center">
              {[
                { icon: Clock, title: "Fast response", body: "We reply within 24 hours, often same day." },
                { icon: CheckCircle2, title: "No pressure", body: "Free consultation, no sales calls." },
                { icon: Mail, title: "Plain English", body: "No confusing tech jargon — ever." },
              ].map((item, i) => (
                <motion.div key={item.title} variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}>
                  <item.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 px-4 sm:px-6 bg-primary text-primary-foreground text-center">
          <h2 className="text-2xl font-bold mb-2">Need a quote instead?</h2>
          <p className="opacity-90 mb-6 text-sm">Get exact pricing in 60 seconds.</p>
          <Link to="/quote">
            <Button variant="secondary" className="font-bold">
              Get a Free Quote
              <Send className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </section>
      </div>
    </>
  );
};

export default Contact;
