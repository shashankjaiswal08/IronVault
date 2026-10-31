import About from "@/components/About";
import Hero from "@/components/Hero";
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
      </main>
    </>
  );
}
