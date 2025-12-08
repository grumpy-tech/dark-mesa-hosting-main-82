import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, ArrowRight, Zap, Shield, Clock, DollarSign } from "lucide-react";

interface Beam {
  x: number;
  y: number;
  width: number;
  length: number;
  angle: number;
  speed: number;
  opacity: number;
  pulse: number;
  pulseSpeed: number;
  layer: number;
}

function createBeam(width: number, height: number, layer: number): Beam {
  const angle = -35 + Math.random() * 10;
  const baseSpeed = 0.2 + layer * 0.2;
  const baseOpacity = 0.08 + layer * 0.05;
  const baseWidth = 10 + layer * 5;
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    width: baseWidth,
    length: height * 2.5,
    angle,
    speed: baseSpeed + Math.random() * 0.2,
    opacity: baseOpacity + Math.random() * 0.1,
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.01 + Math.random() * 0.015,
    layer,
  };
}

const HomePage = () => {
  const [billingType, setBillingType] = useState<"monthly" | "annual">("annual");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const noiseRef = useRef<HTMLCanvasElement>(null);
  const beamsRef = useRef<Beam[]>([]);
  const animationFrameRef = useRef<number>(0);
  const [isDark, setIsDark] = useState(true);

  const LAYERS = 3;
  const BEAMS_PER_LAYER = 8;

  const stats = [
    { value: "99.9%", label: "Uptime", icon: Shield },
    { value: "< 2s", label: "Load Time", icon: Zap },
    { value: "24/7", label: "Monitoring", icon: Clock },
    { value: "$0", label: "Setup Fees", icon: DollarSign },
  ];

  // Detect theme changes
  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    
    updateTheme();
    
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    const noiseCanvas = noiseRef.current;
    if (!canvas || !noiseCanvas) return;
    const ctx = canvas.getContext("2d");
    const nCtx = noiseCanvas.getContext("2d");
    if (!ctx || !nCtx) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      noiseCanvas.width = window.innerWidth * dpr;
      noiseCanvas.height = window.innerHeight * dpr;
      noiseCanvas.style.width = `${window.innerWidth}px`;
      noiseCanvas.style.height = `${window.innerHeight}px`;
      nCtx.setTransform(1, 0, 0, 1, 0, 0);
      nCtx.scale(dpr, dpr);

      beamsRef.current = [];
      for (let layer = 1; layer <= LAYERS; layer++) {
        for (let i = 0; i < BEAMS_PER_LAYER; i++) {
          beamsRef.current.push(createBeam(window.innerWidth, window.innerHeight, layer));
        }
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const generateNoise = () => {
      const imgData = nCtx.createImageData(noiseCanvas.width, noiseCanvas.height);
      for (let i = 0; i < imgData.data.length; i += 4) {
        const v = Math.random() * 255;
        imgData.data[i] = v;
        imgData.data[i + 1] = v;
        imgData.data[i + 2] = v;
        imgData.data[i + 3] = isDark ? 12 : 8;
      }
      nCtx.putImageData(imgData, 0, 0);
    };

    const drawBeam = (beam: Beam) => {
      ctx.save();
      ctx.translate(beam.x, beam.y);
      ctx.rotate((beam.angle * Math.PI) / 180);

      const pulsingOpacity = Math.min(1, beam.opacity * (0.8 + Math.sin(beam.pulse) * 0.4));
      
      const beamColor = isDark 
        ? `rgba(120,119,198,${pulsingOpacity})`
        : `rgba(120,119,198,${pulsingOpacity * 0.6})`;
      
      const gradient = ctx.createLinearGradient(0, 0, 0, beam.length);
      gradient.addColorStop(0, isDark ? `rgba(120,119,198,0)` : `rgba(120,119,198,0)`);
      gradient.addColorStop(0.2, isDark ? `rgba(120,119,198,${pulsingOpacity * 0.5})` : `rgba(120,119,198,${pulsingOpacity * 0.3})`);
      gradient.addColorStop(0.5, beamColor);
      gradient.addColorStop(0.8, isDark ? `rgba(120,119,198,${pulsingOpacity * 0.5})` : `rgba(120,119,198,${pulsingOpacity * 0.3})`);
      gradient.addColorStop(1, isDark ? `rgba(120,119,198,0)` : `rgba(120,119,198,0)`);

      ctx.fillStyle = gradient;
      ctx.filter = `blur(${2 + beam.layer * 2}px)`;
      ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length);
      ctx.restore();
    };

    const animate = () => {
      if (!canvas || !ctx) return;

      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      if (isDark) {
        gradient.addColorStop(0, "#050505");
        gradient.addColorStop(1, "#111111");
      } else {
        gradient.addColorStop(0, "#f8f9fa");
        gradient.addColorStop(1, "#e9ecef");
      }
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      beamsRef.current.forEach((beam) => {
        beam.y -= beam.speed * (beam.layer / LAYERS + 0.5);
        beam.pulse += beam.pulseSpeed;
        if (beam.y + beam.length < -50) {
          beam.y = window.innerHeight + 50;
          beam.x = Math.random() * window.innerWidth;
        }
        drawBeam(beam);
      });

      generateNoise();
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isDark, LAYERS]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Premium Animated Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Premium Canvas Background */}
        <canvas ref={noiseRef} className="absolute inset-0 z-0 pointer-events-none" />
        <canvas ref={canvasRef} className="absolute inset-0 z-10" />

        <div className="relative z-20 container mx-auto px-4 sm:px-6 text-center">
          <div className="space-y-6 sm:space-y-8">
            {/* Faded Company Name */}
            <h2 className="font-semibold bg-gradient-to-b from-foreground/70 to-foreground/10 bg-clip-text text-transparent text-[2.5rem] sm:text-[3.5rem] md:text-[5rem] lg:text-[6.5rem] leading-tight mb-4 pb-2">
              Dark Mesa Hosting
            </h2>

            {/* Main Value Prop */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight px-2">
              Your Website.<br />
              <span className="text-primary">Built, Hosted & Maintained.</span><br />
              <span className="text-2xl sm:text-3xl md:text-4xl text-muted-foreground font-normal">
                One monthly price.
              </span>
            </h1>

            {/* Clear benefit statement */}
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto px-2">
              Stop paying separately for design, hosting, updates, and support. Get everything in one simple package starting at <span className="text-primary font-bold">$39/month</span>.
            </p>

            {/* Primary CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 px-2">
              <a href="/quote" className="w-full sm:w-auto">
                <Button size="lg" className="h-14 sm:h-16 px-8 sm:px-10 text-base sm:text-lg font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 w-full sm:w-auto">
                  See Your Price in 60 Seconds
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </a>
              <a href="/pricing" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="h-14 sm:h-16 px-8 sm:px-10 text-base sm:text-lg font-bold border-2 w-full sm:w-auto">
                  View Plans & Pricing
                </Button>
              </a>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 pt-8 text-sm text-muted-foreground px-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>Free consultation included</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-20">
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-muted-foreground/30 rounded-full" />
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-3">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Problem/Solution */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Stop Juggling Multiple Vendors
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Most businesses waste time and money coordinating between a designer, hosting company, and developer. We handle everything.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Before - The Problem */}
            <Card className="p-6 sm:p-8 border-2 border-red-500/20 bg-red-500/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">😰</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-red-600 dark:text-red-400">The Old Way</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-red-600 font-bold text-sm">✗</span>
                  </div>
                  <span className="text-sm sm:text-base text-muted-foreground">Pay $2,000-$10,000 upfront for website design</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-red-600 font-bold text-sm">✗</span>
                  </div>
                  <span className="text-sm sm:text-base text-muted-foreground">Pay separate monthly hosting fees ($15-50/mo)</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-red-600 font-bold text-sm">✗</span>
                  </div>
                  <span className="text-sm sm:text-base text-muted-foreground">Pay $75-150/hour for updates and changes</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-red-600 font-bold text-sm">✗</span>
                  </div>
                  <span className="text-sm sm:text-base text-muted-foreground">Hope nothing breaks (it will)</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-red-600 font-bold text-sm">✗</span>
                  </div>
                  <span className="text-sm sm:text-base text-muted-foreground">Outdated within 6 months</span>
                </li>
              </ul>
              <div className="mt-6 pt-6 border-t border-red-500/20">
                <p className="text-base sm:text-lg font-bold text-red-600 dark:text-red-400">
                  First Year Cost: $2,700 - $11,000+
                </p>
              </div>
            </Card>

            {/* After - The Solution */}
            <Card className="p-6 sm:p-8 border-2 border-green-500/40 bg-green-500/5 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">With Dark Mesa</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base font-medium">Pay 12 months hosting upfront = FREE website build</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base font-medium">Hosting, security, backups all included</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base font-medium">Monthly updates included (30 min - 4 hrs depending on plan)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base font-medium">We monitor and fix issues proactively</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base font-medium">Always current and secure</span>
                </li>
              </ul>
              <div className="mt-6 pt-6 border-t border-green-500/20">
                <p className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">
                  First Year Cost: $468 - $1,188
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Save $2,232 - $9,812 in year one
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Simple, Honest Pricing</h2>
            <p className="text-lg sm:text-xl text-muted-foreground">
              Three plans. All include hosting, support, and security. Pick what fits your needs.
            </p>
          </div>

          {/* Toggle */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center bg-card border-2 border-border rounded-full p-1 shadow-lg">
              <button
                onClick={() => setBillingType("monthly")}
                className={`px-6 sm:px-8 py-2 sm:py-3 rounded-full font-bold text-sm sm:text-base transition-all ${
                  billingType === "monthly"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground"
                }`}
              >
                Month-to-Month
              </button>
              <button
                onClick={() => setBillingType("annual")}
                className={`px-6 sm:px-8 py-2 sm:py-3 rounded-full font-bold text-sm sm:text-base transition-all relative ${
                  billingType === "annual"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground"
                }`}
              >
                Annual
                <div className="absolute -top-2 -right-2 bg-green-500 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                  BEST
                </div>
              </button>
            </div>
          </div>

          {/* Simplified plan cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Starter", price: 39, annual: 468, pages: "3 pages", emoji: "🟢", buildPrice: 349 },
              { name: "Business", price: 69, annual: 828, pages: "6 pages", emoji: "🔵", popular: true, buildPrice: 599 },
              { name: "Pro", price: 99, annual: 1188, pages: "9 pages", emoji: "🔴", buildPrice: 999 },
            ].map((plan) => (
              <Card
                key={plan.name}
                className={`p-6 text-center relative ${
                  plan.popular ? "border-2 border-primary shadow-lg" : "border border-border"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold">
                    MOST POPULAR
                  </div>
                )}
                <div className="text-4xl mb-3">{plan.emoji}</div>
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold text-primary mb-1">
                  ${plan.price}
                  <span className="text-lg text-muted-foreground">/mo</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{plan.pages} included</p>
                
                {billingType === "annual" ? (
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 mb-4">
                    <p className="text-sm font-bold text-green-600 dark:text-green-400">
                      Website Build: FREE
                    </p>
                    <p className="text-xs text-muted-foreground">Annual plan (${plan.annual}/year)</p>
                  </div>
                ) : (
                  <div className="bg-muted border border-border rounded-lg p-3 mb-4">
                    <p className="text-sm font-semibold">+ ${plan.buildPrice} Build Fee</p>
                    <p className="text-xs text-muted-foreground">One-time payment</p>
                  </div>
                )}
                
                <a 
                  href="/quote"
                  className="w-full block"
                >
                  <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                    Get Started
                  </Button>
                </a>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <a href="/pricing">
              <Button variant="link" className="text-primary text-lg">
                View detailed feature comparison →
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Ready to Stop Overpaying?
          </h2>
          <p className="text-lg sm:text-xl mb-8 opacity-90">
            Get your free quote in 60 seconds. See exactly what you'll pay. No pressure, no sales calls.
          </p>
          <a href="/quote">
            <Button
              size="lg"
              variant="secondary"
              className="h-14 sm:h-16 px-8 sm:px-10 text-base sm:text-lg font-bold shadow-xl hover:scale-105 transition-transform"
            >
              Get Your Free Quote Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </a>
          <p className="text-sm mt-6 opacity-75">
            No credit card required • Free consultation • Cancel anytime
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
