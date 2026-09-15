import Image from "next/image";
import { Maximize2 } from "lucide-react";

type CertificateThumbnailProps = Readonly<{
  src: string;
  title: string;
  className?: string;
  width?: number;
  height?: number;
}>;

export function CertificateThumbnail({ src, title, className = "h-12 w-[60px]", width = 60, height = 48 }: CertificateThumbnailProps) {
  return (
    <a
      href={src}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View ${title} certificate in a new tab`}
      className={`group/certificate relative block shrink-0 overflow-hidden rounded-sm border border-neutral-800 bg-panel focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${className}`}
    >
      <Image src={src} alt={title} width={width} height={height} className="h-full w-full object-cover transition duration-300 group-hover/certificate:scale-105 group-hover/certificate:brightness-50" />
      <span className="absolute inset-0 grid place-items-center bg-black/10 text-white opacity-0 transition group-hover/certificate:opacity-100 group-focus-visible/certificate:opacity-100">
        <Maximize2 size={16} />
      </span>
    </a>
  );
}
