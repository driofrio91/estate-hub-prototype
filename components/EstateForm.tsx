"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { AuthorizationMode } from '@/domain/auth/authModes';
import { dispatch } from '@/domain/usecases/getEstateUseCase';
import { EstateViewModel } from "@/domain/viewmodel/estateViewModel";

const client = generateClient<Schema>();

interface EstateFormProps {
  estateId?: string;
}

export default function EstateForm({ estateId }: EstateFormProps) {

  const [estate, setEstate] = useState<EstateViewModel | null>(null);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState<boolean>(!!estateId);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!estateId) {
      setLoading(false);
      return;
    }
    setLoading(true);

    dispatch(estateId, AuthorizationMode.USER_POOL)
      .then((estate) => {
        setEstate(estate);
        setName(estate.name);
        setLocation(estate.location);
        setPrice(estate.price !== null ? "" : estate.price);
        setDescription(estate.description !== null ? "" : estate.description);
        setImage(estate.image !== null ? "" : estate.image);
      })
      .catch((error) => {
        console.error("Error fetching estate:", error);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });

  }, [estateId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    
  };

  function createDummyEstate() {
    client.models.Estate.create({
      name: window.prompt("Estate name"),
      location: window.prompt("Estate location"),
      price: parseFloat(window.prompt("Estate price") || "0"),
      description: window.prompt("Estate description"),
      image: window.prompt("Estate image URL"),
    });
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4">
        {estate ? "Editar Propiedad" : "Nueva Propiedad"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Nombre
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Nombre de la propiedad"
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
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Ciudad, barrio, etc."
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
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="0.00"
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={4}
            placeholder="Descripción detallada"
          />
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium mb-1">
            URL de la imagen
          </label>
          <input
            id="image"
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="https://ejemplo.com/imagen.jpg"
          />
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md disabled:opacity-50"
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
}
