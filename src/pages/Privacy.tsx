import { motion } from "framer-motion";
import { Shield, Mail, Lock, Eye, UserX, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";

const Privacy = () => {
  const sections = [
    {
      icon: FileText,
      title: "What Information We Collect",
      content: [
        "When you fill out our contact form, we collect: your name, email address, phone number (optional), and your message.",
        "When you request a quote, we collect: your company name, business type, email, phone, location, website details, and project requirements.",
        "When you browse our website, we may collect: IP addresses, browser type, device information, and pages visited through Google Analytics (only if you accept cookies)."
      ]
    },
    {
      icon: Eye,
      title: "How We Use Your Information",
      content: [
        "To respond to your inquiries and provide customer support",
        "To prepare and send you project quotes",
        "To communicate about your website project",
        "To improve our website and services through analytics (if you consent to cookies)",
        "We will never sell, rent, or share your personal information with third parties for marketing purposes."
      ]
    },
    {
      icon: Lock,
      title: "How We Protect Your Information",
      content: [
        "Your data is transmitted securely using SSL encryption (https://)",
        "We store contact and quote information securely and limit access to authorized personnel only",
        "We do not store credit card information on our servers",
        "We retain your information only as long as necessary to provide our services or as required by law"
      ]
    },
    {
      icon: UserX,
      title: "Your Rights & Choices",
      content: [
        "You can reject analytics cookies at any time using our cookie banner",
        "You can request to see what information we have about you",
        "You can request that we delete your information",
        "You can request that we correct any inaccurate information",
        "To exercise these rights, email us at info@darkmesahosting.com"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 text-[10rem] md:text-[18rem] font-bold bg-gradient-to-b from-foreground/3 to-foreground/0 bg-clip-text text-transparent select-none pointer-events-none">
          PRIVACY
        </div>
        
        <div className="container mx-auto max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
              <Shield className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold">Privacy Policy</h1>
            <p className="text-lg text-muted-foreground">
              Last Updated: December 10, 2024
            </p>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We respect your privacy. This policy explains what information we collect, how we use it, and your rights.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Summary */}
      <section className="py-12 bg-primary/5 border-y border-primary/20">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-6 text-center">The Simple Version</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Mail, title: "We Only Collect What You Give Us", desc: "Contact forms and quote requests" },
                { icon: Lock, title: "We Keep It Safe", desc: "Encrypted and secure" },
                { icon: UserX, title: "We Never Sell Your Data", desc: "Period." }
              ].map((item, idx) => (
                <Card key={idx} className="p-6 text-center border-primary/20 hover:border-primary/40 transition-all">
                  <item.icon className="w-10 h-10 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Detailed Sections */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="space-y-12">
            {sections.map((section, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 border-border hover:shadow-xl transition-all">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <section.icon className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{section.title}</h2>
                    </div>
                  </div>
                  <ul className="space-y-3 ml-16">
                    {section.content.map((item, i) => (
                      <li key={i} className="text-muted-foreground leading-relaxed">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Third Party Services */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <FileText className="w-8 h-8 text-primary" />
                Third-Party Services
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong>Google Analytics:</strong> If you accept cookies, we use Google Analytics to understand how visitors use our website (pages viewed, time spent, etc.). Google Analytics collects IP addresses and browsing data. You can opt out by rejecting cookies in our cookie banner.
                </p>
                <p>
                  <strong>Email Service:</strong> We use standard email services to communicate with you. Your email address is only used to respond to your inquiries.
                </p>
                <p>
                  <strong>Hosting Provider:</strong> Our website is hosted on secure servers. Your data is protected by industry-standard security measures.
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Cookies */}
      <section className="py-12">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">Cookies</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We use cookies only if you accept them through our cookie consent banner. Here's what cookies we use:
                </p>
                <ul className="space-y-2 ml-6">
                  <li><strong>Essential Cookies:</strong> Remember your cookie preferences (always active)</li>
                  <li><strong>Analytics Cookies:</strong> Google Analytics tracking (only if you accept)</li>
                </ul>
                <p>
                  You can change your cookie preferences at any time by clearing your browser cookies and refreshing our website to see the banner again.
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Changes to Policy */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
              <p className="text-muted-foreground">
                We may update this Privacy Policy from time to time. When we do, we'll update the "Last Updated" date at the top of this page. We'll notify you of any significant changes by email if we have your contact information.
              </p>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-10 border-2 border-primary/20 bg-primary/5 text-center">
              <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Questions About Your Privacy?</h2>
              <p className="text-lg text-muted-foreground mb-6">
                We're happy to answer any questions about how we handle your information.
              </p>
              <div className="space-y-2">
                <p className="text-lg">
                  <strong>Email:</strong>{" "}
                  <a href="mailto:info@darkmesahosting.com" className="text-primary hover:underline">
                    info@darkmesahosting.com
                  </a>
                </p>
                <p className="text-sm text-muted-foreground">
                  We typically respond within 24 hours
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
