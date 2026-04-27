"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useCallback, useRef } from "react";

interface SlideProps {
  active: boolean;
}

const CHARACTERS = [
  {
    name: "Maya",
    title: "Water Guardian",
    tribe: "Borah",
    element: "Water",
    color: "#00b4d8",
    bgColor: "#0077b6",
    image: "/character-stocks/maya/1.png",
  },
  {
    name: "Boar",
    title: "Flame Warden",
    tribe: "Kobar",
    element: "Fire",
    color: "#f97316",
    bgColor: "#c2410c",
    image: "/character-stocks/boar/5.png",
  },
  {
    name: "Crimson",
    title: "Chaos Striker",
    tribe: "Kuhaka",
    element: "Fire",
    color: "#ef4444",
    bgColor: "#b91c1c",
    image: "/character-stocks/crimson/11.png",
  },
  {
    name: "Count",
    title: "Shadow Weaver",
    tribe: "Kujana",
    element: "Neutral",
    color: "#a855f7",
    bgColor: "#7c3aed",
    image: "/character-stocks/count/19.png",
  },
  {
    name: "Radja",
    title: "Inferno King",
    tribe: "Kobar",
    element: "Fire",
    color: "#f59e0b",
    bgColor: "#d97706",
    image: "/character-stocks/radja/15.png",
  },
];

export default function CharacterSlide({ active }: SlideProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(0);
  const mouseStartX = useRef(0);
  const mouseDown = useRef(false);

  const goNext = useCallback(() => {
    setActiveIndex((p) => (p + 1) % CHARACTERS.length);
  }, []);
  const goPrev = useCallback(() => {
    setActiveIndex((p) => (p - 1 + CHARACTERS.length) % CHARACTERS.length);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);
  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const dx = e.changedTouches[0].clientX - touchStartX.current;
      if (Math.abs(dx) > 50) {
        if (dx < 0) goNext();
        else goPrev();
      }
    },
    [goNext, goPrev]
  );
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    mouseStartX.current = e.clientX;
    mouseDown.current = true;
  }, []);
  const handleMouseUp = useCallback(
    (e: React.MouseEvent) => {
      if (!mouseDown.current) return;
      mouseDown.current = false;
      const dx = e.clientX - mouseStartX.current;
      if (Math.abs(dx) > 50) {
        if (dx < 0) goNext();
        else goPrev();
      }
    },
    [goNext, goPrev]
  );

  const current = CHARACTERS[activeIndex];

  return (
    <div
      className="w-full h-full relative overflow-hidden select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-white dark:bg-[#0a0a16]" />

      {/* Diagonal color accent background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 z-0 pointer-events-none"
        >
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${current.bgColor}18 0%, transparent 50%)`,
            }}
          />
          <div
            className="absolute inset-0 dark:block hidden"
            style={{
              background: `linear-gradient(135deg, ${current.bgColor}25 0%, transparent 45%)`,
            }}
          />
          {/* Subtle radial glow */}
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at 30% 50%, ${current.color}10 0%, transparent 60%)`,
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Section title */}
      {active && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="absolute top-6 left-6 z-10"
        >
          <div className="flex items-start gap-2">
            <div className="w-[3px] h-16 bg-gradient-to-b from-[#E8541E] to-transparent mt-1" />
            <div>
              <span className="text-[9px] font-mono tracking-[0.4em] uppercase text-[#E8541E]/60 block mb-1">
                Roster
              </span>
              <h2 className="font-[family-name:var(--font-display)] font-black text-xl md:text-2xl tracking-[0.1em] uppercase text-foreground">
                Characters
              </h2>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── Left: Large character image (full-bleed like hero slide) ── */}
      {active && (
        <div className="absolute inset-0 z-[1] pointer-events-none hidden md:block">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: -30, scale: 1.02 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 30, scale: 0.98 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 -translate-x-[20%]"
              style={{
                maskImage: "radial-gradient(ellipse 75% 85% at 35% 50%, black 30%, transparent 70%)",
                WebkitMaskImage: "radial-gradient(ellipse 75% 85% at 35% 50%, black 30%, transparent 70%)",
              }}
            >
              <Image
                src={current.image}
                alt={current.name}
                fill
                className="object-contain object-left-bottom"
                sizes="100vw"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* ── Left: Character info (below image on mobile, overlaid on desktop) ── */}
      {active && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="absolute bottom-24 md:bottom-16 left-6 md:left-10 z-[3]"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <span
                className="text-[9px] font-mono tracking-[0.4em] uppercase block mb-1"
                style={{ color: current.color }}
              >
                {current.tribe} &mdash; {current.element}
              </span>
              <h3 className="font-[family-name:var(--font-display)] font-black text-3xl md:text-4xl lg:text-5xl tracking-[0.08em] uppercase text-foreground">
                {current.name}
              </h3>
              <p className="text-foreground/40 text-xs md:text-sm tracking-wider uppercase mt-1">
                {current.title}
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ── Right: Character panels carousel ── */}
      {active && (
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="absolute right-4 md:right-8 lg:right-12 top-1/2 -translate-y-1/2 z-[4] flex items-end gap-2 md:gap-3"
        >
          {/* Prev arrow */}
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="w-8 h-8 flex items-center justify-center border border-black/[0.08] dark:border-white/[0.08] hover:border-[var(--spektrum-cyan)]/40 hover:bg-white/50 dark:hover:bg-white/[0.06] transition-all duration-300 mb-4 shrink-0"
          >
            <svg viewBox="0 0 8 14" fill="none" className="w-2.5 h-3.5 text-foreground/40">
              <path d="M7 1L1 7L7 13" stroke="currentColor" strokeWidth={1.5} />
            </svg>
          </button>

          {/* Character panels */}
          <div className="flex items-end gap-2 md:gap-3">
            {CHARACTERS.map((char, i) => {
              const isActive = i === activeIndex;
              return (
                <motion.button
                  key={char.name}
                  onClick={(e) => { e.stopPropagation(); setActiveIndex(i); }}
                  animate={{
                    width: isActive ? 200 : 90,
                    height: isActive ? 420 : 340,
                  }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  className="relative overflow-hidden flex-shrink-0 group cursor-pointer"
                  style={{
                    width: isActive ? 200 : 90,
                    height: isActive ? 420 : 340,
                  }}
                >
                  {/* Panel background */}
                  <div
                    className="absolute inset-0 transition-all duration-500"
                    style={{
                      background: isActive
                        ? `linear-gradient(180deg, ${char.bgColor}30 0%, ${char.bgColor}60 100%)`
                        : "rgba(0,0,0,0.7)",
                    }}
                  />

                  {/* Character image */}
                  <Image
                    src={char.image}
                    alt={char.name}
                    fill
                    className={`object-cover object-top transition-all duration-500 ${
                      isActive ? "opacity-100 scale-105" : "opacity-40 group-hover:opacity-60 grayscale group-hover:grayscale-0"
                    }`}
                    sizes="50vw"
                    quality={100}
                    unoptimized
                  />

                  {/* Dark overlay for inactive */}
                  {!isActive && (
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300" />
                  )}

                  {/* Active top accent line */}
                  {isActive && (
                    <motion.div
                      layoutId="panel-accent"
                      className="absolute top-0 left-0 right-0 h-[3px]"
                      style={{ backgroundColor: char.color }}
                      transition={{ duration: 0.3 }}
                    />
                  )}

                  {/* Bottom gradient for text */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1/2"
                    style={{
                      background: isActive
                        ? `linear-gradient(to top, ${char.bgColor}dd 0%, transparent 100%)`
                        : "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)",
                    }}
                  />

                  {/* Character name */}
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <span
                      className={`font-[family-name:var(--font-display)] font-bold uppercase tracking-wider block transition-all duration-300 ${
                        isActive ? "text-sm text-white" : "text-[9px] text-white/60 group-hover:text-white/80"
                      }`}
                    >
                      {char.name}
                    </span>
                    {isActive && (
                      <motion.span
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="text-[8px] font-mono tracking-[0.3em] uppercase text-white/50 block mt-1"
                      >
                        {char.tribe}
                      </motion.span>
                    )}
                  </div>

                  {/* Faction emblem placeholder */}
                  <div
                    className={`absolute top-3 right-3 w-5 h-5 rounded-full border transition-all duration-300 flex items-center justify-center ${
                      isActive
                        ? "border-white/30 bg-white/10"
                        : "border-white/10 bg-white/5"
                    }`}
                  >
                    <svg viewBox="0 0 12 12" className="w-3 h-3 text-white/50">
                      <path d="M6 1L7.5 4.5L11 5.5L8.5 8L9 11.5L6 9.5L3 11.5L3.5 8L1 5.5L4.5 4.5L6 1Z" fill="currentColor" />
                    </svg>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Next arrow */}
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="w-8 h-8 flex items-center justify-center border border-black/[0.08] dark:border-white/[0.08] hover:border-[var(--spektrum-cyan)]/40 hover:bg-white/50 dark:hover:bg-white/[0.06] transition-all duration-300 mb-4 shrink-0"
          >
            <svg viewBox="0 0 8 14" fill="none" className="w-2.5 h-3.5 text-foreground/40">
              <path d="M1 1L7 7L1 13" stroke="currentColor" strokeWidth={1.5} />
            </svg>
          </button>
        </motion.div>
      )}

      {/* ── Mobile: Character image (shown above panels) ── */}
      {active && (
        <div className="absolute inset-0 z-[1] pointer-events-none md:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[90%] h-[60%]"
            >
              <Image
                src={current.image}
                alt={current.name}
                fill
                className="object-contain object-center"
                sizes="70vw"
              />
            </motion.div>
          </AnimatePresence>
          {/* Bottom fade for mobile */}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-white dark:from-[#0a0a16] to-transparent" />
        </div>
      )}

      {/* ── Navigation dots (mobile) ── */}
      {active && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 md:hidden">
          {CHARACTERS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-[3px] transition-all duration-500 ${
                activeIndex === i
                  ? "w-8 bg-[var(--spektrum-cyan)]"
                  : "w-3 bg-foreground/10 hover:bg-foreground/25"
              }`}
            />
          ))}
        </div>
      )}

      {/* Play the Game button — bottom right */}
      {active && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="absolute bottom-8 right-8 z-10 hidden md:block"
        >
          <button
            className="group relative px-8 py-3 text-white font-[family-name:var(--font-display)] font-bold text-sm tracking-[0.15em] uppercase rounded-2xl transition-all duration-300 shadow-lg shadow-black/30 hover:shadow-xl hover:shadow-black/40 hover:brightness-110 overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: "url('/ui/v2-ui/bg-bottombar.png')" }}
          >
            Play the Game
          </button>
        </motion.div>
      )}
    </div>
  );
}
