import { Suspense } from "react";
import { Loading } from "@/components/Loading";
import { vehiclesService } from "@/services/vehicles";
import VehicleModels from "@/components/VehicleModels";

export const generateStaticParams = async () => {
  const data = await vehiclesService.getAll();

  return data.Results.map((vehicle) => ({
    id: vehicle.MakeId,
  }));
};

export default async function ResultPage({
  params,
}: {
  params: { makeId: string; year: string };
}) {
  const data = await vehiclesService.getAllByMakeIdAndYear({
    makeId: params.makeId,
    year: params.year,
  });
  const vehicles = data.Results;

  return (
    <div className="min-h-screen p-4">
      <Suspense fallback={<Loading />}>
        <VehicleModels vehicles={vehicles} />
      </Suspense>
    </div>
  );
}
