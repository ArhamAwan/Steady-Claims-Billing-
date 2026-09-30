"use client";

import { motion } from "framer-motion";
import { EASE } from "@/components/motion/Reveal";

/** Re-mounts on every navigation, giving each page a soft entrance. */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, ease: EASE }}>
      {children}
    </motion.div>
  );
}
