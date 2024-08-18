"use client";

import { vehiclesService } from "@/services/vehicles";
import { getYears } from "@/utils/getYearsVehicles";
import { useRouter } from "next/navigation";
import { Select } from "./Select";
import { Button } from "./Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";

interface Vehicle {
  MakeName: string;
  MakeId: number;
}

interface FormValues {
  makeId: string;
  year: string;
}

export function VehicleSelects() {
  const { register, handleSubmit, watch } = useForm<FormValues>();
  const router = useRouter();

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const years = getYears();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const makeId = watch("makeId");
  const year = watch("year");

  useEffect(() => {
    setIsButtonDisabled(!makeId || !year);
  }, [makeId, year]);

  useEffect(() => {
    const loadData = async () => {
      const data = await vehiclesService.getAll();
      const vehicleList = data.Results.map((vehicle: Vehicle) => ({
        MakeId: vehicle.MakeId,
        MakeName: vehicle.MakeName,
      }));
      setVehicles(vehicleList);
    };

    loadData();
  }, []);

  const goToResult: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    router.push(`/result/${data.makeId}/${data.year}`);
  };

  return (
    <form onSubmit={handleSubmit(goToResult)} className="flex gap-4">
      <Select {...register("makeId")} defaultValue="">
        <option value="" disabled>
          Select Vehicle
        </option>
        {vehicles.map((vehicle: Vehicle) => (
          <option value={vehicle.MakeId} key={vehicle.MakeId}>
            {vehicle.MakeName}
          </option>
        ))}
      </Select>
      <Select {...register("year")} defaultValue="">
        <option value="" disabled>
          Select Year
        </option>
        {years.map((year) => (
          <option value={year} key={year}>
            {year}
          </option>
        ))}
      </Select>
      <Button type="submit" disabled={isButtonDisabled}>
        Next
      </Button>
    </form>
  );
}
