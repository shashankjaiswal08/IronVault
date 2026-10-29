import Link from "next/link";

const Hero = () => {
  return (
    <>
      <section className="h-screen w-full flex flex-col items-center px-4 md:px-8 lg:px-16">
        <div className="flex flex-col items-center lg:flex-row lg:items-center lg:justify-between gap-4 w-[90%] lg:w-full border-b border-accent/50 pb-6 mt-65 lg:mt-35 lg:h-1/3">
          <div className="lg:w-[55%] h-full flex flex-col lg:items-start lg:justify-end">
            <p className="capitalize text-center lg:text-start text-accent text-sm font-bio-rhyme font-medium">
              Strength • Discipline • Performance
            </p>
            <h1 className="mt-2 text-foreground text-center lg:text-start font-bio-rhyme font-bold leading-[1.05] tracking-tight text-4xl lg:text-[3.75rem]">
              Build strength. Push your limits. Become harder to break.
            </h1>
          </div>
          <div className="lg:w-[30%] h-full flex flex-col items-end justify-end">
            <p className="text-sm lg:text-lg mt-2 lg:mt-0 font-bio-rhyme font-medium text-center lg:text-start">
              Build strength. Push your limits. Become harder to break.
            </p>
          </div>
        </div>
        <div className="links w-full flex items-center justify-center lg:justify-start gap-4 lg:gap-6 mt-6 font-bio-rhyme font-bold">
          <Link
            href="#contact"
            className="border border-zinc-500 bg-(--accent) hover:bg-transparent text-lg hover:text-foreground hover:scale-[1.1] active:scale-[0.9] text-zinc-950 rounded-full px-4 py-2 inline-flex items-center transition-all duration-300 ease-out"
          >
            Start Now
          </Link>
          <Link
            href="#about"
            className="border border-zinc-500 bg-transparent hover:bg-(--accent) text-lg hover:text-zinc-900 hover:scale-[1.1] active:scale-[0.9] text-foreground rounded-full px-4 py-2 inline-flex items-center transition-all duration-300 ease-out"
          >
            About Us
          </Link>
        </div>
      </section>
    </>
  );
};

export default Hero;
