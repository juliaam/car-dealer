import { vehiclesService } from "@/services/vehicles";
import { ChangeEvent, useState, useEffect } from "react";

interface Vehicle {
  MakeName: string;
  MakeId: number;
}

const getYears = (): number[] => {
  const startYear = 2015;
  const currentYear = new Date().getFullYear();
  const years = [];

  for (let year = startYear; year <= currentYear; year++) {
    years.push(year);
  }

  return years;
};

export function VehicleSelects() {
  const [formData, setFormData] = useState({ makeId: "", year: "" });
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const years = getYears();

  const handleInput = (e: ChangeEvent<HTMLSelectElement>) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };

  const handleSubmit = () => {
    console.log(formData);
  };

  const isFormValid = formData.makeId && formData.year;

  useEffect(() => {
    async function fetchVehicles() {
      const data = await vehiclesService.getAll();
      const vehicleList = data.Results.map((vehicle: Vehicle) => ({
        MakeId: vehicle.MakeId,
        MakeName: vehicle.MakeName,
      }));
      setVehicles(vehicleList);
    }
    fetchVehicles();
  }, []);

  return (
    <div className="flex gap-4">
      <select
        name="makeId"
        value={formData.makeId}
        onChange={handleInput}
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
