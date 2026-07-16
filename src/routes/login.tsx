import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import type { FormEvent } from "react";

import { authClient } from "../lib/auth-client";

export const Route = createFileRoute("/login")({ component: LoginPage });

function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email"));
    const password = String(form.get("password"));
    const username = String(form.get("username") ?? "");

    const response = mode === "signup"
      ? await authClient.signUp.email({ email, password, name: username })
      : await authClient.signIn.email({ email, password });

    if (response.error) {
      setError(response.error.message ?? "Authentication failed.");
      setPending(false);
      return;
    }

    await navigate({ to: "/problems" });
  }

  return (
    <main className="mx-auto max-w-md p-6 pt-12">
      <h1 className="text-3xl font-bold">{mode === "signin" ? "Welcome back" : "Create your account"}</h1>
      <p className="mt-2 text-gray-600">Sign in to submit solutions and track your progress.</p>

      <form onSubmit={(event) => void handleSubmit(event)} className="mt-8 space-y-5 rounded-lg border p-6 shadow-sm">
        {mode === "signup" && (
          <label className="block text-sm font-medium">
            Username
            <input name="username" required minLength={2} maxLength={50} autoComplete="username" className="mt-1 w-full rounded border px-3 py-2" />
          </label>
        )}
        <label className="block text-sm font-medium">
          Email
          <input name="email" type="email" required autoComplete="email" className="mt-1 w-full rounded border px-3 py-2" />
        </label>
        <label className="block text-sm font-medium">
          Password
          <input name="password" type="password" required minLength={8} maxLength={128} autoComplete={mode === "signin" ? "current-password" : "new-password"} className="mt-1 w-full rounded border px-3 py-2" />
        </label>
        {error && <p className="text-sm text-red-700" role="alert">{error}</p>}
        <button disabled={pending} className="w-full rounded bg-blue-600 px-4 py-2 font-medium text-white disabled:opacity-50">
          {pending ? "Please wait..." : mode === "signin" ? "Sign in" : "Create account"}
        </button>
      </form>

      <button type="button" onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setError(null); }} className="mt-5 text-sm font-medium text-blue-700 hover:underline">
        {mode === "signin" ? "Need an account? Sign up" : "Already have an account? Sign in"}
      </button>
      <p className="mt-6 text-sm"><Link to="/problems" className="underline">Continue browsing without signing in</Link></p>
    </main>
  );
}
