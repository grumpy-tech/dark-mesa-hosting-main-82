import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.message.length > 1000) {
      toast({
        title: "Message too long",
        description: "Please limit your message to 1000 characters",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Message Sent!",
      description: "We'll get back to you as soon as possible.",
    });
    
    console.log("Contact form submitted:", formData);
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="container mx-auto px-6 py-32">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg text-muted-foreground">
              Have a question? We're here to help. Send us a message and we'll respond within 24 hours.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Contact Info */}
            <Card className="p-8 border-border space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Get In Touch</h3>
                <p className="text-muted-foreground mb-6">
                  Reach out to us directly via email or phone, or fill out the contact form and we'll get back to you promptly.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <div className="font-medium text-lg">Email</div>
                    <a href="mailto:hello@darkmesa.com" className="text-muted-foreground hover:text-primary transition-colors">
                      hello@darkmesa.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Phone className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <div className="font-medium text-lg">Phone</div>
                    <a href="tel:+1234567890" className="text-muted-foreground hover:text-primary transition-colors">
                      (123) 456-7890
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <div className="font-medium text-lg">Location</div>
                    <div className="text-muted-foreground">Remote & Global</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Contact Form */}
            <Card className="p-8 border-border">
              <h3 className="text-xl font-semibold mb-6">Send Us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone (Optional)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(123) 456-7890"
                  />
                </div>
                
                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can we help you?"
                    rows={5}
                    maxLength={1000}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {formData.message.length}/1000 characters
                  </p>
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
          
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Looking for a quote instead?
            </p>
            <a href="/quote">
              <Button size="lg" variant="outline">
                Get a Free Quote
              </Button>
            </a>
          </div>
        </div>
      </div>
  );
};

export default Contact;
