import { AuthorizationMode } from '@/domain/auth/authModes';
import { clients } from '@/domain/clientFactory';
import { UpdateEstateInput } from '@/domain/models/estate';
import { EstateEntity } from '@/domain/models/estate';

export default async function updateEstateUseCase(updateData: UpdateEstateInput, authMode: AuthorizationMode): Promise<EstateEntity | null> {
    const client = clients[authMode];

    try {
        const { data } = await client.models.Estate.update(updateData);
        if (!data) {
            throw new Error('Error updating estate, empty data returned');
        }
        return data;

    } catch (error) {
        if (error instanceof Error) {
            throw new Error('Error updating estate: ' + error.message);
        } else {
            throw new Error('Error updating estate: ' + String(error));
        }
    }
}