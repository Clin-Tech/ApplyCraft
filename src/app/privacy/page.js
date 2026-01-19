export const metadata = {
  title: "Privacy Policy • ApplyCraft",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-14">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
          Privacy Policy
        </h1>

        <p className="mt-3 text-sm text-slate-500">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="mt-8 space-y-8 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-slate-900">
              What we collect
            </h2>
            <p className="mt-2">
              ApplyCraft stores the information you enter into the product,
              including job application details (e.g., company, role title, job
              description) and any profile fields you choose to provide (e.g.,
              headline, summary, skills, name).
            </p>
            <p className="mt-2">
              When you generate outreach, we also store the generated drafts
              back into your application record (LinkedIn DM, email, and cover
              letter).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900">
              AI processing (Groq)
            </h2>
            <p className="mt-2">
              When you request generation, ApplyCraft sends the following
              information to our AI provider (Groq) to produce drafts:
            </p>
            <ul className="mt-3 space-y-2">
              <li>
                • Job description, company, and role title (from your saved
                application)
              </li>
              <li>
                • Your provided profile fields: headline, summary, skills, and
                optional name
              </li>
            </ul>
            <p className="mt-3">
              Do not include passwords, API keys, private tokens, financial
              details, or other sensitive secrets in job descriptions or profile
              fields. If you paste sensitive data, it may be transmitted to the
              AI provider during generation.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900">Authentication</h2>
            <p className="mt-2">
              Authentication is handled using Supabase. ApplyCraft identifies
              you via your Supabase session token when you call protected
              endpoints.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900">
              How we use your data
            </h2>
            <ul className="mt-3 space-y-2">
              <li>
                • Provide core features (tracking, saving, generating drafts)
              </li>
              <li>• Prevent abuse and maintain security</li>
              <li>
                • Improve reliability and debugging (development environments)
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900">Data retention</h2>
            <p className="mt-2">
              Your content remains stored until you delete it inside the product
              or you request removal (if you later add a support channel).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900">Security note</h2>
            <p className="mt-2">
              No system is perfectly secure. The biggest practical risks are (1)
              accidentally pasting sensitive secrets into AI inputs, and (2)
              misconfigured database security policies. ApplyCraft relies on
              Supabase Row Level Security (RLS) to prevent cross-user access.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
