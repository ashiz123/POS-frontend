import type { CreateEmployeeData } from "../validations/employeeValidation";
import apiInstance from "./api";

export interface IEmployeeService {
  create: (data: CreateEmployeeData) => Promise<CreateEmployeeData>;
  //   remove: (id: string) => Promise<boolean>;
  //   update: (id: string, data: Partial<IEmployee>) => Promise<IEmployee>;
  list: () => Promise<[]>;
  //   get: (id: string) => Promise<IEmployee | null>;
  //   makeActive: (id: string) => Promise<void>;
  //   makeInactive: (id: string) => Promise<void>;
}

export const EmployeeService: IEmployeeService = {
  create: async (data: CreateEmployeeData): Promise<CreateEmployeeData> => {
    try {
      const response = await apiInstance.post<CreateEmployeeData>(
        "/user/create",
        data,
      );
      return response.data;
    } catch (error) {
      console.error("Employee Creation Failed:", error);

      throw error;
    }
  },

  list: async () => {
    try {
      const response = await apiInstance.get("/user/ofBusiness");
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  //   remove: () => {},
  //   update: () => {},

  //   get: () => {},
  //   makeActive: () => {},
  //   makeInactive: () => {},
};
