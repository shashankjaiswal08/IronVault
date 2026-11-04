import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const footerLinks = [
  {
    category: "Quick Links",
    links: [
      { name: "Home", href: "#" },
      { name: "About Us", href: "#about" },
      { name: "Our Trainers", href: "#trainers" },
      { name: "FAQs", href: "#faqs" },
      { name: "Contact Us", href: "#contact" },
    ],
  },
  {
    category: "Follow Us On",
    links: [
      { name: "Facebook", href: "#" },
      { name: "Twitter", href: "#" },
      { name: "Instagram", href: "#" },
      { name: "YouTube", href: "#" },
    ],
  },
]

const currentYear = new Date().getFullYear();

const CTA_Footer = () => {
  return (
    <>
      <section className="bg-accent font-bio-rhyme px-4 py-20 md:px-8 lg:px-16">
        <div className="cta bg-background flex items-center justify-between rounded-xl p-10">
          <div className="flex flex-col items-start gap-4 w-2/3">
            <h2 className="text-foreground text-3xl lg:text-[2rem] font-bio-rhyme font-bold">
              Ready to get started?
            </h2>
            <p className="text-foreground/75 font-bio-rhyme font-semibold">
              {`Become a member and take the first step towards a stronger, more confident you.`}
            </p>
          </div>
          <Link
            href="#contact"
            className="bg-background text-lg hover:bg-accent hover:text-background transition-all duration-300 ease-in-out group hover:scale-[1.1] text-foreground border border-zinc-500 font-bio-rhyme font-semibold px-6 py-3 rounded-full inline-flex items-center justify-center gap-2"
          >
            Join Now
            <ArrowUpRight
              size={20}
              className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300 ease-in-out"
            />
          </Link>
        </div>
      </section>
      <footer className="bg-background font-bio-rhyme px-4 pt-20 md:px-8 lg:px-16">
        <div className="flex items-center justify-start gap-12 border-b border-accent/50 pb-10">
          <h2 className="text-accent text-3xl lg:text-[2.5rem] font-bio-rhyme font-bold">
            IronVault
          </h2>
          <p className="text-foreground/65 text-sm font-bio-rhyme font-semibold">
            {`IronVault is built for people who refuse to settle for ordinary. We believe strength is more than what you can lift.`}
          </p>
        </div>
        <div className="footer-links mt-10 flex items-start justify-start gap-30 flex-wrap">
          {footerLinks.map((section) => (
            <div
              key={section.category}
              className="flex flex-col items-start gap-4 transition-all duration-300 ease-in-out"
            >
              <h3 className="text-foreground text-2xl font-bio-rhyme font-bold">
                {section.category}
              </h3>
              <ul className="flex flex-col items-start gap-2">
                {section.links.map((link) => (
                  <li
                    key={link.name}
                    className="group flex items-center justify-center text-foreground/65 text-lg font-bio-rhyme hover:scale-[1.1] transition-all duration-300 ease-in-out font-semibold"
                  >
                    <Link
                      href={link.href}
                      className="group-hover:text-accent group-hover:underline group-hover:underline-offset-2 "
                    >
                      {link.name}
                    </Link>
                    {section.category === "Follow Us On" && (
                      <ArrowUpRight
                        size={16}
                        className="opacity-0 ml-1 group-hover:opacity-100 delay-100 text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300 ease-in-out"
                      />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-10 py-5 border-t border-accent/50 text-center text-foreground/65 text-sm font-bio-rhyme font-semibold">
          {`© ${currentYear} IronVault. All rights reserved.`}
        </p>
      </footer>
      {/* <div className="text-xl text-foreground/25  font-bold font-bio-rhyme">IronVault</div>  */}
    </>
  );
};

export default CTA_Footer;
