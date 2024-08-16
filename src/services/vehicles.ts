export const vehiclesService = {
  getAll: async () => {
    const data = await fetch(
      "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json",
      { cache: "force-cache" }
    );
    return data.json();
  },
};
