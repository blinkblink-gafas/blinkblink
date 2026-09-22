import type { NextPage } from "next";
import Head from "next/head";
import Section from "@/components/ui/Section";

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>About — blink blink</title>
      </Head>

      <Section>
        <p className="text-body text-ink/60">About page scaffold — content coming soon.</p>
      </Section>
    </>
  );
};

export default About;
