"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const ReviewsMarquee = ({ reviews }) => {
  const marqueeRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(() => {
      if (!trackRef.current) return;
      const track = trackRef.current;
      const animation = gsap.to(track, {
        xPercent: -50,
        duration: 25,
        ease: "none",
        repeat: -1,
      });

      return () => {
        animation.kill();
      };
    },
    {
      scope: marqueeRef,
    },
  );

  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <div ref={marqueeRef} className="relative overflow-hidden font-bio-rhyme">
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-background to-transparent md:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-background to-transparent md:w-28" />

      {/* Track */}
      <div ref={trackRef} className="flex w-max">
        {duplicatedReviews.map((review, index) => (
          <article
            key={`${review.id}-${index}`}
            className="group relative w-[85vw] shrink-0 border border-accent/30 p-6 sm:w-[55vw] sm:p-8 lg:w-[38vw] lg:p-10 xl:w-[32vw]"
          >
            <div className="flex items-center justify-between text-accent">
              <span className="text-xs font-semibold tracking-[0.25em]">
                0{index + 1}
              </span>
              <span className="text-xs uppercase tracking-[0.2em] textforeground/35">
                {review.program}
              </span>
            </div>
            <div className="flex flex-col justify-between">
              <div className="mt-12">
                <p className="mt-4 text-lg font-medium leading-relaxed text-foreground sm:text-xl">
                  {review.review}
                </p>
              </div>
              <div className="mt-8 bottom-0 border-t border-accent/75 pt-5">
                <p className="text-sm font-bold uppercase tracking-[0.15em] text-foreground">
                  {review.name}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default ReviewsMarquee;
