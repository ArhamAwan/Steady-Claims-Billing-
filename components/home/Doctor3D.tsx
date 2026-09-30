"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { DoctorScene } from "@/lib/doctorScene";

const LOOP_SECONDS = 3.2;

/**
 * Live WebGL render of the waving 3D doctor. The head eases toward the pointer.
 * Shows a static poster while three.js loads, when WebGL is unavailable,
 * and for visitors who prefer reduced motion.
 */
export function Doctor3D({ className = "" }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    let scene: DoctorScene | null = null;
    let raf = 0;
    let visible = true;
    let cancelled = false;
    const start = performance.now();

    const loop = (now: number) => {
      if (!scene) return;
      const t = (((now - start) / 1000) % LOOP_SECONDS) / LOOP_SECONDS;
      scene.pose(t);
      raf = visible ? requestAnimationFrame(loop) : 0;
    };

    const resize = () => {
      if (!scene) return;
      const r = wrap.getBoundingClientRect();
      scene.setSize(Math.max(1, Math.round(r.width)), Math.max(1, Math.round(r.height)));
    };

    const onPointer = (e: PointerEvent) => {
      if (!scene) return;
      const r = wrap.getBoundingClientRect();
      const cx = r.left + r.width * 0.55;
      const cy = r.top + r.height * 0.3;
      scene.setLook((e.clientX - cx) / (window.innerWidth / 2), (e.clientY - cy) / (window.innerHeight / 2));
    };

    const ro = new ResizeObserver(resize);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && scene && !raf) raf = requestAnimationFrame(loop);
    });

    import("@/lib/doctorScene")
      .then(({ createDoctorScene }) => {
        if (cancelled) return;
        try {
          scene = createDoctorScene(canvas);
        } catch {
          return; // no WebGL — keep the poster
        }
        resize();
        scene.pose(0);
        setReady(true);
        ro.observe(wrap);
        io.observe(wrap);
        window.addEventListener("pointermove", onPointer, { passive: true });
        raf = requestAnimationFrame(loop);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      scene?.dispose();
    };
  }, [reduce]);

  return (
    <div ref={wrapRef} className={`relative aspect-[710/915] w-full ${className}`}>
      <motion.img
        src="/doctor-poster.webp"
        alt="3D illustration of a friendly doctor waving, holding a clipboard with an approved check mark"
        className="absolute inset-0 h-full w-full"
        initial={false}
        animate={{ opacity: ready ? 0 : 1 }}
        transition={{ duration: 0.4 }}
        draggable={false}
      />
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
    </div>
  );
}
