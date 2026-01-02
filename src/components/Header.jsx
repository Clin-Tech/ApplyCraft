"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Briefcase, LogOut, User, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [clickedNav, setClickedNav] = useState(null);
  const router = useRouter();
  const dropdownRef = useRef(null);

  const navLinks = [
    { id: 1, href: "/dashboard", label: "Dashboard" },
    { id: 2, href: "/applications", label: "Applications" },
    // { id: 3, href: "/analytics", label: "Analytics" },
  ];

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    }
    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    }

    if (userMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [userMenuOpen]);

  async function handleLogout() {
    await supabase.auth.signOut();
    setUserMenuOpen(false);
    router.push("/login");
  }

  const getUserInitials = () => {
    if (!user?.email) return "GU";
    const email = user.email;
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#8a61ee] to-[#6b46cc] flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
            <Briefcase className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-[#8a61ee] to-[#6b46cc] bg-clip-text text-transparent">
            ApplyCraft
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              onClick={() => setClickedNav(link.id)}
              className={` ${clickedNav === 1 ? "text-[#8a61ee] border-b-2 border-[#8a61ee]" : "text-slate-600"} text-sm font-medium  hover:text-[#8a61ee] transition-colors relative group`}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#8a61ee] group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </nav>

        {user && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#8a61ee] to-[#6b46cc] flex items-center justify-center text-white text-xs font-semibold shadow-md">
                {getUserInitials()}
              </div>
              <span className="text-sm text-slate-600 max-w-[150px] truncate">
                {user?.email || "guest@example.com"}
              </span>
              <ChevronDown
                className={`h-4 w-4 text-slate-400 transition-transform ${
                  userMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-3 border-b border-slate-200">
                  <p className="text-sm font-medium text-slate-900">
                    Signed in as
                  </p>
                  <p className="text-sm text-slate-600 truncate">
                    {user?.email || "guest@example.com"}
                  </p>
                </div>

                <Link
                  href="/settings"
                  onClick={() => setUserMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <User className="h-4 w-4" />
                  Profile Settings
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        )}

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-slate-600" />
          ) : (
            <Menu className="h-6 w-6 text-slate-600" />
          )}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden animate-in slide-in-from-top-2 bg-white border-b border-slate-200 px-4 py-4">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-slate-700 hover:text-[#8a61ee] transition-colors py-2"
              >
                {link.label}
              </Link>
            ))}

            {user && (
              <div className="flex flex-col">
                <div className="flex items-center gap-3 mt-3 pt-4 border-t border-slate-200">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#8a61ee] to-[#6b46cc] flex items-center justify-center text-white text-xs font-semibold">
                    {getUserInitials()}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">
                      Your Account
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {user?.email || "guest@example.com"}
                    </p>
                  </div>
                </div>

                <Link
                  href="/settings"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  <User className="h-4 w-4" />
                  Profile Settings
                </Link>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
