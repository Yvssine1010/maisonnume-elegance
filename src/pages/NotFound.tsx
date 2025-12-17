import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center px-4">
        <h1 className="text-8xl font-light text-gold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Page introuvable
        </p>
        <Button asChild className="btn-hero-primary">
          <a href="/" className="inline-flex items-center gap-2">
            <Home className="w-4 h-4" />
            Retour à l'accueil
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
