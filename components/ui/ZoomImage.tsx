"use client";

import { useEffect, useState } from "react";
import Image, { type ImageProps } from "next/image";

/** Image that opens full-screen on click (Esc or click to close). */
export function ZoomImage(props: Readonly<ImageProps>) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Enlarge image: ${props.alt}`}
        className="block w-full cursor-zoom-in"
      >
        <Image {...props} />
      </button>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={props.alt}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-black/90 p-4"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={typeof props.src === "string" ? props.src : ""} alt={props.alt} className="max-h-full max-w-full object-contain" />
        </div>
      )}
    </>
  );
}
