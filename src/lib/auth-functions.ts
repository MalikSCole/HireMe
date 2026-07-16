import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";

import { auth } from "./auth";

export const getSession = createServerFn({ method: "GET" }).handler(async () =>
  auth.api.getSession({ headers: getRequestHeaders() }),
);

export const ensureSession = createServerFn({ method: "GET" }).handler(async () => {
  const session = await auth.api.getSession({ headers: getRequestHeaders() });
  if (!session) throw new Error("Sign in to submit your solution.");
  return session;
});
