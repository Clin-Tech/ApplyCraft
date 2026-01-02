# ApplyCraft

ApplyCraft is a job application tracker that helps anyone (tech or non-tech) organize applications, save job details, write notes, and generate tailored outreach messages (LinkedIn DM, Email, Cover Letter) using AI.

## Features

- Auth (email/password)
- Per-user applications (Supabase RLS protected)
- Profile personalization (headline/summary/skills/full name)
- AI outreach generation + persistence (DM / Email / Cover Letter)
- Notes timeline per job (job_notes)
- Clean UI: empty states, loading skeletons, inline errors

## Tech Stack

- Next.js (App Router)
- Tailwind CSS
- Supabase (Auth + Postgres + RLS)
- Groq (LLM for text generation)

---

## Local Setup

### 1) Clone + install

```bash
git clone <your-repo-url>
cd applycraft
npm install
npm run dev
```
