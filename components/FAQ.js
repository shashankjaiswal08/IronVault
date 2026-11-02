import FAQAccordion from "./FAQAccordion";

const faqs = [
  {
    id: 1,
    question: "Is IRONVAULT suitable for beginners?",
    answer:
      "Absolutely. Our training is designed around your current ability level. Whether you're stepping into a gym for the first time or have been training for years, your program can be adapted to meet you where you are.",
  },
  {
    id: 2,
    question: "What training programs do you offer?",
    answer:
      "IRONVAULT focuses on strength training, performance training, conditioning, mobility, and personal coaching. Programs can be adapted around your goals, experience, and training capacity.",
  },
  {
    id: 3,
    question: "Do I need prior gym experience?",
    answer:
      "No. You don't need previous gym experience to get started. Our coaches can guide you through the fundamentals and help you build confidence with proper technique.",
  },
  {
    id: 4,
    question: "How often should I train?",
    answer:
      "Your ideal training frequency depends on your goals, experience, recovery, and schedule. Our coaches can help you establish a sustainable routine that challenges you without sacrificing recovery.",
  },
  {
    id: 5,
    question: "Can I get personal coaching?",
    answer:
      "Yes. Personal coaching is available for members who want more individualized guidance, structured programming, and closer attention to their technique and progress.",
  },
  {
    id: 6,
    question: "How do I get started?",
    answer:
      "Start by sending us an inquiry. Tell us about your goals and what you're looking for, and our team will help you determine the best way to begin your training at IRONVAULT.",
  },
];

const FAQ = () => {
  return (
    <section
      id="faq"
      className="w-full min-h-screen bg-accent px-4 py-20 md:px-8 lg:px-16"
    >
      <div className="info flex flex-col items-start gap-10 border-b border-background/80 pb-10">
        <h2 className="text-background text-3xl lg:text-[2.5rem] font-bio-rhyme font-bold">
          FAQs
        </h2>
        <p className="text-background/65 text-lg font-bio-rhyme font-semibold">
          <b className="text-xl">
            {`QUESTIONS?`}
            <br />
            {`WE HAVE ANSWERS.`}
          </b>
        </p>
      </div>
      {/* Accordion */}
      <div className="mt-10">
        <FAQAccordion faqs={faqs} />
      </div>
    </section>
  );
};

export default FAQ;
