import { cn } from "@/lib/helpers";

type SectionContainerProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
};

export function SectionContainer({
  id,
  eyebrow,
  title,
  description,
  className,
  children
}: SectionContainerProps) {
  return (
    <section id={id} className={cn("section-shell section-spacing px-4 sm:px-6 lg:px-8", className)}>
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          {eyebrow ? (
            <p className="editorial-divider justify-center">{eyebrow}</p>
          ) : null}
          <h2 className="mt-5 text-balance font-display text-4xl font-semibold tracking-[-0.03em] text-cocoa sm:text-5xl md:text-6xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-5 text-balance text-base leading-8 text-taupe/80 sm:text-lg">{description}</p>
          ) : null}
        </div>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
