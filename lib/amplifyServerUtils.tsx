// src/lib/amplifyServerUtils.ts
import { createServerRunner } from '@aws-amplify/adapter-nextjs';
import { Amplify } from 'aws-amplify';
import config from '@/amplify_outputs.json';

Amplify.configure(config);

export const { runWithAmplifyServerContext } = createServerRunner({
  config,
});

