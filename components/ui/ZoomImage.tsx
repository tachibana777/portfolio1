"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image, { type ImageProps } from "next/image";

const MIN = 1;
const MAX = 8;
const clamp = (v: number) => Math.min(MAX, Math.max(MIN, v));

/**
 * Image that opens full-screen on click.
 * Mouse wheel zooms at the cursor, drag pans, double-click toggles 1x/3x, pinch works on touch.
 * Close with Esc, the X button, or a click on the dark area.
 */
export function ZoomImage(props: Readonly<ImageProps>) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState({ s: 1, x: 0, y: 0 });
  const viewRef = useRef(view);
  viewRef.current = view;
  const overlayRef = useRef<HTMLDivElement>(null);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinchDist = useRef(0);
  const moved = useRef(false);

  const close = useCallback(() => {
    setOpen(false);
    setView({ s: 1, x: 0, y: 0 });
  }, []);

  /** Zoom to scale `next`, keeping the screen point (px, py) fixed. */
  const zoomAt = useCallback((next: number, px: number, py: number) => {
    const el = overlayRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = px - (r.left + r.width / 2);
    const cy = py - (r.top + r.height / 2);
    const { s, x, y } = viewRef.current;
    const s2 = clamp(next);
    if (s2 === 1) return setView({ s: 1, x: 0, y: 0 });
    const k = s2 / s;
    setView({ s: s2, x: cx - (cx - x) * k, y: cy - (cy - y) * k });
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  // Wheel must be a non-passive native listener so the page does not scroll underneath.
  useEffect(() => {
    const el = overlayRef.current;
    if (!open || !el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      zoomAt(viewRef.current.s * Math.exp(-e.deltaY * 0.0015), e.clientX, e.clientY);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [open, zoomAt]);

  const onPointerDown = (e: React.PointerEvent) => {
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    moved.current = false;
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      pinchDist.current = Math.hypot(a.x - b.x, a.y - b.y);
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const prev = pointers.current.get(e.pointerId);
    if (!prev) return;
    const cur = { x: e.clientX, y: e.clientY };
    pointers.current.set(e.pointerId, cur);
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (pinchDist.current) zoomAt(viewRef.current.s * (d / pinchDist.current), (a.x + b.x) / 2, (a.y + b.y) / 2);
      pinchDist.current = d;
      moved.current = true;
    } else if (viewRef.current.s > 1) {
      const dx = cur.x - prev.x;
      const dy = cur.y - prev.y;
      if (Math.abs(dx) + Math.abs(dy) > 0) moved.current = true;
      setView((v) => ({ ...v, x: v.x + dx, y: v.y + dy }));
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    pinchDist.current = 0;
  };

  const src = typeof props.src === "string" ? props.src : "";
  const btn: React.CSSProperties = { color: "#fff", background: "rgba(255,255,255,0.14)", border: 0, borderRadius: 8, width: 36, height: 36, fontSize: 20, lineHeight: 1, cursor: "pointer" };

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
      {open &&
        // Rendered in <body> so no transformed/clipped ancestor can shrink the overlay.
        createPortal(
          <div
            ref={overlayRef}
            role="dialog"
            aria-modal="true"
            aria-label={props.alt}
            onClick={() => { if (!moved.current) close(); }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 16, background: "rgba(0,0,0,0.92)", cursor: "zoom-out", overflow: "hidden", touchAction: "none" }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{ position: "absolute", top: 12, right: 16, display: "flex", gap: 8, alignItems: "center", zIndex: 1 }}
            >
              <button type="button" aria-label="Zoom out" onClick={() => zoomAt(viewRef.current.s / 1.5, window.innerWidth / 2, window.innerHeight / 2)} style={btn}>−</button>
              <button type="button" aria-label="Zoom in" onClick={() => zoomAt(viewRef.current.s * 1.5, window.innerWidth / 2, window.innerHeight / 2)} style={btn}>+</button>
              <button type="button" aria-label="Close image" onClick={close} style={btn}>×</button>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={props.alt}
              draggable={false}
              onClick={(e) => e.stopPropagation()}
              onDoubleClick={(e) => zoomAt(viewRef.current.s > 1 ? 1 : 3, e.clientX, e.clientY)}
              style={{
                maxWidth: "96vw",
                maxHeight: "94vh",
                objectFit: "contain",
                userSelect: "none",
                cursor: view.s > 1 ? "grab" : "zoom-in",
                transform: `translate(${view.x}px, ${view.y}px) scale(${view.s})`,
                transformOrigin: "center",
              }}
            />
          </div>,
          document.body,
        )}
    </>
  );
}
