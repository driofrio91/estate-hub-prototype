import { Schema } from '@/amplify/data/resource';
import { EstateViewModel } from '@/domain/viewmodel/estateViewModel';
import { EstateEntity, CreateEstateInput } from '@/domain/models/estate';

export function mapEstateToViewModel(estate: EstateEntity): EstateViewModel {
  return {
    id: estate.id,
    name: estate.name || 'Sin nombre',
    location: estate.location || 'Desconocida',
    price: estate.price ? `$${estate.price.toFixed(2)}` : 'N/A',
    description: estate.description || '',
    image: estate.image || '',
  };
}

export function mapViewModelToCreateEstateInput(viewModel: EstateViewModel): CreateEstateInput {
  return {
    name: viewModel.name,
    location: viewModel.location,
    price: viewModel.price ? parseFloat(viewModel.price.replace(/[$,]/g, '')) : undefined,
    description: viewModel.description,
    image: viewModel.image,
  };
}
