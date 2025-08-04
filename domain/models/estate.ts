import { Schema } from '@/amplify/data/resource';

export type EstateEntity = Schema['Estate']['type'];

export type CreateEstateInput = Omit<EstateEntity, 'id'>;

export type UpdateEstateInput = Partial<Omit<EstateEntity, 'id'>> & { id: string };