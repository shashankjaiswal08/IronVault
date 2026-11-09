"use client";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion } from "motion/react";

gsap.registerPlugin(useGSAP);

const Hero = () => {
  const heroRef = useRef(null);

  useGSAP(
    () => {
      if (!heroRef.current) return;
      gsap.set(heroRef.current, { autoAlpha: 1 });
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-hero-eyebrow]", {
        y: -200,
        opacity: 0,
        duration: 0.5,
      })
        .from(
          "[data-hero-title]",
          {
            x: "-100%",
            opacity: 0,
            duration: 0.8,
          },
          "-=0.2",
        )
        .from(
          "[data-hero-description]",
          {
            x: "100%",
            opacity: 0,
            duration: 0.6,
          },
          "-=0.35",
        )
        .from(
          "[data-hero-actions] > *",
          {
            y: "100%",
            opacity: 0,
            duration: 0.45,
            stagger: 0.12,
          },
          "-=0.2",
        );
    },
    { scope: heroRef },
  );

  return (
    <>
      <section
        ref={heroRef}
        id="home"
        className="h-screen w-full flex flex-col items-center px-4 md:px-8 lg:px-16"
      >
        <div
          id="hero-box"
          className="flex flex-col items-center lg:flex-row lg:items-center lg:justify-between gap-4 w-[90%] lg:w-full border-b-2 border-accent/50 pb-6 mt-75  lg:mt-55 lg:h-1/3"
        >
          <div className="lg:w-[55%] h-full flex flex-col lg:items-start lg:justify-end">
            <p
              data-hero-eyebrow
              className="capitalize text-center lg:text-start text-accent text-xs lg:text-sm font-bio-rhyme font-medium"
            >
              Strength • Discipline • Performance
            </p>
            <h1
              data-hero-title
              className="mt-2 text-foreground text-center lg:text-start font-bio-rhyme font-bold leading-[1.05] tracking-tight text-4xl lg:text-[3.75rem]"
            >
              Build strength. Push your limits. Become harder to break.
            </h1>
          </div>
          <div className="lg:w-[30%] h-full flex flex-col items-end justify-end">
            <p
              data-hero-description
              className="text-sm lg:text-lg mt-2 lg:mt-0 font-bio-rhyme font-medium text-center lg:text-start"
            >
              Build strength. Push your limits. Become harder to break.
            </p>
          </div>
        </div>
        <div
          data-hero-actions
          className="links w-full flex items-center justify-center lg:justify-start gap-4 lg:gap-6 mt-6 font-bio-rhyme font-bold"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <Link
              href="#contact"
              className="border border-zinc-500 bg-accent hover:bg-transparent text-lg hover:text-foreground text-zinc-950 rounded-full px-4 py-2 inline-flex items-center"
            >
              Start Now
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <Link
              href="#about"
              className="border border-zinc-500 bg-transparent hover:bg-accent text-lg hover:text-zinc-900 text-foreground rounded-full px-4 py-2 inline-flex items-center"
            >
              About Us
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Hero;
