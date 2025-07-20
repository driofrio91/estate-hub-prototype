import { useEffect, useState } from 'react';
import { suscribeToEstates } from '@/lib/data/entityService';
import { EntityViewModel } from '@/types/entity';

export function useEstateEntities() {
    const [estates, setEstates] = useState<EntityViewModel[]>([]);

    useEffect(() => {
        const suscription = suscribeToEstates(setEstates);
        return () => {
            suscription.unsubscribe();
        };
    }, [])
    
    return estates;
}