import type { Metadata } from "next";
import { Fraunces, Albert_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { WeatherProvider } from "@/components/weather/WeatherProvider";
import { WeatherDock } from "@/components/weather/WeatherDock";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
});

const albertSans = Albert_Sans({
  variable: "--font-albert",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Namuundelger Narmandakh — Portfolio",
  description: "Data Governance, AI Validation & Financial Analysis Specialist",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-weather="clear" suppressHydrationWarning>
      <body
        className={`${fraunces.variable} ${albertSans.variable} ${jetbrainsMono.variable} font-sans antialiased min-h-screen`}
      >
        <WeatherProvider>
          {children}
          <WeatherDock />
        </WeatherProvider>
      </body>
    </html>
  );
}
