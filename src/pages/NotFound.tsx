import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home, ArrowLeft, Search, Mail } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-32">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl md:text-[12rem] font-bold text-primary/20 leading-none">
            404
          </h1>
        </div>

        {/* Main Content Card */}
        <Card className="p-8 md:p-12 border-border">
          <div className="mb-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Page Not Found
            </h2>
            <p className="text-lg text-muted-foreground mb-2">
              Oops! The page you're looking for doesn't exist.
            </p>
            <p className="text-muted-foreground">
              It might have been moved, deleted, or the URL might be incorrect.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link to="/">
              <Button size="lg" className="w-full sm:w-auto">
                <Home className="w-5 h-5 mr-2" />
                Go to Homepage
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => window.history.back()}
              className="w-full sm:w-auto"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </Button>
          </div>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-card text-muted-foreground">
                or explore our site
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/website-building">
              <Button variant="ghost" className="w-full h-auto py-4 flex flex-col items-center gap-2">
                <Search className="w-6 h-6" />
                <span className="text-sm">Website Building</span>
              </Button>
            </Link>
            <Link to="/hosting">
              <Button variant="ghost" className="w-full h-auto py-4 flex flex-col items-center gap-2">
                <Search className="w-6 h-6" />
                <span className="text-sm">Hosting</span>
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="ghost" className="w-full h-auto py-4 flex flex-col items-center gap-2">
                <Search className="w-6 h-6" />
                <span className="text-sm">Pricing</span>
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="ghost" className="w-full h-auto py-4 flex flex-col items-center gap-2">
                <Mail className="w-6 h-6" />
                <span className="text-sm">Contact</span>
              </Button>
            </Link>
          </div>
        </Card>

        {/* Bottom CTA */}
        <div className="mt-8">
          <p className="text-muted-foreground mb-4">
            Need help? We're here for you.
          </p>
          <Link to="/contact">
            <Button variant="link" className="text-primary">
              Contact Support →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
