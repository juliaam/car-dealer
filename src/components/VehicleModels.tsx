"use client";

import { VehicleByModelAndYear } from "@/services/vehicles.types";
import { useRouter } from "next/navigation";

interface VehicleModelsProps {
  vehicles: VehicleByModelAndYear[];
}

export default function VehicleModels({ vehicles }: VehicleModelsProps) {
  const router = useRouter();

  const redirectHome = () => {
    router.push("/");
  };

  const existsVehicles = vehicles.length > 0;

  return (
    <div className="p-8">
      <button
        className="border-white bg-gray-800 text-white hover:bg-gray-700 focus:ring-gray-600 border px-4 py-2 rounded-md focus:outline-none focus:ring-2 mb-4"
        onClick={redirectHome}
      >
        Back
      </button>
      {existsVehicles ? (
        <>
          <h1 className="text-2xl font-semibold mb-4">Vehicle Models: </h1>
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
        </>
      ) : (
        <div className="text-gray-500">
          No models found for this make and year.
        </div>
      )}
    </div>
  );
}
