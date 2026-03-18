import Hero from "../components/Hero";
import About from "../components/About";
import HowItWorks from "../components/HowItWorks";

export default function Home({ analyzedCount }: { analyzedCount: number }) {
  return (
    <>
      <section className="hero" style={{ width: "100%" }}>
        <Hero analyzedCount={analyzedCount} />
      </section>
      <About />
      <HowItWorks />
    </>
  );
}