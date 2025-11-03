import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TemplateSelector } from "@/components/TemplateSelector";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useAuth } from "@/hooks/use-auth";
import { templates } from "@/lib/templates";
import { FileText, Loader2, LogOut, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useMutation, useQuery } from "convex/react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { isLoading, isAuthenticated, user, signOut } = useAuth();
  const navigate = useNavigate();
  const [showTemplates, setShowTemplates] = useState(false);
  const resumes = useQuery(api.resumes.list);
  const createResume = useMutation(api.resumes.create);
  const deleteResume = useMutation(api.resumes.remove);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/auth");
    }
  }, [isLoading, isAuthenticated, navigate]);

  const handleCreateResume = async (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    if (!template) return;

    try {
      const id = await createResume({
        name: `Untitled Resume ${(resumes?.length || 0) + 1}`,
        markdown: template.markdown,
        css: template.css,
        template: templateId,
      });
      toast.success("Resume created");
      navigate(`/editor/${id}`);
    } catch (error) {
      toast.error("Failed to create resume");
    }
  };

  const handleDeleteResume = async (id: Id<"resumes">) => {
    try {
      await deleteResume({ id });
      toast.success("Resume deleted");
    } catch (error) {
      toast.error("Failed to delete resume");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="Logo" className="h-8 w-8 cursor-pointer" onClick={() => navigate("/")} />
            <h1 className="text-xl font-semibold">ResumeCraft</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <Button variant="ghost" size="sm" onClick={() => signOut()}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-semibold mb-2">My Resumes</h2>
            <p className="text-muted-foreground">Create and manage your resumes</p>
          </div>
          <Button onClick={() => setShowTemplates(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Resume
          </Button>
        </div>

        {resumes === undefined ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : resumes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">No resumes yet</h3>
            <p className="text-muted-foreground mb-6">Create your first resume to get started</p>
            <Button onClick={() => setShowTemplates(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Resume
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume, index) => (
              <motion.div
                key={resume._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="cursor-pointer hover:border-primary transition-colors group">
                  <CardHeader onClick={() => navigate(`/editor/${resume._id}`)}>
                    <div className="flex items-start justify-between">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteResume(resume._id);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardTitle className="text-base mt-2">{resume.name}</CardTitle>
                    <CardDescription className="text-xs">
                      {new Date(resume._creationTime).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent onClick={() => navigate(`/editor/${resume._id}`)}>
                    <div className="bg-muted rounded p-3 text-xs font-mono h-24 overflow-hidden">
                      {resume.markdown.substring(0, 100)}...
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      <TemplateSelector
        open={showTemplates}
        onClose={() => setShowTemplates(false)}
        onSelect={handleCreateResume}
      />
    </div>
  );
}