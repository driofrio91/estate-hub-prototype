import { generateClient } from 'aws-amplify/data';
import { Schema } from '@/amplify/data/resource';
import { EstateViewModel } from '@/domain/viewmodel/estateViewModel';
import { mapEstateToViewModel } from '@/domain/mappers/estateMapper';
import { AuthorizationMode } from '@/domain/auth/authModes';

export function suscribeToEstates(onUpdate: (data: EstateViewModel[]) => void, 
authMode: AuthorizationMode = AuthorizationMode.API_KEY) {
    const client = generateClient<Schema>({ authMode });
    return client.models.Estate.observeQuery().subscribe({
        next: ({items}) => {
            const estates = items.map(mapEstateToViewModel);
            onUpdate(estates);
        }
    });

}
