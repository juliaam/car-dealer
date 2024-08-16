"use client";

import { vehiclesService } from "@/services/vehicles";
import { getYears } from "@/utils/getYearsVehicles";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState, useEffect, EventHandler } from "react";

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

export function VehicleSelects() {
  const [formData, setFormData] = useState({ makeId: "", year: "" });
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const isFormValid = formData.makeId && formData.year;
  const years = getYears();
  const router = useRouter();

  const handleInput = (e: ChangeEvent<HTMLSelectElement>) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>): void => {
    router.push(`/result/${formData.makeId}/${formData.year}`);
  };

  useEffect(() => {
    async function fetchData() {
      const vehicleList = await loadData();
      setVehicles(vehicleList);
    }
    if (!vehicles.length) {
      fetchData();
    }
  }, [vehicles.length]);

  return (
    <div className="flex gap-4">
      <select
        value={formData.makeId}
        onChange={handleInput}
        name="makeId"
        className="border border-gray-300 bg-gray-800 text-white px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-gray-600"
      >
        <option value="" disabled>
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
        value={formData.year}
        onChange={handleInput}
        className="border border-gray-300 bg-gray-800 text-white px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-gray-600"
      >
        <option value="" disabled>
          Select Year
        </option>
        {years.map((year) => (
          <option value={year} key={year}>
            {year}
          </option>
        ))}
      </select>
      <button
        onClick={handleSubmit}
        className={`border px-4 py-2 rounded-md focus:outline-none focus:ring-2 ${
          isFormValid
            ? "border-white bg-gray-800 text-white hover:bg-gray-700 focus:ring-gray-600"
            : "border-gray-400 bg-gray-600 text-gray-400 cursor-normal"
        }`}
        disabled={!isFormValid}
      >
        Next
      </button>
    </div>
  );
}
