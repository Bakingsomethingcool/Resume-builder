import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { motion } from "framer-motion";
import { ArrowRight, FileText, Loader2, Palette, Zap } from "lucide-react";
import { useNavigate } from "react-router";

export default function Landing() {
  const { isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/auth");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="Logo" className="h-8 w-8" />
            <span className="text-xl font-semibold">Resume Builder</span>
          </div>
          <Button variant="ghost" onClick={handleGetStarted} disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : isAuthenticated ? (
              "Dashboard"
            ) : (
              "Sign In"
            )}
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-8 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold tracking-tight mb-6">
            Build Beautiful Resumes
            <br />
            with Markdown & CSS
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Create professional resumes using simple markdown and custom CSS. Real-time preview, multiple templates, and export to PDF.
          </p>
          <Button size="lg" onClick={handleGetStarted} disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
            ) : (
              <>
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </motion.div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-8 py-24 border-t">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
              <FileText className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Markdown Editor</h3>
            <p className="text-muted-foreground">
              Write your resume content in simple, clean markdown format
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
              <Palette className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Custom Styling</h3>
            <p className="text-muted-foreground">
              Customize every aspect with CSS to match your personal brand
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Real-time Preview</h3>
            <p className="text-muted-foreground">
              See your changes instantly with live preview as you type
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t mt-24">
        <div className="max-w-7xl mx-auto px-8 py-8 text-center text-sm text-muted-foreground">
          Built with{" "}
          <a
            href="https://vly.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-primary transition-colors"
          >
            vly.ai
          </a>
        </div>
      </footer>
    </div>
  );
}