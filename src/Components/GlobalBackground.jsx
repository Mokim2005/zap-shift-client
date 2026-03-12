import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

const GlobalBackground = () => {
  const blob1Ref = useRef(null);
  const blob2Ref = useRef(null);
  const blob3Ref = useRef(null);

  useEffect(() => {
    // GSAP animations for floating blobs
    const blobs = [blob1Ref.current, blob2Ref.current, blob3Ref.current];

    blobs.forEach((blob, index) => {
      if (blob) {
        gsap.to(blob, {
          x: `${Math.random() * 100 - 50}px`,
          y: `${Math.random() * 100 - 50}px`,
          duration: 20 + index * 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 2,
        });
      }
    });
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-transparent">
      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-linear-to-tr from-cyan-50/50 via-transparent to-purple-50/50 dark:from-blue-950/30 dark:via-transparent dark:to-purple-950/30"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating blob 1 */}
      <div
        ref={blob1Ref}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-linear-to-br from-blue-200/40 to-cyan-200/40 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-full blur-3xl"
      />

      {/* Floating blob 2 */}
      <div
        ref={blob2Ref}
        className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-linear-to-br from-purple-200/30 to-pink-200/30 dark:from-purple-900/15 dark:to-pink-900/15 rounded-full blur-3xl"
      />

      {/* Floating blob 3 */}
      <div
        ref={blob3Ref}
        className="absolute bottom-1/4 left-1/2 w-[400px] h-[400px] bg-linear-to-br from-indigo-200/35 to-blue-200/35 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-full blur-3xl"
      />

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
    </div>
  );
};

export default GlobalBackground;
