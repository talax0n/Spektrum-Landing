import type { Metadata } from "next";
import { Zen_Dots, Noto_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const zenDots = Zen_Dots({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
});

const notoSans = Noto_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Spektrum TCG - Trading Card Game",
  description:
    "Enter the Spektrum. A next-generation trading card game where light bends, strategies collide, and every card tells a story.",
  keywords:
    "Spektrum, TCG, Trading Card Game, Card Game, Strategy, Collectible Cards",
  openGraph: {
    title: "Spektrum TCG",
    description:
      "Enter the Spektrum. A next-generation trading card game.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${zenDots.variable} ${notoSans.variable} ${jetbrains.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="dark")document.documentElement.classList.add("dark")}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground overflow-x-hidden transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
