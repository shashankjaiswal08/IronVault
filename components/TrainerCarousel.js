"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { useCallback, useEffect, useRef, useState } from "react";

const trainers = [
  {
    id: 1,
    name: "Marcus Reed",
    role: "Strength Coach",
    experience: "12+ YEARS",
    image:
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 2,
    name: "Ethan Cole",
    role: "Performance Coach",
    experience: "10+ YEARS",
    image:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 3,
    name: "Ryan Brooks",
    role: "Conditioning Coach",
    experience: "8+ YEARS",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 4,
    name: "Alex Carter",
    role: "Mobility Coach",
    experience: "9+ YEARS",
    image:
      "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 5,
    name: "Daniel Stone",
    role: "Athletic Coach",
    experience: "11+ YEARS",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 6,
    name: "James Walker",
    role: "Strength Coach",
    experience: "7+ YEARS",
    image:
      "https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 7,
    name: "Noah Grant",
    role: "Fitness Coach",
    experience: "6+ YEARS",
    image:
      "https://images.unsplash.com/photo-1589578228447-e1a4e481c6c8?auto=format&fit=crop&w=900&q=85",
  },
];

const TrainerCarousel = () => {
  // Created once. Pausing on mouse is handled by the plugin;
  // pausing on keyboard focus is handled below so that clicking
  // the arrows/indicators doesn't leave autoplay stalled.
  const autoplay = useRef(null);
  if (!autoplay.current) {
    autoplay.current = Autoplay({
      delay: 3000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      stopOnFocusIn: false,
    });
  }

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      containScroll: false,
      skipSnaps: false,
    },
    [autoplay.current],
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = useRef(false);

  const scrollPrev = useCallback(() => {
    if (!emblaApi) return;

    emblaApi.scrollPrev();
    autoplay.current.reset();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (!emblaApi) return;

    emblaApi.scrollNext();
    autoplay.current.reset();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index) => {
      if (!emblaApi) return;

      emblaApi.scrollTo(index);
      autoplay.current.reset();
    },
    [emblaApi],
  );

  // Active slide = the slide whose on-screen center is closest to the
  // viewport center. Reads real positions, so it's loop-safe.
  const updateActive = useCallback(() => {
    if (!emblaApi) return;

    const viewport = emblaApi.rootNode().getBoundingClientRect();
    const viewportCenter = viewport.left + viewport.width / 2;

    let closest = 0;
    let minDistance = Infinity;

    emblaApi.slideNodes().forEach((node, index) => {
      const rect = node.getBoundingClientRect();
      const distance = Math.abs(rect.left + rect.width / 2 - viewportCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closest = index;
      }
    });

    setActiveIndex(closest);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    updateActive();

    emblaApi.on("scroll", updateActive);
    emblaApi.on("settle", updateActive);
    emblaApi.on("reInit", updateActive);
    emblaApi.on("resize", updateActive);

    return () => {
      emblaApi.off("scroll", updateActive);
      emblaApi.off("settle", updateActive);
      emblaApi.off("reInit", updateActive);
      emblaApi.off("resize", updateActive);
    };
  }, [emblaApi, updateActive]);

  // Reduced motion: disable autoplay, react to changes, and re-apply
  // after reInit (Embla re-initialises plugins, which would restart it).
  useEffect(() => {
    if (!emblaApi) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const applyMotionPreference = () => {
      reducedMotion.current = mediaQuery.matches;

      if (mediaQuery.matches) {
        autoplay.current.stop();
      } else {
        autoplay.current.play();
      }
    };

    applyMotionPreference();

    mediaQuery.addEventListener("change", applyMotionPreference);
    emblaApi.on("reInit", applyMotionPreference);

    return () => {
      mediaQuery.removeEventListener("change", applyMotionPreference);
      emblaApi.off("reInit", applyMotionPreference);
    };
  }, [emblaApi]);

  // Pause while keyboard focus is inside the carousel; resume when it leaves.
  const handleFocus = useCallback((event) => {
    if (event.target.matches(":focus-visible")) {
      autoplay.current.stop();
    }
  }, []);

  const handleBlur = useCallback((event) => {
    if (event.currentTarget.contains(event.relatedTarget)) return;

    if (!reducedMotion.current) {
      autoplay.current.play();
    }
  }, []);

  return (
    <div className="relative w-full " onFocus={handleFocus} onBlur={handleBlur}>
      {/* Carousel viewport */}
      <div ref={emblaRef} className="overflow-hidden py-6">
        {/* Carousel container */}
        <div className="-ml-3 flex">
          {trainers.map((trainer, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={trainer.id}
                className="
                  min-w-0
                  shrink-0
                  grow-0
                  basis-[78%]
                  flex
                  items-center
                  gap-8
                  sm:basis-[48%]
                  lg:basis-[34%]
                  xl:basis-[27%]
                "
              >
                <article
                  className={`
                    group
                    relative
                    h-100
                    ml-8
                    overflow-hidden
                    bg-neutral-900
                    border border-accent/75
                    transition-all
                    duration-500
                    cursor-grab
                    ease-out ${isActive ? "scale-[1.2] z-50 blur-0 opacity-100" : "scale-100 blur-xs opacity-50"}`}
                >
                  <div className="relative aspect-3/4 h-full overflow-hidden">
                    <Image
                      src={trainer.image}
                      alt={trainer.name}
                      fill
                      sizes="
                        (max-width: 640px) 78vw,
                        (max-width: 1024px) 48vw,
                        (max-width: 1280px) 34vw,
                        27vw
                      "
                      className="
                        object-cover
                        transition-transform
                        duration-700
                        ease-out
                        group-hover:scale-105
                        group-hover:grayscale-50
                      "
                    />

                    {/* Gradient */}
                    <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />

                    {/* Experience */}
                    <span className="absolute left-2 top-4 border border-white/20 bg-black/50 px-3 py-1.5 text-[10px] font-semibold tracking-[0.2em] text-accent backdrop-blur-sm">
                      {trainer.experience}
                    </span>

                    {/* Content */}
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="mb-2 text-[10px] font-semibold tracking-[0.25em] text-[#A7E400]">
                        {trainer.role}
                      </p>

                      <h3 className="text-2xl font-bold uppercase tracking-tight text-white">
                        {trainer.name}
                      </h3>
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-6 flex items-center justify-between">
        {/* Indicators */}
        <div className="flex items-center gap-2">
          {trainers.map((trainer, index) => (
            <button
              key={trainer.id}
              type="button"
              onClick={() => scrollTo(index)}
              aria-label={`Go to ${trainer.name}`}
              aria-current={activeIndex === index ? "true" : undefined}
              className={`
                h-1.5
                transition-all
                duration-300
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#A7E400]
                ${
                  activeIndex === index
                    ? "w-8 bg-[#A7E400]"
                    : "w-2 bg-foreground/20"
                }
              `}
            />
          ))}
        </div>

        {/* Arrows */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Previous trainer"
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              border
              border-foreground/20
              transition
              hover:border-[#A7E400]
              hover:text-[#A7E400]
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#A7E400]
            "
          >
            <FiArrowLeft size={18} />
          </button>

          <button
            type="button"
            onClick={scrollNext}
            aria-label="Next trainer"
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              border
              border-foreground/20
              transition
              hover:border-[#A7E400]
              hover:text-[#A7E400]
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#A7E400]
            "
          >
            <FiArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrainerCarousel;
