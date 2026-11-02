"use client";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FiPlus } from "react-icons/fi";

gsap.registerPlugin(useGSAP);

const FAQAccordion = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const accordionRef = useRef(null);
  const contentRefs = useRef([]);
  const iconRefs = useRef([]);

  useGSAP(() => {
      contentRefs.current.forEach((content, index) => {
        if (!content) return;
        const isOpen = index === openIndex;
        if (isOpen) {
          gsap.to(content, {
            height: "auto",
            opacity: 1,
            duration: 0.5,
            ease: "power3.out",
            overwrite: true,
          });
        } else {
          gsap.to(content, {
            height: 0,
            opacity: 0,
            duration: 0.4,
            ease: "power3.inOut",
            overwrite: true,
          });
        }
      });

      iconRefs.current.forEach((icon, index) => {
        if (!icon) return;
        gsap.to(icon, {
          rotate: index === openIndex ? 45 : 0,
          duration: 0.4,
          ease: "power3.out",
          overwrite: true,
        });
      });
    },
    {
      scope: accordionRef,
      dependencies: [openIndex],
      revertOnUpdate: false,
    },
  );

  const handleToggle = (index) => {
    setOpenIndex((currentIndex) => (currentIndex === index ? null : index));
  };

  return (
    <div ref={accordionRef} className="w-full">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={faq.id}
            className="border-b border-background font-bio-rhyme transition-all duration-500 ease-in-out"
          >
            <button
              type="button"
              onClick={() => handleToggle(index)}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${faq.id}`}
              className="group flex w-full items-center justify-between gap-6 p-4 text-left transition-colors duration-300 focus-visible:outline-none hover:bg-background/80 cursor-pointer"
            >
              <span
                className={`text-lg font-bold uppercase leading-tight tracking-tight transition-colors duration-300 md:text-xl ${isOpen ? "text-background group-hover:text-accent" : "text-background/65 group-hover:text-accent "}`}
              >
                {faq.question}
              </span>
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center transition-colors duration-300 text-background group-hover:text-accent md:h-12 md:w-12"
                aria-hidden="true"
              >
                <FiPlus
                  ref={(element) => {
                    iconRefs.current[index] = element;
                  }}
                  size={24}
                />
              </span>
            </button>
            <div
              id={`faq-answer-${faq.id}`}
              ref={(element) => {
                contentRefs.current[index] = element;
              }}
              role="region"
              aria-labelledby={`faq-question-${faq.id}`}
              className="h-0 overflow-hidden opacity-0"
            >
              <div className="w-full pl-8 lg:pr-72 py-4">
                <p className="text-base leading-7 text-background/65 font-semibold md:text-lg md:leading-8">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FAQAccordion;
