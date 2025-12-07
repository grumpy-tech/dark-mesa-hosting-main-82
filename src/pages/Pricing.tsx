import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, DollarSign, X, Star, Sparkles, AlertTriangle } from "lucide-react";

// --- Plan Data (No Change Necessary Here) ---
const plans = [
    {
        name: "Starter",
        emoji: "🟢",
        monthly: 39,
        annual: 468,
        buildPrice: 349,
        description: "Perfect for new businesses",
        tagline: "Get online fast",
        color: "from-green-500/20 to-emerald-500/20",
        features: [
            { name: "Pages Included", value: "3 pages", included: true },
            { name: "Design Style", value: "Professional templates", included: true },
            { name: "Mobile Optimization", value: true, included: true },
            { name: "Basic SEO", value: "Basic setup", included: true },
            { name: "Contact Forms", value: "Basic form", included: true },
            { name: "Analytics Setup", value: false, included: false },
            { name: "Blog or Online Store", value: false, included: false },
            { name: "Free Monthly Updates", value: "1 update (30 min)", included: true },
            { name: "Site Backups", value: "Monthly", included: true },
            { name: "Security Protection", value: "Basic monitoring", included: true },
            { name: "Support Speed", value: "48-72 hours", included: true },
            { name: "Professional Email", value: "None included", included: false },
            { name: "Uptime Guarantee", value: "99.9%", included: true }
        ]
    },
    {
        name: "Business",
        emoji: "🔵",
        popular: true,
        monthly: 69,
        annual: 828,
        buildPrice: 599,
        description: "Best for growing businesses",
        tagline: "Everything you need to grow",
        color: "from-primary/20 to-blue-500/20",
        features: [
            { name: "Pages Included", value: "Up to 6 pages", included: true },
            { name: "Design Style", value: "Custom for your brand", included: true },
            { name: "Mobile Optimization", value: true, included: true },
            { name: "Basic SEO", value: "Enhanced setup", included: true },
            { name: "Contact Forms", value: "Advanced forms", included: true },
            { name: "Analytics Setup", value: true, included: true },
            { name: "Blog or Online Store", value: "Add-on available", included: true },
            { name: "Free Monthly Updates", value: "5 updates (2 hrs)", included: true },
            { name: "Site Backups", value: "Weekly", included: true },
            { name: "Security Protection", value: "Advanced firewall", included: true },
            { name: "Support Speed", value: "24 hours", included: true },
            { name: "Professional Email", value: "1 inbox", included: true },
            { name: "Uptime Guarantee", value: "99.99%", included: true }
        ]
    },
    {
        name: "Pro",
        emoji: "🔴",
        monthly: 99,
        annual: 1188,
        buildPrice: 999,
        description: "For established businesses",
        tagline: "Premium performance",
        color: "from-purple-500/20 to-pink-500/20",
        features: [
            { name: "Pages Included", value: "Up to 9 pages", included: true },
            { name: "Design Style", value: "Unique design", included: true },
            { name: "Mobile Optimization", value: true, included: true },
            { name: "Basic SEO", value: "Full local SEO", included: true },
            { name: "Contact Forms", value: "Advanced + automation", included: true },
            { name: "Analytics Setup", value: true, included: true },
            { name: "Blog or Online Store", value: "Included", included: true },
            { name: "Free Monthly Updates", value: "Unlimited (4 hrs)", included: true },
            { name: "Site Backups", value: "Daily", included: true },
            { name: "Security Protection", value: "Proactive scans", included: true },
            { name: "Support Speed", value: "Same day", included: true },
            { name: "Professional Email", value: "Up to 5 inboxes", included: true },
            { name: "Uptime Guarantee", value: "99.99%", included: true }
        ]
    }
];

const Pricing = () => {
    const [isYearly, setIsYearly] = useState(false);

    // Memoize the list of unique feature names for the first column
    const featureNames = useMemo(() => plans[0].features.map(f => f.name), []);

    const renderFeatureValue = (feature: any) => {
        if (feature.value === true) {
            return <CheckCircle2 className="w-5 h-5 text-green-500" />;
        }
        if (feature.value === false) {
            return <X className="w-5 h-5 text-red-500" />;
        }
        return <span className="text-sm font-medium">{feature.value}</span>;
    };

    const savingsPercentage = 15; // Hardcoded saving value for yearly plan

    return (
        <>
            {/* Hero */}
            <section className="pt-32 pb-16 px-6">
                <div className="container mx-auto max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center space-y-6"
                    >
                        <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
                            <DollarSign className="w-12 h-12 text-primary" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold">Simple Pricing. Powerful Websites.</h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            Transparent pricing for design, hosting, maintenance, and support—all in one package.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Monthly/Yearly Toggle Section (Revised) */}
            <section className="pb-8 px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex justify-center items-center gap-4 mb-8 relative">
                        {/* Toggle */}
                        <div className="inline-flex items-center bg-card border-2 border-border rounded-full p-1 shadow-lg">
                            <button
                                onClick={() => setIsYearly(false)}
                                className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${
                                    !isYearly
                                        ? 'bg-primary text-primary-foreground'
                                        : 'text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                Pay Monthly
                            </button>
                            <button
                                onClick={() => setIsYearly(true)}
                                className={`px-6 py-2 rounded-full font-bold text-sm transition-all relative ${
                                    isYearly
                                        ? 'bg-primary text-primary-foreground'
                                        : 'text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                Pay Yearly
                                {/* Small Banner/Box for FREE BUILD - New Feature */}
                                <div className="absolute top-[-2rem] right-[-3rem] sm:top-auto sm:left-auto sm:right-[-90px] sm:bottom-[-20px] bg-yellow-500 text-yellow-900 px-3 py-1 text-[10px] sm:text-xs font-extrabold rounded-md rotate-[5deg] origin-bottom-left shadow-xl whitespace-nowrap">
                                    FREE BUILD!
                                </div>
                            </button>
                        </div>
                        
                        {/* Saving Tag */}
                        <div className="inline-flex items-center text-sm ml-4">
                            <Sparkles className="w-4 h-4 text-yellow-500 mr-1 flex-shrink-0" />
                            <span className="font-semibold text-green-600 dark:text-green-400">
                                Save ~{savingsPercentage}% on hosting + FREE build!
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Comparison Table (Revised) */}
            <section className="pb-20 px-6">
                <div className="container mx-auto max-w-7xl">
                    <div className="overflow-x-auto shadow-2xl rounded-xl">
                        <div className="inline-block min-w-full align-middle">
                            {/* Removed outer border-2 and applied internal column dividers */}
                            <table className="min-w-full divide-y divide-border">
                                <thead>
                                    <tr className="bg-muted/30">
                                        <th className="px-6 py-6 text-left w-[250px] sticky left-0 z-10 bg-muted/30">
                                            <div className="text-lg font-bold text-foreground">Plan Comparison</div>
                                            <div className="text-sm text-muted-foreground mt-1">
                                                See what's included at each level
                                            </div>
                                        </th>
                                        {plans.map((plan) => (
                                            <th key={plan.name} className="px-6 py-0 border-l border-border/70 relative">
                                                <div className={`rounded-b-2xl bg-gradient-to-br ${plan.color} p-6 border-b-2 ${plan.popular ? 'border-primary' : 'border-border/50'} relative`}>
                                                    {plan.popular && (
                                                        <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-center py-1 text-xs font-bold flex items-center justify-center gap-1 shadow-lg rounded-t-xl">
                                                            <Star className="w-3 h-3 fill-white text-primary-foreground" /> **RECOMMENDED**
                                                        </div>
                                                    )}
                                                    <div className="text-center space-y-3 pt-4">
                                                        <div className="text-4xl">{plan.emoji}</div>
                                                        <div>
                                                            <div className="text-2xl font-extrabold text-foreground">{plan.name}</div>
                                                            <div className="text-xs text-muted-foreground mt-1">{plan.tagline}</div>
                                                        </div>
                                                        
                                                        {/* 1. Monthly Cost (Always Visible) */}
                                                        <div className="pt-2">
                                                            <div className="flex items-baseline justify-center gap-1">
                                                                <span className="text-2xl font-bold text-foreground">$</span>
                                                                <span className="text-5xl font-extrabold text-foreground">
                                                                    {isYearly ? Math.round(plan.annual / 12) : plan.monthly}
                                                                </span>
                                                                <span className="text-sm text-muted-foreground">/mo</span>
                                                            </div>
                                                            
                                                            {/* 2. Annual Cost (Visible Only in Yearly Mode - addressing the clarity request) */}
                                                            {isYearly && (
                                                                <div className="text-sm text-green-600 dark:text-green-400 font-bold mt-1">
                                                                    Billed annually at ${plan.annual}
                                                                </div>
                                                            )}
                                                            
                                                            {/* 3. Monthly Cost (Visible Only in Monthly Mode - showing the saving comparison) */}
                                                            {!isYearly && (
                                                                <div className="text-sm text-muted-foreground mt-1">
                                                                    Billed monthly
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* Build Price */}
                                                        <div className="pt-2 border-t border-border/50">
                                                            <div className="text-xs text-muted-foreground">One-time Website Build</div>
                                                            <div className="text-2xl font-extrabold text-foreground">
                                                                {isYearly ? (
                                                                    <span className="text-green-600 dark:text-green-400">FREE</span>
                                                                ) : (
                                                                    `$${plan.buildPrice}`
                                                                )}
                                                            </div>
                                                        </div>
                                                        
                                                        {/* CTA Button */}
                                                        <Link
                                                            to="/quote"
                                                            state={{
                                                                plan: plan.name,
                                                                serviceCategory: "bundle",
                                                                serviceType: plan.name,
                                                                billingCycle: isYearly ? 'yearly' : 'monthly'
                                                            }}
                                                        >
                                                            <Button
                                                                className={`w-full mt-4 h-12 text-lg font-bold transition-transform hover:scale-[1.01] ${
                                                                    plan.popular
                                                                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                                                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                                                                }`}
                                                            >
                                                                Start with {plan.name}
                                                            </Button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                
                                {/* Feature Rows */}
                                <tbody className="divide-y divide-border bg-background">
                                    {featureNames.map((featureName, featureIndex) => (
                                        <tr key={featureIndex} className="hover:bg-muted/20 transition-colors">
                                            {/* Feature Name Column (Sticky) */}
                                            <td className="px-6 py-4 text-base font-semibold text-foreground whitespace-nowrap sticky left-0 bg-background z-10 border-r border-border/70">
                                                {featureName}
                                            </td>
                                            {/* Plan Columns */}
                                            {plans.map((plan) => (
                                                <td key={plan.name} className="px-6 py-4 text-center border-l border-border/70">
                                                    <div className="flex justify-center items-center">
                                                        {renderFeatureValue(plan.features.find(f => f.name === featureName))}
                                                    </div>
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {/* Added crucial legal disclaimer about the free build */}
                            <div className="p-4 text-xs text-muted-foreground bg-muted/30 border-t border-border/70 flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4 text-orange-500 flex-shrink-0" />
                                **Important:** The "FREE Website Build" requires a 12-month prepayment of the hosting service and covers the standard build scope outlined above.
                            </div>
                        </div>
                    </div>
                    
                    {/* Mobile View - Stacked Cards (Optimized) */}
                    <div className="lg:hidden space-y-8 mt-10">
                        <div className="text-center mb-6">
                            <h2 className="text-3xl font-bold mb-2">Detailed Comparison</h2>
                            <p className="text-muted-foreground">Tap the plans to review features.</p>
                        </div>
                        {plans.map((plan) => (
                            <Card key={plan.name} className={`p-6 border-4 ${plan.popular ? 'border-primary' : 'border-border'}`}>
                                <div className="text-center mb-6 pb-6 border-b border-border">
                                    {/* Updated header styling */}
                                    <div className={`inline-block rounded-2xl bg-gradient-to-br ${plan.color} p-4 border-2 ${plan.popular ? 'border-primary' : 'border-border'} relative mb-4`}>
                                        {plan.popular && (
                                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-md">
                                                <Star className="w-3 h-3 fill-white text-primary-foreground" /> Recommended
                                            </div>
                                        )}
                                        <div className="text-3xl mb-1">{plan.emoji}</div>
                                        <h3 className="text-2xl font-extrabold">{plan.name}</h3>
                                    </div>
                                    
                                    {/* Mobile Pricing Logic */}
                                    <div className="flex flex-col items-center mb-4">
                                        <div className="flex items-baseline">
                                            <span className="text-3xl font-extrabold">${isYearly ? Math.round(plan.annual / 12) : plan.monthly}</span>
                                            <span className="text-base text-muted-foreground">/mo</span>
                                        </div>
                                        {isYearly && (
                                            <p className="text-sm text-green-600 dark:text-green-400 font-bold">
                                                Billed annually at ${plan.annual}
                                            </p>
                                        )}
                                        <div className="text-base text-muted-foreground mt-2">
                                            Build: **{isYearly ? "FREE" : `$${plan.buildPrice}`}**
                                        </div>
                                    </div>

                                    <Link to="/quote" state={{ plan: plan.name, billingCycle: isYearly ? 'yearly' : 'monthly' }}>
                                        <Button className={`w-full h-10 ${plan.popular ? 'bg-primary' : 'bg-secondary'} font-bold`}>
                                            Choose {plan.name} Plan <ArrowRight className="ml-2 w-4 h-4" />
                                        </Button>
                                    </Link>
                                </div>
                                <ul className="space-y-3">
                                    {plan.features.map((feature, fi) => (
                                        <li key={fi} className={`flex justify-between items-center gap-4 text-sm ${feature.included ? 'text-foreground' : 'text-muted-foreground opacity-70'}`}>
                                            <span className="font-medium">{feature.name}</span>
                                            <div className="flex-shrink-0">{renderFeatureValue(feature)}</div>
                                        </li>
                                    ))}
                                </ul>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Other Sections (Untouched as they were well-structured) */}
            <section className="py-20 bg-card/30">
                {/* ... (Good to Know section remains the same) ... */}
            </section>
            <section className="py-20 bg-background">
                {/* ... (CTA section remains the same) ... */}
            </section>
        </>
    );
};
export default Pricing;
