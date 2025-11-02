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
    const pageHeightPx = paperSize === "A4" ? 297 * 3.7795275591 : 11 * 96; // A4 mm->px or Letter in->px
    const pagePaddingPx = 2.5 * 16 * 2; // 2.5rem top + bottom in px
    const availableHeight = pageHeightPx - pagePaddingPx;

    // Clear existing pages
    container.innerHTML = "";

    // Create a temporary container to measure content at the correct width
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = parsedHtml;
    tempDiv.style.visibility = "hidden";
    tempDiv.style.position = "absolute";
    tempDiv.style.left = "-99999px";
    tempDiv.style.top = "0";
    tempDiv.style.width = paperSize === "A4" ? "210mm" : "8.5in";
    document.body.appendChild(tempDiv);

    // Helper to measure node height inside tempDiv
    const getNodeHeight = (node: Node): number => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        return (node as HTMLElement).offsetHeight || 0;
      }
      if (node.nodeType === Node.TEXT_NODE) {
        const text = (node.textContent || "").trim();
        if (!text) return 0;
        const p = document.createElement("p");
        p.textContent = text;
        // Insert right after the text node to maintain context styles as much as possible
        const parent = node.parentNode ?? tempDiv;
        parent.insertBefore(p, node.nextSibling);
        const h = p.offsetHeight || 0;
        parent.removeChild(p);
        return h;
      }
      return 0;
    };

    // Create pages
    const pages: HTMLElement[] = [];
    let currentPage = document.createElement("div");
    currentPage.className = "page";
    // First page should host the scoped id for CSS rules
    currentPage.id = "resume-preview";
    let currentHeight = 0;

    const nodes: Node[] = Array.from(tempDiv.childNodes);

    for (const node of nodes) {
      const nodeHeight = getNodeHeight(node);

      // If this node would overflow the current page and we already have some content, start a new page
      if (currentHeight + nodeHeight > availableHeight && currentPage.childNodes.length > 0) {
        pages.push(currentPage);
        currentPage = document.createElement("div");
        currentPage.className = "page";
        currentHeight = 0;
      }

      // Append a clone of the node to the current page
      const clone = node.cloneNode(true);
      currentPage.appendChild(clone);
      currentHeight += nodeHeight;
    }

    // Add the last page if it has any content
    if (currentPage.childNodes.length > 0) {
      // Ensure only the very first page carries the #resume-preview id
      if (pages.length > 0) {
        // If we already pushed at least one page, make sure the first one has the id and others don't
        if (!pages[0].id) pages[0].id = "resume-preview";
        currentPage.id = "";
      }
      pages.push(currentPage);
    } else {
      // If no content on currentPage but there are previous pages, ensure first has the id
      if (pages.length > 0 && !pages[0].id) pages[0].id = "resume-preview";
    }

    // Append all pages to container
    for (const page of pages) {
      container.appendChild(page);
    }

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