"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface SlideProps {
  active: boolean;
}

export default function HeroSlide({ active }: SlideProps) {
  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#030318] via-[#0a0a2e] to-[#050510]" />

        {/* Prismatic light orbs */}
        <div className="absolute top-[20%] left-[30%] w-[500px] h-[500px] bg-[var(--spektrum-cyan)] rounded-full blur-[250px] opacity-[0.08]" />
        <div className="absolute bottom-[20%] right-[25%] w-[400px] h-[400px] bg-[var(--spektrum-magenta)] rounded-full blur-[200px] opacity-[0.06]" />
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[var(--spektrum-purple)] rounded-full blur-[200px] opacity-[0.05]" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,229,255,0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,229,255,0.4) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#000_90%)]" />
      </div>

      {/* Central content — like Etheria's centered logo + title */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
        {active && (
          <>
            {/* Brand logo image */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="relative w-[280px] h-[140px] sm:w-[380px] sm:h-[190px] md:w-[480px] md:h-[240px] lg:w-[560px] lg:h-[280px]"
            >
              <Image
                src="/ui/logo.png"
                alt="Spektrum Trading Card Game"
                fill
                className="object-contain brightness-0 invert drop-shadow-[0_0_40px_rgba(0,229,255,0.15)]"
                priority
              />
            </motion.div>

            {/* Tagline — like Etheria's "REBORN TO FIGHT" */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="mt-2"
            >
              <h2 className="font-[family-name:var(--font-display)] font-bold text-lg sm:text-xl md:text-2xl tracking-[0.25em] uppercase">
                <span className="text-white">BEND</span>
                <span className="text-[var(--spektrum-magenta)] mx-1">THE</span>
                <span className="text-white">LIGHT</span>
              </h2>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="mt-3 text-[11px] md:text-xs tracking-[0.3em] uppercase text-white/40 font-medium"
            >
              Collect &bull; Strategize &bull; Battle
            </motion.p>

            {/* Corner bracket decoration around the title block */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1.3 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[220px] md:w-[520px] md:h-[320px] pointer-events-none"
            >
              {/* Top-left */}
              <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-white/10" />
              {/* Top-right */}
              <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-white/10" />
              {/* Bottom-left */}
              <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-white/10" />
              {/* Bottom-right */}
              <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-white/10" />

              {/* Animated border trace */}
              <div className="absolute top-0 left-5 right-5 h-px overflow-hidden">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "200%" }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 2 }}
                  className="w-1/3 h-full bg-gradient-to-r from-transparent via-[var(--spektrum-cyan)]/30 to-transparent"
                />
              </div>
              <div className="absolute bottom-0 left-5 right-5 h-px overflow-hidden">
                <motion.div
                  initial={{ x: "200%" }}
                  animate={{ x: "-100%" }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 2 }}
                  className="w-1/3 h-full bg-gradient-to-r from-transparent via-[var(--spektrum-cyan)]/30 to-transparent"
                />
              </div>
            </motion.div>
          </>
        )}
      </div>

      {/* Right side vertical text — like Etheria's side decoration */}
      <div className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 flex-col items-center gap-3 z-10">
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/15" />
        <span className="text-[8px] font-mono tracking-[0.5em] uppercase text-white/15 [writing-mode:vertical-lr] rotate-180">
          Trading Card Game
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-white/15 to-transparent" />
      </div>
    </div>
  );
}
