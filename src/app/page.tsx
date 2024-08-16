"use client";

import { useVehicleStore } from "./stores/vehicles";

export default function Home() {
  const { vehicleTypeName, vehicles } = useVehicleStore();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(event.target[1].value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <form className="flex  gap-4" onSubmit={handleSubmit}>
        <select className="border border-gray-300 bg-gray-800 text-white px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-gray-600">
          <option value={vehicleTypeName}>{vehicleTypeName}</option>
        </select>
        <select className="border border-gray-300 bg-gray-800 text-white px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-gray-600">
          {vehicles.map((vehicle) => (
            <option value={vehicle.MakeId} key={vehicle.MakeId}>
              {vehicle.MakeName}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="border border-white bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
        >
          Next
        </button>
      </form>
    </div>
  );
}
