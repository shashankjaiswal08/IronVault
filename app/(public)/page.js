import About from "@/components/About";
import Contact from "@/components/Contact";
import FAQ from "@/components/FAQ";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import Trainers from "@/components/Trainers";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function Home() {
  return (
    <>
      <main className="min-h-screen flex flex-col">
        <Hero />
        <About />
        <Trainers />
        <WhyChooseUs />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
    </>
  );
}
