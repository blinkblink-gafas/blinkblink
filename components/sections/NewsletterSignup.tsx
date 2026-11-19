import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import Section from "@/components/ui/Section";
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
    <Section>
      <div className="grid items-end gap-6 bg-accent-pink px-6 py-10 text-white md:grid-cols-2 md:px-10 md:py-12">
        <div>
          <h2 className="font-display text-[44px] font-extrabold uppercase leading-[0.9] sm:text-[56px]">{t.newsletter.heading}</h2>
          <p className="mt-2 text-small">{t.newsletter.body}</p>
        </div>

        {isSubscribed ? (
          <p role="status" className="flex items-center gap-2 bg-white px-5 py-4 text-small font-semibold text-ink">
            <Check size={18} className="shrink-0 text-accent-pink" aria-hidden="true" />
            {t.newsletter.success}
          </p>
        ) : (
          <form noValidate onSubmit={handleSubmit}>
            <div className="flex items-center border-b-2 border-white">
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
                className="min-w-0 flex-1 bg-transparent py-3 text-body text-white outline-none placeholder:text-white/75"
              />
              <button
                type="submit"
                aria-label={t.newsletter.submit}
                className="grid h-11 w-11 shrink-0 place-items-center text-white transition-transform hover:translate-x-1"
              >
                <ArrowRight size={22} />
              </button>
            </div>
            {error && (
              <p id="newsletter-error" className="mt-2 text-small font-semibold text-white">
                {error}
              </p>
            )}
          </form>
        )}
      </div>
    </Section>
  );
}
