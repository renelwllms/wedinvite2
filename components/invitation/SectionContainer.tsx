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
    <section id={id} className={cn("section-shell px-4 py-20 sm:px-6 lg:px-8", className)}>
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          {eyebrow ? (
            <p className="text-sm uppercase tracking-[0.35em] text-gold/80">{eyebrow}</p>
          ) : null}
          <h2 className="mt-3 font-display text-4xl font-semibold text-cocoa sm:text-5xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-4 text-base leading-7 text-cocoa/75 sm:text-lg">{description}</p>
          ) : null}
        </div>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
