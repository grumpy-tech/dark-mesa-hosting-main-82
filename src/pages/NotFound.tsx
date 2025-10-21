import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";
import { motion } from "framer-motion";

const NotFound = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    console.error("404 Error: User attempted to access non-existent route");
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <div className="flex min-h-screen items-center justify-center px-6 py-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-8 max-w-2xl"
        >
          <div className="relative">
            <div className="text-[200px] font-bold text-primary/20 leading-none">404</div>
            <Search className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 text-primary animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">Page Not Found</h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Looks like this page went offline. The URL you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Link to="/">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Home className="w-5 h-5 mr-2" />
                Back to Home
              </Button>
            </Link>
            <Button size="lg" variant="outline" onClick={() => window.history.back()}>
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </Button>
          </div>
          <div className="pt-8">
            <p className="text-sm text-muted-foreground">
              Need help? <Link to="/contact" className="text-primary hover:underline">Contact our support team</Link>
            </p>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
