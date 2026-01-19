export const metadata = {
  title: "About • ApplyCraft",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-14">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
          About ApplyCraft
        </h1>

        <p className="mt-4 text-slate-700 leading-relaxed">
          ApplyCraft helps job seekers stay organized and move faster by
          combining application tracking with AI-assisted outreach drafts.
        </p>

        <div className="mt-10 space-y-8">
          <section className="rounded-2xl border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-900">What it does</h2>
            <ul className="mt-3 space-y-2 text-slate-700">
              <li>• Track job applications (company, role, status, notes)</li>
              <li>
                • Generate drafts for LinkedIn DMs, emails, and cover letters
              </li>
              <li>• Save generated drafts back to your application record</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-900">How AI is used</h2>
            <p className="mt-3 text-slate-700 leading-relaxed">
              When you click generate, ApplyCraft sends the job description and
              the profile fields you provided (headline, summary, skills, and
              optional name) to an AI provider to produce text drafts. You can
              edit everything before using it.
            </p>
          </section>

          {/* <section className="rounded-2xl border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-900">Contact</h2>
            <p className="mt-3 text-slate-700">
              Questions? Reach out via your preferred channel or add a support
              email here later.
            </p>
          </section> */}
        </div>
      </div>
    </main>
  );
}
