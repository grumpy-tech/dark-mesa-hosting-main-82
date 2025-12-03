import { useState } from 'react';
import { Button } from "@/components/ui/button"; // Shadcn button
import { Input } from "@/components/ui/input";   // Shadcn input
import { Textarea } from "@/components/ui/textarea"; // Shadcn textarea
import { Label } from "@/components/ui/label";     // Shadcn label
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Shadcn card
import { useToast } from "@/hooks/use-toast";       // Your custom hook
import { Mail, MapPin, Send, Loader2 } from "lucide-react"; // Icons

// Define the shape of the form data
interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const { toast } = useToast(); // Initialize toast

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('/send_email.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' }); // Clear form
        toast({
          title: "Message Sent!",
          description: "Thank you for reaching out. We'll be in touch soon.",
          className: "bg-green-500 text-white"
        });
      } else {
        setStatus('error');
        toast({
          title: "Submission Failed",
          description: result.message || 'An unknown error occurred. Please try again.',
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
      toast({
        title: "Network Error",
        description: "Could not connect to the server. Please check your network.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex justify-center p-4 sm:p-8 min-h-screen bg-gray-50">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-3xl font-bold text-gray-800">
            <Mail className="h-7 w-7 text-indigo-600" />
            <span>Contact Us</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            {/* Phone Field */}
            <div className="space-y-2">
              <Label htmlFor="phone">Phone (Optional)</Label>
              <Input
                id="phone"
                type="tel"
                name="phone"
                placeholder="(555) 123-4567"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            {/* Message Field */}
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                rows={5}
                placeholder="How can we help you?"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            {/* Submission Button */}
            <Button type="submit" className="w-full h-12 text-lg font-semibold" disabled={status === 'sending'}>
              {status === 'sending' ? (
                <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...</>
              ) : (
                <><Send className="mr-2 h-5 w-5" /> Send Message</>
              )}
            </Button>
          </form>

          {/* Contact Info (Example of using another icon) */}
          <div className="mt-8 pt-4 border-t border-gray-100 space-y-3 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-indigo-500" />
              <span>123 Main St, Anytown, USA</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Contact;
