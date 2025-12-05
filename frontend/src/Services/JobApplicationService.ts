import axios from "axios";
import { JobApplicationModel } from "../Interface/JobApplicationModel";

export class JobApplicationService {
    private static baseUrl = "https://localhost:7085/api/Application";
    public static async DeleteJobApplication(id: string): Promise<void> {
      var result = await axios.delete(`${JobApplicationService.baseUrl}/${id}`);
    }
    public static async GetAllJobApplications(): Promise<JobApplicationModel[]> {
      const result = await axios.get(JobApplicationService.baseUrl);
      return result.data;
    }
    public static async GetJobApplication(id: string): Promise<JobApplicationModel> {
        const result = await axios.get(`${JobApplicationService.baseUrl}/${id}`);
        return result.data;
    }
     public static async AddOrEditJobApplication(model: JobApplicationModel): Promise<void> {
      const result = await axios.post(`${JobApplicationService.baseUrl}`, model);
    }
    public static async GetApplicationsByJobId(id: string): Promise<JobApplicationModel[]> {
      const result = await axios.get(`${JobApplicationService.baseUrl}/getByJobId/${id}`);
      return result.data;
    }
    public static async GetApplicationsByStudentId(id: string): Promise<JobApplicationModel[]> {
      const result = await axios.get(`${JobApplicationService.baseUrl}/getByStudentId/${id}`);
      return result.data;
    }
}