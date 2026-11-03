import Link from "next/link";
import ContactForm from "./ContactForm";
import { ArrowUpRight } from "lucide-react";
import { Clock } from "lucide-react";
import { Mail } from "lucide-react";
import { MailQuestion } from "lucide-react";
import { Locate } from "lucide-react";
import { MapPin } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="bg-background px-4 py-20 md:px-8 lg:px-16">
      <div className="flex items-start justify-between">
        <div className="info flex flex-col items-start gap-10 border-b border-accent/80 pb-10">
          <h2 className="text-foreground text-3xl lg:text-[2.5rem] font-bio-rhyme font-bold">
            Contact Us
          </h2>
          <p className="text-foreground/65 text-lg font-bio-rhyme font-semibold">
            <b className="text-xl text-accent">{`Let’s Crush Some Goals!`}</b>
            <br /> <br />
            {`Ready to transform? Whether you’re a seasoned lifter or just starting your fitness journey, we’re here to help you get there. Reach out for membership info, class schedules, or personal training inquiries.`}
          </p>
        </div>
      </div>
      <div className="mt-14 flex flex-col gap-10 md:flex-row">
        <div className="w-[45%]">
          <p className="text-foreground/75 text-lg font-bio-rhyme font-semibold">
            <b className="text-xl text-accent inline-flex items-center">
              <MailQuestion
                className="inline-block mr-2"
                size={20}
                fill="red"
                stroke="black"
              />
              {`Email: `}
            </b>
            <Link
              href="mailto:er.shashankjaiswal@gmail.com"
              className="text-blue-300/75 group hover:underline ml-2 inline-flex items-center transition-all duration-300 ease-out"
            >
              er.shashankjaiswal@gmail.com
              <ArrowUpRight
                className="inline-block ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 ease-out"
                size={20}
              />
            </Link>
            <br /> <br />
            <br />
            <b className="text-xl text-accent inline-flex items-center">
              <MapPin
                className="inline-block mr-2"
                size={20}
                fill="red"
                stroke="black"
              />
              {`Location:`}
            </b>
            <br />
            {`42 Iron Street, Fitville, CA 90210`}
            <br /> <br /> <br />
            <b className="text-xl text-accent inline-flex items-center">
              <Clock
                className="inline-block mr-2"
                size={20}
                fill="gray"
                stroke="black"
              />
              {`Studio Hours:`}
            </b>
            <br />
            {`Mon–Fri: 5 AM – 10 PM | Sat–Sun: 7 AM – 8 PM`}
          </p>
        </div>
        <div className="w-[55%] font-bio-rhyme">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

