export interface EmployerIndustryModel{
    id:string|null;
    employerId:string|null;
    industryId:string|null;
    industries: {
    id: string;
    name: string;
  }
}