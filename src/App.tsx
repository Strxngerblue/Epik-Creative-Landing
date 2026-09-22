import AboutSection from "./components/AboutSection";
import CreativePackages from "./components/CreativePackages";
import DecorativeBlobs from "./components/DecorativeBlobs";
import FaqSection from "./components/FaqSection";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import ProcessSteps from "./components/ProcessSteps";
import ServicesCarousel from "./components/ServicesCarousel";
import StatsBar from "./components/StatsBar";
import StreamsPackages from "./components/StreamsPackages";

function App() {
  return (
    <div className="relative bg-black">
      <DecorativeBlobs />
      <Navbar />
      <main className="relative">
        <Hero />
        <StatsBar />
        <AboutSection />
        <ServicesCarousel />
        <StreamsPackages />
        <CreativePackages />
        <ProcessSteps />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
