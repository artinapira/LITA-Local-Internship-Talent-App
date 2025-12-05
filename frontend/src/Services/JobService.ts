import axios from "axios";
import { JobModel } from "../Interface/JobModel";

export class JobService {
    private static baseUrl = "https://localhost:7085/api/Job";
    public static async DeleteJob(id: string): Promise<void> {
      var result = await axios.delete(`${JobService.baseUrl}/${id}`);
    }
    public static async GetAllJobs(): Promise<JobModel[]> {
      const result = await axios.get(JobService.baseUrl);
      return result.data;
    }
    public static async GetJob(id: string): Promise<JobModel> {
        const result = await axios.get(`${JobService.baseUrl}/${id}`);
        return result.data;
    }
     public static async AddOrEditJob(model: JobModel): Promise<void> {
      const result = await axios.post(`${JobService.baseUrl}`, model);
    }
    public static async GetByEmployerId(id: string): Promise<JobModel[]> {
      const result = await axios.get(`${JobService.baseUrl}/getByEmployerId/${id}`);
      return result.data;
    }
    public static async GetSelectList() : Promise<JobModel[]> {
      const result = await axios.get(`${JobService.baseUrl}/GetJob`);
      return result.data;
    }
    
}