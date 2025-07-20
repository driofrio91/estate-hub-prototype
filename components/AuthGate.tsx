'use client';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface AuthGateProps {
  children?: React.ReactNode;
  /**
   * When provided, unauthenticated users will be redirected
   * to this path. If omitted, no redirect occurs.
   */
  redirectTo?: string;
  /**
   * When provided, authenticated users will be redirected to this path.
   * Useful for login pages that should navigate elsewhere after sign in.
   */
  redirectOnAuth?: string;
  /**
   * Show the current user and a sign out button when authenticated.
   */
  showUserInfo?: boolean;
}

export default function AuthGate({
  children,
  redirectTo,
  redirectOnAuth,
  showUserInfo = false,
}: AuthGateProps) {
  const { authStatus, user, signOut } = useAuthenticator();
  const router = useRouter();

  useEffect(() => {
    if (authStatus === 'unauthenticated' && redirectTo) {
      router.replace(redirectTo);
    }
    if (authStatus === 'authenticated' && redirectOnAuth) {
      router.replace(redirectOnAuth);
    }
  }, [authStatus, redirectTo, redirectOnAuth, router]);

  if (authStatus === 'configuring') {
    return <div>Loading...</div>;
  }

  if (authStatus === 'unauthenticated') {
    return null;
  }

  if (showUserInfo) {
    return (
      <main>
        <h1>Hello {user?.username}</h1>
        <button onClick={signOut}>Sign Out</button>
      </main>
    );
  }

  return <>{children}</>;
}