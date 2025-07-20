// src/lib/amplifyServerUtils.ts
import { createServerRunner } from '@aws-amplify/adapter-nextjs';
import { Amplify } from 'aws-amplify';
import config from '@/amplify_outputs.json'; // Asegúrate de que esta ruta sea correcta

// Inicializa Amplify con tu configuración generada por Gen 2
// Esto solo debe ejecutarse una vez en el ciclo de vida del servidor
Amplify.configure(config);

// createServerRunner crea un "runner" de Amplify para el entorno de Next.js.
// runWithAmplifyServerContext es una función que te permite ejecutar código
// en un contexto de servidor de Amplify con la sesión del usuario.
export const { runWithAmplifyServerContext } = createServerRunner({
  config,
});

