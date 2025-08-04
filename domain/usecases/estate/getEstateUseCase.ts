import { AuthorizationMode } from '@/domain/auth/authModes';
import { clients } from '@/domain/clientFactory';
import { mapEstateToViewModel } from '@/domain/mappers/estate/estateMapper';

export async function dispatch(estateId: string, authMode: AuthorizationMode = AuthorizationMode.API_KEY) {
    const client = clients[authMode];
    
    const {data: estateEntity, errors } = await client.models.Estate.get({"id": estateId});

    if (errors && errors.length > 0) {
        throw new Error(`Error al obtener la propiedad: ${errors.map(error => error.message).join(', ')}`);
    }

    if (!estateEntity) {
        throw new Error(`No se encontró ninguna propiedad con el id "${estateId}"`);
    }
    
    return mapEstateToViewModel(estateEntity);
}