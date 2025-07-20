'use client';

import { Authenticator } from '@aws-amplify/ui-react';
import AuthGate from '@/components/AuthGate';
import '@aws-amplify/ui-react/styles.css';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <Authenticator>
      <AuthGate redirectTo="/login">{children}</AuthGate>
    </Authenticator>
  );
}