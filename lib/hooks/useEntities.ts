import { useEffect, useState } from 'react';
import { suscribeToEstates } from '@/lib/data/entityService';
import { EntityViewModel } from '@/types/entity';
import { AuthorizationMode } from '@/lib/data/authModes';

export function useEstateEntities(authMode: AuthorizationMode = AuthorizationMode.API_KEY){
    const [estates, setEstates] = useState<EntityViewModel[]>([]);

    useEffect(() => {
        const suscription = suscribeToEstates(setEstates, authMode);
        return () => {
            suscription.unsubscribe();
        };
    }, [authMode])

    return estates;
}