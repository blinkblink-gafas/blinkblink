import type { NextPage } from "next";
import Head from "next/head";
import Section from "@/components/ui/Section";
import { useTranslation } from "@/lib/i18n";

const About: NextPage = () => {
  const t = useTranslation();

  return (
    <>
      <Head>
        <title>{t.pages.about.title}</title>
      </Head>

      <Section>
        <p className="text-body text-ink/60">{t.pages.about.placeholder}</p>
      </Section>
    </>
  );
};

export default About;
