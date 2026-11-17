"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { KeyRound } from "lucide-react";
import { Button, Input, PageLoader } from "@/components/ui";
import { useShop } from "@/context/ShopContext";
import { StoreLogo } from "@/components/store/StoreLogo";

export default function ChangePasswordPage() {
  const { user, authLoading, refreshUser, toast } = useShop();
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authLoading && !user) router.replace("/login?next=/change-password");
  }, [authLoading, router, user]);

  if (authLoading || !user) return <div className="mx-auto max-w-7xl px-4 py-10"><PageLoader message="Loading password settings..." /></div>;

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }
    if (newPassword.length < 12) {
      setError("Choose a password with at least 12 characters");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/auth/password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const result = await response.json();
      if (!response.ok) {
        setError(result.error || "Password change failed");
        return;
      }

      await refreshUser();
      toast("Password updated", { message: "Your password was changed successfully." });
      router.replace(user.role === "admin" || user.role === "staff" ? "/admin" : "/account");
    } catch {
      setError("Unable to update your password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-12">
      <div className="flex items-center gap-2.5">
        <StoreLogo className="h-11 w-11 rounded-2xl shadow-lg shadow-brand-600/25" />
        <p className="text-2xl font-black">Luicie<span className="text-brand-600">.Space</span></p>
      </div>
      <div className="mt-6 w-full max-w-md rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">
        <div className="flex items-center gap-2">
          <KeyRound size={20} className="text-brand-600" />
          <h1 className="text-xl font-black text-slate-900">Change password</h1>
        </div>
        <p className="mt-2 text-sm text-slate-500">
          {user.mustChangePassword
            ? "Your temporary password must be replaced before you continue."
            : "Enter your current password and choose a new one."}
        </p>
        <form onSubmit={submit} className="mt-5 space-y-4">
          <Input label="Current or temporary password" type="password" autoComplete="current-password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} required />
          <Input label="New password" type="password" autoComplete="new-password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} minLength={12} required />
          <Input label="Confirm new password" type="password" autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} minLength={12} required />
          {error && <p className="rounded-xl bg-red-50 p-3 text-[13px] font-semibold text-red-600">{error}</p>}
          <Button type="submit" loading={loading} className="w-full" size="lg">Update Password</Button>
        </form>
      </div>
    </div>
  );
}
