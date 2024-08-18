import React from "react";
import { Select } from "./Select";
import { Button } from "./Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

interface Vehicle {
  MakeName: string;
  MakeId: number;
}

interface FormValues {
  makeId: string;
  year: string;
}

interface VehicleSelectsProps {
  vehicles: Vehicle[];
  years: number[];
}

export function VehicleSelects({ vehicles, years }: VehicleSelectsProps) {
  const { register, handleSubmit, watch } = useForm<FormValues>();
  const router = useRouter();

  const makeId = watch("makeId");
  const year = watch("year");
  const isButtonDisabled = !makeId || !year;

  const goToResult: SubmitHandler<FormValues> = (data) => {
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
