import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, DollarSign, X, Star, Shield, Zap, AlertCircle } from "lucide-react";

// --- Plan Data ---
import { SEO } from "@/components/SEO";
import { pricingProducts } from "@/lib/structuredData";

const plans = [
    {
        name: "Starter",
        emoji: "🟢",
        monthly: 39,
        annual: 468,
        buildPrice: 349,
        description: "Perfect for new businesses getting online",
        bestFor: "Solo entrepreneurs, new businesses",
        color: "from-green-500/20 to-emerald-500/20",
        borderColor: "border-green-500/30",
        features: [
            { name: "Pages Included", value: "3 pages", icon: "📄" },
            { name: "Mobile Optimized", value: true, icon: "📱" },
            { name: "Basic SEO Setup", value: true, icon: "🔍" },
            { name: "Contact Form", value: true, icon: "✉️" },
            { name: "Monthly Updates", value: "1 update (30 min)", icon: "🔄" },
            { name: "Support Response", value: "48-72 hours", icon: "💬" },
        ],
        excluded: ["Analytics", "Blog/Store", "Professional Email", "Priority Support"]
    },
    {
        name: "Business",
        emoji: "🔵",
        popular: true,
        monthly: 69,
        annual: 828,
        buildPrice: 599,
        description: "Everything growing businesses need",
        bestFor: "Small businesses ready to scale",
        color: "from-blue-500/20 to-cyan-500/20",
        borderColor: "border-blue-500/50",
        features: [
            { name: "Pages Included", value: "Up to 6 pages", icon: "📄" },
            { name: "Custom Brand Design", value: true, icon: "🎨" },
            { name: "Enhanced SEO", value: true, icon: "🔍" },
            { name: "Advanced Forms", value: true, icon: "✉️" },
            { name: "Analytics Dashboard", value: true, icon: "📊" },
            { name: "Blog or Store Add-on", value: true, icon: "🛍️" },
            { name: "Monthly Updates", value: "5 updates (2 hrs)", icon: "🔄" },
            { name: "Professional Email", value: "1 inbox", icon: "📧" },
            { name: "Support Response", value: "24 hours", icon: "💬" },
        ],
        excluded: []
    },
    {
        name: "Pro",
        emoji: "🔴",
        monthly: 99,
        annual: 1188,
        buildPrice: 999,
        description: "Premium performance for established brands",
        bestFor: "Established businesses, high-traffic sites",
        color: "from-purple-500/20 to-pink-500/20",
        borderColor: "border-purple-500/30",
        features: [
            { name: "Pages Included", value: "Up to 9 pages", icon: "📄" },
            { name: "Unique Custom Design", value: true, icon: "✨" },
            { name: "Full Local SEO", value: true, icon: "🔍" },
            { name: "Form Automation", value: true, icon: "⚡" },
            { name: "Advanced Analytics", value: true, icon: "📊" },
            { name: "Blog & Store Included", value: true, icon: "🛍️" },
            { name: "Unlimited Updates", value: "4 hrs/month", icon: "🔄" },
            { name: "Professional Email", value: "5 inboxes", icon: "📧" },
            { name: "Priority Support", value: "Same day", icon: "🚀" },
        ],
        excluded: []
    }
];

const PricingPage = () => {
    const [isYearly, setIsYearly] = useState(true);
    const [showComparison, setShowComparison] = useState(false);

    return (
        <div className="min-h-screen bg-background">
            {/* Hero */}
            <section className="pt-32 pb-16 px-6 relative overflow-hidden">
                {/* Faded "PRICING" background text */}
                <div className="absolute top-20 left-1/2 -translate-x-1/2 text-[12rem] md:text-[20rem] font-bold bg-gradient-to-b from-foreground/3 to-foreground/0 bg-clip-text text-transparent select-none pointer-events-none">
                  PRICING
                </div>
                
                <div className="container mx-auto max-w-6xl relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center space-y-6"
                    >
                        <div className="inline-block p-4 bg-primary/10 rounded-full mb-4 hover:scale-110 transition-transform">
                            <DollarSign className="w-12 h-12 text-primary" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold">Simple Pricing. Powerful Websites.</h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            Transparent pricing for design, hosting, maintenance, and support—all in one package.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Monthly/Yearly Toggle Section */}
            <section className="pb-12 px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex flex-col items-center gap-6">
                        <div className="inline-flex items-center bg-card/80 backdrop-blur-sm border-2 border-border rounded-full p-1 shadow-lg hover:shadow-xl transition-shadow">
                            <button
                                onClick={() => setIsYearly(false)}
                                className={`px-8 py-3 rounded-full font-bold transition-all duration-300 ${
                                    !isYearly
                                        ? 'bg-primary text-primary-foreground shadow-md scale-105'
                                        : 'text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                Monthly
                            </button>
                            <button
                                onClick={() => setIsYearly(true)}
                                className={`px-8 py-3 rounded-full font-bold transition-all duration-300 ${
                                    isYearly
                                        ? 'bg-primary text-primary-foreground shadow-md scale-105'
                                        : 'text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                Annual
                            </button>
                        </div>
                        
                        {isYearly && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-green-500/10 border border-green-500/30 rounded-lg px-6 py-3 max-w-2xl backdrop-blur-sm"
                            >
                                <div className="flex items-start gap-3">
                                    <Shield className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                    <div className="text-sm">
                                        <p className="font-bold text-green-700 dark:text-green-400 mb-1">
                                            Annual Commitment = Free Website Build
                                        </p>
                                        <p className="text-muted-foreground">
                                            Pay for 12 months of hosting upfront and get your website built for free (save $349-$999). Month-to-month plans available with build fee.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="pb-16 px-6 relative">
                {/* Subtle gradient background */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
                
                <div className="container mx-auto max-w-7xl relative z-10">
                    <div className="grid md:grid-cols-3 gap-8">
                        {plans.map((plan, idx) => (
                            <motion.div
                                key={plan.name}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1, duration: 0.5 }}
                            >
                                <Card 
                                    className={`relative p-8 backdrop-blur-sm hover:scale-105 transition-all duration-300 ${
                                        plan.popular 
                                            ? 'border-2 border-primary shadow-2xl hover:shadow-primary/50' 
                                            : 'border border-border hover:border-primary/50 hover:shadow-xl'
                                    }`}
                                >
                                    {plan.popular && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg animate-pulse">
                                            <Star className="w-4 h-4 fill-current" /> Most Popular
                                        </div>
                                    )}

                                    {/* Header */}
                                    <div className="text-center mb-6">
                                        <div className="text-5xl mb-3">{plan.emoji}</div>
                                        <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                                        <p className="text-sm text-muted-foreground mb-1">{plan.description}</p>
                                        <p className="text-xs text-muted-foreground italic">Best for: {plan.bestFor}</p>
                                    </div>

                                    {/* Pricing */}
                                    <div className="border-y border-border py-6 mb-6">
                                        <div className="text-center">
                                            <div className="flex items-baseline justify-center gap-1 mb-2">
                                                <span className="text-5xl font-bold">
                                                    ${isYearly ? Math.round(plan.annual / 12) : plan.monthly}
                                                </span>
                                                <span className="text-xl text-muted-foreground">/month</span>
                                            </div>
                                            
                                            {isYearly ? (
                                                <>
                                                    <p className="text-sm text-muted-foreground mb-3">
                                                        ${plan.annual} billed annually
                                                    </p>
                                                    <div className="bg-green-500/10 border border-green-500/30 rounded-md px-3 py-2">
                                                        <p className="text-sm font-bold text-green-700 dark:text-green-400">
                                                            Website Build: FREE
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            (Save ${plan.buildPrice})
                                                        </p>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <p className="text-sm text-muted-foreground mb-3">
                                                        Billed monthly, cancel anytime
                                                    </p>
                                                    <div className="bg-muted border border-border rounded-md px-3 py-2">
                                                        <p className="text-sm font-semibold">
                                                            Website Build: ${plan.buildPrice}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            One-time payment
                                                        </p>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    {/* Features */}
                                    <div className="space-y-3 mb-8">
                                        {plan.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-start gap-3">
                                                <span className="text-lg mt-0.5">{feature.icon}</span>
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium">{feature.name}</p>
                                                    {typeof feature.value === 'string' && (
                                                        <p className="text-xs text-muted-foreground">{feature.value}</p>
                                                    )}
                                                </div>
                                                {typeof feature.value === 'boolean' && feature.value && (
                                                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    {/* CTA - FIXED LINK */}
                                    <Link to="/quote" className="block w-full group">
                                        <Button 
                                            className="w-full h-12 text-base font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:scale-105 hover:shadow-xl transition-all duration-300"
                                        >
                                            Choose {plan.name}
                                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </Link>

                                    {/* Total First Year Cost */}
                                    <div className="mt-4 text-center text-xs text-muted-foreground">
                                        {isYearly ? (
                                            <p>First year total: ${plan.annual}</p>
                                        ) : (
                                            <p>First year total: ${plan.monthly * 12 + plan.buildPrice}</p>
                                        )}
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    {/* Comparison Toggle */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-center mt-12"
                    >
                        <button
                            onClick={() => setShowComparison(!showComparison)}
                            className="text-primary hover:underline font-semibold flex items-center gap-2 mx-auto group hover:scale-105 transition-transform"
                        >
                            {showComparison ? 'Hide' : 'Show'} Detailed Feature Comparison
                            <ArrowRight className={`w-4 h-4 transition-transform ${showComparison ? 'rotate-90' : ''} group-hover:translate-x-1`} />
                        </button>
                    </motion.div>

                    {/* Detailed Comparison Table */}
                    {showComparison && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-8 overflow-x-auto rounded-lg border border-border shadow-xl"
                        >
                            <table className="w-full backdrop-blur-sm bg-card/50">
                                <thead className="bg-muted/50">
                                    <tr>
                                        <th className="px-6 py-4 text-left font-bold">Feature</th>
                                        {plans.map(plan => (
                                            <th key={plan.name} className="px-6 py-4 text-center font-bold">
                                                {plan.emoji} {plan.name}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-6 py-3 font-medium">Pages Included</td>
                                        <td className="px-6 py-3 text-center">3 pages</td>
                                        <td className="px-6 py-3 text-center">6 pages</td>
                                        <td className="px-6 py-3 text-center">9 pages</td>
                                    </tr>
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-6 py-3 font-medium">Design Quality</td>
                                        <td className="px-6 py-3 text-center text-sm">Template-based</td>
                                        <td className="px-6 py-3 text-center text-sm">Custom branded</td>
                                        <td className="px-6 py-3 text-center text-sm">Fully unique</td>
                                    </tr>
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-6 py-3 font-medium">SEO Optimization</td>
                                        <td className="px-6 py-3 text-center text-sm">Basic setup</td>
                                        <td className="px-6 py-3 text-center text-sm">Enhanced</td>
                                        <td className="px-6 py-3 text-center text-sm">Full local SEO</td>
                                    </tr>
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-6 py-3 font-medium">Monthly Updates</td>
                                        <td className="px-6 py-3 text-center text-sm">30 min</td>
                                        <td className="px-6 py-3 text-center text-sm">2 hours</td>
                                        <td className="px-6 py-3 text-center text-sm">4 hours</td>
                                    </tr>
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-6 py-3 font-medium">Support Response</td>
                                        <td className="px-6 py-3 text-center text-sm">48-72 hrs</td>
                                        <td className="px-6 py-3 text-center text-sm">24 hours</td>
                                        <td className="px-6 py-3 text-center text-sm">Same day</td>
                                    </tr>
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-6 py-3 font-medium">Analytics</td>
                                        <td className="px-6 py-3 text-center"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                                        <td className="px-6 py-3 text-center"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                                        <td className="px-6 py-3 text-center"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                                    </tr>
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-6 py-3 font-medium">Blog or Store</td>
                                        <td className="px-6 py-3 text-center"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                                        <td className="px-6 py-3 text-center text-sm">Add-on available</td>
                                        <td className="px-6 py-3 text-center"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                                    </tr>
                                    <tr className="hover:bg-muted/20 transition-colors">
                                        <td className="px-6 py-3 font-medium">Professional Email</td>
                                        <td className="px-6 py-3 text-center"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                                        <td className="px-6 py-3 text-center text-sm">1 inbox</td>
                                        <td className="px-6 py-3 text-center text-sm">5 inboxes</td>
                                    </tr>
                                </tbody>
                            </table>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* What's Included - With Texture */}
            <section className="relative py-16 overflow-hidden">
                <div className="absolute inset-0 bg-muted/30" />
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                }} />
                
                <div className="container mx-auto max-w-6xl px-6 relative z-10">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Every Plan Includes</h2>
                        <p className="text-muted-foreground">No hidden fees, ever.</p>
                    </div>
                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { icon: Shield, title: "Free SSL Certificate", desc: "Secure browsing for your visitors" },
                            { icon: Zap, title: "Fast Hosting", desc: "99.9% uptime guarantee" },
                            { icon: DollarSign, title: "Free Domain (Year 1)", desc: "Then $18-22/year renewal" },
                            { icon: CheckCircle2, title: "Regular Backups", desc: "Your data is always safe" }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="text-center group"
                            >
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                                    <item.icon className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="font-bold mb-2">{item.title}</h3>
                                <p className="text-sm text-muted-foreground">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ / Transparency */}
            <section className="py-16 bg-background">
                <div className="container mx-auto max-w-4xl px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Honest Answers</h2>
                        <p className="text-muted-foreground">Questions you're probably wondering about</p>
                    </div>
                    <div className="space-y-6">
                        {[
                            {
                                q: "What happens if I cancel?",
                                a: "Monthly plans: Cancel anytime. Annual plans: You've paid upfront, so you keep service for the full 12 months. You own your domain and content—we'll help you migrate if needed."
                            },
                            {
                                q: "Are there any other costs?",
                                a: "Only domain renewal after year 1 ($18-22/year). If you want extras like e-commerce, additional pages, or custom integrations, we'll quote those separately. No surprise bills."
                            },
                            {
                                q: "Why is the build free with annual?",
                                a: "Simple: your 12-month commitment gives us revenue certainty, so we can invest time in building your site. Monthly plans don't have that guarantee, so there's a build fee. It's a fair trade."
                            },
                            {
                                q: "Can I upgrade or downgrade?",
                                a: "Yes. Upgrades happen immediately (we'll prorate the difference). Downgrades take effect at your next billing cycle. We'll work with you to make it smooth."
                            }
                        ].map((faq, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card className="p-6 hover:shadow-lg hover:border-primary/50 transition-all duration-300">
                                    <div className="flex gap-4">
                                        <AlertCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                                        <div>
                                            <h3 className="font-bold mb-2">{faq.q}</h3>
                                            <p className="text-sm text-muted-foreground">{faq.a}</p>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA - FIXED BUTTON LINK */}
            <section className="relative py-20 bg-primary text-primary-foreground overflow-hidden">
                {/* Faded background text */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[5rem] md:text-[10rem] font-bold opacity-5 select-none pointer-events-none">
                    GET STARTED
                </div>
                
                <div className="container mx-auto max-w-4xl px-6 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold mb-6">Ready to Build Your Online Presence?</h2>
                        <p className="text-xl mb-8 opacity-90">
                            Let's talk about your business goals and find the right plan for you.
                        </p>
                        {/* FIXED: Changed from <a> to <Link> */}
                        <Link to="/quote" className="inline-block group">
                            <Button size="lg" variant="secondary" className="h-14 px-8 text-lg font-bold shadow-xl hover:scale-110 hover:shadow-2xl transition-all duration-300">
                                Get a Free Quote
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <p className="text-sm mt-6 opacity-75">
                            No credit card required. Free consultation included.
                        </p>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default PricingPage;
