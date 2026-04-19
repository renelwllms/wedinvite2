"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

import type { InvitationData } from "@/data/invitation";
import { AnimatedReveal } from "@/components/invitation/AnimatedReveal";
import { SectionContainer } from "@/components/invitation/SectionContainer";

export function StorySection({ data }: { data: InvitationData }) {
  const [isOpen, setIsOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const storyCopy = data.ui.storySection;

  useEffect(() => {
    if (!isOpen || !sectionRef.current) {
      return;
    }

    const sectionTop = sectionRef.current.getBoundingClientRect().top + window.scrollY;
    const offsetTop = Math.max(sectionTop - 120, 0);

    window.requestAnimationFrame(() => {
      window.scrollTo({ top: offsetTop, behavior: "auto" });
    });
  }, [isOpen]);

  return (
    <SectionContainer
      id="story"
      eyebrow={storyCopy.eyebrow}
      title={storyCopy.title}
      description={storyCopy.description}
    >
      <div ref={sectionRef} className="mx-auto max-w-6xl">
        <AnimatedReveal className="mx-auto max-w-3xl">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/60 bg-[linear-gradient(135deg,rgba(255,248,242,0.96),rgba(244,227,217,0.92))] px-6 py-10 text-center shadow-panel sm:px-10">
            <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/80 text-rose-500 shadow-soft">
              <Heart className="h-7 w-7 fill-current" />
            </div>
            <p className="mt-5 font-script text-4xl text-cocoa sm:text-5xl">{storyCopy.panelTitle}</p>
            <p className="mt-4 text-base leading-8 text-taupe/78 sm:text-lg">{storyCopy.panelDescription}</p>
            <button
              type="button"
              onClick={() => setIsOpen((current) => !current)}
              className="mt-8 inline-flex items-center gap-3 rounded-full border border-[#d9b7aa] bg-white/85 px-7 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-cocoa transition hover:-translate-y-0.5 hover:bg-white"
            >
              <Heart className="h-4 w-4 fill-current text-rose-500" />
              {isOpen ? storyCopy.hideStory : storyCopy.openStory}
            </button>
          </div>
        </AnimatedReveal>

        {isOpen ? (
          <div className="relative mt-12">
            <div className="timeline-line absolute left-[1.1rem] top-0 h-full w-px sm:left-1/2 sm:-translate-x-1/2" />
            <div className="space-y-10">
              {data.story.map((item, index) => (
                <AnimatedReveal key={`${item.year}-${item.title}`} delay={index * 0.1}>
                  <div className={`grid items-center gap-6 sm:grid-cols-2 sm:gap-10 ${index % 2 === 1 ? "sm:[&>*:first-child]:order-2" : ""}`}>
                    <div className="relative pl-10 sm:pl-0">
                      <span className="absolute left-0 top-4 z-10 h-4 w-4 rounded-full border-4 border-background bg-gold sm:left-1/2 sm:-translate-x-1/2" />
                      <div className="texture-panel rounded-[2rem] border border-white/60 p-6 shadow-panel sm:p-8">
                        <h3 className="text-balance font-display text-3xl leading-tight text-cocoa sm:text-4xl">{item.title}</h3>
                        <p className="mt-4 leading-8 text-taupe/78">{item.description}</p>
                      </div>
                    </div>
                    <motion.div
                      whileHover={{ rotate: index % 2 === 0 ? -1 : 1, y: -4 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className={`polaroid-card polaroid-tape relative mx-auto w-full max-w-md p-4 pb-6 ${index % 2 === 0 ? "rotate-[-3deg]" : "rotate-[3deg]"}`}
                    >
                      <div className="overflow-hidden rounded-[1.2rem] bg-[#ede2d3]">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={900}
                          height={1080}
                          loading="lazy"
                          className="aspect-[4/5] h-full w-full object-cover transition duration-700 hover:scale-[1.03]"
                        />
                      </div>
                      <div className="px-2 pt-5 text-center">
                        <p className="font-display text-2xl italic text-cocoa">{item.title}</p>
                      </div>
                    </motion.div>
                  </div>
                </AnimatedReveal>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </SectionContainer>
  );
}
