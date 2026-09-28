import Link from "next/link";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import { PartyPopper } from "lucide-react";
import Seo from "@/components/layout/Seo";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import { formatTranslation, useTranslation } from "@/lib/i18n";

const OrderSuccessPage: NextPage = () => {
  const t = useTranslation();
  const { query } = useRouter();
  const orderId = typeof query.order === "string" ? query.order : "";

  return (
    <>
      <Seo title={t.pages.orderSuccess.title} noIndex />

      <Section>
        <div className="mx-auto flex max-w-lg flex-col items-center rounded-2xl border-3 border-ink bg-white p-8 text-center shadow-comic-lg">
          <span className="grid h-16 w-16 place-items-center rounded-full border-3 border-ink bg-primary">
            <PartyPopper size={30} aria-hidden="true" />
          </span>
          <h1 className="mt-5 text-h2 font-bold">{t.orderSuccess.heading}</h1>
          <p className="mt-3 text-body text-text-secondary">
            {formatTranslation(t.orderSuccess.message, { orderId })}
          </p>
          <Button asChild variant="secondary" className="mt-8">
            <Link href="/category/all">{t.orderSuccess.continue}</Link>
          </Button>
        </div>
      </Section>
    </>
  );
};

export default OrderSuccessPage;
