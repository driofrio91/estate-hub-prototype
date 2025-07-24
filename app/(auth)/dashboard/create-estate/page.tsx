'use client';

import { useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>();

export default function CreateEstate(){
  const [estate, setEstate] = useState<Schema["Estate"]["type"] | null>(null);

  function createEstate() {
    client.models.Estate.create({
      name: window.prompt("Estate name"),
      location: window.prompt("Estate location"),
      price: parseFloat(window.prompt("Estate price") || "0"),
      description: window.prompt("Estate description"),
      image: window.prompt("Estate image URL"),
    });
  }

  return (
    <main>
      <h1>Create a new estate</h1>
      <button className="bg-green-200 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" 
        onClick={createEstate}>Create Estate</button>
    </main>
  );
}
