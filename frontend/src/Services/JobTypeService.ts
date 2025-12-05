import axios from "axios";
import { JobTypeModel } from "../Interface/JobTypeModel";

export class JobTypeService {
    private static baseUrl = "https://localhost:7085/api/JobType";
    public static async DeleteJobType(id: string): Promise<void> {
      var result = await axios.delete(`${JobTypeService.baseUrl}/${id}`);
    }
    public static async GetAllJobTypes(): Promise<JobTypeModel[]> {
      const result = await axios.get(JobTypeService.baseUrl);
      return result.data;
    }
    public static async GetJobType(id: string): Promise<JobTypeModel> {
        const result = await axios.get(`${JobTypeService.baseUrl}/${id}`);
        return result.data;
    }
     public static async AddOrEditJobType(model: JobTypeModel): Promise<void> {
      const result = await axios.post(`${JobTypeService.baseUrl}`, model);
    }
    public static async GetSelectList() : Promise<JobTypeModel[]> {
    const result = await axios.get(`${JobTypeService.baseUrl}/GetJobTypes`);
    return result.data;
  }
}