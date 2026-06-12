import Link from "next/link"
import { ThemeToggle } from "@/components/ThemeToggle"
import { Settings } from "lucide-react"

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-cloud-padding py-4">
      <div className="bg-white/70 dark:bg-surface-container/70 backdrop-blur-xl border border-white/40 dark:border-outline-variant/20 shadow-[0_8px_32px_rgba(144,202,249,0.15)] rounded-full mt-margin-mobile md:mt-margin-desktop mx-auto max-w-container-max flex justify-between items-center w-full px-6 py-3">
        <div className="font-headline-sm text-headline-sm font-bold text-primary dark:text-primary-fixed-dim">
          <Link href="/">Namuundelger</Link>
        </div>
        <div className="hidden md:flex gap-8 items-center font-body-md text-body-md">
          <Link className="text-primary dark:text-primary-fixed-dim font-bold pb-1 cursor-pointer hover:text-opacity-80 active:scale-95 transition-all" href="/">Portfolio</Link>
          <Link className="text-primary dark:text-primary-fixed-dim font-bold pb-1 cursor-pointer hover:text-opacity-80 active:scale-95 transition-all" href="/projects">Projects</Link>
          <Link className="text-primary dark:text-primary-fixed-dim font-bold pb-1 cursor-pointer hover:text-opacity-80 active:scale-95 transition-all" href="/cv">CV</Link>
          <Link className="text-secondary dark:text-secondary-fixed-dim hover:text-primary transition-colors cursor-pointer active:scale-95 transition-all" href="/blog">Insights</Link>
          <Link className="text-secondary dark:text-secondary-fixed-dim hover:text-primary transition-colors cursor-pointer active:scale-95 transition-all" href="/python">Python</Link>
          <Link className="text-secondary dark:text-secondary-fixed-dim hover:text-primary transition-colors cursor-pointer active:scale-95 transition-all" href="/services">Services</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="#contact" className="hidden md:block bg-gradient-to-r from-primary-container to-primary text-on-primary font-label-md text-label-md px-6 py-2 rounded-full hover:scale-105 transition-transform duration-300 cursor-pointer shadow-md">
            Hire Me
          </Link>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Link href="/admin" aria-label="Admin Portal" className="p-2 text-primary hover:text-on-surface transition-colors rounded-full hover:bg-accent flex items-center gap-1">
              <Settings className="h-4 w-4" />
              <span className="text-sm font-medium hidden lg:inline">Admin Login</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
