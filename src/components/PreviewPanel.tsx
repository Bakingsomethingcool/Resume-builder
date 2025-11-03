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
        height: ${paperSize === "A4" ? "297mm" : "11in"};
        box-sizing: border-box;
        overflow: hidden; /* enforce fixed page height */
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
          /* Remove only the top padding to eliminate big top margin in print */
          padding-top: 0 !important;
        }
        /* Also remove any default top margin from the first element (e.g., H1) */
        .page > *:first-child {
          margin-top: 0 !important;
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

    // Preserve scroll position of the nearest scrollable ancestor
    const findScrollParent = (el: HTMLElement | null): HTMLElement | null => {
      let p = el?.parentElement;
      while (p) {
        const style = getComputedStyle(p);
        if (style.overflowY === "auto" || style.overflowY === "scroll") return p;
        p = p.parentElement;
      }
      return null;
    };
    const scrollEl = findScrollParent(container);
    const prevScrollTop = scrollEl ? scrollEl.scrollTop : 0;
    const prevScrollHeight = scrollEl ? scrollEl.scrollHeight : 0;

    const pageHeightPx = paperSize === "A4" ? 297 * 3.7795275591 : 11 * 96; // A4 mm->px or Letter in->px

    // Clear existing pages
    container.innerHTML = "";

    // Create a temporary container with content that has CSS applied (including #resume-preview rules)
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = parsedHtml;
    tempDiv.id = "resume-preview";
    tempDiv.style.visibility = "hidden";
    tempDiv.style.position = "absolute";
    tempDiv.style.left = "-99999px";
    tempDiv.style.top = "0";
    tempDiv.style.width = paperSize === "A4" ? "210mm" : "8.5in";
    document.body.appendChild(tempDiv);

    // Create a measuring wrapper with the correct scope so #resume-preview selectors apply
    const measureWrapper = document.createElement("div");
    measureWrapper.id = "resume-preview";
    measureWrapper.style.visibility = "hidden";
    measureWrapper.style.position = "absolute";
    measureWrapper.style.left = "-99999px";
    measureWrapper.style.top = "0";
    measureWrapper.style.width = paperSize === "A4" ? "210mm" : "8.5in";
    document.body.appendChild(measureWrapper);

    // Create a measuring page to accumulate nodes and measure real layout height (including margins)
    const measurePage = document.createElement("div");
    measurePage.className = "page";
    // Override fixed height for measurement so we can compare true content height against the target
    measurePage.style.height = "auto";
    measurePage.style.width = paperSize === "A4" ? "210mm" : "8.5in";
    measureWrapper.appendChild(measurePage);

    const pages: HTMLElement[] = [];

    for (const node of Array.from(tempDiv.childNodes)) {
      const clone = node.cloneNode(true);
      measurePage.appendChild(clone);

      // If adding this node overflows the page height, roll back and start a new page
      if (measurePage.scrollHeight > pageHeightPx) {
        measurePage.removeChild(clone as Node);

        const pageDiv = document.createElement("div");
        pageDiv.className = "page";
        pageDiv.innerHTML = measurePage.innerHTML;
        pages.push(pageDiv);

        // Reset measuring page and append the node to the new measuring page
        measurePage.innerHTML = "";
        measurePage.appendChild(clone);
      }
    }

    // Flush the last page
    if (measurePage.childNodes.length > 0) {
      const pageDiv = document.createElement("div");
      pageDiv.className = "page";
      pageDiv.innerHTML = measurePage.innerHTML;
      pages.push(pageDiv);
    }

    // Append all pages to container
    for (const page of pages) {
      container.appendChild(page);
    }

    // Restore scroll position after DOM updates
    if (scrollEl) {
      requestAnimationFrame(() => {
        const nearBottom = prevScrollTop > prevScrollHeight - 50;
        scrollEl.scrollTop = nearBottom ? scrollEl.scrollHeight : prevScrollTop;
      });
    }

    // Cleanup
    document.body.removeChild(tempDiv);
    document.body.removeChild(measureWrapper);
  }, [parsedHtml, paperSize]);

  return (
    <div className={`preview-wrapper ${className}`}>
      <style>{finalCss}</style>
      {/* Force resume preview to stay light in dark mode */}
      <style>{`
        .dark #resume-preview,
        .dark #resume-preview .page {
          background-color: #ffffff !important;
          color: #000000 !important;
        }
        .dark #resume-preview * {
          background-color: transparent !important;
          color: inherit !important;
        }
        .dark #resume-preview h2 {
          color: var(--theme-color) !important;
          border-bottom-color: var(--theme-color) !important;
        }
        .dark #resume-preview hr {
          border-top-color: #ddd !important;
        }
      `}</style>
      {/* Ensure all CSS rules targeting #resume-preview apply to all pages */}
      <div ref={containerRef} id="resume-preview" />
    </div>
  );
}

export default PreviewPanel;