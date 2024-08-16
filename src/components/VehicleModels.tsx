"use client";

import { VehicleResponse } from "@/services/vehicles";

interface VehicleModelsProps {
  vehicles: VehicleResponse[];
}

export default function VehicleModels({ vehicles }: VehicleModelsProps) {
  if (vehicles.length === 0) {
    return (
      <div className="text-gray-500">
        No models found for this make and year.
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Vehicle Models for </h1>
      <ul className="grid grid-cols-4 gap-4">
        {vehicles.map((model) => (
          <li
            key={model.Model_ID}
            className="p-2 bg-gray-800 text-white rounded-md"
          >
            {model.Model_Name}
          </li>
        ))}
      </ul>
    </div>
  );
}
