"use client";

import { useAuth } from "@/lib/auth-context";
import Landing from "@/components/Landing";
import AppShell from "@/components/AppShell";

export default function AppGate() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex-1 flex items-center justify-center" />;
  }

  return user ? <AppShell /> : <Landing />;
}