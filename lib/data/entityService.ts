import { generateClient } from 'aws-amplify/data';
import { Schema } from '@/amplify/data/resource';
import { EstateViewModel } from '@/types/estateViewModel';
import { mapEstateToViewModel } from '@/lib/mappers/entityMapper';
import { AuthorizationMode } from '@/lib/data/authModes';

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
