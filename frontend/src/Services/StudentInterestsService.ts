import axios from "axios";
import { StudentInterestsModel } from "../Interface/StudentInterestsModel";

export class StudentInterestsService {
    private static baseUrl = "https://localhost:7085/api/StudentInterests";
    public static async DeleteStudentInterests(id: string): Promise<void> {
      var result = await axios.delete(`${StudentInterestsService.baseUrl}/${id}`);
    }
    public static async GetAllStudentInterests(): Promise<StudentInterestsModel[]> {
      const result = await axios.get(StudentInterestsService.baseUrl);
      return result.data;
    }
    public static async GetStudentInterests(id: string): Promise<StudentInterestsModel> {
        const result = await axios.get(`${StudentInterestsService.baseUrl}/${id}`);
        return result.data;
    }
     public static async AddOrEditStudentInterests(model: StudentInterestsModel): Promise<void> {
      const result = await axios.post(`${StudentInterestsService.baseUrl}`, model);
    }
    public static async GetInterestsByStudent(id: string): Promise<StudentInterestsModel[]> {
        const result = await axios.get(`${StudentInterestsService.baseUrl}/student/${id}`);
        return result.data;
    }
}