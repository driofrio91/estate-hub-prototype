"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthorizationMode } from "@/domain/auth/authModes";
import { EstateViewModel } from "@/domain/viewmodel/estateViewModel";
import {
  mapViewModelToCreateEstateInput,
  mapEstateToViewModel,
} from "@/domain/mappers/estate/estateMapper";
import { createEstateUseCase } from "@/domain/usecases/estate/createEstateUseCase";
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
  const [isEdit, setIsEdit] = useState(estateId ? true : false);
  const router = useRouter();

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

  const handleChange =
    (field: keyof EstateViewModel) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setViewModel((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setViewModel((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const estate = await createEstateUseCase(
        mapViewModelToCreateEstateInput(viewModel),
        AuthorizationMode.USER_POOL
      );

      setViewModel((prev) => ({
        ...prev,
        ...mapEstateToViewModel(estate),
        loading: false,
        error: null,
      }));
    } catch (error) {
      console.error("Error creating estate:", error);

      const errorMessage =
        error instanceof Error ? error.message : String(error);

      setViewModel((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4">
        {isEdit ? "Editar Propiedad" : "Nueva Propiedad"}
      </h2>

      {viewModel.error && (
        <div className="text-red-600 text-sm mb-4">{viewModel.error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Nombre
          </label>
          <input
            id="name"
            type="text"
            value={viewModel.name}
            onChange={handleChange("name")}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium mb-1">
            Ubicación
          </label>
          <input
            id="location"
            type="text"
            value={viewModel.location}
            onChange={handleChange("location")}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium mb-1">
            Precio
          </label>
          <input
            id="price"
            type="number"
            value={viewModel.price}
            onChange={handleChange("price")}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            step="0.01"
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-1"
          >
            Descripción
          </label>
          <textarea
            id="description"
            value={viewModel.description}
            onChange={handleChange("description")}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={4}
          />
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium mb-1">
            URL de la imagen
          </label>
          <input
            id="image"
            type="text"
            value={viewModel.image}
            onChange={handleChange("image")}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex justify-end mt-6">
          {isEdit && (
            <button
              type="button"
              onClick={() => router.back()}
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md"
            >
              Cancelar
            </button>
          )}

          <button
            type="submit"
            disabled={viewModel.loading}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md disabled:opacity-50"
          >
            {viewModel.loading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
}
