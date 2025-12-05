export interface JobModel{
    id:string|null;
    title:string|null;
    description:string|null;
    locationId: string|null;
    employerId:string|null;
    jobTypeId:string|null;
    studyFieldId: string|null;
    industryId: string|null;
    requiredSkills:string|null;
    postedAt:string|null;
    closesAt:string|null;
    salary:number|null;
}