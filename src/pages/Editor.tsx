import { ResumeEditor } from "@/components/ResumeEditor";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useAuth } from "@/hooks/use-auth";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useMutation, useQuery } from "convex/react";

export default function Editor() {
  const { id } = useParams<{ id: string }>();
  const { isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const resume = useQuery(api.resumes.get, id ? { id: id as Id<"resumes"> } : "skip");
  const updateResume = useMutation(api.resumes.update);
  const renameResume = useMutation(api.resumes.rename);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/auth");
    }
  }, [isLoading, isAuthenticated, navigate]);

  const handleSave = async (markdown: string, css: string) => {
    if (!id) return;
    await updateResume({
      id: id as Id<"resumes">,
      markdown,
      css,
    });
  };

  const handleRename = async (name: string) => {
    if (!id) return;
    await renameResume({
      id: id as Id<"resumes">,
      name,
    });
  };

  if (isLoading || resume === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (resume === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Resume not found</h2>
          <Button onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="border-b px-4 py-3 flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Dashboard
        </Button>
      </div>
      <div className="flex-1 overflow-hidden">
        <ResumeEditor
          resumeId={id}
          initialMarkdown={resume.markdown}
          initialCss={resume.css}
          initialName={resume.name}
          onSave={handleSave}
          onRename={handleRename}
        />
      </div>
    </div>
  );
}
