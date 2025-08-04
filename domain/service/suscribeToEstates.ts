import { clients } from '@/domain/clientFactory';
import { EstateViewModel } from '@/domain/viewmodel/estateViewModel';
import { mapEstateToViewModel } from '@/domain/mappers/estate/estateMapper';
import { AuthorizationMode } from '@/domain/auth/authModes';

export function suscribeToEstates(onUpdate: (data: EstateViewModel[]) => void, 
authMode: AuthorizationMode = AuthorizationMode.API_KEY) {
    const client = clients[authMode];
    return client.models.Estate.observeQuery().subscribe({
        next: ({items}) => {
            const estates = items.map(mapEstateToViewModel);
            onUpdate(estates);
        }
    });

}
