export interface VehicleResponse {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
}

interface Response {
  count: number;
  Message: string;
  SearchCriteria: string;
  Results: VehicleResponse[];
}

export const vehiclesService = {
  getAll: async () => {
    const data = await fetch(
      "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json",
      { cache: "force-cache" }
    );
    return await data.json();
  },
  getAllByMakeIdAndYear: async ({
    makeId,
    year,
  }: {
    makeId: string;
    year: string;
  }): Promise<Response> => {
    const response = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
    );
    return await response.json();
  },
};
