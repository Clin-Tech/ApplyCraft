"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";
import CustomLoader from "../../shared/CustomLoader";

export default function AuthLayout({ children }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  // useEffect(() => {
  //   async function verify() {
  //     const { data } = await supabase.auth.getSession();

  //     if (!data.session) {
  //       router.replace("/login");
  //     }

  //     setChecking(false);
  //   }

  //   verify();
  // }, []);

  // if (checking)
  // return (
  //   <div className="min-h-screen flex items-center justify-center text-slate-500">
  //     <CustomLoader message="Checking authentication…" />
  //   </div>
  // );

  return <>{children}</>;
}
