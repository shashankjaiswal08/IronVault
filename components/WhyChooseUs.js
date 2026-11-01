const benefits = [
  {
    title: "Expert Coaching",
    description:
      "Train with coaches who understand how to turn effort into measurable progress.",
  },
  {
    title: "Structured Training",
    description:
      "Every session has a purpose, from building raw strength to improving performance.",
  },
  {
    title: "Built For Progress",
    description:
      "Your training evolves as you get stronger, fitter, and more capable.",
  },
  {
    title: "Real Community",
    description:
      "Train alongside people who expect more from themselves and push you to do the same.",
  },
];

const stats = [
    {
        title: "Members",
        value: "600+",
    },
    {
        title: "Trainers",
        value: "5+",
    },
    {
        title: "Athletes Trained",
        value: "50+",
    },
    {
        title: "Success Rate",
        value: "94%",
    }
]

const WhyChooseUs = () => {
  return (
    <>
      <section className="min-h-screen bg-accent px-4 py-20 md:px-8 lg:px-16">
        <div className="info flex flex-col items-start gap-10 border-b border-background/80 pb-10">
          <h2 className="text-background text-3xl lg:text-[2.5rem] font-bio-rhyme font-bold">
            Why Choose Us
          </h2>
          <p className="text-lg text-background/65 font-bio-rhyme font-medium">
            <b className="text-xl">TRAIN WITH PURPOSE. BUILD WHAT LASTS.</b>
            <br /> <br />
            {`IRONVAULT is built for people who refuse to settle for ordinary. With expert coaching, structured training, and a relentless focus on progress, we help you become stronger, more capable, and harder to break.`}
          </p>
        </div>
        <div className="w-full mt-10 border-b border-background/80 pb-10">
          <h2 className="text-background mb-6 text-2xl lg:text-[2.25rem] font-bio-rhyme font-bold">
            Our Benefits
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex flex-col items-start bg-background/80 gap-2 py-6 px-4 rounded-md"
              >
                <h3 className="text-foreground text-lg font-bio-rhyme font-bold">
                  {index + 1}. {benefit.title}
                </h3>
                <p className="text-foreground/75 text-sm font-bio-rhyme font-medium">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10">
          <h2 className="text-background mb-6 text-2xl lg:text-[2.25rem] font-bio-rhyme font-bold">
            Our Numbers
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-start bg-background/80 gap-2 py-6 px-4 rounded-md"
              >
                <h3 className="text-foreground text-4xl font-bio-rhyme font-bold">
                  {stat.value}
                </h3>
                <p className="text-foreground/75 text-lg font-bio-rhyme font-medium">
                  {stat.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyChooseUs;
