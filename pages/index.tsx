import type { NextPage } from "next";
import Head from "next/head";
import Section from "@/components/ui/Section";

/**
 * Home page scaffold. Sections (Navbar, Hero, product grid, etc.) are
 * intentionally not built yet — this file is just the routed entry point
 * so future section prompts have somewhere to slot in.
 */
const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>blink blink — bold eyewear</title>
        <meta
          name="description"
          content="blink blink — bold, playful eyewear for Gen-Z."
        />
      </Head>

      <Section>
        <p className="text-body text-ink/60">
          Home page scaffold — sections coming soon.
        </p>
      </Section>
    </>
  );
};

export default Home;
