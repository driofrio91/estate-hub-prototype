'use client';

import { EntityViewModel } from '@/types/entity';

type EntityListProps = {
  entities: EntityViewModel[],
  currentUser?: { username : string, groups : string[]},
  showControls?: false;
};

export default function EntityList({ entities, currentUser, showControls = false }: EntityListProps) {
  return (
    <div className="flex flex-col gap-4">
      {entities.map((entity: any) => (
        <div key={entity.id} className="p-4 border rounded-md">
          <h3 className="text-lg font-semibold">{entity.name}</h3>
          <p>{entity.description}</p>
          {showControls && currentUser && (
            <div className="mt-2">
              <button className="mr-2 bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
              <button className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}