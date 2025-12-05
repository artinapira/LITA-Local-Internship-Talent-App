import axios from "axios";
import { StudyFieldModel } from "../Interface/StudyFieldModel";

export class StudyFieldService {
    private static baseUrl = "https://localhost:7085/api/StudyField";
    public static async DeleteStudyField(id: string): Promise<void> {
      var result = await axios.delete(`${StudyFieldService.baseUrl}/${id}`);
    }
    public static async GetAllStudyFields(): Promise<StudyFieldModel[]> {
      const result = await axios.get(StudyFieldService.baseUrl);
      return result.data;
    }
    public static async GetStudyField(id: string): Promise<StudyFieldModel> {
        const result = await axios.get(`${StudyFieldService.baseUrl}/${id}`);
        return result.data;
    }
     public static async AddOrEditStudyField(model: StudyFieldModel): Promise<void> {
      const result = await axios.post(`${StudyFieldService.baseUrl}`, model);
    }
    public static async GetSelectList() : Promise<StudyFieldModel[]> {
    const result = await axios.get(`${StudyFieldService.baseUrl}/GetStudyField`);
    return result.data;
  }
}