import { Link } from "react-router-dom";
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
  const faqs = [
    {
      category: "General",
      questions: [
        {
          q: "What is Dark Mesa Hosting?",
          a: "Dark Mesa Hosting is a web design and hosting company focused on providing affordable, fast, and reliable websites for small businesses. We offer three plans—Starter, Business, and Pro—with hosting starting at $39/month and website builds from $349.",
        },
        {
          q: "How long does it take to build a website?",
          a: "Standard turnaround is 5-7 business days for most projects. Complex custom projects may take longer, which we'll discuss during consultation.",
        },
        {
          q: "Do I need technical knowledge to work with you?",
          a: "Not at all! We handle all the technical aspects. You just provide us with information about your business, and we take care of the rest.",
        },
      ],
    },
    {
      category: "Pricing Plans",
      questions: [
        {
          q: "What plans do you offer?",
          a: "We offer three plans: Starter ($39/mo, 3 pages, $349 build), Business ($69/mo, up to 6 pages, $599 build), and Pro ($99/mo, up to 9 pages, $999 build). All plans include hosting, SSL, backups, and support. Business is our most popular plan for growing businesses.",
        },
        {
          q: "What's the difference between the plans?",
          a: "Starter is template-based with basic features. Business includes full custom branding, enhanced SEO, multi-step forms, and priority support. Pro offers bespoke UI/UX, advanced SEO pack, blog or e-commerce, unlimited edits, same-day support, and up to 5 professional email inboxes.",
        },
        {
          q: "Can I upgrade my plan later?",
          a: "Yes! You can upgrade at any time. We'll prorate the difference and help migrate your site to the new plan features.",
        },
        {
          q: "Do you offer annual pricing?",
          a: "Yes! Annual plans save approximately 15%: Starter $399/yr (vs $468 monthly), Business $699/yr (vs $828 monthly), and Pro $999/yr (vs $1,188 monthly).",
        },
      ],
    },
    {
      category: "Prepay Discounts",
      questions: [
        {
          q: "How do prepay discounts work?",
          a: "When you prepay your hosting, you get discounts on the website build cost. Prepay 6 months = 50% off your build. Prepay 12 months = FREE build! This applies to all three plans.",
        },
        {
          q: "What's an example of prepay savings?",
          a: "Example with Business plan: Regular cost is $599 build + $69/mo hosting. Prepay 6 months ($414 hosting) + 50% off build ($299.50) = $713.50 total, saving $299.50. Prepay 12 months ($699 annual) = FREE build, saving $599!",
        },
        {
          q: "Can I combine prepay with annual pricing?",
          a: "Yes! When you prepay 12 months, you automatically get the annual rate ($399, $699, or $999) plus a FREE website build—the best value we offer.",
        },
        {
          q: "Is the prepay discount available for upgrades?",
          a: "Prepay discounts apply to new builds. If you're upgrading an existing site, contact us for a custom quote.",
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
          a: "With Starter, you get 1 small edit/month. Business includes up to 5 edits/month (≤2 hours total). Pro offers unlimited edits within fair use (≤4 hours). For more extensive changes, contact us.",
        },
        {
          q: "Will my website work on mobile devices?",
          a: "Absolutely! All our websites are mobile-first and fully responsive, meaning they look great and function perfectly on phones, tablets, and desktops.",
        },
        {
          q: "Do you include professional email addresses?",
          a: "Starter doesn't include email. Business includes 1 professional inbox (e.g., info@yourcompany.com). Pro includes up to 5 inboxes for your team.",
        },
      ],
    },
    {
      category: "Hosting & Technical",
      questions: [
        {
          q: "What does your hosting include?",
          a: "All plans include SSL certificates, backups (monthly for Starter, bi-weekly for Business, daily for Pro), uptime guarantee (99.9% Starter, 99.99% Business/Pro), security monitoring, and support.",
        },
        {
          q: "How often do you update and back up my site?",
          a: "Starter: monthly updates and backups. Business: daily updates, bi-weekly backups with 30-day retention. Pro: daily updates with staging environment, weekly off-site + daily on-site backups.",
        },
        {
          q: "Can you help me choose and register a domain?",
          a: "Yes! We offer domain registration assistance for $15 (plus the registrar's cost, typically $10-20/year for .com domains). We'll help you find available domains and handle the setup.",
        },
        {
          q: "What happens if my website goes down?",
          a: "Our uptime guarantee means downtime is rare. Starter includes basic monitoring. Business includes advanced firewall and cleanup. Pro gets proactive scans with instant fixes. Business and Pro customers receive uptime credits if we fail to meet 99.99% uptime.",
        },
      ],
    },
    {
      category: "SEO & Marketing",
      questions: [
        {
          q: "What SEO is included in each plan?",
          a: "Starter includes basic SEO structure (meta tags, mobile optimization). Business includes enhanced SEO with schema markup and local signals. Pro includes a full local SEO pack with advanced optimization.",
        },
        {
          q: "Is Google Analytics included?",
          a: "Starter offers it as an optional add-on. Business includes basic Google Analytics + Search Console setup. Pro includes advanced funnel tracking for conversion optimization.",
        },
        {
          q: "Will my website rank on Google?",
          a: "We build SEO-friendly websites, but ranking depends on many factors including competition, content quality, and ongoing SEO efforts. Higher-tier plans include more comprehensive SEO to give you the best starting position.",
        },
      ],
    },
    {
      category: "Support & Guarantees",
      questions: [
        {
          q: "What kind of support do you offer?",
          a: "Starter: Email support 48-72 hours. Business: Priority email within 24 hours. Pro: Same-day response plus phone/text/WhatsApp access for urgent issues.",
        },
        {
          q: "What guarantees do you offer?",
          a: "Starter: 30-day money-back guarantee on hosting. Business: Unlimited revisions on the build until you're satisfied. Pro: Unlimited revisions plus 90 days of post-launch support.",
        },
        {
          q: "What if I need changes after my website is live?",
          a: "Each plan includes monthly edits (1 for Starter, 5 for Business, unlimited for Pro within fair use). Additional changes can be requested anytime—we'll quote based on complexity.",
        },
      ],
    },
  ];

  return (
    <>
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
    </>
  );
};

export default FAQ;