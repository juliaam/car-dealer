"use client";

import { Suspense } from "react";
import { VehicleSelects } from "@/components/VehicleSelectsPage";

function Loading() {
  return <h1 className="text-5xl">🌀 Loading...</h1>;
}

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <Suspense fallback={<Loading />}>
        <VehicleSelects />
      </Suspense>
    </div>
  );
}
