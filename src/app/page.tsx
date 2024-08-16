"use client";

import { Suspense } from "react";
import { VehicleSelects } from "@/components/VehicleSelectsPage";
import { Loading } from "@/components/Loading";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <Suspense fallback={<Loading />}>
        <VehicleSelects />
      </Suspense>
    </div>
  );
}
