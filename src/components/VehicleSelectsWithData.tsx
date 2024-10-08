"use client";
import React, { useEffect, useState } from "react";
import { VehicleSelects } from "@/components/VehicleSelectsPage";
import { vehiclesService } from "@/services/vehicles";
import { getYears } from "@/utils/getYearsVehicles";
import { ClipLoader } from "react-spinners";

interface Vehicle {
  MakeName: string;
  MakeId: number;
}

interface Props {
  vehicles: Vehicle[];
  years: number[];
}

export const VehicleSelectsWithData: React.FC<Props> = ({
  vehicles,
  years,
}) => {
  return <VehicleSelects vehicles={vehicles} years={years} />;
};

const loadData = async () => {
  const data = await vehiclesService.getAll();
  const vehicleList = data.Results.map((vehicle: Vehicle) => ({
    MakeId: vehicle.MakeId,
    MakeName: vehicle.MakeName,
  }));
  const years = getYears();
  return { vehicles: vehicleList, years };
};

export const VehicleSelectsWithSuspense = () => {
  const [data, setData] = useState<{
    vehicles: Vehicle[];
    years: number[];
  } | null>(null);

  useEffect(() => {
    loadData().then(setData);
  }, []);

  if (!data) {
    return <ClipLoader size={40} color={"#3498db"} />;
  }

  return <VehicleSelectsWithData vehicles={data.vehicles} years={data.years} />;
};
