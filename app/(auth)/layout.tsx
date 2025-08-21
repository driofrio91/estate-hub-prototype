"use client";

import { Authenticator } from "@aws-amplify/ui-react";
import AuthGate from "@/components/AuthGate";
import "@aws-amplify/ui-react/styles.css";
import SideNav from "@/app/(auth)/dashboard/side-nav";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Authenticator>
      <AuthGate redirectTo="/login">
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
          <div className="w-full flex-none md:w-64">
            <SideNav />
          </div>
          <div className="grow p-6 md:overflow-y-auto md:p-12">{children}</div>
        </div>
      </AuthGate>
    </Authenticator>
  );
}
