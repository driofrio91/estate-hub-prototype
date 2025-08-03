import { AuthorizationMode } from '@/domain/auth/authModes';
import { clients } from '@/domain/clientFactory';
import { mapEstateToViewModel } from '@/domain/mappers/estateMapper';

export async function createEstateUseCase(estateId: string, authMode: AuthorizationMode) {
    const client = clients[authMode];
    
    

  return null;
}
