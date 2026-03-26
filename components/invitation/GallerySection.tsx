"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";

import type { InvitationData } from "@/data/invitation";
import { AnimatedReveal } from "@/components/invitation/AnimatedReveal";
import { SectionContainer } from "@/components/invitation/SectionContainer";

export function GallerySection({ data }: { data: InvitationData }) {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  return (
    <SectionContainer
      id="gallery"
      eyebrow="Moments"
      title="Fragments of our story"
      description="A few quiet frames from the season that led us here."
    >
      <div className="columns-2 gap-4 space-y-4 md:columns-3">
        {data.gallery.map((image, index) => (
          <AnimatedReveal key={image} delay={index * 0.05} className="break-inside-avoid">
            <button
              type="button"
              className="group relative w-full overflow-hidden rounded-[1.75rem] shadow-soft"
              onClick={() => setActiveImage(image)}
              aria-label="Open gallery image"
            >
              <Image
                src={image}
                alt={`Gallery moment ${index + 1}`}
                width={800}
                height={1000}
                loading="lazy"
                className="h-auto w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-0 transition group-hover:opacity-100" />
            </button>
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
              className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-[2rem]"
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
