import Link from "next/link";
import { Brain } from "lucide-react";

export default function PrivacyPolicyPage() {
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
            Privacy <span className="gradient-text">Policy</span>
          </h1>
          <p className="mt-3 text-text-secondary">Last updated: 17 June 2026</p>

          <section>
            <h2 className="mt-12 mb-4 font-display text-2xl font-semibold text-text-primary">
              Introduction
            </h2>
            <div className="space-y-4 leading-relaxed text-text-secondary">
              <p>
                Recruit AI ("Recruit AI", "we", "us" or "our") provides an
                AI-assisted recruitment platform that helps employers screen,
                interview and evaluate job candidates. This Privacy Policy
                explains what personal data we collect, how we use it, the role
                that artificial intelligence plays in our service, and the
                rights you have over your information.
              </p>
              <p>
                We are committed to handling personal data lawfully, fairly and
                transparently. This policy is designed to align with the
                Digital Personal Data Protection Act, 2023 of India (the "DPDP
                Act") and the EU General Data Protection Regulation ("GDPR"),
                as well as other applicable data protection laws. Where we act
                as a Data Fiduciary or Data Controller, we are responsible for
                the purposes and means of processing; where we process
                candidate data on behalf of a recruiter, we act as a Data
                Processor under that recruiter's instructions.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mt-12 mb-4 font-display text-2xl font-semibold text-text-primary">
              Data We Collect
            </h2>
            <div className="space-y-4 leading-relaxed text-text-secondary">
              <p>
                We collect different categories of personal data depending on
                whether you are a recruiter using Recruit AI or a candidate
                applying through our platform.
              </p>
              <ul className="list-disc space-y-2 pl-6 text-text-secondary">
                <li>
                  <strong className="text-text-primary">
                    Recruiter account data:
                  </strong>{" "}
                  name, work email address, employer or organisation,
                  job title, account credentials, billing and payment details,
                  and product usage and support records.
                </li>
                <li>
                  <strong className="text-text-primary">
                    Candidate application data:
                  </strong>{" "}
                  curriculum vitae (CV) and résumé content, contact details,
                  work history and qualifications, voice interview recordings
                  and their transcripts, assessment and screening results, and
                  AI-generated scores and notes derived from the above.
                </li>
                <li>
                  <strong className="text-text-primary">Technical data:</strong>{" "}
                  IP address, device and browser information, log data and
                  cookie identifiers (see our Cookie Policy for details).
                </li>
              </ul>
              <p>
                We ask recruiters to ensure that candidates are informed about,
                and where required have consented to, the processing of their
                application data through Recruit AI.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mt-12 mb-4 font-display text-2xl font-semibold text-text-primary">
              How We Use Your Data
            </h2>
            <div className="space-y-4 leading-relaxed text-text-secondary">
              <p>We use personal data for the following purposes:</p>
              <ul className="list-disc space-y-2 pl-6 text-text-secondary">
                <li>To provide, operate and maintain the Recruit AI platform.</li>
                <li>
                  To analyse CVs, conduct AI voice interviews, transcribe
                  responses and generate candidate assessments and scores.
                </li>
                <li>
                  To authenticate users, manage subscriptions and process
                  payments.
                </li>
                <li>
                  To provide customer support and communicate service updates.
                </li>
                <li>
                  To improve and secure the platform and to comply with legal
                  obligations.
                </li>
              </ul>
              <p>
                Our legal bases for processing include the performance of a
                contract, our legitimate interests in operating the service,
                compliance with legal obligations, and consent where required
                under the DPDP Act and GDPR.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mt-12 mb-4 font-display text-2xl font-semibold text-text-primary">
              AI Processing &amp; Automated Decision-Making
            </h2>
            <div className="space-y-4 leading-relaxed text-text-secondary">
              <p>
                Recruit AI uses artificial intelligence to screen and score
                candidate applications. Our models analyse CV content, conduct
                structured voice interviews, transcribe and evaluate responses,
                and produce numerical scores and qualitative summaries intended
                to help recruiters compare candidates more consistently.
              </p>
              <p>
                These AI outputs are decision-support tools, not final
                decisions. Recruit AI does not make fully automated rejection
                decisions that produce legal or similarly significant effects
                on a candidate without human involvement. A recruiter retains
                responsibility for hiring decisions and must apply human
                judgement before rejecting or advancing a candidate.
              </p>
              <p>
                Consistent with Article 22 of the GDPR and the fairness
                principles of the DPDP Act, candidates have the right to obtain
                human review of any AI-assisted assessment, to express their
                point of view, and to contest an outcome. Requests for human
                review can be made through the recruiter handling the
                application or by contacting us using the details below.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mt-12 mb-4 font-display text-2xl font-semibold text-text-primary">
              Data Sharing &amp; Sub-processors
            </h2>
            <div className="space-y-4 leading-relaxed text-text-secondary">
              <p>
                We do not sell personal data. We share data only as necessary
                to deliver the service, including with:
              </p>
              <ul className="list-disc space-y-2 pl-6 text-text-secondary">
                <li>
                  Recruiters and their authorised team members, who receive the
                  candidate data submitted to their hiring workflows.
                </li>
                <li>
                  Trusted sub-processors that support cloud hosting, speech
                  transcription, large language model inference, analytics and
                  payment processing, each bound by data protection agreements.
                </li>
                <li>
                  Authorities or third parties where required by law or to
                  protect our rights, users or the public.
                </li>
              </ul>
              <p>
                A current list of material sub-processors is available on
                request from{" "}
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

          <section>
            <h2 className="mt-12 mb-4 font-display text-2xl font-semibold text-text-primary">
              Data Retention
            </h2>
            <div className="space-y-4 leading-relaxed text-text-secondary">
              <p>
                We retain personal data only for as long as necessary to fulfil
                the purposes for which it was collected, to comply with legal
                obligations, and to resolve disputes. Candidate application data
                is generally retained for the duration of the relevant hiring
                process and for a limited period afterwards as configured by the
                recruiter, after which it is deleted or anonymised. Recruiter
                account data is retained for the life of the account and a
                reasonable period thereafter for legal and accounting purposes.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mt-12 mb-4 font-display text-2xl font-semibold text-text-primary">
              Your Rights
            </h2>
            <div className="space-y-4 leading-relaxed text-text-secondary">
              <p>
                Subject to applicable law, you have the following rights under
                the GDPR and the DPDP Act:
              </p>
              <ul className="list-disc space-y-2 pl-6 text-text-secondary">
                <li>
                  <strong className="text-text-primary">Access:</strong> obtain
                  confirmation of, and a copy of, the personal data we hold
                  about you.
                </li>
                <li>
                  <strong className="text-text-primary">Correction:</strong>{" "}
                  request that inaccurate or incomplete data be corrected.
                </li>
                <li>
                  <strong className="text-text-primary">Deletion:</strong>{" "}
                  request erasure of your data where there is no overriding legal
                  basis to retain it.
                </li>
                <li>
                  <strong className="text-text-primary">Portability:</strong>{" "}
                  receive your data in a structured, commonly used format.
                </li>
                <li>
                  <strong className="text-text-primary">Objection:</strong>{" "}
                  object to certain processing, including processing based on
                  legitimate interests.
                </li>
                <li>
                  <strong className="text-text-primary">
                    Withdraw consent:
                  </strong>{" "}
                  withdraw consent at any time where processing is based on
                  consent, without affecting prior lawful processing.
                </li>
              </ul>
              <p>
                You also have the right to nominate another person to exercise
                your rights in the event of death or incapacity, as provided
                under the DPDP Act, and to lodge a complaint with a supervisory
                authority such as the Data Protection Board of India or a
                relevant EU authority.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mt-12 mb-4 font-display text-2xl font-semibold text-text-primary">
              Security
            </h2>
            <div className="space-y-4 leading-relaxed text-text-secondary">
              <p>
                We implement appropriate technical and organisational measures
                to protect personal data, including encryption in transit and at
                rest, access controls, network protections and regular security
                reviews. While no system can be guaranteed fully secure, we work
                continuously to safeguard the data entrusted to us and to detect
                and respond to incidents promptly.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mt-12 mb-4 font-display text-2xl font-semibold text-text-primary">
              International Transfers
            </h2>
            <div className="space-y-4 leading-relaxed text-text-secondary">
              <p>
                Recruit AI may process and store data in countries other than your
                own, including through cloud and AI sub-processors. Where data is
                transferred internationally, we rely on appropriate safeguards
                such as Standard Contractual Clauses and ensure that transfers
                comply with the cross-border transfer requirements of the GDPR
                and the DPDP Act.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mt-12 mb-4 font-display text-2xl font-semibold text-text-primary">
              Children&apos;s Data
            </h2>
            <div className="space-y-4 leading-relaxed text-text-secondary">
              <p>
                Recruit AI is intended for use in professional recruitment and is
                not directed at children. We do not knowingly collect personal
                data of children. Under the DPDP Act, processing of a child&apos;s
                data requires verifiable parental consent; if we become aware
                that we have collected such data without the required consent,
                we will delete it promptly.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mt-12 mb-4 font-display text-2xl font-semibold text-text-primary">
              Changes to This Policy
            </h2>
            <div className="space-y-4 leading-relaxed text-text-secondary">
              <p>
                We may update this Privacy Policy from time to time to reflect
                changes in our practices, technology or legal requirements. When
                we make material changes, we will update the "Last updated" date
                above and, where appropriate, notify you through the platform or
                by email.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mt-12 mb-4 font-display text-2xl font-semibold text-text-primary">
              Contact
            </h2>
            <div className="space-y-4 leading-relaxed text-text-secondary">
              <p>
                If you have questions about this Privacy Policy or wish to
                exercise your rights, please contact our privacy team at{" "}
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
