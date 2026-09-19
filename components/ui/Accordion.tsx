import React, { createContext, useContext, useLayoutEffect, useMemo, useRef, useState } from "react";

/**
 * Minimal local replacement for the (now removed) `@material-tailwind/react`
 * Accordion / AccordionHeader / AccordionBody trio. Only implements what
 * components/Hero/computer/FAQ.tsx actually uses: an open/closed boolean
 * driving a plus/minus icon and an animated-height body.
 *
 * DOM structure, default classes and animation timing intentionally mirror
 * the previously installed library (1.4.2) exactly, so the rendered page is
 * unchanged. Default utility classes are only included where they already
 * produced a CSS rule under this project's Tailwind config (content only
 * scans ./pages and ./components, never node_modules) - anything else the
 * library used to add had no visual effect and is left out on purpose.
 */

interface AccordionContextValue {
  open: boolean;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordionState() {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error(
      "AccordionHeader/AccordionBody must be used inside an <Accordion>."
    );
  }
  return context;
}

function mergeClassNames(...classes: Array<string | undefined | false>) {
  const kept: string[] = [];
  for (const value of classes) {
    if (value) kept.push(value);
  }
  return kept.join(" ");
}

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
}

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ open, className, children, ...rest }, ref) => {
    const contextValue = useMemo<AccordionContextValue>(() => ({ open }), [open]);
    return (
      <AccordionContext.Provider value={contextValue}>
        <div
          {...rest}
          ref={ref}
          className={mergeClassNames("relative", "w-full", className)}
        >
          {children}
        </div>
      </AccordionContext.Provider>
    );
  }
);
Accordion.displayName = "Accordion";

export type AccordionHeaderProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const AccordionHeader = React.forwardRef<HTMLButtonElement, AccordionHeaderProps>(
  ({ className, children, ...rest }, ref) => {
    const { open } = useAccordionState();
    return (
      <button
        {...rest}
        ref={ref}
        type="button"
        className={mergeClassNames("select-none", className)}
      >
        {children}
        <span className="ml-4">
          {open ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </span>
      </button>
    );
  }
);
AccordionHeader.displayName = "AccordionHeader";

export type AccordionBodyProps = React.HTMLAttributes<HTMLDivElement>;

// Measured-height open/close animation (~200ms), no extra dependency: the
// inner element's natural content height (its own box plus its own margin,
// matching what the previous library's outer wrapper used to auto-size to)
// is measured on every render where it might have changed, and the outer
// wrapper animates its `height` via a directly-set style property between 0
// and that measured value. At rest, the closed wrapper is height 0 plus
// clipped overflow, so it takes no space and shows nothing, and the open
// wrapper always matches the content's real height.
export const AccordionBody = React.forwardRef<HTMLDivElement, AccordionBodyProps>(
  ({ className, children, style, ...rest }, ref) => {
    const { open } = useAccordionState();
    const contentRef = useRef<HTMLDivElement | null>(null);
    const [contentHeight, setContentHeight] = useState(0);

    useLayoutEffect(() => {
      const node = contentRef.current;
      if (!node) return;
      const computed = window.getComputedStyle(node);
      const marginTop = parseFloat(computed.marginTop) || 0;
      const marginBottom = parseFloat(computed.marginBottom) || 0;
      setContentHeight(node.scrollHeight + marginTop + marginBottom);
    }, [open, children]);

    return (
      <div
        className="overflow-hidden"
        style={{
          height: open ? contentHeight : 0,
          transitionProperty: "height",
          transitionDuration: "200ms",
          transitionTimingFunction: "linear",
        }}
      >
        <div
          {...rest}
          ref={(node) => {
            contentRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) ref.current = node;
          }}
          style={style}
          className={mergeClassNames("w-full", className)}
        >
          {children}
        </div>
      </div>
    );
  }
);
AccordionBody.displayName = "AccordionBody";
