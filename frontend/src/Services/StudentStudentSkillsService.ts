import axios from "axios";
import { StudentStudentSkillsModel } from "../Interface/StudentStudentSkillsModel";

export class StudentStudentSkillsService {
    private static baseUrl = "https://localhost:7085/api/StudentStudentSkills";
    public static async DeleteStudentStudentSkills(id: string): Promise<void> {
      var result = await axios.delete(`${StudentStudentSkillsService.baseUrl}/${id}`);
    }
    public static async GetAllStudentStudentSkills(): Promise<StudentStudentSkillsModel[]> {
      const result = await axios.get(StudentStudentSkillsService.baseUrl);
      return result.data;
    }
    public static async GetStudentStudentSkills(id: string): Promise<StudentStudentSkillsModel> {
        const result = await axios.get(`${StudentStudentSkillsService.baseUrl}/${id}`);
        return result.data;
    }
     public static async AddOrEditStudentStudentSkills(model: StudentStudentSkillsModel): Promise<void> {
      const result = await axios.post(`${StudentStudentSkillsService.baseUrl}`, model);
    }
    public static async GetSkillsByStudent(id: string): Promise<StudentStudentSkillsModel[]> {
        const result = await axios.get(`${StudentStudentSkillsService.baseUrl}/student/${id}`);
        return result.data;
    }
    
}