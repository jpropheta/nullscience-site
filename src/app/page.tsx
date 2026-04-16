import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import CrisisLab from "@/components/CrisisLab";
import WhyItMatters from "@/components/WhyItMatters";
import HowItWorks from "@/components/HowItWorks";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <CrisisLab />
      <WhyItMatters />
      <HowItWorks />
      <Contact />
      <Footer />
    </main>
  );
}
