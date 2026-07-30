import Image from "next/image";
import { cn } from "@/lib/utils";
import { asset } from "@/lib/base-path";

type PhotoFrameProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Which side the gold corner block sits on. */
  anchor?: "start" | "end";
  /** Display aspect; the image is cropped to fill. */
  aspect?: "wide" | "landscape" | "portrait" | "square";
  priority?: boolean;
  className?: string;
};

const aspects = {
  wide: "aspect-[21/9]",
  landscape: "aspect-[4/3]",
  portrait: "aspect-[4/5]",
  square: "aspect-square",
} as const;

/**
 * Photography with the house frame: a gold corner block sits behind one edge so
 * images read as deliberately placed rather than dropped in. Zooms very slightly
 * when an enclosing `group` is hovered (see `.photo-frame` in globals).
 */
export function PhotoFrame({
  src,
  alt,
  width,
  height,
  anchor = "start",
  aspect = "landscape",
  priority = false,
  className,
}: PhotoFrameProps) {
  return (
    <div
      className={cn(
        "photo-frame",
        anchor === "end" && "photo-frame--end",
        className,
      )}
    >
      <div
        className={cn(
          "shadow-card overflow-hidden rounded-2xl border border-hairline",
          aspects[aspect],
        )}
      >
        <Image
          src={asset(src)}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className="size-full object-cover"
        />
      </div>
    </div>
  );
}
