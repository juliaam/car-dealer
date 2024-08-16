"use client";

import { vehiclesService } from "@/services/vehicles";
import { getYears } from "@/utils/getYearsVehicles";
import { useRouter } from "next/navigation";

interface Vehicle {
  MakeName: string;
  MakeId: number;
}

const loadData = async () => {
  const data = await vehiclesService.getAll();
  const vehicleList = data.Results.map((vehicle: Vehicle) => ({
    MakeId: vehicle.MakeId,
    MakeName: vehicle.MakeName,
  }));

  return vehicleList;
};

export async function VehicleSelects() {
  const router = useRouter();
  const vehicles = await loadData();
  const years = getYears();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const makeId = formData.get("makeId");
    const year = formData.get("year");

    if (makeId && year) {
      router.push(`/result/${makeId}/${year}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4">
      <select
        name="makeId"
        className="border border-gray-300 bg-gray-800 text-white px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-gray-600"
      >
        <option value="" disabled selected>
          Select Vehicle
        </option>
        {vehicles.map((vehicle: Vehicle) => (
          <option value={vehicle.MakeId} key={vehicle.MakeId}>
            {vehicle.MakeName}
          </option>
        ))}
      </select>
      <select
        name="year"
        className="border border-gray-300 bg-gray-800 text-white px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-gray-600"
      >
        <option value="" disabled selected>
          Select Year
        </option>
        {years.map((year) => (
          <option value={year} key={year}>
            {year}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="border px-4 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
      >
        Next
      </button>
    </form>
  );
}
