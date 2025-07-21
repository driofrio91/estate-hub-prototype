'use client';

import EntityList from '@/components/EntityList';
import { useEstateEntities } from '@/lib/hooks/useEntities';
import { AuthorizationMode } from '@/lib/data/authModes';



export default function PublicPage() {
    const entities = useEstateEntities(AuthorizationMode.API_KEY);
    return (
        <div className="bg-gradient-to-b from-yellow-100 to-green-200 min-h-screen flex justify-center items-center text-black">
            <div className="text-center p-6 rounded-2xl bg-white bg-opacity-60 backdrop-blur-sm shadow-lg" >
                <h3 className="text-3xl font-bold mb-4">Listado de Propiedades</h3>
                <EntityList entities={entities} showControls={false} />
            </div>
        </div>
    )
}