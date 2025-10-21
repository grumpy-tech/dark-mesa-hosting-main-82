import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, ArrowRight } from "lucide-react";

const FAQ = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqs = [
    {
      category: "General",
      questions: [
        {
          q: "What is Dark Mesa?",
          a: "Dark Mesa is a web design and hosting company focused on providing affordable, fast, and reliable websites for small businesses. We build professional websites starting at $249 and offer hosting from $12/month.",
        },
        {
          q: "How long does it take to build a website?",
          a: "Standard turnaround is 5-7 business days for most projects. We also offer rush delivery (2-3 days) for an additional $150. Complex custom projects may take longer, which we'll discuss during consultation.",
        },
        {
          q: "Do I need technical knowledge to work with you?",
          a: "Not at all! We handle all the technical aspects. You just provide us with information about your business, and we take care of the rest.",
        },
      ],
    },
    {
      category: "Pricing & Payments",
      questions: [
        {
          q: "What's included in the pricing?",
          a: "Our website building packages include design, development, mobile optimization, basic SEO, contact forms, and essential integrations. Hosting packages include SSL certificates, daily backups, 99.9% uptime, and ongoing support. See our Pricing page for detailed breakdowns.",
        },
        {
          q: "How does payment work?",
          a: "For website builds, we require a 50% deposit to start, with the balance due upon launch. Hosting is billed monthly or yearly (10% discount for annual payments). We accept credit cards, with a 3% processing fee.",
        },
        {
          q: "Are there any hidden fees?",
          a: "No hidden fees! Our pricing is transparent. Additional costs only apply for optional add-ons like custom logos ($75), extra pages ($125 each), or domain registration assistance (registrar cost + $15 handling).",
        },
        {
          q: "Can I get a refund if I'm not satisfied?",
          a: "We work closely with you during the design process to ensure satisfaction. Once your website is launched, we don't offer refunds. However, we do provide revision rounds before launch to make sure you're happy with the result.",
        },
      ],
    },
    {
      category: "Website Building",
      questions: [
        {
          q: "What information do you need from me?",
          a: "We'll need your business name, industry, services/products, company overview, contact information, and any specific requirements. We also ask about existing branding (logo, colors), photos/images you want to use, and examples of websites you like.",
        },
        {
          q: "Can I update my website myself after it's built?",
          a: "Yes! We can provide you with simple instructions for basic content updates. For more complex changes, we offer monthly maintenance packages starting at $40/month.",
        },
        {
          q: "Do you provide content writing?",
          a: "We work with the content you provide. If you need help writing copy for your website, we can recommend professional copywriters or include it as a custom add-on.",
        },
        {
          q: "Will my website work on mobile devices?",
          a: "Absolutely! All our websites are mobile-first and fully responsive, meaning they look great and function perfectly on phones, tablets, and desktops.",
        },
      ],
    },
    {
      category: "Hosting & Domains",
      questions: [
        {
          q: "What does your hosting include?",
          a: "Our hosting includes SSL certificates, daily/hourly backups, 99.9% uptime guarantee, DDoS protection, 24/7 monitoring, unlimited bandwidth, and customer support. Basic hosting includes 10GB storage; Advanced includes 50GB plus CDN.",
        },
        {
          q: "Do I need to purchase hosting if I already have a website?",
          a: "Not necessarily. If you're happy with your current hosting provider, we can work with that. However, our hosting is optimized for the websites we build and comes with excellent support.",
        },
        {
          q: "Can you help me choose and register a domain?",
          a: "Yes! We offer domain registration assistance for $15 (plus the registrar's cost, typically $10-20/year for .com domains). We'll help you find available domains and handle the setup.",
        },
        {
          q: "What happens if my website goes down?",
          a: "Our 99.9% uptime guarantee means downtime is rare. If issues occur, our 24/7 monitoring alerts us immediately, and we work to restore service quickly. Advanced hosting customers get priority support.",
        },
      ],
    },
    {
      category: "SEO & Marketing",
      questions: [
        {
          q: "Is SEO included?",
          a: "Basic SEO is included in all packages (meta tags, mobile optimization, fast loading). Premium packages include enhanced SEO. For advanced SEO (keyword research, ongoing optimization), we offer a $200 add-on.",
        },
        {
          q: "Will my website rank on Google?",
          a: "We build SEO-friendly websites, but ranking depends on many factors including competition, content quality, and ongoing SEO efforts. We set you up for success, but ongoing marketing and content are key to improving rankings over time.",
        },
      ],
    },
    {
      category: "Support & Maintenance",
      questions: [
        {
          q: "What kind of support do you offer after launch?",
          a: "All hosting packages include email support. Advanced hosting includes priority support with faster response times. We also offer optional monthly maintenance ($40/month) for regular updates and changes.",
        },
        {
          q: "What if I need changes after my website is live?",
          a: "Minor tweaks during the first month are included. After that, you can hire us for individual updates or sign up for monthly maintenance, which includes regular updates and changes.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
              <HelpCircle className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold">Frequently Asked Questions</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Got questions? We've got answers. Find everything you need to know about our services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 max-w-4xl">
          {faqs.map((category, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-primary">{category.category}</h2>
              <Accordion type="single" collapsible className="space-y-4">
                {category.questions.map((faq, j) => (
                  <AccordionItem
                    key={j}
                    value={`${i}-${j}`}
                    className="border border-border rounded-lg px-6 bg-card"
                  >
                    <AccordionTrigger className="text-left hover:no-underline">
                      <span className="font-semibold">{faq.q}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              We're here to help! Reach out to us and we'll get back to you within 24 hours.
            </p>
            <Link to="/contact">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Contact Us <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default FAQ;
