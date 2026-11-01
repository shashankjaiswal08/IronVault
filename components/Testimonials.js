import ReviewsMarquee from "./ReviewsMarquee";

const reviews = [
  {
    id: 1,
    name: "Mike Smith",
    review:
      "IronVault has been a game-changer for my fitness journey. It's a place where I can push my limits and achieve my goals, and I couldn't be happier with the results.",
    program: "Strength Training",
  },
  {
    id: 2,
    name: "Sarah Williams",
    review:
      "The coaching is what makes IronVault different. Every workout has a purpose, and I feel stronger and more confident every time I walk out.",
    program: "Performance Training",
  },
  {
    id: 3,
    name: "James Carter",
    review:
      "I came here to get stronger, but I ended up building discipline as well. The atmosphere keeps me motivated and the coaches actually care about your progress.",
    program: "Strength & Conditioning",
  },
  {
    id: 4,
    name: "Emma Davis",
    review:
      "IronVault completely changed the way I approach training. I stopped looking for shortcuts and started enjoying the process of getting better.",
    program: "Personal Training",
  },
];

const Testimonials = () => {
  return (
    <section className="w-full overflow-hidden bg-background px-4 py-20 md:px-8 lg:px-16">
      <div className="info flex flex-col items-start gap-10 border-b border-accent/30 pb-10">
        <h2 className="text-foreground text-3xl lg:text-[2.5rem] font-bio-rhyme font-bold">
          Testimonials
        </h2>
        <p className="text-foreground/65 text-lg font-bio-rhyme font-semibold">
          <b className="text-xl text-foreground/75">WHAT OUR CLIENTS SAY ABOUT US</b>
          <br /> <br />
          {`The work speaks for itself. Hear from people who chose to show up,
            put in the work, and become stronger.`}
        </p>
      </div>
      {/* Reviews */}
      <div className="mt-10">
        <ReviewsMarquee reviews={reviews} />
      </div>
    </section>
  );
};

export default Testimonials;
