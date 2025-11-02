import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CodeMirror from "@uiw/react-codemirror";
import { markdown as markdownLang } from "@codemirror/lang-markdown";
import { css as cssLang } from "@codemirror/lang-css";
import { oneDark } from "@codemirror/theme-one-dark";
import { Download, FileDown, FileUp, Save, ZoomIn, ZoomOut, Maximize, Minimize } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PreviewPanel } from "@/components/PreviewPanel";

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
  const [paperSize, setPaperSize] = useState<"A4" | "Letter">("A4");
  const [themeColor, setThemeColor] = useState("#377BB5");
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const previewAreaRef = useRef<HTMLDivElement>(null);
  const [isAutoZoom, setIsAutoZoom] = useState(true);

  // Detect theme for CodeMirror
  const isDark =
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark");

  useEffect(() => {
    setMarkdown(initialMarkdown);
    setCss(initialCss);
    setName(initialName);
  }, [initialMarkdown, initialCss, initialName]);

  // Add: recompute zoom to fit width of preview area
  const recomputeZoom = () => {
    if (!previewAreaRef.current) return;
    // Paper width in px (match PreviewPanel logic)
    const contentWidthPx = paperSize === "A4" ? 210 * 3.7795275591 : 8.5 * 96;
    const availableWidth = previewAreaRef.current.clientWidth;
    if (!availableWidth || !contentWidthPx) return;
    const next = Math.min(1, availableWidth / contentWidthPx);
    setZoom(Number(next.toFixed(2)));
  };

  useEffect(() => {
    if (!isAutoZoom) return;
    const el = previewAreaRef.current;
    if (!el) return;

    const ro = new ResizeObserver(() => {
      if (isAutoZoom) recomputeZoom();
    });
    ro.observe(el);
    // initial compute
    recomputeZoom();

    return () => ro.disconnect();
  }, [isAutoZoom, paperSize]);

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
    try {
      window.print();
      toast.success("Print dialog opened. Choose 'Save as PDF' to export.");
    } catch {
      toast.error("Failed to open print dialog.");
    }
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

  const clamp = (v: number, min = 0.5, max = 2) => Math.min(max, Math.max(min, v));
  const handleZoomIn = () => {
    setIsAutoZoom(false);
    setZoom((z) => clamp(Number((z + 0.1).toFixed(2))));
  };
  const handleZoomOut = () => {
    setIsAutoZoom(false);
    setZoom((z) => clamp(Number((z - 0.1).toFixed(2))));
  };
  const handleZoomReset = () => {
    setIsAutoZoom(true);
    // Recompute to fit width
    recomputeZoom();
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target) {
        const tag = target.tagName?.toLowerCase();
        if (tag === "input" || tag === "textarea" || (target as any).isContentEditable) {
          return;
        }
      }

      const cmdOrCtrl = e.metaKey || e.ctrlKey;
      if (!cmdOrCtrl) return;

      if (e.key === "=" || e.key === "+") {
        e.preventDefault();
        handleZoomIn();
      } else if (e.key === "-" || e.key === "_") {
        e.preventDefault();
        handleZoomOut();
      } else if (e.key === "0") {
        e.preventDefault();
        handleZoomReset();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

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
      </div>

      {/* Advanced Layout: Editor | Preview | Actions */}
      <div className="flex-1 flex overflow-hidden">
        {/* Editor */}
        <div className="flex-[1.15] min-w-0 border-r flex flex-col overflow-hidden">
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
        <div ref={previewAreaRef} className="flex-[1] min-w-0 bg-muted overflow-y-auto overflow-x-hidden p-6">
          <div className="mb-3 flex items-center justify-end gap-2">
            <Button variant="outline" size="icon" onClick={handleZoomOut} aria-label="Zoom out">
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleZoomIn} aria-label="Zoom in">
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsFullscreen(true)}
              aria-label="Enter fullscreen"
            >
              <Maximize className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={exportToPDF} aria-label="Export PDF">
              <Download className="h-4 w-4" />
            </Button>
          </div>

          {/* Center the preview horizontally */}
          <div className="w-full flex justify-center">
            <div
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: "top center",
              }}
            >
              <PreviewPanel 
                markdown={markdown} 
                css={css} 
                themeColor={themeColor}
                paperSize={paperSize}
              />
            </div>
          </div>
        </div>

        {/* Right Actions Sidebar */}
        <aside className="w-80 shrink-0 border-l bg-background overflow-y-auto p-4 space-y-4">
          <div>
            <h3 className="text-sm font-semibold mb-2">File</h3>
            <div className="space-y-2">
              <Button size="sm" className="w-full" onClick={handleSave} disabled={isSaving}>
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? "Saving..." : "Save"}
              </Button>
              <Button size="sm" variant="outline" className="w-full" onClick={() => setIsRenaming(true)}>
                Rename
              </Button>
              <Separator />
              <Button size="sm" variant="outline" className="w-full" onClick={exportToPDF}>
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
              <Button size="sm" variant="outline" className="w-full" onClick={exportMarkdown}>
                <FileDown className="h-4 w-4 mr-2" />
                Export Markdown
              </Button>
              <Button size="sm" variant="outline" className="w-full" onClick={importMarkdown}>
                <FileUp className="h-4 w-4 mr-2" />
                Import Markdown
              </Button>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-semibold mb-2">Preview</h3>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={handleZoomOut} aria-label="Zoom out">
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleZoomReset} className="px-3">
                {(zoom * 100).toFixed(0)}%
              </Button>
              <Button variant="outline" size="icon" onClick={handleZoomIn} aria-label="Zoom in">
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="ml-auto"
                onClick={() => setIsFullscreen(true)}
                aria-label="Enter fullscreen"
              >
                <Maximize className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-2">Paper Size</h3>
            <Select value={paperSize} onValueChange={(v) => setPaperSize(v as "A4" | "Letter")}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A4">A4</SelectItem>
                <SelectItem value="Letter">Letter</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-2">Theme Color</h3>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={themeColor}
                onChange={(e) => setThemeColor(e.target.value)}
                className="h-9 w-12 cursor-pointer rounded border"
                aria-label="Theme color"
              />
              <Input
                value={themeColor}
                onChange={(e) => setThemeColor(e.target.value)}
                className="flex-1"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Available as CSS var: <span className="font-mono">var(--theme-color)</span>
            </p>
          </div>
        </aside>
      </div>

      {/* Fullscreen Overlay */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm">
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={handleZoomOut} aria-label="Zoom out">
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleZoomReset} className="px-3">
              {(zoom * 100).toFixed(0)}%
            </Button>
            <Button variant="outline" size="icon" onClick={handleZoomIn} aria-label="Zoom in">
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button
              variant="default"
              size="icon"
              onClick={() => setIsFullscreen(false)}
              aria-label="Exit fullscreen"
            >
              <Minimize className="h-4 w-4" />
            </Button>
          </div>

          <div className="w-full h-full overflow-y-auto overflow-x-hidden p-6 flex justify-center items-start">
            <div
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: "top center",
              }}
            >
              <PreviewPanel 
                markdown={markdown} 
                css={css} 
                themeColor={themeColor}
                paperSize={paperSize}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}