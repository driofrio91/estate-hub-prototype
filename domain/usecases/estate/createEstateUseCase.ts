import { AuthorizationMode } from '@/domain/auth/authModes';
import { clients } from '@/domain/clientFactory';
import { CreateEstateInput } from '@/domain/models/estate';
import { EstateEntity } from '@/domain/models/estate';

export async function createEstateUseCase(estate: CreateEstateInput, authMode: AuthorizationMode): Promise<EstateEntity> {

  const client = clients[authMode];
  
  try {
    const { data } = await client.models.Estate.create(estate);
    if (!data) {
      throw new Error('Error creating estate, empty data returned');
    }
    return data;
    
  } catch (error) {
    if (error instanceof Error) {
    throw new Error('Error creating estate: ' + error.message);
  } else {
    throw new Error('Error creating estate: ' + String(error));
  }
  }
}
