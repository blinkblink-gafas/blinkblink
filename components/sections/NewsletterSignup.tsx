import { useState, type FormEvent } from "react";
import Image from "next/image";
import { ArrowRight, Check, Crown } from "lucide-react";
import Section from "@/components/ui/Section";
import { siteImages } from "@/lib/images";
import { isValidEmail } from "@/lib/checkout";
import { useTranslation } from "@/lib/i18n";

/**
 * "Join the Blink Club" email signup. There is no email service yet, so a
 * valid address just shows a thank-you. To go live, send `email` to your
 * provider (Mailchimp, Klaviyo, Brevo…) in `handleSubmit` — ideally via a
 * `pages/api/newsletter.ts` route so API keys stay on the server.
 */
export default function NewsletterSignup() {
  const t = useTranslation();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValidEmail(email)) {
      setError(t.newsletter.invalidEmail);
      return;
    }
    setError(null);
    setIsSubscribed(true);
  };

  return (
    <Section className="pb-12 pt-6 md:pb-16 md:pt-8 lg:pb-16 lg:pt-8">
      <div className="relative isolate grid items-center gap-6 overflow-hidden rounded-2xl bg-accent-pink px-6 py-8 md:grid-cols-[1fr_1.1fr_auto] md:px-10">
        <div>
          <h2 className="text-2xl font-black tracking-[-0.02em] text-white sm:text-3xl">{t.newsletter.heading}</h2>
          <p className="mt-1 text-small text-white/90">{t.newsletter.body}</p>
        </div>

        {isSubscribed ? (
          <p role="status" className="flex items-center gap-2 rounded-pill bg-white px-5 py-3 text-small font-semibold text-ink">
            <Check size={18} className="shrink-0 text-accent-pink" aria-hidden="true" />
            {t.newsletter.success}
          </p>
        ) : (
          <form noValidate onSubmit={handleSubmit}>
            <div className="flex items-center rounded-pill bg-white p-1.5 pl-5">
              <label htmlFor="newsletter-email" className="sr-only">
                {t.newsletter.emailLabel}
              </label>
              <input
                id="newsletter-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (error) setError(null);
                }}
                placeholder={t.newsletter.placeholder}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "newsletter-error" : undefined}
                className="min-w-0 flex-1 bg-transparent text-small text-ink outline-none placeholder:text-text-secondary"
              />
              <button
                type="submit"
                aria-label={t.newsletter.submit}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-white transition-colors hover:bg-ink/85"
              >
                <ArrowRight size={18} />
              </button>
            </div>
            {error && (
              <p id="newsletter-error" className="mt-2 pl-5 text-small font-semibold text-white">
                {error}
              </p>
            )}
          </form>
        )}

        <div aria-hidden="true" className="relative hidden h-28 w-44 md:block">
          <Crown className="absolute -top-2 left-2 h-8 w-8 -rotate-12 text-primary" strokeWidth={2.5} />
          <Image src={siteImages.newsletter.url} alt="" fill sizes="176px" className="object-contain photo-cutout" />
        </div>
      </div>
    </Section>
  );
}
