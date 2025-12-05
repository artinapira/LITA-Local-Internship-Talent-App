import axios from "axios";
import { EmployerIndustryModel } from "../Interface/EmployerIndustryModel";

export class EmployerIndustryService {
    private static baseUrl = "https://localhost:7085/api/EmployerIndustry";
    public static async DeleteEmployerIndustry(id: string): Promise<void> {
      var result = await axios.delete(`${EmployerIndustryService.baseUrl}/${id}`);
    }
    public static async GetAllEmployerIndustry(): Promise<EmployerIndustryModel[]> {
      const result = await axios.get(EmployerIndustryService.baseUrl);
      return result.data;
    }
    public static async GetEmployerIndustry(id: string): Promise<EmployerIndustryModel> {
        const result = await axios.get(`${EmployerIndustryService.baseUrl}/${id}`);
        return result.data;
    }
     public static async AddOrEditEmployerIndustry(model: EmployerIndustryModel): Promise<void> {
      const result = await axios.post(`${EmployerIndustryService.baseUrl}`, model);
    }
    public static async GetAllByEmployerId(id: string): Promise<EmployerIndustryModel[]> {
        const result = await axios.get(`${EmployerIndustryService.baseUrl}/employer/${id}`);
        return result.data;
    }
}