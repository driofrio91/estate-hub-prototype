import { Schema } from '@/amplify/data/resource';

export type EstateEntity = Schema['Estate']['type'];

export type CreateEstateInput = {
  name: string;
  location?: string;
  price?: number;
  description?: string;
  image?: string;
};


export type UpdateEstateInput = Partial<Omit<EstateEntity, 'id'>> & { id: string };