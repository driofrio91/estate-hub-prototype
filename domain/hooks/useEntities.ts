import { useEffect, useState } from 'react';
import { suscribeToEstates } from '@/domain/service/entityService';
import { EstateViewModel } from '@/domain/viewmodel/estateViewModel';
import { AuthorizationMode } from '@/domain/auth/authModes';

export function useEstateEntities(authMode: AuthorizationMode = AuthorizationMode.API_KEY){
    const [estates, setEstates] = useState<EstateViewModel[]>([]);

    useEffect(() => {
        const suscription = suscribeToEstates(setEstates, authMode);
        return () => {
            suscription.unsubscribe();
        };
    }, [authMode])

    return estates;
}