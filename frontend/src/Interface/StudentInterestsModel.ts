export interface StudentInterestsModel{
    id:string|null;
    studentId:string|null;
    interestsId:string|null;
    interests: {
    id: string;
    name: string;
  }
}