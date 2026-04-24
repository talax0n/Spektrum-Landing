"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface SlideProps {
  active: boolean;
}

const CARDS = [
  {
    name: "WITCH TRAINEE",
    type: "FIRE",
    rarity: "COMMON",
    power: "2/6",
    desc: "A Kujana apprentice learning the dark arts. Her Doomflare skill deals 2 fire damage to the opponent's Active Avatar.",
    color: "#ff4444",
    icon: "🔥",
  },
  {
    name: "THE COUNT",
    type: "WATER",
    rarity: "RARE",
    power: "5/8",
    desc: "An evolved Level 2 Water Avatar. The Count commands the deep seas, healing allies and controlling the battlefield with tidal forces.",
    color: "#00b4d8",
    icon: "🌊",
  },
  {
    name: "BANASPATI",
    type: "FIRE",
    rarity: "RARE",
    power: "6/7",
    desc: "An evolved Level 2 Fire Avatar. Banaspati channels volcanic fury, dealing devastating AoE burn damage to all enemy Avatars.",
    color: "#ff6b35",
    icon: "🌋",
  },
  {
    name: "ENERGY DAGGER",
    type: "NEUTRAL",
    rarity: "UNCOMMON",
    power: "EQP",
    desc: "A versatile Equipment card. Deals +1 bonus damage for each extra Spektra energy spent beyond its base cost. Fits any deck.",
    color: "#a0a0a0",
    icon: "⚔",
  },
  {
    name: "SACRED BOX",
    type: "NEUTRAL",
    rarity: "RARE",
    power: "EQP",
    desc: "Kobar & Borah exclusive Equipment. Removes 1 battle damage counter from the equipped Avatar after each attack. Ultimate protection.",
    color: "#ffd700",
    icon: "🛡",
  },
];

export default function CardsSlide({ active }: SlideProps) {
  const [activeCard, setActiveCard] = useState(2);

  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--spektrum-deep)]" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[250px] opacity-[0.06] transition-colors duration-700"
        style={{ backgroundColor: CARDS[activeCard].color }}
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
            <div className="w-[3px] h-16 bg-gradient-to-b from-[var(--spektrum-magenta)] to-transparent mt-1" />
            <div>
              <span className="text-[9px] font-mono tracking-[0.4em] uppercase text-[var(--spektrum-magenta)]/60 block mb-1">
                Collection
              </span>
              <h2 className="font-[family-name:var(--font-display)] font-black text-xl md:text-2xl tracking-[0.1em] uppercase text-white">
                Card Archive
              </h2>
            </div>
          </div>
        </motion.div>
      )}

      {/* Cards row - centered */}
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="flex gap-3 md:gap-4 overflow-x-auto max-w-full pb-4 px-2 snap-x">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.name}
              initial={active ? { opacity: 0, y: 40 } : {}}
              animate={active ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              onClick={() => setActiveCard(i)}
              className={`snap-center flex-shrink-0 cursor-pointer transition-all duration-500 ${
                activeCard === i ? "scale-105 z-10" : "scale-100 opacity-60 hover:opacity-80"
              }`}
            >
              <div
                className="relative w-[180px] h-[270px] md:w-[200px] md:h-[300px] border overflow-hidden bg-[var(--spektrum-deep)]"
                style={{
                  borderColor:
                    activeCard === i
                      ? `${card.color}40`
                      : "rgba(255,255,255,0.05)",
                  boxShadow:
                    activeCard === i
                      ? `0 0 40px ${card.color}15, 0 20px 50px rgba(0,0,0,0.5)`
                      : "none",
                }}
              >
                {/* Card inner glow */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    background: `radial-gradient(circle at 50% 30%, ${card.color} 0%, transparent 70%)`,
                  }}
                />

                {activeCard === i && (
                  <div className="absolute inset-0 holo-card opacity-20" />
                )}

                <div className="absolute inset-0 scanlines opacity-40" />

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col p-4">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span
                        className="text-[7px] font-mono tracking-[0.4em] uppercase"
                        style={{ color: card.color }}
                      >
                        {card.type}
                      </span>
                      <h3 className="font-[family-name:var(--font-display)] font-bold text-[11px] tracking-wider uppercase text-white mt-0.5">
                        {card.name}
                      </h3>
                    </div>
                    <span
                      className="text-xl opacity-30"
                      style={{ color: card.color }}
                    >
                      {card.icon}
                    </span>
                  </div>

                  {/* Art area */}
                  <div className="flex-1 border border-white/5 mb-3 flex items-center justify-center relative overflow-hidden">
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `radial-gradient(circle, ${card.color}10 0%, transparent 70%)`,
                      }}
                    />
                    <span
                      className="text-4xl opacity-15"
                      style={{ color: card.color }}
                    >
                      {card.icon}
                    </span>
                  </div>

                  {/* Footer */}
                  <div className="flex justify-between items-center mt-auto">
                    <span
                      className="text-[7px] font-mono tracking-[0.2em] uppercase px-1.5 py-0.5 border"
                      style={{
                        color: card.color,
                        borderColor: `${card.color}25`,
                      }}
                    >
                      {card.rarity}
                    </span>
                    <span className="font-[family-name:var(--font-display)] font-bold text-[11px] text-white/50">
                      {card.power}
                      <span className="text-[7px] text-white/25 ml-0.5">
                        {card.power.includes("/") ? "ATK/HP" : ""}
                      </span>
                    </span>
                  </div>
                </div>

                {/* Top edge glow */}
                {activeCard === i && (
                  <div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${card.color}80, transparent)`,
                    }}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Active card info below */}
      {active && (
        <motion.div
          key={activeCard}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center max-w-lg px-6 z-10"
        >
          <p className="text-white/30 text-xs leading-relaxed">
            {CARDS[activeCard].desc}
          </p>
          <div className="mt-3 flex items-center justify-center gap-4 text-[9px] font-mono tracking-[0.2em] uppercase text-white/20">
            <span>{CARDS[activeCard].type}</span>
            <span className="w-1 h-1 bg-white/10 rounded-full" />
            <span>{CARDS[activeCard].rarity}</span>
          </div>
        </motion.div>
      )}

      {/* Navigation arrows like Etheria's character carousel */}
      <button
        onClick={() => setActiveCard(Math.max(0, activeCard - 1))}
        className="absolute left-6 top-1/2 -translate-y-1/2 w-8 h-10 flex items-center justify-center text-white/20 hover:text-white/50 transition-colors z-10"
      >
        <svg viewBox="0 0 8 14" fill="none" className="w-3 h-5">
          <path d="M7 1L1 7L7 13" stroke="currentColor" strokeWidth={1.5} />
        </svg>
      </button>
      <button
        onClick={() =>
          setActiveCard(Math.min(CARDS.length - 1, activeCard + 1))
        }
        className="absolute right-6 top-1/2 -translate-y-1/2 w-8 h-10 flex items-center justify-center text-white/20 hover:text-white/50 transition-colors z-10"
      >
        <svg viewBox="0 0 8 14" fill="none" className="w-3 h-5">
          <path d="M1 1L7 7L1 13" stroke="currentColor" strokeWidth={1.5} />
        </svg>
      </button>
    </div>
  );
}
