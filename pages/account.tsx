import type { NextPage } from "next";
import Seo from "@/components/layout/Seo";
import EmptyState from "@/components/ui/EmptyState";
import Section from "@/components/ui/Section";
import { useTranslation } from "@/lib/i18n";

/** Placeholder until customer accounts exist — keeps the Navbar link from 404ing. */
const AccountPage: NextPage = () => {
  const t = useTranslation();

  return (
    <>
      <Seo title={t.pages.account.title} noIndex />
      <Section>
        <EmptyState
          isPageHeading
          heading={t.account.heading}
          message={t.account.message}
          actionLabel={t.account.wishlistLink}
          actionHref="/wishlist"
        />
      </Section>
    </>
  );
};

export default AccountPage;
