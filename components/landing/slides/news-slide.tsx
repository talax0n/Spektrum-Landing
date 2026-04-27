"use client";

import { motion } from "framer-motion";

interface SlideProps {
  active: boolean;
}

const NEWS = [
  {
    date: "2025.04.20",
    tag: "ANNOUNCEMENT",
    title: "Genesis Expansion Live — 101 Cards Now Available on Solana Devnet",
    thumb: "var(--spektrum-cyan)",
  },
  {
    date: "2025.04.15",
    tag: "DEV LOG",
    title: "MagicBlock Integration Complete — Gasless Card Reveals with Ephemeral Rollups",
    thumb: "var(--spektrum-purple)",
  },
  {
    date: "2025.04.10",
    tag: "COMMUNITY",
    title: "The Ritual is Open — Choose Your Faction and Get Your Starter Deck Free",
    thumb: "var(--spektrum-magenta)",
  },
  {
    date: "2025.04.05",
    tag: "GAMEPLAY",
    title: "Deep Dive: The 9-Phase Turn Structure and Spektra Economy Explained",
    thumb: "var(--spektrum-gold)",
  },
];

export default function NewsSlide({ active }: SlideProps) {
  return (
    <div className="w-full h-full relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh" />

      {/* Section header */}
      {active && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="absolute top-6 left-6 z-10"
        >
          <div className="flex items-start gap-2">
            <div className="w-[3px] h-16 bg-gradient-to-b from-[var(--spektrum-purple)] to-transparent mt-1" />
            <div>
              <span className="text-[9px] font-mono tracking-[0.4em] uppercase text-[var(--spektrum-purple)]/60 block mb-1">
                Updates
              </span>
              <h2 className="font-[family-name:var(--font-display)] font-black text-xl md:text-2xl tracking-[0.1em] uppercase text-[#1a1a2e]">
                Spektrum Daily
              </h2>
            </div>
          </div>
        </motion.div>
      )}

      {/* "MORE >" button */}
      {active && (
        <motion.a
          href="#"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="absolute top-7 right-6 z-10 text-[10px] font-[family-name:var(--font-display)] font-bold tracking-[0.2em] uppercase text-[#1a1a2e]/30 hover:text-[var(--spektrum-cyan)] transition-colors bg-white/60 backdrop-blur-sm px-4 py-2"
        >
          MORE &gt;
        </motion.a>
      )}

      {/* News grid */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="max-w-4xl w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
          {NEWS.map((item, i) => (
            <motion.a
              key={item.title}
              href="#"
              initial={active ? { opacity: 0, y: 30 } : {}}
              animate={active ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className="group relative bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 overflow-hidden shadow-sm shadow-black/[0.03]"
            >
              <div className="flex">
                {/* Thumbnail */}
                <div className="w-[120px] md:w-[150px] flex-shrink-0 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[var(--spektrum-surface)]" />
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      background: `radial-gradient(circle, ${item.thumb}15 0%, transparent 70%)`,
                    }}
                  >
                    <div
                      className="w-8 h-8 rotate-45 opacity-15"
                      style={{ backgroundColor: item.thumb }}
                    />
                  </div>
                </div>

                {/* Text */}
                <div className="flex-1 p-4 flex flex-col justify-between min-h-[100px]">
                  <div>
                    <span
                      className="inline-block text-[8px] font-mono tracking-[0.2em] uppercase px-1.5 py-0.5 mb-2"
                      style={{
                        color: item.thumb,
                        backgroundColor: `color-mix(in srgb, ${item.thumb} 8%, transparent)`,
                      }}
                    >
                      {item.tag}
                    </span>
                    <h3 className="font-[family-name:var(--font-display)] font-bold text-[11px] md:text-xs tracking-wider uppercase text-[#1a1a2e] leading-snug group-hover:text-[var(--spektrum-cyan)] transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                  </div>
                  <span className="text-[9px] font-mono text-[#1a1a2e]/20 mt-2">
                    {item.date}
                  </span>
                </div>
              </div>

              {/* Bottom accent line on hover */}
              <div
                className="absolute bottom-0 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-500"
                style={{ backgroundColor: item.thumb }}
              />
            </motion.a>
          ))}
        </div>
      </div>

      {/* Decorative line */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-[80%] max-w-3xl h-px bg-gradient-to-r from-transparent via-black/[0.04] to-transparent" />
    </div>
  );
}
