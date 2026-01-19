import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2">
            <h3 className="text-lg font-bold text-slate-900">ApplyCraft</h3>
            <p className="text-sm text-slate-600 mt-2 max-w-md">
              Your AI-powered job application assistant. Track applications,
              generate outreach, and land your dream job.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 mb-3">Product</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/dashboard" className="hover:text-[#8a61ee]">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/applications" className="hover:text-[#8a61ee]">
                  Applications
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/about" className="hover:text-[#8a61ee]">
                  About
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#8a61ee]">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#8a61ee]">
                  Terms
                </Link>
              </li>
              <li>
                <a
                  href="mailto:clinapp3@gmail.com?subject=ApplyCraft%20Support"
                  className="hover:text-[#8a61ee]"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 mt-10 pt-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} ApplyCraft. All rights reserved.
          (ClinTech)
        </div>
      </div>
    </footer>
  );
};

export default Footer;
