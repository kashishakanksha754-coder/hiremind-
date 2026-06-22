import Link from "next/link";
import { Brain } from "lucide-react";

export default function TermsOfServicePage() {
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
            Terms of <span className="gradient-text">Service</span>
          </h1>
          <p className="mt-3 text-text-secondary">Last updated: 17 June 2026</p>

          <section>
            <h2 className="mt-12 mb-4 font-display text-2xl font-semibold text-text-primary">
              Acceptance of Terms
            </h2>
            <div className="space-y-4 leading-relaxed text-text-secondary">
              <p>
                These Terms of Service ("Terms") govern your access to and use of
                the Recruit AI platform and related services (the "Service"). By
                creating an account, accessing or using the Service, you agree to
                be bound by these Terms. If you are entering into these Terms on
                behalf of an organisation, you represent that you have authority
                to bind that organisation.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mt-12 mb-4 font-display text-2xl font-semibold text-text-primary">
              Description of Service
            </h2>
            <div className="space-y-4 leading-relaxed text-text-secondary">
              <p>
                Recruit AI is an AI-assisted recruitment platform that helps
                employers screen candidates, conduct AI voice interviews,
                transcribe and assess responses, and generate scores and
                summaries to support hiring decisions. The Service is provided on
                a software-as-a-service basis and may evolve over time as we add,
                modify or remove features.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mt-12 mb-4 font-display text-2xl font-semibold text-text-primary">
              Accounts &amp; Eligibility
            </h2>
            <div className="space-y-4 leading-relaxed text-text-secondary">
              <p>
                To use the Service you must be at least 18 years old and capable
                of forming a binding contract. You are responsible for
                maintaining the confidentiality of your account credentials and
                for all activity that occurs under your account. You must provide
                accurate information and keep it up to date, and you must notify
                us promptly of any unauthorised use of your account.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mt-12 mb-4 font-display text-2xl font-semibold text-text-primary">
              Acceptable Use
            </h2>
            <div className="space-y-4 leading-relaxed text-text-secondary">
              <p>You agree not to:</p>
              <ul className="list-disc space-y-2 pl-6 text-text-secondary">
                <li>
                  Use the Service for any unlawful, discriminatory or fraudulent
                  purpose.
                </li>
                <li>
                  Upload candidate data that you are not authorised to process.
                </li>
                <li>
                  Attempt to reverse engineer, disrupt or gain unauthorised
                  access to the Service or its underlying models.
                </li>
                <li>
                  Use the Service to build a competing product or to train
                  competing AI models.
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="mt-12 mb-4 font-display text-2xl font-semibold text-text-primary">
              Customer (Recruiter) Obligations
            </h2>
            <div className="space-y-4 leading-relaxed text-text-secondary">
              <p>
                As a recruiter using Recruit AI, you act as the Data Fiduciary or
                Data Controller in respect of the candidate data you process
                through the Service, and Recruit AI acts as your processor. You are
                responsible for ensuring that you have a valid lawful basis to
                collect and process candidate data, including CVs, voice
                interview recordings and assessment results, and for providing
                candidates with required notices and obtaining any necessary
                consent under the DPDP Act, GDPR and other applicable laws. You
                must only use the Service in compliance with applicable
                employment and anti-discrimination laws.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mt-12 mb-4 font-display text-2xl font-semibold text-text-primary">
              AI Outputs Disclaimer
            </h2>
            <div className="space-y-4 leading-relaxed text-text-secondary">
              <p>
                The scores, rankings, summaries and recommendations produced by
                Recruit AI are generated by automated models and are provided as
                decision-support only. They may contain errors or biases and
                should not be treated as definitive. The recruiter retains sole
                and final responsibility for all hiring decisions and must apply
                independent human judgement before rejecting or advancing any
                candidate. Recruit AI does not guarantee any particular outcome and
                disclaims liability for decisions made in reliance on AI outputs.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mt-12 mb-4 font-display text-2xl font-semibold text-text-primary">
              Fees &amp; Billing
            </h2>
            <div className="space-y-4 leading-relaxed text-text-secondary">
              <p>
                Recruit AI may offer a free trial that converts to a paid plan
                unless cancelled before the trial ends. Paid subscriptions are
                billed in advance on a recurring basis according to the plan you
                select:
              </p>
              <ul className="list-disc space-y-2 pl-6 text-text-secondary">
                <li>
                  <strong className="text-text-primary">Pro:</strong> ₹9,999 per
                  month, billed monthly.
                </li>
                <li>
                  <strong className="text-text-primary">Enterprise:</strong>{" "}
                  custom pricing under a separate order form.
                </li>
              </ul>
              <p>
                Fees are non-refundable except where required by law. We may
                change our fees on prospective renewal with reasonable notice.
                Late or failed payments may result in suspension of the Service.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mt-12 mb-4 font-display text-2xl font-semibold text-text-primary">
              Intellectual Property
            </h2>
            <div className="space-y-4 leading-relaxed text-text-secondary">
              <p>
                Recruit AI and its licensors retain all rights, title and interest
                in and to the Service, including all software, models, designs
                and trademarks. You retain ownership of the data you submit. You
                grant us a limited licence to process your data solely to provide
                and improve the Service in accordance with these Terms and our
                Privacy Policy.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mt-12 mb-4 font-display text-2xl font-semibold text-text-primary">
              Confidentiality
            </h2>
            <div className="space-y-4 leading-relaxed text-text-secondary">
              <p>
                Each party may receive confidential information from the other.
                The receiving party agrees to protect such information using
                reasonable care, to use it only for purposes of the Service, and
                not to disclose it except to personnel and sub-processors who
                need to know and are bound by similar obligations.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mt-12 mb-4 font-display text-2xl font-semibold text-text-primary">
              Termination
            </h2>
            <div className="space-y-4 leading-relaxed text-text-secondary">
              <p>
                You may terminate your account at any time. We may suspend or
                terminate your access if you breach these Terms, fail to pay
                fees, or use the Service in a manner that creates legal or
                security risk. Upon termination, your right to use the Service
                ceases and we will handle your data in accordance with our
                Privacy Policy and applicable law.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mt-12 mb-4 font-display text-2xl font-semibold text-text-primary">
              Limitation of Liability
            </h2>
            <div className="space-y-4 leading-relaxed text-text-secondary">
              <p>
                To the maximum extent permitted by law, Recruit AI shall not be
                liable for any indirect, incidental, special, consequential or
                punitive damages, or for loss of profits, data or goodwill. Our
                total aggregate liability arising out of or relating to the
                Service shall not exceed the amounts paid by you to Recruit AI in
                the twelve months preceding the event giving rise to the claim.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mt-12 mb-4 font-display text-2xl font-semibold text-text-primary">
              Indemnity
            </h2>
            <div className="space-y-4 leading-relaxed text-text-secondary">
              <p>
                You agree to indemnify and hold harmless Recruit AI and its
                affiliates from any claims, damages, liabilities and expenses
                arising out of your use of the Service, your candidate data, or
                your breach of these Terms or applicable law, including any
                claim that your processing of candidate data lacked a valid
                lawful basis.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mt-12 mb-4 font-display text-2xl font-semibold text-text-primary">
              Governing Law
            </h2>
            <div className="space-y-4 leading-relaxed text-text-secondary">
              <p>
                These Terms are governed by the laws of India. The courts located
                in Bengaluru, Karnataka shall have exclusive jurisdiction over
                any disputes arising out of or in connection with these Terms or
                the Service.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mt-12 mb-4 font-display text-2xl font-semibold text-text-primary">
              Changes
            </h2>
            <div className="space-y-4 leading-relaxed text-text-secondary">
              <p>
                We may update these Terms from time to time. When we make
                material changes, we will update the "Last updated" date above
                and, where appropriate, notify you. Your continued use of the
                Service after changes take effect constitutes acceptance of the
                revised Terms.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mt-12 mb-4 font-display text-2xl font-semibold text-text-primary">
              Contact
            </h2>
            <div className="space-y-4 leading-relaxed text-text-secondary">
              <p>
                Questions about these Terms can be directed to{" "}
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
