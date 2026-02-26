import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, MapPin, Code, Server, Headphones, Paintbrush } from "lucide-react";
import { SEO } from "@/components/SEO";

const fade = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

const services = [
  { icon: Paintbrush, title: "Design", description: "I personally design every site to match your brand and goals." },
  { icon: Code, title: "Development", description: "Clean, fast code — built for performance and easy updates." },
  { icon: Server, title: "Hosting", description: "Reliable hosting managed by me, so you never have to worry." },
  { icon: Headphones, title: "Support", description: "When you email, I'm the one who replies — usually the same day." },
];

const About = () => {
  return (
    <>
      <SEO
        title="About — Dark Mesa Hosting"
        description="Meet Rowen Botha, the founder of Dark Mesa Hosting. Professional websites for small businesses, built and supported by a real person in British Columbia, Canada."
        keywords="about dark mesa hosting, rowen botha, small business web designer canada"
        canonical="https://darkmesahosting.com/about"
      />

      <div className="min-h-screen bg-background">
        {/* Header */}
        <section className="pt-24 pb-12 px-4 sm:px-6 text-center">
          <motion.div variants={fade} initial="hidden" animate="show" custom={0} className="max-w-2xl mx-auto">
            <p className="text-sm font-medium text-primary mb-3 flex items-center justify-center gap-1.5">
              <MapPin className="w-4 h-4" />
              British Columbia, Canada
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Hey, I'm Rowen.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm the person behind Dark Mesa Hosting — the one who designs your site, sets up your hosting, and answers your emails.
            </p>
          </motion.div>
        </section>

        {/* Story */}
        <section className="pb-12 px-4 sm:px-6">
          <div className="container mx-auto max-w-2xl">
            <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} custom={0}>
              <Card className="p-6 sm:p-8">
                <h2 className="text-xl font-bold mb-4">Why I started Dark Mesa</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    I kept seeing small businesses get stuck in the same trap: either paying thousands to an agency for a website they couldn't update, or wrestling with DIY builders that never looked quite right.
                  </p>
                  <p>
                    I started Dark Mesa Hosting to offer a better option — professional websites at honest prices, with real support from someone who actually cares about your business doing well. No big team. No account managers. Just me, doing the work and standing behind it.
                  </p>
                  <p>
                    Every site I build, I host and maintain myself. That means when something needs fixing, I already know the project inside and out. It's a simpler way to work, and my clients seem to appreciate it.
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* What I handle */}
        <section className="py-12 px-4 sm:px-6 bg-muted/30 border-y border-border">
          <div className="container mx-auto max-w-4xl">
            <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">Everything goes through me</h2>
              <p className="text-muted-foreground">One point of contact, from first email to finished website.</p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-5">
              {services.map((s, i) => (
                <motion.div key={s.title} variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}>
                  <Card className="p-5 flex items-start gap-4 h-full">
                    <div className="p-2.5 bg-primary/10 rounded-md flex-shrink-0">
                      <s.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{s.title}</h3>
                      <p className="text-sm text-muted-foreground">{s.description}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 px-4 sm:px-6 bg-primary text-primary-foreground text-center">
          <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Let's build something for your business</h2>
            <p className="opacity-90 mb-6">Get a free quote in 60 seconds — no pressure, no sales pitch.</p>
            <Link to="/quote">
              <Button variant="secondary" size="lg" className="font-bold">
                Get a Free Quote
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </section>
      </div>
    </>
  );
};

export default About;
