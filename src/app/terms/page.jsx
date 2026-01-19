export const metadata = {
  title: "Terms of Service • ApplyCraft",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-14">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
          Terms of Service
        </h1>

        <p className="mt-3 text-sm text-slate-500">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="mt-8 space-y-8 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-slate-900">
              Service overview
            </h2>
            <p className="mt-2">
              ApplyCraft provides tools for tracking job applications and
              generating draft outreach materials. Drafts are suggestions only,
              you are responsible for reviewing and editing before sending.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900">No guarantees</h2>
            <p className="mt-2">
              We do not guarantee interviews, offers, or outcomes. AI-generated
              content may be inaccurate, incomplete, or inappropriate for a
              specific company’s expectations.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900">Your content</h2>
            <p className="mt-2">
              You control what you input. Do not upload confidential
              information, secrets, or anything you do not have permission to
              use. You are responsible for compliance with employer policies.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900">Acceptable use</h2>
            <ul className="mt-3 space-y-2">
              <li>• No harassment, spam campaigns, or impersonation</li>
              <li>
                • No attempts to break authentication, scrape data, or bypass
                RLS
              </li>
              <li>• No prompt-injection attempts to force system behavior</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900">Changes</h2>
            <p className="mt-2">
              We may update these terms to reflect product changes. Continued
              use means you accept the updated terms.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
