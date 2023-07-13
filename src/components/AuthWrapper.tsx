import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import ProtectedRoute from "./ProtectedRoute";

const authRoutes = [
  "/bookmarks",
  "/following",
  "/list/[userId]",
  "/list/[userId]/[listId]",
  "/status/[statusId]",
  "/[userId]/[username]",
  "/[userId]/[username]/followers",
  "/[userId]/[username]/following",
];

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();
  const router = useRouter();

  if (session.status === "loading") return null;

  return (
    <>
      {authRoutes.includes(router.pathname) ? (
        <ProtectedRoute>{children}</ProtectedRoute>
      ) : (
        children
      )}
    </>
  );
};

export default AuthWrapper;
