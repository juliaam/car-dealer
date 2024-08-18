"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./Button";

export default function VehicleModels({ vehicles }: any) {
  const router = useRouter();

  useEffect(() => {}, []);

  const redirectHome = () => {
    router.push("/");
  };

  const existsVehicles = vehicles.length > 0;

  return (
    <div className="p-8">
      <Button onClick={redirectHome}>Back</Button>
      {existsVehicles ? (
        <>
          <h1 className="text-2xl font-semibold mb-4">Vehicle Models: </h1>
          <ul className="grid grid-cols-4 gap-4">
            {vehicles.map((model: any) => (
              <li
                key={model.Model_ID}
                className="p-2 bg-gray-800 text-white rounded-md"
              >
                {model.Model_Name}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="text-gray-500">
          No models found for this make and year.
        </div>
      )}
    </div>
  );
}
