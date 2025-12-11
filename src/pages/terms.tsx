import { motion } from "framer-motion";
import { FileText, AlertCircle, CheckCircle2, XCircle, DollarSign, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 text-[10rem] md:text-[18rem] font-bold bg-gradient-to-b from-foreground/3 to-foreground/0 bg-clip-text text-transparent select-none pointer-events-none">
          TERMS
        </div>
        
        <div className="container mx-auto max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
              <FileText className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold">Terms of Service</h1>
            <p className="text-lg text-muted-foreground">
              Last Updated: December 10, 2024
            </p>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              These terms explain how we work together. We've written them in plain English so you know exactly what to expect.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Simple Overview */}
      <section className="py-12 bg-primary/5 border-y border-primary/20">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Alert className="bg-primary/10 border-primary/30">
              <AlertCircle className="h-5 w-5 text-primary" />
              <AlertDescription className="text-base">
                <strong>The Simple Version:</strong> You pay us to build and/or host your website. We do great work. You own everything. Be respectful. If there's a problem, we'll work it out like reasonable people.
              </AlertDescription>
            </Alert>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl space-y-12">
          
          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4">Our Services</h2>
                  <div className="space-y-3 text-muted-foreground">
                    <p>
                      <strong>Website Building:</strong> We design and build professional websites according to the package you choose (Starter, Business, or Pro). We'll work with you to create a site that represents your business well.
                    </p>
                    <p>
                      <strong>Hosting Services:</strong> We provide secure, reliable web hosting with regular backups, security monitoring, and maintenance.
                    </p>
                    <p>
                      <strong>Support & Updates:</strong> Each plan includes monthly updates (time allowance varies by plan). We respond to support requests according to your plan's response time guarantee.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Payment Terms */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <DollarSign className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-4">Payment Terms</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Website Build</h3>
                      <ul className="space-y-2 text-muted-foreground ml-6">
                        <li>• 50% deposit required to start your project</li>
                        <li>• Remaining 50% due upon approval and before launch</li>
                        <li>• Annual hosting prepayment = FREE website build</li>
                        <li>• 6-month prepayment = 50% off website build</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Hosting</h3>
                      <ul className="space-y-2 text-muted-foreground ml-6">
                        <li>• Monthly plans: Billed monthly, cancel anytime</li>
                        <li>• Annual plans: Paid upfront, service for full 12 months</li>
                        <li>• Payment due on renewal date</li>
                        <li>• Late payments may result in service suspension after 7-day grace period</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Refunds & Cancellations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <XCircle className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-4">Refunds & Cancellations</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Website Build</h3>
                      <ul className="space-y-2 text-muted-foreground ml-6">
                        <li>• Deposits are non-refundable once work begins</li>
                        <li>• We'll work with you on unlimited revisions (Business & Pro) until you're satisfied</li>
                        <li>• If we can't deliver what we promised, you'll get a full refund</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Hosting</h3>
                      <ul className="space-y-2 text-muted-foreground ml-6">
                        <li>• Monthly plans: Cancel anytime, no refunds for partial months</li>
                        <li>• Annual plans: No refunds, but you keep service for the full 12 months you paid for</li>
                        <li>• 30 days notice recommended for cancellation (but not required)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Ownership */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 border-2 border-green-500/20 bg-green-500/5">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-green-500/10 rounded-lg">
                  <Shield className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-4">You Own Everything</h2>
                  <div className="space-y-3 text-muted-foreground">
                    <p>
                      <strong>Your Website:</strong> Once you've paid in full, you own all the content, design, and code we create for your website. It's yours.
                    </p>
                    <p>
                      <strong>Your Domain:</strong> You own your domain name. It's registered in your name (or we'll help you register it in your name).
                    </p>
                    <p>
                      <strong>Your Data:</strong> All your business data, customer information, and content belongs to you. We'll help you export everything if you ever want to move to another host.
                    </p>
                    <p className="font-semibold text-foreground">
                      Bottom line: No lock-in. No hostage situations. Your stuff is your stuff.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Your Responsibilities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">Your Responsibilities</h2>
              <div className="space-y-3 text-muted-foreground">
                <p>We ask that you:</p>
                <ul className="space-y-2 ml-6">
                  <li>• Provide accurate information and content for your website</li>
                  <li>• Own the rights to any content, images, or logos you provide</li>
                  <li>• Don't use our services for anything illegal or harmful</li>
                  <li>• Pay your bills on time</li>
                  <li>• Respond to our requests for information in a timely manner</li>
                  <li>• Don't abuse our support team (be nice, we're people too!)</li>
                </ul>
              </div>
            </Card>
          </motion.div>

          {/* Limitations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">Service Limitations & Disclaimers</h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  <strong>Uptime:</strong> We guarantee 99.9% uptime (Starter) or 99.99% (Business/Pro), but things can go wrong. If we have major downtime, we'll credit your account.
                </p>
                <p>
                  <strong>Backups:</strong> We perform regular backups, but you should keep your own copies of important content too.
                </p>
                <p>
                  <strong>Security:</strong> We use industry-standard security, but no system is 100% foolproof. We'll do our best to keep your site safe.
                </p>
                <p>
                  <strong>Results:</strong> We'll build you a great website, but we can't guarantee specific business results (like "you'll get 100 new customers").
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Disputes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">Dispute Resolution</h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  If there's ever a problem, let's talk about it first. Email us at <a href="mailto:info@darkmesahosting.com" className="text-primary hover:underline">info@darkmesahosting.com</a> and we'll work it out.
                </p>
                <p>
                  If we can't resolve it through discussion, we agree to try mediation before pursuing legal action.
                </p>
                <p className="text-sm">
                  These terms are governed by the laws of [Your State/Province], Canada/USA.
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Changes to Terms */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">Changes to These Terms</h2>
              <p className="text-muted-foreground">
                We may update these terms occasionally. If we make significant changes, we'll email you (if we have your contact info) and update the "Last Updated" date. Continuing to use our services after changes means you accept the new terms.
              </p>
            </Card>
          </motion.div>

        </div>
      </section>

      {/* Contact */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-10 border-2 border-primary/20 bg-primary/5 text-center">
              <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Questions About These Terms?</h2>
              <p className="text-lg text-muted-foreground mb-6">
                If anything is unclear, just ask. We're happy to explain.
              </p>
              <p className="text-lg">
                <strong>Email:</strong>{" "}
                <a href="mailto:info@darkmesahosting.com" className="text-primary hover:underline">
                  info@darkmesahosting.com
                </a>
              </p>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Terms;
