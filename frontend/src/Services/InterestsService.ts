import axios from "axios";
import { InterestsModel } from "../Interface/InterestsModel";

export class InterestsService {
    private static baseUrl = "https://localhost:7085/api/Interests";
    public static async DeleteInterests(id: string): Promise<void> {
      var result = await axios.delete(`${InterestsService.baseUrl}/${id}`);
    }
    public static async GetAllInterests(): Promise<InterestsModel[]> {
      const result = await axios.get(InterestsService.baseUrl);
      return result.data;
    }
    public static async GetInterests(id: string): Promise<InterestsModel> {
        const result = await axios.get(`${InterestsService.baseUrl}/${id}`);
        return result.data;
    }
     public static async AddOrEditInterests(model: InterestsModel): Promise<void> {
      const result = await axios.post(`${InterestsService.baseUrl}`, model);
    }
    public static async GetSelectList() : Promise<InterestsModel[]> {
      const result = await axios.get(`${InterestsService.baseUrl}/GetInterests`);
      return result.data;
    }
}