import ImagesGrid from "./ImagesGrid";

const About = () => {
  return (
    <>
      <section className="min-h-screen w-full bg-accent px-4 py-20 md:px-8 lg:px-16">
        <div className="info flex flex-col items-start gap-10 border-b border-background/80 pb-10">
          <h2 className="text-background text-3xl lg:text-[2.5rem] font-bio-rhyme font-bold">
            About Us
          </h2>
          <p className="text-background/65 text-lg font-bio-rhyme font-semibold">
            {`IRONVAULT is built for people who refuse to settle for ordinary.`}
            <br /> <br />
            {` We believe strength is more than what you can lift. It's the discipline
            to show up, the courage to push beyond your limits, and the
            resilience to keep going when it gets hard.`}
            <br /> <br />
            {` From focused training sessions to expert coaching and a community that pushes you forward,
            every part of IRONVAULT is designed to make you stronger — inside
            and out.`}
          </p>
        </div>
        <div className="mt-10">
          <ImagesGrid />
        </div>
      </section>
    </>
  );
};

export default About;
