import { useState } from "react";
import { X, ExternalLink, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

// Demo Website Component - Self-contained HTML sites
const DemoWebsites = {
  restaurant: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Bella Italia - Authentic Italian Restaurant</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          font-family: 'Georgia', serif; 
          line-height: 1.6; 
          color: #333;
        }
        
        /* Hero Section */
        .hero {
          background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), 
                      url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&auto=format&fit=crop') center/cover;
          height: 70vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: white;
        }
        .hero h1 {
          font-size: 3.5rem;
          margin-bottom: 1rem;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        }
        .hero p {
          font-size: 1.3rem;
          margin-bottom: 2rem;
        }
        .btn {
          display: inline-block;
          padding: 1rem 2.5rem;
          background: #d4292f;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          font-weight: bold;
          transition: all 0.3s;
        }
        .btn:hover {
          background: #b01f24;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        }
        
        /* Navigation */
        nav {
          background: #1a1a1a;
          padding: 1rem 5%;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        nav ul {
          list-style: none;
          display: flex;
          justify-content: center;
          gap: 3rem;
        }
        nav a {
          color: white;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s;
        }
        nav a:hover { color: #d4292f; }
        
        /* Menu Section */
        .menu {
          padding: 4rem 5%;
          background: #f9f9f9;
        }
        .menu h2 {
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 3rem;
          color: #d4292f;
        }
        .menu-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .menu-item {
          background: white;
          padding: 2rem;
          border-radius: 10px;
          box-shadow: 0 3px 10px rgba(0,0,0,0.1);
          transition: transform 0.3s;
        }
        .menu-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 20px rgba(0,0,0,0.15);
        }
        .menu-item h3 {
          color: #d4292f;
          margin-bottom: 0.5rem;
          font-size: 1.4rem;
        }
        .menu-item p {
          color: #666;
          margin-bottom: 1rem;
        }
        .price {
          font-size: 1.2rem;
          font-weight: bold;
          color: #1a1a1a;
        }
        
        /* About Section */
        .about {
          padding: 4rem 5%;
          max-width: 1000px;
          margin: 0 auto;
          text-align: center;
        }
        .about h2 {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
          color: #d4292f;
        }
        .about p {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #555;
        }
        
        /* Footer */
        footer {
          background: #1a1a1a;
          color: white;
          padding: 3rem 5%;
          text-align: center;
        }
        footer h3 { margin-bottom: 1rem; }
        footer p { margin: 0.5rem 0; }
        
        @media (max-width: 768px) {
          .hero h1 { font-size: 2rem; }
          .hero p { font-size: 1rem; }
          nav ul { flex-direction: column; gap: 1rem; }
        }
      </style>
    </head>
    <body>
      <nav>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#menu">Menu</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
      
      <div class="hero" id="home">
        <div>
          <h1>Bella Italia</h1>
          <p>Authentic Italian Cuisine in the Heart of Downtown</p>
          <a href="#menu" class="btn">View Our Menu</a>
        </div>
      </div>
      
      <section class="menu" id="menu">
        <h2>Our Menu</h2>
        <div class="menu-grid">
          <div class="menu-item">
            <h3>Margherita Pizza</h3>
            <p>Fresh mozzarella, San Marzano tomatoes, basil, extra virgin olive oil</p>
            <span class="price">$16</span>
          </div>
          <div class="menu-item">
            <h3>Spaghetti Carbonara</h3>
            <p>House-made pasta, pancetta, pecorino romano, farm-fresh eggs</p>
            <span class="price">$18</span>
          </div>
          <div class="menu-item">
            <h3>Osso Buco</h3>
            <p>Braised veal shanks, saffron risotto, gremolata</p>
            <span class="price">$32</span>
          </div>
          <div class="menu-item">
            <h3>Tiramisu</h3>
            <p>Espresso-soaked ladyfingers, mascarpone, cocoa</p>
            <span class="price">$10</span>
          </div>
        </div>
      </section>
      
      <section class="about" id="about">
        <h2>Our Story</h2>
        <p>
          For over 20 years, Bella Italia has been serving authentic Italian cuisine 
          to our community. Using recipes passed down through generations and the 
          finest imported ingredients, we bring the taste of Italy to your table.
        </p>
      </section>
      
      <footer id="contact">
        <h3>Visit Us</h3>
        <p>123 Main Street, Downtown</p>
        <p>Phone: (555) 123-4567</p>
        <p>Open Tuesday-Sunday, 5pm-10pm</p>
      </footer>
    </body>
    </html>
  `,
  
  contractor: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>ProBuild Construction - Professional Building Services</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          font-family: 'Arial', sans-serif; 
          line-height: 1.6; 
          color: #333;
        }
        
        /* Hero */
        .hero {
          background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), 
                      url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1600&auto=format&fit=crop') center/cover;
          height: 70vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: white;
        }
        .hero h1 {
          font-size: 3.5rem;
          margin-bottom: 1rem;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        }
        .hero p {
          font-size: 1.3rem;
          margin-bottom: 2rem;
        }
        .btn {
          display: inline-block;
          padding: 1rem 2.5rem;
          background: #ff6b35;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          font-weight: bold;
          transition: all 0.3s;
        }
        .btn:hover {
          background: #e55a2b;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        }
        
        /* Services */
        .services {
          padding: 4rem 5%;
          background: #f4f4f4;
        }
        .services h2 {
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 3rem;
          color: #ff6b35;
        }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .service-card {
          background: white;
          padding: 2rem;
          border-radius: 10px;
          box-shadow: 0 3px 10px rgba(0,0,0,0.1);
          text-align: center;
          transition: transform 0.3s;
        }
        .service-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 20px rgba(0,0,0,0.15);
        }
        .service-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        .service-card h3 {
          color: #ff6b35;
          margin-bottom: 1rem;
        }
        
        /* Quote Form */
        .quote {
          padding: 4rem 5%;
          max-width: 600px;
          margin: 0 auto;
        }
        .quote h2 {
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 2rem;
          color: #ff6b35;
        }
        .form-group {
          margin-bottom: 1.5rem;
        }
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: bold;
        }
        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 0.8rem;
          border: 2px solid #ddd;
          border-radius: 5px;
          font-size: 1rem;
        }
        .form-group textarea {
          height: 150px;
          resize: vertical;
        }
        .submit-btn {
          width: 100%;
          padding: 1rem;
          background: #ff6b35;
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 1.1rem;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.3s;
        }
        .submit-btn:hover {
          background: #e55a2b;
        }
        
        /* Footer */
        footer {
          background: #2c3e50;
          color: white;
          padding: 3rem 5%;
          text-align: center;
        }
        
        @media (max-width: 768px) {
          .hero h1 { font-size: 2rem; }
        }
      </style>
    </head>
    <body>
      <div class="hero">
        <div>
          <h1>ProBuild Construction</h1>
          <p>Quality Craftsmanship Since 1995</p>
          <a href="#quote" class="btn">Get Free Quote</a>
        </div>
      </div>
      
      <section class="services">
        <h2>Our Services</h2>
        <div class="services-grid">
          <div class="service-card">
            <div class="service-icon">🏠</div>
            <h3>Home Remodeling</h3>
            <p>Complete kitchen and bathroom renovations</p>
          </div>
          <div class="service-card">
            <div class="service-icon">🔨</div>
            <h3>Custom Builds</h3>
            <p>New construction from ground up</p>
          </div>
          <div class="service-card">
            <div class="service-icon">🏗️</div>
            <h3>Commercial Projects</h3>
            <p>Office and retail space construction</p>
          </div>
          <div class="service-card">
            <div class="service-icon">🔧</div>
            <h3>Repairs & Maintenance</h3>
            <p>Quick fixes and ongoing maintenance</p>
          </div>
        </div>
      </section>
      
      <section class="quote" id="quote">
        <h2>Request a Quote</h2>
        <form>
          <div class="form-group">
            <label>Name</label>
            <input type="text" placeholder="John Smith" required>
          </div>
          <div class="form-group">
            <label>Email</label>
            <input type="email" placeholder="john@example.com" required>
          </div>
          <div class="form-group">
            <label>Phone</label>
            <input type="tel" placeholder="(555) 123-4567" required>
          </div>
          <div class="form-group">
            <label>Project Details</label>
            <textarea placeholder="Tell us about your project..." required></textarea>
          </div>
          <button type="submit" class="submit-btn">Get Your Free Quote</button>
        </form>
      </section>
      
      <footer>
        <h3>ProBuild Construction</h3>
        <p>Serving the Greater Metro Area</p>
        <p>Phone: (555) 987-6543</p>
        <p>Licensed • Bonded • Insured</p>
      </footer>
    </body>
    </html>
  `,
  
  professional: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Summit Consulting - Business Strategy Experts</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          font-family: 'Helvetica Neue', Arial, sans-serif; 
          line-height: 1.6; 
          color: #333;
        }
        
        /* Hero */
        .hero {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          height: 70vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: white;
        }
        .hero h1 {
          font-size: 3.5rem;
          margin-bottom: 1rem;
          font-weight: 300;
        }
        .hero p {
          font-size: 1.3rem;
          margin-bottom: 2rem;
          font-weight: 300;
        }
        .btn {
          display: inline-block;
          padding: 1rem 2.5rem;
          background: white;
          color: #667eea;
          text-decoration: none;
          border-radius: 50px;
          font-weight: bold;
          transition: all 0.3s;
        }
        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }
        
        /* Services */
        .services {
          padding: 5rem 5%;
          max-width: 1200px;
          margin: 0 auto;
        }
        .services h2 {
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 3rem;
          color: #667eea;
        }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 3rem;
        }
        .service {
          text-align: center;
        }
        .service-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          font-size: 2rem;
        }
        .service h3 {
          color: #667eea;
          margin-bottom: 1rem;
          font-size: 1.5rem;
        }
        .service p {
          color: #666;
          line-height: 1.8;
        }
        
        /* CTA */
        .cta {
          background: #f8f9fa;
          padding: 4rem 5%;
          text-align: center;
        }
        .cta h2 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          color: #667eea;
        }
        .cta p {
          font-size: 1.2rem;
          margin-bottom: 2rem;
          color: #666;
        }
        
        /* Footer */
        footer {
          background: #2d3748;
          color: white;
          padding: 3rem 5%;
          text-align: center;
        }
        
        @media (max-width: 768px) {
          .hero h1 { font-size: 2rem; }
        }
      </style>
    </head>
    <body>
      <div class="hero">
        <div>
          <h1>Summit Consulting</h1>
          <p>Strategic Solutions for Growing Businesses</p>
          <a href="#contact" class="btn">Schedule Consultation</a>
        </div>
      </div>
      
      <section class="services">
        <h2>How We Help</h2>
        <div class="services-grid">
          <div class="service">
            <div class="service-icon">📊</div>
            <h3>Business Strategy</h3>
            <p>Develop comprehensive growth strategies aligned with your vision and market opportunities.</p>
          </div>
          <div class="service">
            <div class="service-icon">💼</div>
            <h3>Operations Optimization</h3>
            <p>Streamline processes, reduce costs, and improve efficiency across your organization.</p>
          </div>
          <div class="service">
            <div class="service-icon">📈</div>
            <h3>Market Analysis</h3>
            <p>Gain competitive insights and identify new market opportunities for expansion.</p>
          </div>
        </div>
      </section>
      
      <section class="cta" id="contact">
        <h2>Ready to Grow Your Business?</h2>
        <p>Schedule a complimentary 30-minute strategy session</p>
        <a href="#" class="btn">Book Your Free Consultation</a>
      </section>
      
      <footer>
        <h3>Summit Consulting Group</h3>
        <p>Email: info@summitconsulting.com</p>
        <p>Phone: (555) 456-7890</p>
      </footer>
    </body>
    </html>
  `
};

// Modal Component
interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  demoType: keyof typeof DemoWebsites;
  title: string;
}

export const DemoModal = ({ isOpen, onClose, demoType, title }: DemoModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full h-full max-w-7xl max-h-[95vh] m-4 bg-background rounded-lg shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-card rounded-t-lg">
          <div className="flex items-center gap-3">
            <div className="text-2xl">👁️</div>
            <div>
              <h3 className="text-lg font-bold">{title} - Demo Preview</h3>
              <p className="text-xs text-muted-foreground">This is a live example of what we can build for you</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/quote">
              <Button className="hidden sm:flex" size="sm">
                Get This Design
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Demo Site in iframe */}
        <div className="flex-1 overflow-hidden rounded-b-lg">
          <iframe
            srcDoc={DemoWebsites[demoType]}
            className="w-full h-full border-0"
            title={title}
            sandbox="allow-same-origin"
          />
        </div>

        {/* Mobile CTA */}
        <div className="sm:hidden p-3 border-t border-border bg-card">
          <Link to="/quote" className="block w-full">
            <Button className="w-full">
              Get This Design
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Usage Example Component
export const PortfolioCardWithModal = () => {
  const [activeDemo, setActiveDemo] = useState<keyof typeof DemoWebsites | null>(null);

  const portfolioItems = [
    {
      name: "Restaurant & Cafe",
      demoType: "restaurant" as keyof typeof DemoWebsites,
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop",
      features: ["Online ordering", "Menu display", "Reservations"],
      industry: "Food & Beverage",
      color: "from-orange-500/20 to-red-500/20"
    },
    {
      name: "Home Services",
      demoType: "contractor" as keyof typeof DemoWebsites,
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&auto=format&fit=crop",
      features: ["Quote requests", "Service areas", "Photo galleries"],
      industry: "Contractors & Trades",
      color: "from-blue-500/20 to-cyan-500/20"
    },
    {
      name: "Professional Services",
      demoType: "professional" as keyof typeof DemoWebsites,
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop",
      features: ["Appointment booking", "Client portal", "Service packages"],
      industry: "Consultants & Advisors",
      color: "from-purple-500/20 to-pink-500/20"
    },
  ];

  return (
    <>
      <div className="grid md:grid-cols-3 gap-6">
        {portfolioItems.map((project, idx) => (
          <Card 
            key={idx}
            className="overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 border-border hover:border-primary/50"
          >
            <div className={`relative h-48 overflow-hidden bg-gradient-to-br ${project.color}`}>
              <img 
                src={project.image} 
                alt={project.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-bold">
                {project.industry}
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3">{project.name}</h3>
              <ul className="space-y-2 mb-4">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="text-green-500">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button 
                variant="ghost" 
                className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                onClick={() => setActiveDemo(project.demoType)}
              >
                View Live Demo
                <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Demo Modal */}
      {activeDemo && (
        <DemoModal
          isOpen={!!activeDemo}
          onClose={() => setActiveDemo(null)}
          demoType={activeDemo}
          title={portfolioItems.find(p => p.demoType === activeDemo)?.name || ""}
        />
      )}
    </>
  );
};
