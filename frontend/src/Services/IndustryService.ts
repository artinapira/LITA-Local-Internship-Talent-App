import axios from "axios";
import { IndustryModel } from "../Interface/IndustryModel";

export class IndustryService {
    private static baseUrl = "https://localhost:7085/api/Industry";
    public static async DeleteIndustry(id: string): Promise<void> {
      var result = await axios.delete(`${IndustryService.baseUrl}/${id}`);
    }
    public static async GetAllIndustrys(): Promise<IndustryModel[]> {
      const result = await axios.get(IndustryService.baseUrl);
      return result.data;
    }
    public static async GetIndustry(id: string): Promise<IndustryModel> {
        const result = await axios.get(`${IndustryService.baseUrl}/${id}`);
        return result.data;
    }
     public static async AddOrEditIndustry(model: IndustryModel): Promise<void> {
      const result = await axios.post(`${IndustryService.baseUrl}`, model);
    }
    public static async GetSelectList() : Promise<IndustryModel[]> {
      const result = await axios.get(`${IndustryService.baseUrl}/GetIndustry`);
      return result.data;
    }
}