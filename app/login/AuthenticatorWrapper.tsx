'use client';
export const dynamic = "force-dynamic";

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import AuthGate from '@/components/AuthGate';

export default function AuthenticatorWrapper() {
  return (
    <Authenticator>
      <AuthGate showUserInfo redirectOnAuth="/"/>
    </Authenticator>
  );
}