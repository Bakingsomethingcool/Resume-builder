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
  className,
}: PreviewPanelProps) {
  // 1) Convert Markdown to HTML string using marked.js if available
  const parsedHtml = useMemo(() => {
    if (typeof window !== "undefined" && window.marked) {
      return window.marked.parse(markdown, { gfm: true, breaks: true });
    }
    return "Error: Markdown parser not loaded.";
  }, [markdown]);

  // 2) Inject CSS with theme color so `var(--theme-color)` can be used
  const finalCss = useMemo(() => {
    return `:root { --theme-color: ${themeColor}; }\n${css}`;
  }, [css, themeColor]);

  // 3) Render the HTML string within #resume-preview for scoping the styles
  return (
    <div className={className}>
      <style>{finalCss}</style>
      <div id="resume-preview" dangerouslySetInnerHTML={{ __html: parsedHtml }} />
    </div>
  );
}

export default PreviewPanel;
