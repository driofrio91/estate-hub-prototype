'use client';

import { useState } from 'react';
import ConfirmModal from './ConfirmModal';
import { EstateViewModel } from '@/domain/viewmodel/estateViewModel';
import Link from 'next/link';

type EntityListProps = {
  entities: EstateViewModel[],
  currentUser?: { username : string, groups : string[]},
  showControls?: boolean;
};

export default function EntityList({ entities, currentUser, showControls = false }: EntityListProps) {
  const [showModal, setShowModal] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState<any>(null);

  const handleDeleteClick = (entity: any) => {
    setSelectedEntity(entity);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    console.log('Eliminado:', selectedEntity?.id);
    setShowModal(false);
    setSelectedEntity(null);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
    setSelectedEntity(null);
  };

  return (
    <div className="flex flex-col gap-4">
      {entities.map((entity: any) => (
        <div key={entity.id} className="p-4 border rounded-md">
          <h3 className="text-lg font-semibold">{entity.name}</h3>
          <p>{entity.description}</p>
          {showControls && (
            <div className="mt-2">
              <Link href={`/estate/${entity.id}/edit`}>
                <button className="mr-2 bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
              </Link>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => handleDeleteClick(entity)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}

      <ConfirmModal
        open={showModal}
        title="¿Seguro que quieres eliminar esta entidad?"
        message={`Esta acción no se puede deshacer.`}
        confirmText="Sí, eliminar"
        cancelText="Cancelar"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}