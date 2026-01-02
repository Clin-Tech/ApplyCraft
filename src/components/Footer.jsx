import React from "react";

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
                <a href="/dashboard" className="hover:text-[#8a61ee]">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="/applications" className="hover:text-[#8a61ee]">
                  Applications
                </a>
              </li>
              <li>
                <a href="/analytics" className="hover:text-[#8a61ee]">
                  Analytics
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <a href="#" className="hover:text-[#8a61ee]">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#8a61ee]">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#8a61ee]">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 mt-10 pt-6 text-center text-xs text-slate-500">
          © 2025 ApplyCraft. All rights reserved. (ClinTech)
        </div>
      </div>
    </footer>
  );
};

export default Footer;
