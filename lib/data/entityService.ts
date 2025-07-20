import { generateClient } from 'aws-amplify/data';
import { Schema } from '@/amplify/data/resource';
import { EntityViewModel } from '@/types/entity';
import { mapEstateToViewModel } from '@/lib/mappers/entityMapper';

const client = generateClient<Schema>();

export function suscribeToEstates(onUpdate: (data: EntityViewModel[]) => void){
    return client.models.Estate.observeQuery().subscribe({
        next: ({items}) => {
            const estates = items.map(mapEstateToViewModel);
            onUpdate(estates);
        }
    });

}
