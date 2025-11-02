import { useMemo, useEffect, useRef } from "react";

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
  paperSize?: "A4" | "Letter";
  className?: string;
}

export function PreviewPanel({
  markdown,
  css,
  themeColor = "#377BB5",
  paperSize = "A4",
  className = "",
}: PreviewPanelProps) {
  const containerRef = useRef<HTMLDivElement>(null);

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
      
      .page {
        background-color: white;
        color: black;
        padding: 2.5rem;
        margin-bottom: 1rem;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        width: ${paperSize === "A4" ? "210mm" : "8.5in"};
        min-height: ${paperSize === "A4" ? "297mm" : "11in"};
        box-sizing: border-box;
      }
      
      .dark .page {
        background-color: hsl(213, 12%, 15%);
        color: hsl(216, 12%, 84%);
      }
      
      #resume-preview h1 {
        font-size: 2em;
        font-weight: bold;
        margin: 0.67em 0;
      }
      
      #resume-preview h2 {
        font-size: 1.5em;
        font-weight: bold;
        margin: 0.75em 0 0.5em 0;
        padding-bottom: 0.3em;
        border-bottom: 2px solid var(--theme-color);
      }
      
      #resume-preview h3 {
        font-size: 1.17em;
        font-weight: bold;
        margin: 1em 0 0.5em 0;
      }
      
      #resume-preview p {
        margin: 0.5em 0;
        line-height: 1.6;
      }
      
      #resume-preview ul, #resume-preview ol {
        margin: 0.5em 0;
        padding-left: 2em;
      }
      
      #resume-preview li {
        margin: 0.25em 0;
        line-height: 1.6;
      }
      
      #resume-preview strong {
        font-weight: 600;
      }
      
      #resume-preview em {
        font-style: italic;
      }
      
      #resume-preview hr {
        border: none;
        border-top: 1px solid #ddd;
        margin: 1.5em 0;
      }
      
      .dark #resume-preview hr {
        border-top-color: #444;
      }
      
      @media print {
        .page {
          background-color: white !important;
          color: black !important;
          box-shadow: none !important;
          margin: 0 !important;
          page-break-after: always;
        }
        
        #resume-preview h2 {
          color: #377BB5 !important;
          border-bottom-color: #377BB5 !important;
        }
      }
      
      ${css}
    `;
  }, [css, themeColor, paperSize]);

  // Pagination logic
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const pageHeight = paperSize === "A4" ? 297 * 3.7795275591 : 11 * 96; // Convert mm/in to px
    const pagePadding = 2.5 * 16 * 2; // 2.5rem top + bottom in px
    const availableHeight = pageHeight - pagePadding;

    // Clear existing pages
    container.innerHTML = "";

    // Create a temporary container to measure content
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = parsedHtml;
    tempDiv.style.visibility = "hidden";
    tempDiv.style.position = "absolute";
    tempDiv.style.width = paperSize === "A4" ? "210mm" : "8.5in";
    document.body.appendChild(tempDiv);

    // Create pages
    const pages: HTMLElement[] = [];
    let currentPage = document.createElement("div");
    currentPage.className = "page";
    currentPage.id = pages.length === 0 ? "resume-preview" : "";

    const children = Array.from(tempDiv.childNodes);
    let currentHeight = 0;

    children.forEach((node) => {
      const clone = node.cloneNode(true) as HTMLElement;
      currentPage.appendChild(clone);

      // Measure height
      const cloneHeight = clone instanceof HTMLElement ? clone.offsetHeight : 0;

      if (currentHeight + cloneHeight > availableHeight && currentPage.childNodes.length > 1) {
        // Remove the last node and start a new page
        currentPage.removeChild(clone);
        pages.push(currentPage);

        currentPage = document.createElement("div");
        currentPage.className = "page";
        currentPage.appendChild(clone);
        currentHeight = cloneHeight;
      } else {
        currentHeight += cloneHeight;
      }
    });

    // Add the last page
    if (currentPage.childNodes.length > 0) {
      pages.push(currentPage);
    }

    // Ensure first page has the ID
    if (pages.length > 0 && !pages[0].id) {
      pages[0].id = "resume-preview";
    }

    // Append all pages to container
    pages.forEach((page) => container.appendChild(page));

    // Cleanup
    document.body.removeChild(tempDiv);
  }, [parsedHtml, paperSize]);

  return (
    <div className={`preview-wrapper ${className}`}>
      <style>{finalCss}</style>
      <div ref={containerRef} />
    </div>
  );
}

export default PreviewPanel;