import { Role } from "../Enum/Role";

export interface UserModel {
  id: string | null | undefined;
  email: string | null;
  userName: string | null;
  password: string | null;
  role: Role;

  // Fields for employer
  companyName:string|null;
  //Fields for student
  name:string|null;
  university:string|null;
  studyFieldId: string|null;
  createdAt:string|null;
  //Fields for student and employer
  profileImagePath: string|null;
  locationId:string|null;
  profileImage?: File;
}