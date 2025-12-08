import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, X, Star, DollarSign, Shield, Zap, TrendingUp, AlertCircle, ArrowRight } from "lucide-react";

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
    const [isYearly, setIsYearly] = useState(false);
    const [showComparison, setShowComparison] = useState(false);

    const calculateSavings = (plan) => {
        const monthlyCost = plan.monthly * 12 + plan.buildPrice;
        const annualCost = plan.annual;
        return monthlyCost - annualCost;
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Hero */}
            <section className="pt-24 pb-12 px-6">
                <div className="container mx-auto max-w-6xl text-center space-y-6">
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        <DollarSign className="w-4 h-4" />
                        Transparent Pricing
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                        Website + Hosting + Support.<br />One Simple Price.
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        No hidden fees. No surprises. Everything you need to succeed online.
                    </p>
                </div>
            </section>

            {/* Billing Toggle */}
            <section className="pb-12 px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex flex-col items-center gap-6">
                        <div className="inline-flex items-center bg-card border-2 border-border rounded-full p-1 shadow-lg">
                            <button
                                onClick={() => setIsYearly(false)}
                                className={`px-8 py-3 rounded-full font-bold transition-all ${
                                    !isYearly
                                        ? 'bg-primary text-primary-foreground shadow-md'
                                        : 'text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                Monthly
                            </button>
                            <button
                                onClick={() => setIsYearly(true)}
                                className={`px-8 py-3 rounded-full font-bold transition-all ${
                                    isYearly
                                        ? 'bg-primary text-primary-foreground shadow-md'
                                        : 'text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                Annual
                            </button>
                        </div>
                        
                        {isYearly && (
                            <div className="bg-green-500/10 border border-green-500/30 rounded-lg px-6 py-3 max-w-2xl">
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
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="pb-16 px-6">
                <div className="container mx-auto max-w-7xl">
                    <div className="grid md:grid-cols-3 gap-8">
                        {plans.map((plan) => (
                            <Card 
                                key={plan.name} 
                                className={`relative p-8 ${plan.popular ? 'border-2 border-primary shadow-2xl scale-105' : 'border border-border'}`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
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

                                {/* CTA */}
                                <Button 
                                    className={`w-full h-12 text-base font-bold ${
                                        plan.popular 
                                            ? 'bg-primary hover:bg-primary/90' 
                                            : 'bg-secondary hover:bg-secondary/90'
                                    }`}
                                >
                                    Choose {plan.name}
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>

                                {/* Total First Year Cost */}
                                <div className="mt-4 text-center text-xs text-muted-foreground">
                                    {isYearly ? (
                                        <p>First year total: ${plan.annual}</p>
                                    ) : (
                                        <p>First year total: ${plan.monthly * 12 + plan.buildPrice}</p>
                                    )}
                                </div>
                            </Card>
                        ))}
                    </div>

                    {/* Comparison Toggle */}
                    <div className="text-center mt-12">
                        <button
                            onClick={() => setShowComparison(!showComparison)}
                            className="text-primary hover:underline font-semibold flex items-center gap-2 mx-auto"
                        >
                            {showComparison ? 'Hide' : 'Show'} Detailed Feature Comparison
                            <ArrowRight className={`w-4 h-4 transition-transform ${showComparison ? 'rotate-90' : ''}`} />
                        </button>
                    </div>

                    {/* Detailed Comparison Table */}
                    {showComparison && (
                        <div className="mt-8 overflow-x-auto rounded-lg border border-border">
                            <table className="w-full">
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
                                    <tr className="hover:bg-muted/20">
                                        <td className="px-6 py-3 font-medium">Pages Included</td>
                                        <td className="px-6 py-3 text-center">3 pages</td>
                                        <td className="px-6 py-3 text-center">6 pages</td>
                                        <td className="px-6 py-3 text-center">9 pages</td>
                                    </tr>
                                    <tr className="hover:bg-muted/20">
                                        <td className="px-6 py-3 font-medium">Design Quality</td>
                                        <td className="px-6 py-3 text-center text-sm">Template-based</td>
                                        <td className="px-6 py-3 text-center text-sm">Custom branded</td>
                                        <td className="px-6 py-3 text-center text-sm">Fully unique</td>
                                    </tr>
                                    <tr className="hover:bg-muted/20">
                                        <td className="px-6 py-3 font-medium">SEO Optimization</td>
                                        <td className="px-6 py-3 text-center text-sm">Basic setup</td>
                                        <td className="px-6 py-3 text-center text-sm">Enhanced</td>
                                        <td className="px-6 py-3 text-center text-sm">Full local SEO</td>
                                    </tr>
                                    <tr className="hover:bg-muted/20">
                                        <td className="px-6 py-3 font-medium">Monthly Updates</td>
                                        <td className="px-6 py-3 text-center text-sm">30 min</td>
                                        <td className="px-6 py-3 text-center text-sm">2 hours</td>
                                        <td className="px-6 py-3 text-center text-sm">4 hours</td>
                                    </tr>
                                    <tr className="hover:bg-muted/20">
                                        <td className="px-6 py-3 font-medium">Support Response</td>
                                        <td className="px-6 py-3 text-center text-sm">48-72 hrs</td>
                                        <td className="px-6 py-3 text-center text-sm">24 hours</td>
                                        <td className="px-6 py-3 text-center text-sm">Same day</td>
                                    </tr>
                                    <tr className="hover:bg-muted/20">
                                        <td className="px-6 py-3 font-medium">Analytics</td>
                                        <td className="px-6 py-3 text-center"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                                        <td className="px-6 py-3 text-center"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                                        <td className="px-6 py-3 text-center"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                                    </tr>
                                    <tr className="hover:bg-muted/20">
                                        <td className="px-6 py-3 font-medium">Blog or Store</td>
                                        <td className="px-6 py-3 text-center"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                                        <td className="px-6 py-3 text-center text-sm">Add-on available</td>
                                        <td className="px-6 py-3 text-center"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                                    </tr>
                                    <tr className="hover:bg-muted/20">
                                        <td className="px-6 py-3 font-medium">Professional Email</td>
                                        <td className="px-6 py-3 text-center"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                                        <td className="px-6 py-3 text-center text-sm">1 inbox</td>
                                        <td className="px-6 py-3 text-center text-sm">5 inboxes</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </section>

            {/* What's Included */}
            <section className="py-16 bg-muted/30">
                <div className="container mx-auto max-w-6xl px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Every Plan Includes</h2>
                        <p className="text-muted-foreground">No hidden fees, ever.</p>
                    </div>
                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                                <Shield className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="font-bold mb-2">Free SSL Certificate</h3>
                            <p className="text-sm text-muted-foreground">Secure browsing for your visitors</p>
                        </div>
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                                <Zap className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="font-bold mb-2">Fast Hosting</h3>
                            <p className="text-sm text-muted-foreground">99.9% uptime guarantee</p>
                        </div>
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                                <DollarSign className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="font-bold mb-2">Free Domain (Year 1)</h3>
                            <p className="text-sm text-muted-foreground">Then $18-22/year renewal</p>
                        </div>
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                                <TrendingUp className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="font-bold mb-2">Regular Backups</h3>
                            <p className="text-sm text-muted-foreground">Your data is always safe</p>
                        </div>
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
                        <Card className="p-6">
                            <div className="flex gap-4">
                                <AlertCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-bold mb-2">What happens if I cancel?</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Monthly plans: Cancel anytime. Annual plans: You've paid upfront, so you keep service for the full 12 months. You own your domain and content—we'll help you migrate if needed.
                                    </p>
                                </div>
                            </div>
                        </Card>
                        <Card className="p-6">
                            <div className="flex gap-4">
                                <AlertCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-bold mb-2">Are there any other costs?</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Only domain renewal after year 1 ($18-22/year). If you want extras like e-commerce, additional pages, or custom integrations, we'll quote those separately. No surprise bills.
                                    </p>
                                </div>
                            </div>
                        </Card>
                        <Card className="p-6">
                            <div className="flex gap-4">
                                <AlertCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-bold mb-2">Why is the build free with annual?</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Simple: your 12-month commitment gives us revenue certainty, so we can invest time in building your site. Monthly plans don't have that guarantee, so there's a build fee. It's a fair trade.
                                    </p>
                                </div>
                            </div>
                        </Card>
                        <Card className="p-6">
                            <div className="flex gap-4">
                                <AlertCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-bold mb-2">Can I upgrade or downgrade?</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Yes. Upgrades happen immediately (we'll prorate the difference). Downgrades take effect at your next billing cycle. We'll work with you to make it smooth.
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-primary text-primary-foreground">
                <div className="container mx-auto max-w-4xl px-6 text-center">
                    <h2 className="text-4xl font-bold mb-6">Ready to Build Your Online Presence?</h2>
                    <p className="text-xl mb-8 opacity-90">
                        Let's talk about your business goals and find the right plan for you.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" variant="secondary" className="h-14 px-8 text-lg font-bold">
                            Get a Free Quote
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                        <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-bold border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                            See Our Work
                        </Button>
                    </div>
                    <p className="text-sm mt-6 opacity-75">
                        No credit card required. Free consultation included.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default PricingPage;
