"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useCallback, useRef } from "react";

interface SlideProps {
  active: boolean;
  onDetailToggle?: (open: boolean) => void;
}

const CHARACTERS = [
  {
    name: "Radja",
    title: "The Loud Brawler",
    tribe: "Kobar",
    element: "Fire",
    color: "#f59e0b",
    bgColor: "#d97706",
    image: "/character-stocks/radja/15.png",
    faction: "Burning Fury",
    skills: ["attack", "defense", "special", "passive", "ultimate"],
    story:
      "Radja's laughter and battle cries always echo through every fight. To his enemies, it sounds like a taunt; but for Radja, the noise is his way of drowning out the screams of the past that continue to haunt him. Once an ordinary trainee who dreamed of becoming a protector, that dream was shattered in a single bloody night when a KuKu of unnaturally colossal size attacked their camp and devoured his friends. Now, behind every lethal punch and deafening roar, Radja harbors a dark mission: to hunt down the mastermind behind the experiment that created the giant KuKu.",
  },
  {
    name: "Maya",
    title: "The Flow of Vengeance",
    tribe: "Borah",
    element: "Water",
    color: "#00b4d8",
    bgColor: "#0077b6",
    image: "/character-stocks/maya/1.png",
    faction: "Tidal Grace",
    skills: ["attack", "defense", "special", "passive", "ultimate"],
    story:
      "Beneath the neon glow of the urban districts, Maya moves as fluidly as water but strikes with the force of a tidal wave. Armed with a mystic staff and absolute mastery over the water element, she has dedicated her life to being the shadowy protector of the women in her city. Her motivation was born from a bitter tragedy: her closest friend was broken and lost her life after being trapped in The Count's dark illusions. Every lethal swing of her staff in the dark alleys is part of an endless patrol to prevent new victims, while she relentlessly tracks The Count to quench the thirst for revenge.",
  },
  {
    name: "Crimson",
    title: "The Shadow Vigilante",
    tribe: "Kuhaka",
    element: "Fire",
    color: "#ef4444",
    bgColor: "#b91c1c",
    image: "/character-stocks/crimson/11.png",
    faction: "Shadow Edge",
    skills: ["attack", "defense", "special", "passive", "ultimate"],
    story:
      "Isolated from the outside world since childhood, Crimson was forced to swallow a bitter reality when the \"Kobar\" faction ruthlessly slaughtered his peers right before his eyes. Rather than surrendering to despair, he locked himself in a hellish training regimen. His dark dedication and fury drew the attention of an ancient mask that chose him as its host. Crimson now operates from the shadows as a lone vigilante, a double-edged sword with his own strict code of ethics, ready to cut down anyone who sows terror.",
  },
  {
    name: "Count",
    title: "The Dark Aristocrat",
    tribe: "Kujana",
    element: "Neutral",
    color: "#a855f7",
    bgColor: "#7c3aed",
    image: "/character-stocks/count/19.png",
    faction: "Dark Veil",
    skills: ["attack", "defense", "special", "passive", "ultimate"],
    story:
      "For The Count, intellect is a weapon far sharper than any blade. A genius researcher who accidentally discovered the \"Spektra\" particle, his life took a dark turn when an incident forced him to absorb raw, unpurified Spektra into his own body. Hiding behind immense wealth and aristocratic charm, The Count manipulates unfortunate women into becoming living filters for the Spektra, devouring the energy once purified. Behind his elegant smile, he orchestrates a grand design from the shadows — a colossal scheme that will shake the very foundations of the world.",
  },
  {
    name: "Boar Witch",
    title: "The Candlelit Shaman",
    tribe: "Kobar",
    element: "Fire",
    color: "#f97316",
    bgColor: "#c2410c",
    image: "/character-stocks/boar/5.png",
    faction: "Primal Rite",
    skills: ["attack", "defense", "special", "passive", "ultimate"],
    story:
      "To the Boar Witch, traditions and ancestral heritage are not sacred — they are simply tools for power. As the heir to an ancient lineage of shamans, she hijacked her own heritage to embed a Spektra entity within herself. Using mystical melting candles as her primary medium, she channels brutal and unstoppable physical strength into her partner, the Boar Berserker. The Boar Witch cares nothing for morality or the balance of the world; she exploits Spektra purely to amass wealth, power, and personal gain in the underworld.",
  },
];

/* ── Skill icon SVG paths ── */
const SKILL_ICONS = [
  // Attack - sword
  "M12 2L15 8L12 14L9 8L12 2ZM8 10L4 14L8 18L12 14L8 10ZM16 10L12 14L16 18L20 14L16 10Z",
  // Defense - shield
  "M12 2L4 6V12C4 16.4 7.4 20.4 12 22C16.6 20.4 20 16.4 20 12V6L12 2ZM12 4.4L18 7.6V12C18 15.5 15.4 18.8 12 20C8.6 18.8 6 15.5 6 12V7.6L12 4.4Z",
  // Special - star burst
  "M12 2L14.4 8.2L21 9L16.5 13.4L17.8 20L12 16.8L6.2 20L7.5 13.4L3 9L9.6 8.2L12 2Z",
  // Passive - eye
  "M12 4C7 4 2.7 7.1 1 12C2.7 16.9 7 20 12 20C17 20 21.3 16.9 23 12C21.3 7.1 17 4 12 4ZM12 17C9.2 17 7 14.8 7 12C7 9.2 9.2 7 12 7C14.8 7 17 9.2 17 12C17 14.8 14.8 17 12 17ZM12 9C10.3 9 9 10.3 9 12C9 13.7 10.3 15 12 15C13.7 15 15 13.7 15 12C15 10.3 13.7 9 12 9Z",
  // Ultimate - diamond
  "M12 1L22 12L12 23L2 12L12 1ZM12 4.8L5.2 12L12 19.2L18.8 12L12 4.8Z",
];

/* ────────────────────────────────────────────────────────
   Character Detail Overlay
   ──────────────────────────────────────────────────────── */
function CharacterDetail({
  characterIndex,
  onClose,
  onChangeCharacter,
}: {
  characterIndex: number;
  onClose: () => void;
  onChangeCharacter: (i: number) => void;
}) {
  const char = CHARACTERS[characterIndex];

  // Get visible carousel indices (show 3 cards centered on current)
  const getCarouselIndices = (current: number) => {
    const total = CHARACTERS.length;
    const prev = (current - 1 + total) % total;
    const next = (current + 1) % total;
    return [prev, current, next];
  };

  const carouselIndices = getCarouselIndices(characterIndex);

  const goNext = () => {
    onChangeCharacter((characterIndex + 1) % CHARACTERS.length);
  };
  const goPrev = () => {
    onChangeCharacter(
      (characterIndex - 1 + CHARACTERS.length) % CHARACTERS.length
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-[200]"
    >
      {/* ── Dark background with grid pattern ── */}
      <div className="absolute inset-0 bg-[#121220]" />
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* ── Geometric triangle behind character ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={characterIndex}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 pointer-events-none flex items-center justify-center"
        >
          <svg
            viewBox="0 0 400 350"
            className="w-[45vw] max-w-[550px] opacity-20 -translate-y-[5%] -translate-x-[20%]"
          >
            <polygon
              points="200,30 380,320 20,320"
              fill="none"
              stroke={char.color}
              strokeWidth="1.5"
              opacity="0.6"
            />
            <polygon
              points="200,30 380,320 20,320"
              fill={char.color}
              opacity="0.08"
            />
          </svg>
          {/* Glow behind triangle */}
          <div
            className="absolute w-[300px] h-[300px] rounded-full blur-[100px] opacity-20 -translate-x-[20%]"
            style={{ backgroundColor: char.color }}
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Bottom gradient bar ── */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#0a0a14] to-transparent z-[2]" />

      {/* ── Top-left: Faction badge ── */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="absolute top-5 left-6 z-[110] flex items-center gap-3"
      >
        <div className="flex items-center gap-2.5 px-3.5 py-2 border border-white/10 bg-white/[0.03]">
          <svg viewBox="0 0 12 12" className="w-4 h-4 text-white/50">
            <path
              d="M6 1L7.5 4.5L11 5.5L8.5 8L9 11.5L6 9.5L3 11.5L3.5 8L1 5.5L4.5 4.5L6 1Z"
              fill="currentColor"
            />
          </svg>
          <div className="flex flex-col">
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/70 font-semibold leading-tight">
              {char.faction}
            </span>
            <span className="text-[8px] font-mono tracking-[0.15em] uppercase text-white/30 leading-tight">
              {char.tribe}
            </span>
          </div>
        </div>
      </motion.div>

      {/* ── Top-right: Close button ── */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-[110] w-12 h-12 flex items-center justify-center text-white/40 hover:text-white transition-colors cursor-pointer border border-white/10 hover:border-white/25 hover:bg-white/[0.06]"
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
          <path
            d="M18 6L6 18M6 6l12 12"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* ── Left side: Skill icons (desktop only) ── */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-[10] hidden md:flex flex-col gap-2.5"
      >
        {SKILL_ICONS.map((iconPath, i) => (
          <button
            key={i}
            className="group relative w-11 h-11 flex items-center justify-center transition-all duration-300 cursor-pointer"
          >
            {/* Hexagonal background */}
            <svg
              viewBox="0 0 46 52"
              className="absolute inset-0 w-full h-full"
              fill="none"
            >
              <path
                d="M23 1L44 14V38L23 51L2 38V14L23 1Z"
                fill="white"
                fillOpacity={0.04}
                stroke="white"
                strokeOpacity={0.12}
                strokeWidth={1}
                className="group-hover:fill-white/[0.08] group-hover:stroke-white/25 transition-all duration-300"
              />
            </svg>
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-white/40 group-hover:text-white/70 transition-colors relative z-10">
              <path d={iconPath} fill="currentColor" />
            </svg>
          </button>
        ))}
      </motion.div>

      {/* ── Character image — center-left, full height ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={characterIndex}
          initial={{ opacity: 0, x: -30, scale: 0.97 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 30, scale: 0.97 }}
          transition={{ duration: 0.45 }}
          className="absolute inset-0 z-[3] pointer-events-none"
        >
          {/* Desktop: positioned left */}
          <div className="hidden md:block absolute inset-0 -left-[10%]">
            <Image
              src={char.image}
              alt={char.name}
              fill
              className="object-contain object-bottom"
              style={{ objectPosition: "25% bottom" }}
              sizes="70vw"
              priority
            />
          </div>
          {/* Mobile: centered */}
          <div className="md:hidden absolute top-0 left-0 right-0 h-[50vh]">
            <Image
              src={char.image}
              alt={char.name}
              fill
              className="object-contain object-bottom"
              sizes="100vw"
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#121220] to-transparent" />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── Right side: Title, Name, Story ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={characterIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="absolute z-[10] right-6 md:right-[8%] lg:right-[10%] top-[52vh] md:top-1/2 md:-translate-y-1/2 text-left md:text-right max-w-[320px] md:max-w-[340px]"
        >
          {/* Title label */}
          <span
            className="text-[10px] font-mono tracking-[0.4em] uppercase block mb-2"
            style={{ color: char.color }}
          >
            {char.title}
          </span>

          {/* Name */}
          <h2 className="font-[family-name:var(--font-display)] font-black text-3xl md:text-4xl lg:text-5xl tracking-[0.08em] uppercase text-white leading-none">
            {char.name}
          </h2>

          {/* Story */}
          <p className="text-white/70 text-xs md:text-sm leading-relaxed mt-4">
            {char.story}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* ── Bottom center: Character carousel (3 cards) ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="absolute bottom-5 md:bottom-6 right-6 md:right-[6%] z-[10] flex items-center gap-3"
      >
        {/* Prev arrow */}
        <button
          onClick={goPrev}
          className="w-8 h-8 flex items-center justify-center border border-white/10 hover:border-white/25 hover:bg-white/[0.06] transition-all duration-300 cursor-pointer"
        >
          <svg viewBox="0 0 8 14" fill="none" className="w-2.5 h-3.5 text-white/40">
            <path d="M7 1L1 7L7 13" stroke="currentColor" strokeWidth={1.5} />
          </svg>
        </button>

        {/* 3 character cards */}
        <div className="flex items-center gap-2">
          {carouselIndices.map((idx) => {
            const c = CHARACTERS[idx];
            const isSelected = idx === characterIndex;
            return (
              <button
                key={`${c.name}-${idx}`}
                onClick={() => onChangeCharacter(idx)}
                className={`relative overflow-hidden cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? "w-16 h-20 md:w-20 md:h-24 opacity-100"
                    : "w-14 h-18 md:w-16 md:h-20 opacity-50 grayscale hover:opacity-70 hover:grayscale-0"
                }`}
              >
                {isSelected && (
                  <div
                    className="absolute inset-0 z-10 pointer-events-none"
                    style={{ boxShadow: `inset 0 0 0 2px ${c.color}` }}
                  />
                )}
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  className="object-cover object-top"
                  sizes="100px"
                />
                {/* Dark overlay for unselected */}
                {!isSelected && (
                  <div className="absolute inset-0 bg-black/30" />
                )}
              </button>
            );
          })}
        </div>

        {/* Next arrow */}
        <button
          onClick={goNext}
          className="w-8 h-8 flex items-center justify-center border border-white/10 hover:border-white/25 hover:bg-white/[0.06] transition-all duration-300 cursor-pointer"
        >
          <svg viewBox="0 0 8 14" fill="none" className="w-2.5 h-3.5 text-white/40">
            <path d="M1 1L7 7L1 13" stroke="currentColor" strokeWidth={1.5} />
          </svg>
        </button>
      </motion.div>
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────
   Character Slide (main)
   ──────────────────────────────────────────────────────── */
export default function CharacterSlide({ active, onDetailToggle }: SlideProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [detailOpen, setDetailOpen] = useState(false);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const toggleDetail = useCallback(
    (open: boolean) => {
      setDetailOpen(open);
      onDetailToggle?.(open);
    },
    [onDetailToggle]
  );
  const goNext = useCallback(() => {
    setActiveIndex((p) => (p + 1) % CHARACTERS.length);
  }, []);
  const goPrev = useCallback(() => {
    setActiveIndex((p) => (p - 1 + CHARACTERS.length) % CHARACTERS.length);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) goNext();
      else goPrev();
    }
  }, [goNext, goPrev]);

  const current = CHARACTERS[activeIndex];

  return (
    <div
      className="w-full h-full relative overflow-hidden select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
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
          className="absolute top-14 left-6 md:top-6 z-10"
        >
          <div className="flex items-start gap-2">
            <div className="w-[3px] h-16 bg-gradient-to-b from-[#E8541E] to-transparent mt-1" />
            <div>
              <span className="text-[9px] font-mono tracking-[0.4em] uppercase text-[#E8541E]/60 block mb-1">
                Roster
              </span>
              <h2 className="font-[family-name:var(--font-display)] font-black text-xl md:text-2xl tracking-[0.1em]  text-foreground">
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
                maskImage:
                  "radial-gradient(ellipse 75% 85% at 35% 50%, black 30%, transparent 70%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 75% 85% at 35% 50%, black 30%, transparent 70%)",
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

      {/* ── Left: Character info + View Details button ── */}
      {active && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="absolute bottom-20 md:bottom-16 left-1/2 -translate-x-1/2 md:left-10 md:translate-x-0 z-[3] text-center md:text-left"
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

              {/* View Details button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDetail(true);
                }}
                className="mt-4 inline-flex items-center gap-2 px-5 py-2 text-[10px] font-mono tracking-[0.25em] uppercase border transition-all duration-300 pointer-events-auto group"
                style={{
                  borderColor: `${current.color}40`,
                  color: current.color,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = current.color;
                  e.currentTarget.style.backgroundColor = `${current.color}15`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${current.color}40`;
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                View Details
                <svg
                  viewBox="0 0 12 12"
                  fill="none"
                  className="w-3 h-3 transition-transform group-hover:translate-x-0.5"
                >
                  <path
                    d="M4.5 2.5L8 6L4.5 9.5"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ── Right: Character panels carousel (desktop only) ── */}
      {active && (
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="absolute right-4 md:right-8 lg:right-12 top-1/2 -translate-y-1/2 z-[4] hidden md:flex items-end gap-2 md:gap-3"
        >
          {/* Prev arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="w-8 h-8 flex items-center justify-center border border-black/[0.08] dark:border-white/[0.08] hover:border-[var(--spektrum-cyan)]/40 hover:bg-white/50 dark:hover:bg-white/[0.06] transition-all duration-300 mb-4 shrink-0"
          >
            <svg
              viewBox="0 0 8 14"
              fill="none"
              className="w-2.5 h-3.5 text-foreground/40"
            >
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
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveIndex(i);
                  }}
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
                      isActive
                        ? "opacity-100 scale-105"
                        : "opacity-40 group-hover:opacity-60 grayscale group-hover:grayscale-0"
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

                  {/* Character name + View Details on active */}
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <span
                      className={`font-[family-name:var(--font-display)] font-bold uppercase tracking-wider block transition-all duration-300 ${
                        isActive
                          ? "text-sm text-white"
                          : "text-[9px] text-white/60 group-hover:text-white/80"
                      }`}
                    >
                      {char.name}
                    </span>
                    {isActive && (
                      <>
                        <motion.span
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.15 }}
                          className="text-[8px] font-mono tracking-[0.3em] uppercase text-white/50 block mt-1"
                        >
                          {char.tribe}
                        </motion.span>
                        <motion.button
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.25 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleDetail(true);
                          }}
                          className="mt-2 flex items-center gap-1.5 text-[8px] font-mono tracking-[0.2em] uppercase text-white/60 hover:text-white transition-colors"
                        >
                          View Details
                          <svg
                            viewBox="0 0 8 8"
                            fill="none"
                            className="w-2 h-2"
                          >
                            <path
                              d="M2.5 1L5.5 4L2.5 7"
                              stroke="currentColor"
                              strokeWidth={1.2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </motion.button>
                      </>
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
                    <svg
                      viewBox="0 0 12 12"
                      className="w-3 h-3 text-white/50"
                    >
                      <path
                        d="M6 1L7.5 4.5L11 5.5L8.5 8L9 11.5L6 9.5L3 11.5L3.5 8L1 5.5L4.5 4.5L6 1Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Next arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="w-8 h-8 flex items-center justify-center border border-black/[0.08] dark:border-white/[0.08] hover:border-[var(--spektrum-cyan)]/40 hover:bg-white/50 dark:hover:bg-white/[0.06] transition-all duration-300 mb-4 shrink-0"
          >
            <svg
              viewBox="0 0 8 14"
              fill="none"
              className="w-2.5 h-3.5 text-foreground/40"
            >
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
              className="absolute inset-0 top-[15%]"
            >
              <Image
                src={current.image}
                alt={current.name}
                fill
                className="object-cover object-top"
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

      {/* ── Character Detail Overlay ── */}
      <AnimatePresence>
        {detailOpen && (
          <CharacterDetail
            characterIndex={activeIndex}
            onClose={() => toggleDetail(false)}
            onChangeCharacter={(i) => {
              setActiveIndex(i);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
