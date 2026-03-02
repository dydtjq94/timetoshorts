import Navigation from "@/components/Navigation";
import FullPageScroll from "@/components/FullPageScroll";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Service from "@/components/Service";
import Process from "@/components/Process";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Navigation />
      <FullPageScroll>
        <Hero />
        <About />
        <Service />
        <Process />
        <Pricing />
        <Contact />
      </FullPageScroll>
    </>
  );
}
