interface Vehicle {
  MakeId: number;
  MakeName: string;
  VehicleTypeId: number;
  VehicleTypeName: string;
}

export interface VehicleByModelAndYear {
  Model_ID: number;
  Model_Name: string;
}

export interface getAllByMakeIdAndYearResponse {
  count: number;
  Message: string;
  SearchCriteria: string;
  Results: VehicleByModelAndYear[];
}

export interface getAllResponse {
  count: number;
  Message: string;
  SearchCriteria: string;
  Results: Vehicle[];
}
