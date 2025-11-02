import { useMemo } from "react";

declare global {
  interface Window {
    marked?: {
      parse: (md: string, options?: Record<string, unknown>) => string;
    };
  }
}

interface PreviewPanelProps {
  markdown: string;
  css: string;
  themeColor?: string;
  className?: string;
}

export function PreviewPanel({
  markdown,
  css,
  themeColor = "#377BB5",
  className = "",
}: PreviewPanelProps) {
  // Convert Markdown to HTML string using marked.js
  const parsedHtml = useMemo(() => {
    if (typeof window !== "undefined" && window.marked) {
      return window.marked.parse(markdown, { gfm: true, breaks: true });
    }
    return "Error: Markdown parser not loaded.";
  }, [markdown]);

  // Inject CSS with theme color so `var(--theme-color)` can be used
  const finalCss = useMemo(() => {
    return `:root { --theme-color: ${themeColor}; }\n${css}`;
  }, [css, themeColor]);

  // Render the HTML string within #resume-preview for scoping the styles
  return (
    <div className={`preview-wrapper ${className}`}>
      <style>{finalCss}</style>
      <div 
        id="resume-preview" 
        className="p-10"
        dangerouslySetInnerHTML={{ __html: parsedHtml }} 
      />
    </div>
  );
}

export default PreviewPanel;