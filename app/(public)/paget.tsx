'use client';

import EntityList from '@/components/EntityList';
import { useEstateEntities } from '@/lib/hooks/useEntities';



export default function PublicPage() {
    const entities = useEstateEntities();
    return <EntityList entities={entities} showControls={false} />
}