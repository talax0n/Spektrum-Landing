"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface SlideProps {
  active: boolean;
}

const LORE_PAGES = [
  {
    title: "The Five Spektra",
    text: "The world is built on five elemental energies called Spektra — Fire, Water, Ground, Air, and Neutral. Each Spektrum carries unique power and defines distinct playstyles, from aggressive burn to defensive control.",
    color: "var(--spektrum-cyan)",
  },
  {
    title: "The Tribes",
    text: "Five tribes inhabit this world: Kobar (masked male warriors), Borah (masked female guardians), Kuhaka (consumed males who embraced darkness), Kujana (consumed females transformed by chaos), and Kuku (pure monsters born from chaos itself).",
    color: "var(--spektrum-purple)",
  },
  {
    title: "The Ritual",
    text: "New wielders undergo The Ritual — choosing between The Guardians (Kobar & Borah) or The Corrupted (Kuhaka & Kujana), and receiving an elemental affinity. This defines your first 40-card battle-ready deck and your path forward.",
    color: "var(--spektrum-magenta)",
  },
];

export default function LoreSlide({ active }: SlideProps) {
  const [currentPage, setCurrentPage] = useState(0);

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

      {/* Section title in top-left (like Etheria's section headers) */}
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
          {/* Left: visual placeholder */}
          {active && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative aspect-square max-w-[360px] mx-auto w-full"
            >
              <div className="absolute inset-0 border border-white/5 overflow-hidden">
                <div className="absolute inset-0 bg-[var(--spektrum-deep)]" />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(circle, ${LORE_PAGES[currentPage].color}12 0%, transparent 60%)`,
                  }}
                />
                {/* Central prismatic symbol */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 relative animate-float">
                    <div
                      className="absolute inset-0 rotate-45 opacity-30"
                      style={{ backgroundColor: LORE_PAGES[currentPage].color }}
                    />
                    <div className="absolute inset-3 bg-[var(--spektrum-deep)] rotate-45" />
                    <div
                      className="absolute inset-6 rotate-45 opacity-20"
                      style={{ backgroundColor: LORE_PAGES[currentPage].color }}
                    />
                  </div>
                </div>
                <div className="absolute inset-0 scanlines opacity-30" />
                {/* Corner brackets */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-white/10" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-white/10" />
              </div>
            </motion.div>
          )}

          {/* Right: text content */}
          {active && (
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
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

              {/* Page dots / navigation */}
              <div className="flex items-center gap-3">
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
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
