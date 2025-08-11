"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AuthorizationMode } from "@/domain/auth/authModes";
import { EstateViewModel } from "@/domain/viewmodel/estateViewModel";
import { getEstate } from "@/domain/usecases/estate/getEstateUseCase";

interface EstateFormProps {
  estateId?: string;
}

export default function EstateForm({ estateId }: EstateFormProps) {
  const [viewModel, setViewModel] = useState<EstateViewModel>({
    id: "",
    name: "",
    location: "",
    price: "",
    description: "",
    image: "",
    loading: !!estateId,
    error: null,
  });

  useEffect(() => {
    if (!estateId) {
      setViewModel((prev) => ({ ...prev, loading: false }));
      return;
    }

    setViewModel((prev) => ({ ...prev, loading: true }));

    getEstate(estateId, AuthorizationMode.USER_POOL)
      .then((estate) => {
        setViewModel({
          ...estate,
          loading: false,
          error: null,
        });
      })
      .catch((error) => {
        console.error("Error fetching estate:", error);
        setViewModel((prev) => ({
          ...prev,
          loading: false,
          error: error.message,
        }));
      });
  }, [estateId]);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Propiedad</h2>

      {viewModel.error && (
        <div className="text-red-600 text-sm mb-4">{viewModel.error}</div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nombre</label>
          <p className="w-full px-3 py-2 border rounded-lg bg-gray-100">
            {viewModel.name}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Ubicación</label>
          <p className="w-full px-3 py-2 border rounded-lg bg-gray-100">
            {viewModel.location}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Precio</label>
          <p className="w-full px-3 py-2 border rounded-lg bg-gray-100">
            {viewModel.price}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Descripción</label>
          <p className="w-full px-3 py-2 border rounded-lg bg-gray-100 whitespace-pre-wrap">
            {viewModel.description}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Imagen</label>
          {viewModel.image ? (
            //<img
            //  src={viewModel.image}
            //  alt="Imagen de la propiedad"
            //  className="w-full rounded-lg border"
            // />
            <p className="text-gray-500 italic">{viewModel.image}</p>
          ) : (
            <p className="text-gray-500 italic">Sin imagen</p>
          )}
        </div>

        <div className="flex justify-end mt-6">
          <Link href={`/estate/${estateId}/edit`}>
            <button
              type="button"
              disabled={viewModel.loading}
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md disabled:opacity-50"
            >
              Editar
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
