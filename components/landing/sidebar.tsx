"use client";

import { motion, AnimatePresence } from "framer-motion";

interface SidebarProps {
  sections: { id: string; label: string }[];
  currentSection: number;
  onNavigate: (index: number) => void;
  isOpen: boolean;
  onClose: () => void;
  isMobile: boolean;
  collapsed?: boolean;
  onExpand?: () => void;
}

export default function Sidebar({
  sections,
  currentSection,
  onNavigate,
  isOpen,
  onClose,
  isMobile,
  collapsed = false,
  onExpand,
}: SidebarProps) {
  // Desktop: always visible fixed left sidebar
  // Mobile: slide-in overlay
  if (isMobile) {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
              onClick={onClose}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed left-0 top-0 bottom-0 w-64 bg-[#191919] z-50 flex flex-col"
            >
              {/* Logo area */}
              <div className="p-6 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 relative">
                    <div className="absolute inset-0 bg-[var(--spektrum-cyan)] rotate-45 scale-75" />
                    <div className="absolute inset-[3px] bg-[#191919] rotate-45 scale-75" />
                  </div>
                  <span className="font-[family-name:var(--font-display)] font-bold text-sm tracking-[0.25em] uppercase text-white">
                    Spektrum
                  </span>
                </div>
              </div>

              {/* Nav items */}
              <nav className="flex-1 flex flex-col">
                {sections.map((section, i) => (
                  <button
                    key={section.id}
                    onClick={() => {
                      onNavigate(i);
                      onClose();
                    }}
                    className={`relative text-left px-6 py-3 text-xs font-semibold tracking-[0.15em] uppercase transition-all duration-300 border-r-[3px] ${
                      currentSection === i
                        ? "bg-black border-r-[var(--spektrum-cyan)] text-[var(--spektrum-cyan)]"
                        : "border-r-transparent text-white/50 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {/* Active marker triangle */}
                    {currentSection === i && (
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[6px] text-[var(--spektrum-cyan)]">
                        ▶
                      </span>
                    )}
                    <span className="ml-3">{section.label}</span>
                  </button>
                ))}
              </nav>

              {/* Music toggle placeholder */}
              <div className="p-6">
                <button className="w-8 h-8 flex items-center justify-center text-white/30 hover:text-white/60 transition-colors">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
                    <path d="M9 18V5l12-2v13" />
                    <circle cx="6" cy="18" r="3" />
                    <circle cx="18" cy="16" r="3" />
                  </svg>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }

  // Desktop sidebar — collapses when user clicks main content, expands on hover/click
  return (
    <>
      {/* Collapsed mini sidebar — shows current section name vertically + music icon */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: collapsed ? 1 : 0, pointerEvents: collapsed ? "auto" : "none" }}
        transition={{ duration: 0.25, delay: collapsed ? 0.2 : 0 }}
        className="fixed left-0 top-1/2 -translate-y-1/2 z-40 flex flex-col bg-[#191919] cursor-pointer"
        style={{ width: "2.5rem" }}
        onClick={(e) => { e.stopPropagation(); onExpand?.(); }}
      >
        {/* Current section label — rotated vertically */}
        <div className="flex-1 relative flex items-center justify-center border-r-[2px] border-r-[var(--spektrum-magenta)]" style={{ minHeight: "10rem" }}>
          <span
            className="font-[family-name:var(--font-display)] font-bold text-white text-[0.625rem] tracking-[0.15em] uppercase whitespace-nowrap"
            style={{ writingMode: "vertical-lr" }}
          >
            {sections[currentSection].label}
          </span>
        </div>

        {/* Music toggle */}
        <div className="flex items-center justify-center border-t border-white/10" style={{ width: "2.5rem", height: "2.5rem" }}>
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white/70">
            <rect x="2" y="8" width="3" height="8" rx="0.5" />
            <rect x="7" y="4" width="3" height="16" rx="0.5" />
            <rect x="12" y="6" width="3" height="12" rx="0.5" />
            <rect x="17" y="2" width="3" height="20" rx="0.5" />
          </svg>
        </div>
      </motion.div>

      {/* Full sidebar */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: collapsed ? "-100%" : 0 }}
        transition={{ type: "tween", duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        className="fixed left-0 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center bg-[#191919]"
        style={{ width: "7.1875rem", height: "20.90625rem" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Logo at top */}
        <div className="flex items-center justify-center" style={{ marginTop: "0.9375rem", marginBottom: "0.625rem" }}>
          <div className="relative" style={{ width: "2.09375rem", height: "1.84375rem" }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-5 h-5 relative">
                <div className="absolute inset-0 bg-[var(--spektrum-cyan)] rotate-45 scale-75" />
                <div className="absolute inset-[3px] bg-[#191919] rotate-45 scale-75" />
              </div>
            </div>
          </div>
        </div>

        {/* Section nav — each item h-[2.1875rem] with right border */}
        <nav className="flex-1 w-full flex flex-col">
          {sections.map((section, i) => (
            <button
              key={section.id}
              onClick={() => onNavigate(i)}
              className={`group relative w-full text-center transition-all duration-300 border-r-[1.5px] ${
                currentSection === i
                  ? "bg-black border-r-[var(--spektrum-cyan)]"
                  : "border-r-transparent hover:bg-white/[0.03]"
              }`}
              style={{ height: "2.1875rem" }}
            >
              {/* Active triangle marker */}
              {currentSection === i && (
                <motion.span
                  layoutId="sidebar-marker"
                  className="absolute top-1/2 -translate-y-1/2 text-[var(--spektrum-cyan)]"
                  style={{ left: "0.375rem", fontSize: "0.3125rem", lineHeight: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  ▶
                </motion.span>
              )}
              <span
                className={`font-bold uppercase leading-tight whitespace-pre-wrap text-center transition-colors duration-300 ${
                  currentSection === i
                    ? "text-[var(--spektrum-cyan)]"
                    : "text-white/40 group-hover:text-white/70"
                }`}
                style={{ fontSize: "0.625rem", fontWeight: 700, lineHeight: 1.3, letterSpacing: "0.05em", width: "6.875rem", display: "inline-block" }}
              >
                {section.label}
              </span>
            </button>
          ))}
        </nav>

        {/* Music toggle at very bottom */}
        <div className="flex items-center justify-center" style={{ height: "2.1875rem" }}>
          <button className="flex items-center justify-center text-white/20 hover:text-white/50 transition-colors" style={{ width: "1.125rem", height: "1.125rem" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-full h-full">
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          </button>
        </div>
      </motion.div>
    </>
  );
}
