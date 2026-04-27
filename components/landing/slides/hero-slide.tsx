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
        <div className="absolute inset-0 bg-gradient-to-b from-[#f9f7f2] via-[#f5f2ec] to-[#efe9df] dark:from-[#0a0a16] dark:via-[#0d0d1a] dark:to-[#111125]" />

        {/* Prismatic light orbs — soft watercolor washes */}
        <div className="absolute top-[20%] left-[30%] w-[500px] h-[500px] bg-[var(--spektrum-cyan)] rounded-full blur-[250px] opacity-[0.08]" />
        <div className="absolute bottom-[20%] right-[25%] w-[400px] h-[400px] bg-[var(--spektrum-magenta)] rounded-full blur-[200px] opacity-[0.06]" />
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[var(--spektrum-purple)] rounded-full blur-[200px] opacity-[0.05]" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.15) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Soft vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(245,242,236,0.7)_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(13,13,26,0.8)_100%)]" />
      </div>

      {/* Full-page character background */}
      {active && (
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.3 }}
          className="absolute inset-0 z-[1] pointer-events-none"
        >
          <Image
            src="/character-stocks/1.png"
            alt=""
            fill
            className="object-contain mix-blend-multiply dark:mix-blend-screen opacity-[0.15]"
          />
        </motion.div>
      )}

      {/* Central content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
        {active && (
          <>
            {/* Brand logo */}
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
                className="object-contain drop-shadow-[0_0_60px_rgba(0,145,163,0.12)]"
                priority
              />
            </motion.div>

            {/* One-liner: Collect, Strategize, Battle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="mt-4"
            >
              <h2 className="font-[family-name:var(--font-display)] font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-[0.2em] uppercase">
                <span className="text-[var(--spektrum-cyan)]">Collect</span>
                <span className="text-foreground/25 mx-2 md:mx-3">&bull;</span>
                <span className="text-[var(--spektrum-magenta)]">Strategize</span>
                <span className="text-foreground/25 mx-2 md:mx-3">&bull;</span>
                <span className="text-[var(--spektrum-purple)]">Battle</span>
              </h2>
            </motion.div>

            {/* Play the Game button */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="mt-8"
            >
              <button className="group relative px-8 py-3 md:px-10 md:py-3.5 bg-foreground text-white font-[family-name:var(--font-display)] text-xs md:text-sm tracking-[0.15em] rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(243,163,56,0.4)] cursor-pointer">
                <span className="relative z-10 group-hover:text-foreground transition-colors duration-300">Play the Game</span>
                <div className="absolute inset-0 bg-[#F3A338] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </motion.div>

            {/* Corner bracket decoration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1.3 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[260px] md:w-[520px] md:h-[380px] pointer-events-none"
            >
              <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-foreground/10" />
              <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-foreground/10" />
              <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-foreground/10" />
              <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-foreground/10" />

              {/* Animated border trace */}
              <div className="absolute top-0 left-5 right-5 h-px overflow-hidden">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "200%" }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 2 }}
                  className="w-1/3 h-full bg-gradient-to-r from-transparent via-[var(--spektrum-cyan)]/25 to-transparent"
                />
              </div>
              <div className="absolute bottom-0 left-5 right-5 h-px overflow-hidden">
                <motion.div
                  initial={{ x: "200%" }}
                  animate={{ x: "-100%" }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 2 }}
                  className="w-1/3 h-full bg-gradient-to-r from-transparent via-[var(--spektrum-cyan)]/25 to-transparent"
                />
              </div>
            </motion.div>
          </>
        )}
      </div>

      {/* Right side vertical text */}
      <div className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 flex-col items-center gap-3 z-10">
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-foreground/10" />
        <span className="text-[8px] font-mono tracking-[0.5em] uppercase text-foreground/15 [writing-mode:vertical-lr] rotate-180">
          Trading Card Game
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-foreground/10 to-transparent" />
      </div>
    </div>
  );
}
