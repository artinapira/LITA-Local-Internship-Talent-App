export interface StudentStudentSkillsModel{
    id:string|null;
    studentId:string|null;
    studentSkillsId:string|null;
    studentSkills: {
    id: string;
    name: string;
  }
}