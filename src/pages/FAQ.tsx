import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
import { SEO } from "@/components/SEO";
import { faqStructuredData } from "@/lib/faqStructuredData";

  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, ArrowRight } from "lucide-react";

const FAQ = () => {
  const faqs = [
    {
      category: "General",
      questions: [
        {
          q: "What is Dark Mesa Hosting?",
          a: "Dark Mesa Hosting provides affordable, all-in-one website solutions for small businesses. We handle design, hosting, maintenance, and support in one simple monthly package starting at $39/month. Pay 12 months upfront and get your website built completely free.",
        },
        {
          q: "How long does it take to build a website?",
          a: "Standard turnaround is 5-14 business days depending on your plan. Starter sites take 5-7 days, Business sites 7-10 days, and Pro sites 10-14 days. Rush delivery is available for an additional fee if you need it faster.",
        },
        {
          q: "Do I need technical knowledge to work with you?",
          a: "Not at all! We handle everything technical. You just provide information about your business, and we take care of design, hosting, security, updates, and maintenance.",
        },
      ],
    },
    {
      category: "Pricing & Plans",
      questions: [
        {
          q: "What plans do you offer?",
          a: "We offer three plans: Starter ($39/mo, 3 pages, $349 build), Business ($69/mo, 6 pages, $599 build), and Pro ($99/mo, 9 pages, $999 build). All plans include hosting, SSL, backups, and support.",
        },
        {
          q: "What's the difference between the plans?",
          a: "Starter includes template-based design with basic features. Business adds custom branding, enhanced SEO, analytics, and priority support. Pro includes fully unique design, full local SEO, blog/store, unlimited edits, same-day support, and up to 5 professional email inboxes.",
        },
        {
          q: "What's the 'prepay 12 months = FREE build' offer?",
          a: "When you pay for 12 months of hosting upfront (annual plan), we build your website completely free! This saves you $349-$999 depending on your plan. For example, Business plan: pay $828/year and get a $599 website build free.",
        },
        {
          q: "Can I upgrade or downgrade my plan later?",
          a: "Yes! You can upgrade anytime (we'll prorate the difference). Downgrades take effect at your next billing cycle. We'll help you migrate smoothly.",
        },
        {
          q: "Are there prepay discounts for 6 months?",
          a: "Yes! Prepay 6 months and get 50% off your website build. It's a great middle-ground option if you're not ready for the full 12-month commitment.",
        },
      ],
    },
    {
      category: "Website Building",
      questions: [
        {
          q: "What information do you need from me?",
          a: "We'll need your business name, industry, services/products, company overview, contact info, and any specific requirements. We also ask about existing branding (logo, colors), photos you want to use, and examples of websites you like. The more details you provide, the better your first draft!",
        },
        {
          q: "Can I update my website myself after it's built?",
          a: "Each plan includes free monthly updates: Starter gets 1 update (30 min), Business gets 5 updates (2 hrs total), and Pro gets unlimited updates (4 hrs/month fair use). Just send us your changes and we handle it!",
        },
        {
          q: "Will my website work on mobile devices?",
          a: "Absolutely! All our websites are mobile-first and fully responsive. They look perfect and function flawlessly on phones, tablets, and desktops.",
        },
        {
          q: "Do you include professional email addresses?",
          a: "Starter doesn't include email. Business includes 1 professional inbox (e.g., info@yourcompany.com). Pro includes up to 5 inboxes for your team.",
        },
        {
          q: "What if I need more pages than my plan includes?",
          a: "No problem! Additional pages can be added for a fee. Contact us for a custom quote based on the complexity of the pages you need.",
        },
      ],
    },
    {
      category: "Hosting & Technical",
      questions: [
        {
          q: "What does your hosting include?",
          a: "All plans include: SSL certificates, regular backups, uptime guarantee (99.9% Starter, 99.99% Business/Pro), security monitoring, 24/7 site monitoring, and support. Everything you need to stay online and secure.",
        },
        {
          q: "How often do you back up my site?",
          a: "Starter: monthly backups. Business: bi-weekly backups with 30-day retention. Pro: daily backups with both on-site and off-site copies for maximum protection.",
        },
        {
          q: "Can you help me choose and register a domain?",
          a: "Yes! We help you find available domains and handle the registration. Domain registration costs $10-20/year (paid separately to the registrar). Your first year is FREE when you prepay for hosting!",
        },
        {
          q: "What happens if my website goes down?",
          a: "Our monitoring systems alert us immediately. Starter gets basic monitoring and resolution within 48-72 hours. Business gets advanced firewall protection and 24-hour response. Pro gets proactive security scans with same-day fixes.",
        },
        {
          q: "Do I own my website and domain?",
          a: "Yes! You own both your website content and domain name. If you ever want to leave, we'll help you migrate everything. No lock-in contracts.",
        },
      ],
    },
    {
      category: "SEO & Features",
      questions: [
        {
          q: "What SEO is included in each plan?",
          a: "Starter includes basic SEO (meta tags, mobile optimization, clean code). Business includes enhanced SEO with schema markup and local signals. Pro includes full local SEO pack with advanced optimization for maximum visibility.",
        },
        {
          q: "Is Google Analytics included?",
          a: "Starter offers it as an add-on. Business includes basic Google Analytics + Search Console setup. Pro includes advanced conversion tracking and funnel analysis.",
        },
        {
          q: "Can you add a blog or online store?",
          a: "Starter doesn't include this. Business can add it as an extra feature. Pro includes either a blog OR online store in the base price. E-commerce requires additional setup and may have extra fees depending on complexity.",
        },
        {
          q: "Do you offer website redesigns?",
          a: "Yes! If you have an existing website that needs a refresh, contact us for a custom quote. We can often work with your existing content to speed up the process.",
        },
      ],
    },
    {
      category: "Support & Guarantees",
      questions: [
        {
          q: "What kind of support do you offer?",
          a: "Starter: Email support within 48-72 hours. Business: Priority email within 24 hours. Pro: Same-day response plus phone/text/WhatsApp access for urgent issues.",
        },
        {
          q: "What if I'm not happy with my website?",
          a: "Business and Pro plans include unlimited revisions until you're satisfied. We work with you to get it right. Starter includes reasonable revisions during the build phase.",
        },
        {
          q: "What if I need changes after my website is live?",
          a: "That's what your monthly updates are for! Each plan includes free monthly changes. Additional requests can be handled for a fee based on complexity.",
        },
        {
          q: "Can I cancel anytime?",
          a: "Yes! Monthly plans can be cancelled anytime. Annual plans: since you paid upfront, you keep service for the full 12 months. No refunds on annual plans, but you own everything and can take it with you.",
        },
        {
          q: "What happens to my website if I cancel?",
          a: "You own everything. We'll help you export your site and migrate to another host if you want. Your domain is yours to keep or transfer.",
        },
      ],
    },
  ];

  return (
    <>
      {/* SEO Component */}
      <SEO
        title="Frequently Asked Questions"
        description="Get answers to common questions about Dark Mesa Hosting's website building and hosting services. Learn about pricing, turnaround times, and what's included."
        keywords="website hosting FAQ, web design questions, hosting support, website building help, small business website FAQ"
        canonicalUrl="/faq"
        structuredData={faqStructuredData}
      />
      
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Faded "FAQ" background text */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 text-[15rem] md:text-[25rem] font-bold bg-gradient-to-b from-foreground/3 to-foreground/0 bg-clip-text text-transparent select-none pointer-events-none">
          FAQ
        </div>
        
        <div className="container mx-auto max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <div className="inline-block p-4 bg-primary/10 rounded-full mb-4 hover:scale-110 transition-transform">
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
      <section className="relative py-20 bg-background overflow-hidden">
        {/* Subtle dot grid texture */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }} />
        
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
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
                    className="border border-border rounded-lg px-6 bg-card/50 backdrop-blur-sm hover:border-primary/50 hover:shadow-lg transition-all duration-300"
                  >
                    <AccordionTrigger className="text-left hover:no-underline py-4">
                      <span className="font-semibold">{faq.q}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-4">{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              We're here to help! Reach out and we'll get back to you within 24 hours.
            </p>
            <Link to="/contact" className="group inline-block">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 hover:shadow-xl transition-all duration-300">
                Contact Us <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default FAQ;
