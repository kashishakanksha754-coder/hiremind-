import Link from "next/link";
import { Brain } from "lucide-react";

export default function CookiePolicyPage() {
  return (
    <main className="grid-bg min-h-screen bg-bg-primary">
      <div className="container">
        <div className="mx-auto max-w-3xl py-16">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-text-secondary transition-colors hover:text-text-primary"
          >
            <Brain className="h-5 w-5 text-accent-blue" />
            <span className="font-display font-semibold">Recruit AI</span>
          </Link>

          <h1 className="font-display text-4xl font-bold text-text-primary">
            Cookie <span className="gradient-text">Policy</span>
          </h1>
          <p className="mt-3 text-text-secondary">Last updated: 17 June 2026</p>

          <section>
            <h2 className="mt-12 mb-4 font-display text-2xl font-semibold text-text-primary">
              What Are Cookies
            </h2>
            <div className="space-y-4 leading-relaxed text-text-secondary">
              <p>
                Cookies are small text files placed on your device when you visit
                a website. They allow the site to recognise your device, remember
                your preferences, and understand how the service is used. This
                Cookie Policy explains how Recruit AI uses cookies and similar
                technologies, such as local storage and pixels, across our
                platform.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mt-12 mb-4 font-display text-2xl font-semibold text-text-primary">
              How We Use Cookies
            </h2>
            <div className="space-y-4 leading-relaxed text-text-secondary">
              <p>
                We use cookies to keep you signed in, remember your settings,
                keep the platform secure, and measure and improve performance. We
                only set non-essential cookies, such as analytics cookies, where
                you have given consent through our consent banner, in line with
                the DPDP Act and GDPR. The table below summarises the categories
                of cookies we use.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-bg-secondary text-text-primary">
                      <th className="border border-border-subtle px-4 py-3 text-left">
                        Category
                      </th>
                      <th className="border border-border-subtle px-4 py-3 text-left">
                        Purpose
                      </th>
                      <th className="border border-border-subtle px-4 py-3 text-left">
                        Example
                      </th>
                      <th className="border border-border-subtle px-4 py-3 text-left">
                        Duration
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-border-subtle px-4 py-3 text-left text-text-secondary">
                        Strictly Necessary
                      </td>
                      <td className="border border-border-subtle px-4 py-3 text-left text-text-secondary">
                        Enable core functions such as authentication, session
                        management and security. The platform cannot function
                        without these.
                      </td>
                      <td className="border border-border-subtle px-4 py-3 text-left text-text-secondary">
                        hm_session, hm_csrf
                      </td>
                      <td className="border border-border-subtle px-4 py-3 text-left text-text-secondary">
                        Session to 1 year
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-border-subtle px-4 py-3 text-left text-text-secondary">
                        Functional / Preferences
                      </td>
                      <td className="border border-border-subtle px-4 py-3 text-left text-text-secondary">
                        Remember your choices, such as language, theme and
                        interface preferences.
                      </td>
                      <td className="border border-border-subtle px-4 py-3 text-left text-text-secondary">
                        hm_prefs, hm_locale
                      </td>
                      <td className="border border-border-subtle px-4 py-3 text-left text-text-secondary">
                        Up to 1 year
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-border-subtle px-4 py-3 text-left text-text-secondary">
                        Analytics
                      </td>
                      <td className="border border-border-subtle px-4 py-3 text-left text-text-secondary">
                        Help us understand how users interact with the platform
                        so we can improve it.
                      </td>
                      <td className="border border-border-subtle px-4 py-3 text-left text-text-secondary">
                        _ga, hm_analytics
                      </td>
                      <td className="border border-border-subtle px-4 py-3 text-left text-text-secondary">
                        Up to 2 years
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-border-subtle px-4 py-3 text-left text-text-secondary">
                        Performance
                      </td>
                      <td className="border border-border-subtle px-4 py-3 text-left text-text-secondary">
                        Monitor load times, errors and reliability to optimise
                        platform performance.
                      </td>
                      <td className="border border-border-subtle px-4 py-3 text-left text-text-secondary">
                        hm_perf, hm_trace
                      </td>
                      <td className="border border-border-subtle px-4 py-3 text-left text-text-secondary">
                        Session to 30 days
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mt-12 mb-4 font-display text-2xl font-semibold text-text-primary">
              Managing Cookies
            </h2>
            <div className="space-y-4 leading-relaxed text-text-secondary">
              <p>
                You can manage your cookie preferences at any time through our
                consent banner, which lets you accept or reject non-essential
                cookie categories. You can also control cookies through your
                browser settings, including blocking or deleting existing
                cookies. Please note that disabling strictly necessary cookies
                may prevent parts of the Recruit AI platform from functioning
                correctly.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mt-12 mb-4 font-display text-2xl font-semibold text-text-primary">
              Third-Party Cookies
            </h2>
            <div className="space-y-4 leading-relaxed text-text-secondary">
              <p>
                Some cookies are set by third-party providers that we use to
                deliver and improve the Service, such as analytics and payment
                providers. These third parties may process data in accordance
                with their own privacy policies. We only enable non-essential
                third-party cookies where you have given consent.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mt-12 mb-4 font-display text-2xl font-semibold text-text-primary">
              Changes
            </h2>
            <div className="space-y-4 leading-relaxed text-text-secondary">
              <p>
                We may update this Cookie Policy from time to time to reflect
                changes in the cookies we use or for legal reasons. When we make
                material changes, we will update the "Last updated" date above.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mt-12 mb-4 font-display text-2xl font-semibold text-text-primary">
              Contact
            </h2>
            <div className="space-y-4 leading-relaxed text-text-secondary">
              <p>
                If you have questions about our use of cookies, please contact us
                at{" "}
                <Link
                  href="mailto:privacy@recruitai.app"
                  className="text-accent-blue hover:underline"
                >
                  privacy@recruitai.app
                </Link>
                .
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
