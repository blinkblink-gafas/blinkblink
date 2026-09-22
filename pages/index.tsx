import type { NextPage } from "next";
import Head from "next/head";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import { useTranslation } from "@/lib/i18n";

const Home: NextPage = () => {
  const t = useTranslation();

  return (
    <>
      <Head>
        <title>{t.pages.home.title}</title>
        <meta
          name="description"
          content={t.pages.home.description}
        />
      </Head>

      <Navbar />
      <Hero />
    </>
  );
};

export default Home;
