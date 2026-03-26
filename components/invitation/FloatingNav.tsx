"use client";

import { Gift, Heart, ImageIcon, PartyPopper, Users } from "lucide-react";

import { cn } from "@/lib/helpers";

type FloatingNavProps = {
  activeSection: string;
};

const items = [
  { href: "#home", label: "Home", icon: Heart },
  { href: "#couple", label: "Couple", icon: Users },
  { href: "#events", label: "Events", icon: PartyPopper },
  { href: "#gallery", label: "Gallery", icon: ImageIcon },
  { href: "#rsvp", label: "RSVP", icon: Users },
  { href: "#gift", label: "Gift", icon: Gift }
];

export function FloatingNav({ activeSection }: FloatingNavProps) {
  return (
    <nav
      aria-label="Invitation sections"
      className="fixed inset-x-4 bottom-4 z-40 rounded-full border border-white/40 bg-white/75 p-2 shadow-soft backdrop-blur md:left-1/2 md:right-auto md:w-auto md:-translate-x-1/2"
    >
      <ul className="flex items-center justify-between gap-1 sm:gap-2">
        {items.map((item) => {
          const Icon = item.icon;
          const active = activeSection === item.href.slice(1);

          return (
            <li key={item.href}>
              <a
                href={item.href}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium uppercase tracking-[0.2em] text-cocoa/65 transition sm:px-4",
                  active && "bg-cocoa text-white"
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
