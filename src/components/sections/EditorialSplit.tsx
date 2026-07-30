import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PhotoFrame } from "@/components/ui/photo-frame";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";

type EditorialSplitProps = {
  eyebrow: string;
  /** Display heading. Pass an `<Em>` inside for the gold accent. */
  title: ReactNode;
  body: ReactNode;
  photo: { src: string; alt: string; width: number; height: number };
  /** Which side the photograph sits on. Alternate down a page for rhythm. */
  media?: "start" | "end";
  variant?: "paper" | "sand";
  bordered?: boolean;
  /** Optional footer row — links, chips, buttons. */
  children?: ReactNode;
  priority?: boolean;
};

/**
 * The page workhorse: a photograph opposite a short editorial column. Alternating
 * `media` down a page is what gives long pages rhythm instead of a wall of cards.
 */
export function EditorialSplit({
  eyebrow,
  title,
  body,
  photo,
  media = "end",
  variant = "paper",
  bordered = false,
  children,
  priority = false,
}: EditorialSplitProps) {
  return (
    <Section variant={variant} bordered={bordered}>
      <div className="group grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className={cn(media === "start" && "lg:order-2")}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="display-md mt-5 text-balance">{title}</h2>
          <div className="lead mt-6 flex max-w-xl flex-col gap-4 text-ink-soft">{body}</div>
          {children ? <div className="mt-8">{children}</div> : null}
        </Reveal>
        <Reveal delay={0.15} className={cn(media === "start" && "lg:order-1")}>
          <PhotoFrame
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            anchor={media === "start" ? "start" : "end"}
            aspect="wide"
            priority={priority}
          />
        </Reveal>
      </div>
    </Section>
  );
}
