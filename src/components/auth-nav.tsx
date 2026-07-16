import { Link, useNavigate } from "@tanstack/react-router";

import { authClient } from "../lib/auth-client";

export function AuthNav() {
  const navigate = useNavigate();
  const { data: session, isPending } = authClient.useSession();

  if (isPending) return <span className="text-sm text-gray-500">Loading...</span>;

  if (!session) {
    return (
      <Link to="/login" className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white">Sign in</Link>
    );
  }

  return (
    <div className="flex items-center gap-4 text-sm">
      <Link to="/dashboard" className="font-medium hover:underline">Dashboard</Link>
      <Link to="/submissions" className="font-medium hover:underline">Submissions</Link>
      <span className="text-gray-600">{session.user.name}</span>
      <button
        type="button"
        className="rounded border px-3 py-2"
        onClick={() => void authClient.signOut({ fetchOptions: { onSuccess: () => void navigate({ to: "/" }) } })}
      >
        Sign out
      </button>
    </div>
  );
}
