"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface SlideProps {
  active: boolean;
}

const FEATURES = [
  {
    title: "Spektra Resource System",
    subtitle: "FUEL YOUR STRATEGY",
    desc: "Every turn, place one Avatar card from your hand into your Spektra Pile to generate elemental energy. Fire Avatars produce Fire Spektra, Water produces Water. Manage your resource economy — spend Spektra to summon Avatars, cast Spells, and activate Equipment abilities.",
    icon: "◇",
    color: "var(--spektrum-cyan)",
  },
  {
    title: "Avatar Evolution",
    subtitle: "LEVEL UP YOUR FIGHTERS",
    desc: "Level 1 Avatars can evolve into powerful Level 2 forms. Evolution requires matching tribes — a Kobar Level 1 evolves into a Kobar Level 2. But beware: Summoning Sickness prevents evolution on the same turn an Avatar enters play. Time your evolutions carefully.",
    icon: "⬆",
    color: "var(--spektrum-magenta)",
  },
  {
    title: "Life Card System",
    subtitle: "FOUR CHANCES TO SURVIVE",
    desc: "Each player begins with 4 Life Cards drawn face-down from their deck. When your Active Avatar is defeated, you lose one Life Card — but it goes to your hand, not the graveyard. Lose all 4 Life Cards or have your Active Avatar fall with no Reserves, and the match is over.",
    icon: "♡",
    color: "var(--spektrum-gold)",
  },
];

export default function GameplaySlide({ active }: SlideProps) {
  const [activeFeat, setActiveFeat] = useState(0);

  return (
    <div className="w-full h-full relative overflow-hidden">
      <div className="absolute inset-0 bg-black" />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Section header */}
      {active && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="absolute top-6 left-6 z-10"
        >
          <div className="flex items-start gap-2">
            <div className="w-[3px] h-16 bg-gradient-to-b from-[var(--spektrum-gold)] to-transparent mt-1" />
            <div>
              <span className="text-[9px] font-mono tracking-[0.4em] uppercase text-[var(--spektrum-gold)]/60 block mb-1">
                Mechanics
              </span>
              <h2 className="font-[family-name:var(--font-display)] font-black text-xl md:text-2xl tracking-[0.1em] uppercase text-white">
                Gameplay
              </h2>
            </div>
          </div>
        </motion.div>
      )}

      {/* Two-column layout */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left: feature tabs */}
          {active && (
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col gap-1"
            >
              {FEATURES.map((feat, i) => (
                <button
                  key={feat.title}
                  onClick={() => setActiveFeat(i)}
                  className={`text-left p-5 border-l-[2px] transition-all duration-400 ${
                    activeFeat === i
                      ? "border-l-[var(--spektrum-cyan)] bg-white/[0.02]"
                      : "border-l-transparent hover:bg-white/[0.01]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-2xl transition-opacity duration-300 ${
                        activeFeat === i ? "opacity-60" : "opacity-15"
                      }`}
                      style={{ color: feat.color }}
                    >
                      {feat.icon}
                    </span>
                    <div>
                      <span
                        className="text-[8px] font-mono tracking-[0.4em] uppercase block mb-0.5 transition-colors"
                        style={{
                          color:
                            activeFeat === i
                              ? feat.color
                              : "rgba(255,255,255,0.25)",
                        }}
                      >
                        {feat.subtitle}
                      </span>
                      <h3
                        className={`font-[family-name:var(--font-display)] font-bold text-sm tracking-wider uppercase transition-colors ${
                          activeFeat === i ? "text-white" : "text-white/30"
                        }`}
                      >
                        {feat.title}
                      </h3>
                    </div>
                  </div>
                </button>
              ))}
            </motion.div>
          )}

          {/* Right: detail */}
          {active && (
            <motion.div
              key={activeFeat}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Visual box */}
              <div className="relative aspect-[16/10] border border-white/5 overflow-hidden mb-6">
                <div className="absolute inset-0 bg-[var(--spektrum-deep)]" />
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    background: `radial-gradient(circle, ${FEATURES[activeFeat].color}08 0%, transparent 60%)`,
                  }}
                >
                  <span
                    className="text-[100px] md:text-[140px] opacity-[0.06] animate-float"
                    style={{ color: FEATURES[activeFeat].color }}
                  >
                    {FEATURES[activeFeat].icon}
                  </span>
                </div>
                <div className="absolute inset-0 scanlines opacity-20" />
                {/* Corner brackets */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-white/8" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-white/8" />
                {/* Label */}
                <div className="absolute bottom-3 left-3">
                  <span
                    className="text-[8px] font-mono tracking-[0.3em] uppercase px-2 py-0.5 border bg-black/50"
                    style={{
                      color: FEATURES[activeFeat].color,
                      borderColor: `${FEATURES[activeFeat].color}25`,
                    }}
                  >
                    {FEATURES[activeFeat].subtitle}
                  </span>
                </div>
              </div>

              <h3 className="font-[family-name:var(--font-display)] font-bold text-xl md:text-2xl tracking-wider uppercase text-white mb-3">
                {FEATURES[activeFeat].title}
              </h3>
              <p className="text-white/35 text-sm leading-relaxed">
                {FEATURES[activeFeat].desc}
              </p>
              <div
                className="mt-6 h-px w-16"
                style={{
                  background: `linear-gradient(90deg, ${FEATURES[activeFeat].color}, transparent)`,
                }}
              />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
