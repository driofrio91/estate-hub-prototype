import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { runWithAmplifyServerContext } from '@/lib/amplifyServerUtils';
import { getCurrentUser } from 'aws-amplify/auth/server';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const authenticated = await runWithAmplifyServerContext({
    nextServerContext: { request, response },
    operation: async (contextSpec) => {
      try {
        await getCurrentUser(contextSpec);
        return true;
      } catch {
        return false;
      }
    },
  });

  const path = request.nextUrl.pathname;

  if (!authenticated && path !== '/login') {
    const url = new URL('/login', request.url);
    return NextResponse.redirect(url);
  }

  if (authenticated && path === '/login') {
    console.log('Redirecting authenticated user from /login to /');
    const url = new URL('/', request.url);
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/|favicon.ico).*)'],
};
