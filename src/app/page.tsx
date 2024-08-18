import { Suspense } from "react";
import { VehicleSelectsWithSuspense } from "@/components/VehicleSelectsWithData";
import { Loading } from "@/components/Loading";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <Suspense fallback={<Loading />}>
        <VehicleSelectsWithSuspense />
      </Suspense>
    </div>
  );
}
