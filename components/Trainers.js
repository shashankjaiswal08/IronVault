import TrainerCarousel from "./TrainerCarousel";

const Trainers = () => {
  return (
    <section className="w-full overflow-hidden bg-background px-4 py-20 md:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-10 border-b border-accent/30 pb-10">
          <h2 className="text-3xl lg:text-[2.5rem] font-bio-rhyme font-bold">
            OUR TRAINERS
          </h2>
          <p className="text-foreground/65 text-lg font-bio-rhyme font-semibold leading-relaxed">
            Meet the coaches who turn discipline into progress and effort into
            measurable results.
          </p>
        </div>
        <div className="mt-10">
          <TrainerCarousel />
        </div>
      </div>
    </section>
  );
};

export default Trainers;
