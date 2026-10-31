import TrainerCarousel from "./TrainerCarousel";

const Trainers = () => {
  return (
    <section className="w-full overflow-hidden bg-background px-4 py-20 md:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-xs font-medium tracking-[0.3em] text-[#A7E400]">
              OUR TRAINERS
            </span>

            <h2 className="mt-4 text-4xl font-bold uppercase leading-[0.9] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              TRAIN WITH
              <br />
              <span className="text-[#A7E400]">PURPOSE.</span>
            </h2>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-foreground/60 md:text-base">
            Meet the coaches who turn discipline into progress and effort into
            measurable results.
          </p>
        </div>

        <TrainerCarousel />
      </div>
    </section>
  );
};

export default Trainers;
