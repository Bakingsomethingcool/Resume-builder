import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CodeMirror from "@uiw/react-codemirror";
import { markdown as markdownLang } from "@codemirror/lang-markdown";
import { css as cssLang } from "@codemirror/lang-css";
import { oneDark } from "@codemirror/theme-one-dark";
import { markdownToHtml } from "@/lib/markdown-to-html";
import { Download, FileDown, FileUp, Save } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface ResumeEditorProps {
  resumeId?: string;
  initialMarkdown: string;
  initialCss: string;
  initialName: string;
  onSave: (markdown: string, css: string) => Promise<void>;
  onRename: (name: string) => Promise<void>;
}

export function ResumeEditor({
  initialMarkdown,
  initialCss,
  initialName,
  onSave,
  onRename,
}: ResumeEditorProps) {
  const [markdown, setMarkdown] = useState(initialMarkdown);
  const [css, setCss] = useState(initialCss);
  const [name, setName] = useState(initialName);
  const [isRenaming, setIsRenaming] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const previewRef = useRef<HTMLIFrameElement>(null);
// Detect theme for CodeMirror
const isDark =
  typeof document !== "undefined" &&
  document.documentElement.classList.contains("dark");

  useEffect(() => {
    updatePreview();
  }, [markdown, css]);

  const updatePreview = () => {
    if (!previewRef.current) return;
    const html = markdownToHtml(markdown);
    const fullHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <style>html,body{margin:0;padding:0;}</style>
          <style>${css}</style>
        </head>
        <body>${html}</body>
      </html>
    `;
    const iframe = previewRef.current;
    // Use srcdoc to reliably inject HTML + CSS so styles always apply
    iframe.srcdoc = fullHtml;
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(markdown, css);
      toast.success("Resume saved successfully");
    } catch (error) {
      toast.error("Failed to save resume");
    } finally {
      setIsSaving(false);
    }
  };

  const handleRename = async () => {
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }
    try {
      await onRename(name);
      setIsRenaming(false);
      toast.success("Resume renamed");
    } catch (error) {
      toast.error("Failed to rename resume");
    }
  };

  const exportToPDF = () => {
    if (!previewRef.current) return;
    const iframe = previewRef.current;
    iframe.contentWindow?.print();
  };

  const exportMarkdown = () => {
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name}.md`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Markdown exported");
  };

  const importMarkdown = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".md,.markdown";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          setMarkdown(content);
          toast.success("Markdown imported");
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b bg-background p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-1">
          {isRenaming ? (
            <div className="flex items-center gap-2">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="max-w-xs"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleRename();
                  if (e.key === "Escape") setIsRenaming(false);
                }}
              />
              <Button size="sm" onClick={handleRename}>
                Save
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setIsRenaming(false)}>
                Cancel
              </Button>
            </div>
          ) : (
            <h2
              className="text-lg font-semibold cursor-pointer hover:text-primary"
              onClick={() => setIsRenaming(true)}
            >
              {name}
            </h2>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={importMarkdown}>
            <FileUp className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button size="sm" variant="outline" onClick={exportMarkdown}>
            <FileDown className="h-4 w-4 mr-2" />
            Export MD
          </Button>
          <Button size="sm" variant="outline" onClick={exportToPDF}>
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <Button size="sm" onClick={handleSave} disabled={isSaving}>
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>

      {/* Editor and Preview */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
        {/* Editor */}
        <div className="border-r flex flex-col min-h-0 overflow-hidden">
          <Tabs defaultValue="markdown" className="flex-1 flex flex-col min-h-0">
            <TabsList className="sticky top-0 z-10 bg-background w-full justify-start rounded-none border-b">
              <TabsTrigger value="markdown">Markdown</TabsTrigger>
              <TabsTrigger value="css">CSS</TabsTrigger>
            </TabsList>
            <TabsContent value="markdown" className="m-0 p-0 flex-1 min-h-0">
              <div className="flex flex-col h-full min-h-0">
                <Label className="text-xs text-muted-foreground mb-2 block px-4 pt-4">
                  Edit your resume content
                </Label>
                <div className="flex-1 min-h-0 overflow-auto px-4 pb-4">
                  <CodeMirror
                    value={markdown}
                    extensions={[markdownLang()]}
                    theme={isDark ? oneDark : undefined}
                    onChange={(value: string) => setMarkdown(value)}
                    height="100%"
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="css" className="m-0 p-0 flex-1 min-h-0">
              <div className="flex flex-col h-full min-h-0">
                <Label className="text-xs text-muted-foreground mb-2 block px-4 pt-4">
                  Customize styling
                </Label>
                <div className="flex-1 min-h-0 overflow-auto px-4 pb-4">
                  <CodeMirror
                    value={css}
                    extensions={[cssLang()]}
                    theme={isDark ? oneDark : undefined}
                    onChange={(value: string) => setCss(value)}
                    height="100%"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Preview */}
        <div className="bg-muted overflow-auto p-8">
          <div className="bg-white shadow-sm mx-auto" style={{ maxWidth: "800px" }}>
            <iframe
              ref={previewRef}
              title="Resume Preview"
              className="w-full border-0"
              style={{ minHeight: "1056px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}