import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { motion } from "framer-motion";
import { ArrowRight, FileText, Loader2, Palette, Zap, Sparkles, Rocket } from "lucide-react";
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
    <div className="relative min-h-screen bg-gradient-to-b from-background to-muted/40 overflow-hidden">
      {/* Decorative Background */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-br from-violet-500/40 to-fuchsia-500/40 blur-3xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-br from-amber-400/40 to-rose-500/40 blur-3xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
      />

      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/50">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="Logo" className="h-8 w-8" />
            <span className="text-xl font-semibold">Resume Builder</span>
            <span className="ml-2 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
              <Sparkles className="h-3 w-3" /> New
            </span>
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
      <section className="relative max-w-6xl mx-auto px-8 py-24 md:py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            Craft, style, and export — all in one place
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-500 via-fuchsia-500 to-orange-400">
              Build Beautiful Resumes
            </span>
            <br className="hidden md:block" />
            with Markdown & CSS
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Design professional resumes with live preview, custom styling, and one‑click exports.
            Simple to write. Powerful to customize.
          </p>

          <div className="flex items-center justify-center gap-3">
            <Button size="lg" onClick={handleGetStarted} disabled={isLoading} className="group">
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
              ) : (
                <>
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleGetStarted}
              className="group"
              disabled={isLoading}
            >
              <Rocket className="mr-2 h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
              Explore Templates
            </Button>
          </div>

          {/* Quick stats */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-muted-foreground">
            <span>Real-time preview</span>
            <span className="hidden sm:inline">•</span>
            <span>3+ designer templates</span>
            <span className="hidden sm:inline">•</span>
            <span>Export to PDF & Markdown</span>
          </div>
        </motion.div>
      </section>

      {/* Showcase */}
      <section className="max-w-6xl mx-auto px-8 -mt-8 md:-mt-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl p-0.5 bg-gradient-to-br from-violet-500/30 via-fuchsia-500/20 to-amber-400/30 border"
        >
          <div className="rounded-2xl bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border rounded-2xl overflow-hidden">
              <div className="p-5 bg-muted/40">
                <div className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">Markdown</div>
                <pre className="text-left text-xs leading-5 font-mono bg-background/70 rounded-lg p-4 overflow-x-auto border">
{`# Jane Smith
**Product Manager**

## Experience
- Led 10+ product launches
- Improved activation by 22%

## Skills
Product Strategy, Roadmaps, UX`}
                </pre>
              </div>
              <div className="p-5">
                <div className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">Live Preview</div>
                <div className="rounded-lg border p-4 bg-white text-black">
                  <h1 className="text-2xl font-bold mb-1">Jane Smith</h1>
                  <p className="text-sm text-neutral-600 mb-4">Product Manager</p>
                  <h2 className="text-xs font-semibold uppercase tracking-wide border-b pb-1 mb-2">Experience</h2>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    <li>Led 10+ product launches</li>
                    <li>Improved activation by 22%</li>
                  </ul>
                  <h2 className="text-xs font-semibold uppercase tracking-wide border-b pb-1 mt-4 mb-2">Skills</h2>
                  <p className="text-sm">Product Strategy, Roadmaps, UX</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-8 py-20 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-center group rounded-xl border bg-background/60 p-8 hover:-translate-y-1 transition-all"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-violet-500/10 text-violet-600 mb-4 group-hover:scale-105 transition-transform">
              <FileText className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Markdown Editor</h3>
            <p className="text-muted-foreground">
              Write your resume content in simple, clean markdown format
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-center group rounded-xl border bg-background/60 p-8 hover:-translate-y-1 transition-all"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-fuchsia-500/10 text-fuchsia-600 mb-4 group-hover:scale-105 transition-transform">
              <Palette className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Custom Styling</h3>
            <p className="text-muted-foreground">
              Customize every aspect with CSS to match your personal brand
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="text-center group rounded-xl border bg-background/60 p-8 hover:-translate-y-1 transition-all"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-amber-400/10 text-amber-600 mb-4 group-hover:scale-105 transition-transform">
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
      <footer className="border-t mt-8">
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