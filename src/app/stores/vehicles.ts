import { create } from "zustand";
import { vehiclesService } from "../services/vehicles";

interface vehicle {
  MakeName: string;
  MakeId: number;
}

interface VehicleStoreState {
  vehicleTypeName: string;
  isLoading: boolean;
  error: string;
  fetchVehicleTypes: () => Promise<void>;
  vehicles: vehicle[];
}

export const useVehicleStore = create<VehicleStoreState>((set) => ({
  vehicleTypeName: "",
  isLoading: false,
  error: "",
  vehicles: [],

  fetchVehicleTypes: async () => {
    set({ isLoading: true, error: "" });
    try {
      const data = await vehiclesService.getAll();
      const vehicleTypeName = data.SearchCriteria.replace(
        "Vehicle Type:",
        ""
      ).trim();

      const vehicles = data.Results.map((vehicle: vehicle) => ({
        MakeId: vehicle.MakeId,
        MakeName: vehicle.MakeName,
      }));

      set({ vehicleTypeName, vehicles, isLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch vehicle types", isLoading: false });
      console.error("Error fetching vehicle data:", error);
    }
  },
}));

useVehicleStore.getState().fetchVehicleTypes();
