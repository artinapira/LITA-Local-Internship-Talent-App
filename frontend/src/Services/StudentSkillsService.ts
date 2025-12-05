import axios from "axios";
import { StudentSkillsModel } from "../Interface/StudentSkillsModel";

export class StudentSkillsService {
    private static baseUrl = "https://localhost:7085/api/StudentSkills";
    public static async DeleteStudentSkills(id: string): Promise<void> {
      var result = await axios.delete(`${StudentSkillsService.baseUrl}/${id}`);
    }
    public static async GetAllStudentSkills(): Promise<StudentSkillsModel[]> {
      const result = await axios.get(StudentSkillsService.baseUrl);
      return result.data;
    }
    public static async GetStudentSkills(id: string): Promise<StudentSkillsModel> {
        const result = await axios.get(`${StudentSkillsService.baseUrl}/${id}`);
        return result.data;
    }
     public static async AddOrEditStudentSkills(model: StudentSkillsModel): Promise<void> {
      const result = await axios.post(`${StudentSkillsService.baseUrl}`, model);
    }
    public static async GetSelectList() : Promise<StudentSkillsModel[]> {
      const result = await axios.get(`${StudentSkillsService.baseUrl}/GetStudentSkills`);
      return result.data;
    }
}