export function QuoteBox({ text, expandable = false }: { text: string; expandable?: boolean }) {
  // Anthropic Claude-inspired Palette
  const bubbleBg = "bg-yellow-100";
  const bubbleBgHex = "#FFF085";
  const accentOrange = "border-[#1a1919]";
  const iconColor = "#1a1919";
  const textColor = "";

  return (
    <div className="max-w-screen mb-2">
      {expandable ? (
        <details className="group list-none">
          <summary
            className={`
              relative flex flex-row gap-3 p-4 rounded-md 
              list-none cursor-pointer select-none 
              [&::-webkit-details-marker]:hidden
              ${bubbleBg} border-l-[4px] ${accentOrange}
              shadow-sm hover:shadow-md transition-shadow duration-300
            `}
          >
            {/* Main Text Content Column */}
            <div className="relative flex-1 text-sm">
              <div className="group-open:hidden relative overflow-hidden">
                <div className="relative">
                  {/* No mask on the <p> — let the overlay do all the work */}
                  <p className={`${textColor} !text-sm font-mono leading-relaxed whitespace-pre-wrap line-clamp-3`}>
                    {text}
                  </p>
                  {/* Fade out the last line smoothly */}
                  <div className="absolute bottom-0 left-0 right-0 h-15 bg-gradient-to-t from-yellow-100 via-yellow-100/40 to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Expanded state */}
              <p className={`${textColor} !text-sm font-mono leading-relaxed whitespace-pre-wrap hidden group-open:block`}>
                {text}
              </p>
            </div>

            {/* Icons Column - Fixed width to keep things aligned */}
            <div className="flex flex-col justify-between items-center w-5 shrink-0 py-0.5">
              {/* Top Quote Icon */}
              <div className="">
                <svg width="16" height="16" viewBox="0 0 24 24" fill={iconColor} stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h4c0 3.5-1 4.5-5 6v3zM14 21c3 0 7-1 7-8V5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h4c0 3.5-1 4.5-5 6v3z" />
                </svg>
              </div>

              {/* Bottom Chevron - Always visible or tucked at the bottom of the column */}
              <div className="mt-auto pt-4">
                <svg
                  width="16" height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={iconColor}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-300 group-open:rotate-180"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>
          </summary>
        </details>
      ) : (
        <div
          className={`
            relative flex flex-row gap-3 p-4 mb-2 rounded-md 
            ${bubbleBg} border-l-[4px] ${accentOrange}
            shadow-sm
          `}
        >
          {/* Main Text Content Column */}
          <div className="relative flex-1 text-sm">
            <p className={`${textColor} !text-sm !pb-1 leading-relaxed whitespace-pre-wrap`}>{text}</p>
          </div>
          {/* Icons Column - Fixed width to keep things aligned */}
          <div className="flex flex-col justify-between items-center w-5 shrink-0 py-0.5">
            {/* Top Quote Icon */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill={iconColor} stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21c3 0 7-1 7-8V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h4c0 3.5-1 4.5-5 6v3zM14 21c3 0 7-1 7-8V5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h4c0 3.5-1 4.5-5 6v3z" />
              </svg>
          </div>
        </div>
      )}
    </div>
  );
}
// QuoteBoxAny: Accepts any ReactNode as content
import { ReactNode } from "react";

export function QuoteBoxAny({ children, expandable = false }: { children: ReactNode; expandable?: boolean }) {
  // Anthropic Claude-inspired Palette
  const bubbleBg = "bg-yellow-100";
  const bubbleBgHex = "#FFF085";
  const accentOrange = "border-[#1a1919]";
  const iconColor = "#1a1919";
  const textColor = "";

  return (
    <div className="max-w-screen mb-2">
      {expandable ? (
        <details className="group list-none">
          <summary
            className={`
              relative flex flex-row gap-3 p-4 rounded-md 
              list-none cursor-pointer select-none 
              [&::-webkit-details-marker]:hidden
              ${bubbleBg} border-l-[4px] ${accentOrange}
              shadow-sm hover:shadow-md transition-shadow duration-300
            `}
          >
            {/* Main Content Column */}
            <div className="relative flex-1">
              <div className="group-open:hidden relative overflow-hidden">
                <div className="relative">
                  <div className={`${textColor} !text-sm !pb-1 font-mono leading-relaxed whitespace-pre-wrap line-clamp-3`}>
                    {children}
                  </div>
                  {/* Fade out the last line smoothly */}
                  <div className="absolute bottom-0 left-0 right-0 h-15 bg-gradient-to-t from-yellow-100 via-yellow-100/40 to-transparent pointer-events-none" />
                </div>
              </div>
              {/* Expanded state */}
              <div className={`${textColor} !text-sm  font-mono leading-relaxed whitespace-pre-wrap hidden group-open:block`}>
                {children}
              </div>
            </div>
            {/* Icons Column - Fixed width to keep things aligned */}
            <div className="flex flex-col justify-between items-center w-5 shrink-0 py-0.5">
              {/* Top Quote Icon */}
              <div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill={iconColor} stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h4c0 3.5-1 4.5-5 6v3zM14 21c3 0 7-1 7-8V5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h4c0 3.5-1 4.5-5 6v3z" />
                </svg>
              </div>
              {/* Bottom Chevron */}
              <div className="mt-auto pt-4">
                <svg
                  width="16" height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={iconColor}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-300 group-open:rotate-180"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>
          </summary>
        </details>
      ) : (
        <div
          className={`
            relative flex flex-row gap-3 p-4 mb-2 rounded-md 
            ${bubbleBg} border-l-[4px] ${accentOrange}
            shadow-sm
          `}
        >
          {/* Main Content Column */}
          <div className="relative flex-1">
            <div className={`${textColor} leading-relaxed whitespace-pre-wrap [&_p]:!pb-1 [&_p]:!text-sm`}>{children}</div>
          </div>
          {/* Icons Column - Fixed width to keep things aligned */}
          <div className="flex flex-col justify-between items-center w-5 shrink-0 py-0.5">
            {/* Top Quote Icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill={iconColor} stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 21c3 0 7-1 7-8V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h4c0 3.5-1 4.5-5 6v3zM14 21c3 0 7-1 7-8V5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h4c0 3.5-1 4.5-5 6v3z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}