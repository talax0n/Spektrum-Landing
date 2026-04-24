"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface SlideProps {
  active: boolean;
}

const LORE_PAGES = [
  {
    title: "The Five Spektra",
    text: "The world is built on five elemental energies called Spektra — Fire, Water, Ground, Air, and Neutral. Each Spektrum carries unique power and defines distinct playstyles, from aggressive burn to defensive control.",
    color: "var(--spektrum-cyan)",
    icon: "◇",
  },
  {
    title: "The Tribes",
    text: "Five tribes inhabit this world: Kobar (masked male warriors), Borah (masked female guardians), Kuhaka (consumed males who embraced darkness), Kujana (consumed females transformed by chaos), and Kuku (pure monsters born from chaos itself).",
    color: "var(--spektrum-purple)",
    icon: "⬡",
  },
  {
    title: "The Ritual",
    text: "New wielders undergo The Ritual — choosing between The Guardians (Kobar & Borah) or The Corrupted (Kuhaka & Kujana), and receiving an elemental affinity. This defines your first 40-card battle-ready deck and your path forward.",
    color: "var(--spektrum-magenta)",
    icon: "✦",
  },
];

export default function LoreSlide({ active }: SlideProps) {
  const [currentPage, setCurrentPage] = useState(0);

  const goNext = () => setCurrentPage((p) => (p + 1) % LORE_PAGES.length);
  const goPrev = () => setCurrentPage((p) => (p - 1 + LORE_PAGES.length) % LORE_PAGES.length);

  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-mesh" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Section title in top-left */}
      {active && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="absolute top-6 left-6 z-10"
        >
          <div className="flex items-start gap-2">
            <div className="w-[3px] h-16 bg-gradient-to-b from-[var(--spektrum-cyan)] to-transparent mt-1" />
            <div>
              <span className="text-[9px] font-mono tracking-[0.4em] uppercase text-[var(--spektrum-cyan)]/60 block mb-1">
                Origins
              </span>
              <h2 className="font-[family-name:var(--font-display)] font-black text-xl md:text-2xl tracking-[0.1em] uppercase text-white">
                The Lore
              </h2>
            </div>
          </div>
        </motion.div>
      )}

      {/* Main content area */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 items-center">
          {/* Left: visual + chapter tabs */}
          {active && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative max-w-[360px] mx-auto w-full"
            >
              {/* Visual box */}
              <div className="relative aspect-square border border-white/5 overflow-hidden">
                <div className="absolute inset-0 bg-[var(--spektrum-deep)]" />
                <div
                  className="absolute inset-0 transition-colors duration-500"
                  style={{
                    background: `radial-gradient(circle, ${LORE_PAGES[currentPage].color}12 0%, transparent 60%)`,
                  }}
                />
                {/* Central prismatic symbol */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentPage}
                      initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                      animate={{ rotate: 0, opacity: 1, scale: 1 }}
                      exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                      transition={{ duration: 0.4 }}
                      className="w-24 h-24 relative"
                    >
                      <div
                        className="absolute inset-0 rotate-45 opacity-30"
                        style={{ backgroundColor: LORE_PAGES[currentPage].color }}
                      />
                      <div className="absolute inset-3 bg-[var(--spektrum-deep)] rotate-45" />
                      <div
                        className="absolute inset-6 rotate-45 opacity-20"
                        style={{ backgroundColor: LORE_PAGES[currentPage].color }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl opacity-40" style={{ color: LORE_PAGES[currentPage].color }}>
                          {LORE_PAGES[currentPage].icon}
                        </span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="absolute inset-0 scanlines opacity-30" />
                <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-white/10" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-white/10" />
              </div>

              {/* Chapter tab buttons below the visual */}
              <div className="flex mt-3 gap-1">
                {LORE_PAGES.map((page, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`flex-1 py-2.5 px-2 text-left transition-all duration-300 border-t-[2px] ${
                      currentPage === i
                        ? "bg-white/[0.04] border-t-[var(--spektrum-cyan)]"
                        : "bg-white/[0.01] border-t-transparent hover:bg-white/[0.03]"
                    }`}
                  >
                    <span
                      className="text-[8px] font-mono tracking-[0.3em] uppercase block mb-0.5 transition-colors duration-300"
                      style={{
                        color: currentPage === i ? LORE_PAGES[i].color : "rgba(255,255,255,0.25)",
                      }}
                    >
                      CH.{String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`text-[9px] font-bold tracking-wider uppercase leading-tight transition-colors duration-300 block ${
                        currentPage === i ? "text-white" : "text-white/30"
                      }`}
                    >
                      {page.title}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Right: text content with prev/next */}
          {active && (
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.35 }}
                >
                  <span
                    className="text-[9px] font-mono tracking-[0.4em] uppercase block mb-3"
                    style={{ color: LORE_PAGES[currentPage].color }}
                  >
                    Chapter {String(currentPage + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-[family-name:var(--font-display)] font-bold text-2xl md:text-3xl tracking-[0.1em] uppercase text-white mb-5">
                    {LORE_PAGES[currentPage].title}
                  </h3>
                  <p className="text-white/40 text-sm md:text-base leading-relaxed mb-8">
                    {LORE_PAGES[currentPage].text}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Navigation: prev/next arrows + dots */}
              <div className="flex items-center gap-4">
                {/* Prev arrow */}
                <button
                  onClick={goPrev}
                  className="w-8 h-8 flex items-center justify-center border border-white/10 hover:border-[var(--spektrum-cyan)]/40 hover:bg-white/[0.03] transition-all duration-300"
                >
                  <svg viewBox="0 0 8 14" fill="none" className="w-2.5 h-3.5 text-white/40 hover:text-white/70">
                    <path d="M7 1L1 7L7 13" stroke="currentColor" strokeWidth={1.5} />
                  </svg>
                </button>

                {/* Page dots */}
                <div className="flex items-center gap-2">
                  {LORE_PAGES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i)}
                      className={`h-[3px] transition-all duration-500 ${
                        currentPage === i
                          ? "w-10 bg-[var(--spektrum-cyan)]"
                          : "w-4 bg-white/15 hover:bg-white/30"
                      }`}
                    />
                  ))}
                </div>

                {/* Next arrow */}
                <button
                  onClick={goNext}
                  className="w-8 h-8 flex items-center justify-center border border-white/10 hover:border-[var(--spektrum-cyan)]/40 hover:bg-white/[0.03] transition-all duration-300"
                >
                  <svg viewBox="0 0 8 14" fill="none" className="w-2.5 h-3.5 text-white/40 hover:text-white/70">
                    <path d="M1 1L7 7L1 13" stroke="currentColor" strokeWidth={1.5} />
                  </svg>
                </button>

                {/* Page counter */}
                <span className="text-[10px] font-mono text-white/20 ml-2">
                  {currentPage + 1} / {LORE_PAGES.length}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
