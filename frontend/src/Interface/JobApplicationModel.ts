import { Status } from "../Enum/Status";

export interface JobApplicationModel{
    id:string|null;
    jobId:string|null;
    studentId:string|null;
    status: Status;
    appliedAt:string|null;
    cvFilePath:string|null;
    cvFile?: File;
}