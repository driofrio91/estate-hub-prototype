import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@/amplify/data/resource';
import { AuthorizationMode } from '@/domain/auth/authModes';

type ClientMap = {
  [K in AuthorizationMode]: ReturnType<typeof generateClient<Schema>>;
};

export const clients: ClientMap = {
  [AuthorizationMode.API_KEY]:      generateClient<Schema>({ authMode: AuthorizationMode.API_KEY }),
  [AuthorizationMode.USER_POOL]:    generateClient<Schema>({ authMode: AuthorizationMode.USER_POOL }),
  [AuthorizationMode.IDENTITY_POOL]:generateClient<Schema>({ authMode: AuthorizationMode.IDENTITY_POOL }),
};
