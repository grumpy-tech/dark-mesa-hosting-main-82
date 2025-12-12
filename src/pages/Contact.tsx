import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Mail, MapPin, Send, MessageSquare, Clock, CheckCircle2 } from "lucide-react";
import { SEO } from "@/components/SEO";
import { localBusinessSchema } from "@/lib/structuredData";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.message.length > 1000) {
      toast({
        title: "Message too long",
        description: "Please limit your message to 1000 characters",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('message', formData.message);

      const response = await fetch('/send_email.php', {
        method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Message Sent!",
          description: "We'll get back to you as soon as possible.",
        });
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        throw new Error(result.message || 'Failed to send message');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or email us directly.",
        variant: "destructive",
      });
      console.error('Error sending email:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      detail: "info@darkmesahosting.com",
      link: "mailto:info@darkmesahosting.com",
      description: "Get a response within 24 hours"
    },
    {
      icon: MapPin,
      title: "Location",
      detail: "Remote & Global",
      description: "Serving clients worldwide"
    },
    {
      icon: Clock,
      title: "Response Time",
      detail: "24 Hours",
      description: "We reply to all inquiries promptly"
    }
  ];

  return (
    <>
      <SEO
        title="Contact Us - Get Your Free Quote"
        description="Contact Dark Mesa Hosting for website design and hosting services. Fast 24-hour response time. Email, phone, or use our contact form to get started."
        keywords="contact web designer, website quote, hosting support, web design consultation"
        canonical="https://darkmesahosting.com/contact"
        ogImage="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1200&auto=format&fit=crop"
        schemas={[localBusinessSchema]}
      />
      
      <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Faded "CONTACT" background text */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 text-[10rem] md:text-[18rem] font-bold bg-gradient-to-b from-foreground/3 to-foreground/0 bg-clip-text text-transparent select-none pointer-events-none">
          CONTACT
        </div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <div className="inline-block p-4 bg-primary/10 rounded-full mb-4 hover:scale-110 transition-transform">
              <MessageSquare className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold">Get In Touch</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Have a question? We're here to help. Send us a message and we'll respond within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-transparent" />
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }} />
        
        <div className="container mx-auto px-6 max-w-5xl relative z-10">
          <div className="grid md:grid-cols-3 gap-8">
            {contactMethods.map((method, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
              >
                <Card className="p-6 text-center border-border hover:border-primary/50 hover:shadow-xl hover:scale-105 transition-all duration-300 backdrop-blur-sm bg-card/80 group h-full">
                  <div className="inline-block p-3 bg-primary/10 rounded-full mb-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                    <method.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{method.title}</h3>
                  {method.link ? (
                    <a 
                      href={method.link} 
                      className="text-primary hover:underline font-medium block mb-2"
                    >
                      {method.detail}
                    </a>
                  ) : (
                    <div className="text-foreground font-medium mb-2">{method.detail}</div>
                  )}
                  <p className="text-sm text-muted-foreground">{method.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Send Us a Message</h2>
            <p className="text-lg text-muted-foreground">
              Fill out the form below and we'll get back to you within 24 hours
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 md:p-12 border-2 border-border backdrop-blur-sm bg-card/80 hover:shadow-2xl transition-all duration-300">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="group">
                    <Label htmlFor="name" className="text-base">Name *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      className="mt-2 h-12 transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  
                  <div className="group">
                    <Label htmlFor="email" className="text-base">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      className="mt-2 h-12 transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>
                
                <div className="group">
                  <Label htmlFor="phone" className="text-base">Phone (Optional)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(123) 456-7890"
                    className="mt-2 h-12 transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                
                <div className="group">
                  <Label htmlFor="message" className="text-base">Message *</Label>
                  <Textarea
                    id="message"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can we help you?"
                    rows={6}
                    maxLength={1000}
                    className="mt-2 transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    {formData.message.length}/1000 characters
                  </p>
                </div>
                
                <Button
                  type="submit"
                  className="w-full h-14 text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 hover:shadow-xl transition-all duration-300 group"
                  disabled={isSubmitting}
                >
                  <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us / Benefits */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-muted/30" />
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }} />
        
        <div className="container mx-auto px-6 max-w-5xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Work With Us?</h2>
            <p className="text-lg text-muted-foreground">
              We're committed to your success
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Clock,
                title: "Fast Response",
                description: "We respond to all inquiries within 24 hours, usually much faster"
              },
              {
                icon: CheckCircle2,
                title: "No Pressure",
                description: "Free consultation with no obligations. We're here to help, not pressure"
              },
              {
                icon: Mail,
                title: "Clear Communication",
                description: "We explain everything in plain language, no confusing tech jargon"
              }
            ].map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 text-center border-border hover:border-primary/50 hover:shadow-xl hover:scale-105 transition-all duration-300 group h-full">
                  <div className="inline-block p-3 bg-primary/10 rounded-full mb-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                    <benefit.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-primary text-primary-foreground overflow-hidden">
        {/* Faded "QUOTE" text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[6rem] md:text-[12rem] font-bold opacity-5 select-none pointer-events-none">
          QUOTE
        </div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Looking for a Quote Instead?</h2>
            <p className="text-lg mb-8 opacity-90">
              Get a detailed proposal with exact pricing for your project in 60 seconds
            </p>
            <Link to="/quote" className="group inline-block">
              <Button size="lg" variant="secondary" className="h-14 px-8 text-lg font-bold hover:scale-110 hover:shadow-2xl transition-all duration-300">
                Get a Free Quote
                <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <p className="text-sm mt-6 opacity-75">
              No credit card required • Free consultation • No pressure
            </p>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  );
};

export default Contact;
