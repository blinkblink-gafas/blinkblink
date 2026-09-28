import type { NextPage } from "next";
import Seo from "@/components/layout/Seo";
import EmptyState from "@/components/ui/EmptyState";
import Section from "@/components/ui/Section";
import { useTranslation } from "@/lib/i18n";

const NotFoundPage: NextPage = () => {
  const t = useTranslation();

  return (
    <>
      <Seo title={t.pages.notFound.title} noIndex />
      <Section>
        <EmptyState
          isPageHeading
          heading={t.notFound.heading}
          message={t.notFound.message}
          actionLabel={t.notFound.back}
          actionHref="/"
          className="min-h-[40vh] justify-center"
        />
      </Section>
    </>
  );
};

export default NotFoundPage;
