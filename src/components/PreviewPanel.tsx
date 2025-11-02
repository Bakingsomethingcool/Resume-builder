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
    return "<p>Error: Markdown parser not loaded.</p>";
  }, [markdown]);

  // Inject CSS with theme color
  const finalCss = useMemo(() => {
    return `
      :root { 
        --theme-color: ${themeColor}; 
      }
      
      #resume-preview {
        background-color: white;
        color: black;
        padding: 2.5rem;
        min-height: 100%;
      }
      
      .dark #resume-preview {
        background-color: hsl(213, 12%, 15%);
        color: hsl(216, 12%, 84%);
      }
      
      ${css}
    `;
  }, [css, themeColor]);

  return (
    <div className={`preview-wrapper ${className}`}>
      <style>{finalCss}</style>
      <div 
        id="resume-preview"
        dangerouslySetInnerHTML={{ __html: parsedHtml }} 
      />
    </div>
  );
}

export default PreviewPanel;