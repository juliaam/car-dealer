import {
  getAllByMakeIdAndYearResponse,
  getAllResponse,
} from "./vehicles.types";

export const vehiclesService = {
  getAll: async (): Promise<getAllResponse> => {
    const data = await fetch(
      "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
    );
    return await data.json();
  },
  getAllByMakeIdAndYear: async ({
    makeId,
    year,
  }: {
    makeId: string;
    year: string;
  }): Promise<getAllByMakeIdAndYearResponse> => {
    const response = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
    );
    return await response.json();
  },
};
