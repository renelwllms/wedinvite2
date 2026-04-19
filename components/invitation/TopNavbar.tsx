"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

import { cn } from "@/lib/helpers";

type TopNavbarProps = {
  coupleLabel: string;
  labels: {
    invitationLabel: string;
    home: string;
    story: string;
    date: string;
    memories: string;
    rsvp: string;
    openMenu: string;
    closeMenu: string;
  };
};

export function TopNavbar({ coupleLabel, labels }: TopNavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = [
    { href: "#home", label: labels.home },
    { href: "#story", label: labels.story },
    { href: "#date", label: labels.date },
    { href: "#gallery", label: labels.memories },
    { href: "#rsvp", label: labels.rsvp }
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [scrolled]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-6">
        <div
          className={cn(
            "mx-auto flex max-w-6xl items-center justify-between rounded-full border px-4 py-3 transition-all duration-300 sm:px-6",
            scrolled
              ? "border-white/50 bg-[#f7f0e8]/88 shadow-panel backdrop-blur-xl"
              : "border-white/25 bg-white/35 backdrop-blur-md"
          )}
        >
          <a href="#home" className="min-w-0">
            <p className="truncate font-display text-xl font-semibold tracking-[0.02em] text-cocoa sm:text-2xl">
              {coupleLabel}
            </p>
            <p className="mt-0.5 text-[0.62rem] uppercase tracking-[0.34em] text-taupe/65 sm:text-[0.68rem]">
              {labels.invitationLabel}
            </p>
          </a>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="rounded-full px-4 py-2 text-xs uppercase tracking-[0.25em] text-taupe/80 transition hover:bg-white/50 hover:text-cocoa"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            aria-label={menuOpen ? labels.closeMenu : labels.openMenu}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((current) => !current)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-white/45 text-cocoa md:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-4 top-20 z-30 rounded-[1.75rem] border border-white/40 bg-[#fbf6f0]/95 p-4 shadow-soft backdrop-blur-xl md:hidden"
          >
            <nav aria-label="Mobile primary">
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="block rounded-2xl px-4 py-3 text-sm uppercase tracking-[0.26em] text-cocoa transition hover:bg-white/70"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
