import { Schema } from '@/amplify/data/resource';
import { EntityViewModel } from '@/types/entity';

type EstateEntity = Schema['Estate']['type'];

export function mapEstateToViewModel(estate: EstateEntity): EntityViewModel {
  return {
    id: estate.id,
    name: estate.name || 'Sin nombre',
    location: estate.location || 'Desconocida',
    price: estate.price ? `$${estate.price.toFixed(2)}` : 'N/A',
    description: estate.description || '',
    image: estate.image || '',
  };
}
