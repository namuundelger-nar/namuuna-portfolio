import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Noto_Serif, Plus_Jakarta_Sans, Playfair_Display, Work_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { prisma } from "@/lib/prisma";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Namuuna | Portfolio",
  description: "Data Governance, AI Validation & Financial Analysis Specialist",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let designConfig;
  try {
    designConfig = await prisma.designConfig.findFirst();
  } catch (e) {
    // Handle build-time missing tables
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet" />
      </head>
      {designConfig && (
        <head>
          <style>{`
            :root, .dark {
              --background: ${designConfig.backgroundColor};
              --foreground: ${designConfig.textColor};
              --primary: ${designConfig.primaryColor};
              --radius-sm: ${designConfig.borderRadius};
              --radius-md: ${designConfig.borderRadius};
              --radius-lg: ${designConfig.borderRadius};
              --radius-xl: ${designConfig.borderRadius};
              --radius-2xl: ${designConfig.borderRadius};
              --radius-3xl: ${designConfig.borderRadius};
              --radius-full: ${designConfig.borderRadius};
            }
          `}</style>
        </head>
      )}
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${notoSerif.variable} ${plusJakartaSans.variable} ${playfairDisplay.variable} ${workSans.variable} font-sans antialiased bg-background text-foreground transition-colors duration-300`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
