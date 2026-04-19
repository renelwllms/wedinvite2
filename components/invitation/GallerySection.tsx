"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";

import type { InvitationData } from "@/data/invitation";
import { AnimatedReveal } from "@/components/invitation/AnimatedReveal";
import { SectionContainer } from "@/components/invitation/SectionContainer";

function getPolaroidClass(index: number) {
  const rotations = [
    "rotate-[-5deg]",
    "rotate-[4deg]",
    "rotate-[-3deg]",
    "rotate-[5deg]",
    "rotate-[-4deg]",
    "rotate-[3deg]"
  ];

  return rotations[index % rotations.length];
}

export function GallerySection({ data }: { data: InvitationData }) {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  return (
    <SectionContainer
      id="gallery"
      eyebrow="Moments"
      title="Memories"
      description="A soft collection of frames from the season that brought us to this promise."
    >
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {data.gallery.map((image, index) => (
          <AnimatedReveal key={image} delay={index * 0.05} className={index % 3 === 1 ? "lg:translate-y-10" : ""}>
            <motion.button
              type="button"
              whileHover={{ y: -6, rotate: 0, scale: 1.015 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className={`polaroid-card polaroid-tape group relative w-full p-4 pb-6 text-left ${getPolaroidClass(index)}`}
              onClick={() => setActiveImage(image)}
              aria-label="Open gallery image"
            >
              <div className="overflow-hidden rounded-[1.2rem] bg-[#ede2d3]">
                <Image
                  src={image}
                  alt={`Gallery moment ${index + 1}`}
                  width={900}
                  height={1100}
                  loading="lazy"
                  className="aspect-[4/5] h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <div className="px-2 pt-5 text-center">
                <p className="font-display text-2xl italic text-cocoa">Moment {String(index + 1).padStart(2, "0")}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.32em] text-taupe/60">Captured with love</p>
              </div>
            </motion.button>
          </AnimatedReveal>
        ))}
      </div>

      <AnimatePresence>
        {activeImage ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Gallery preview"
          >
            <button
              type="button"
              onClick={() => setActiveImage(null)}
              className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white"
              aria-label="Close gallery preview"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-[2rem]"
              onClick={(event) => event.stopPropagation()}
            >
              <Image src={activeImage} alt="Selected gallery image" width={1600} height={1200} className="h-auto max-h-[90vh] w-full object-contain" />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </SectionContainer>
  );
}
