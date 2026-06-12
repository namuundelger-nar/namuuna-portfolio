import type { Metadata } from "next";
// Self-hosted fonts & icons (npm packages) — identical on every machine,
// no network needed at build time, unlike next/font/google or CDN links.
import "@fontsource-variable/fraunces/full.css";
import "@fontsource-variable/fraunces/full-italic.css";
import "@fontsource-variable/albert-sans/index.css";
import "@fontsource-variable/albert-sans/wght-italic.css";
import "@fontsource-variable/jetbrains-mono/index.css";
import "material-symbols/outlined.css";
import "./globals.css";
import { prisma } from "@/lib/prisma";
import { WeatherProvider } from "@/components/weather/WeatherProvider";
import { WeatherDock } from "@/components/weather/WeatherDock";

export const metadata: Metadata = {
  title: "Namuundelger Narmandakh — Portfolio",
  description: "Data Governance, AI Validation & Financial Analysis Specialist",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let designConfig = null;
  try {
    designConfig = await prisma.designConfig.findFirst();
  } catch {
    // Missing table at build time — fall back to stylesheet defaults.
  }

  return (
    <html lang="en" data-weather="clear" suppressHydrationWarning>
      {designConfig && (
        <head>
          {/* Author's design preset: re-skins the base (Clear) theme only.
              Weather moods keep their own palettes. html[data-weather]
              outranks the stylesheet's :root/[data-weather] selectors. */}
          <style>{`
            html[data-weather="clear"] {
              --glacier: ${designConfig.primaryColor};
              --paper: ${designConfig.backgroundColor};
              --ink: ${designConfig.textColor};
              --sky: linear-gradient(180deg, color-mix(in srgb, ${designConfig.primaryColor} 8%, ${designConfig.backgroundColor}) 0%, ${designConfig.backgroundColor} 60%);
            }
          `}</style>
        </head>
      )}
      <body className="font-sans antialiased min-h-screen">
        <WeatherProvider>
          {children}
          <WeatherDock />
        </WeatherProvider>
      </body>
    </html>
  );
}
