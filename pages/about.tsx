import Link from "next/link";
import type { NextPage } from "next";
import Seo from "@/components/layout/Seo";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import { useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const valueCardColors = ["bg-primary", "bg-accent-pink text-white", "bg-accent-blue text-white"];

const About: NextPage = () => {
  const t = useTranslation();

  return (
    <>
      <Seo title={t.pages.about.title} description={t.pages.about.description} />

      <Section>
        <h1 className="max-w-3xl text-[40px] font-black leading-[1.05] tracking-[-0.03em] text-text-primary md:text-[56px]">
          {t.about.heading}
        </h1>
        <p className="mt-6 max-w-2xl text-body text-text-secondary md:text-lg">{t.about.intro}</p>

        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {t.about.values.map((value, index) => (
            <li
              key={value.title}
              className={cn(
                "rounded-2xl p-6",
                valueCardColors[index % valueCardColors.length]
              )}
            >
              <h2 className="text-xl font-black">{value.title}</h2>
              <p className="mt-2 text-body">{value.body}</p>
            </li>
          ))}
        </ul>

        <Button asChild size="lg" className="mt-12">
          <Link href="/category/all">{t.about.cta}</Link>
        </Button>
      </Section>
    </>
  );
};

export default About;
