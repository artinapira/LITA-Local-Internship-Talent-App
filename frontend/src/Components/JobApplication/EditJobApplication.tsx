import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';
import { SelectListItem } from '../../Interface/SelectListItem';
import { JobApplicationModel } from '../../Interface/JobApplicationModel';
import { JobApplicationService } from '../../Services/JobApplicationService';
import { JobService } from '../../Services/JobService';
import { UserService } from '../../Services/UserService';
import { JobModel } from '../../Interface/JobModel';
import { Status } from '../../Enum/Status';
import { toast } from 'react-toastify';

export default function EditJobApplication() {
  const { id } = useParams<{ id: string}>();
  const [jobList, setJobList] = useState<JobModel[]>([]);
  const [studentList, setStudentList] = useState<SelectListItem[]>([]);
  const [values, setValues] = useState<JobApplicationModel>({
    id:id!,
    jobId: '',
    studentId: '',
    status: Status.Pending,
    appliedAt: new Date().toISOString().slice(0, 16),
    cvFilePath: ''
  } as JobApplicationModel);

  const navigate = useNavigate();
  const [jobApplication, setJobApplication] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      if(id!=null){
     const response = await JobApplicationService.GetJobApplication(id!);
     const userData = response;
     const now = new Date().toISOString();
     setValues({
       id: userData.id,
       jobId: userData.jobId,
       studentId: userData.studentId,
       status: userData.status,
       appliedAt: userData.appliedAt,
       cvFilePath: userData.cvFilePath,
     }as JobApplicationModel);
    }
  };
  
  fetchData();

}, [id!]);

  useEffect(()=>{
      const fetchJobList = async () => {
        const result = await JobService.GetAllJobs();
        setJobList(result);
      };
      fetchJobList();
    }, []);

const fetchStudentList = async () => {
  const response = await UserService.GetStudentSelectList();

  setStudentList(response.map((item,i)=>({
    key: i,
    value: item.id,
    text: item.name
  } as SelectListItem)).filter(x=>x.text != '' &&x.text != null));


}
useEffect(() => {
  fetchStudentList();
}, []);

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {
    const formData = new FormData();
    formData.append("Id", values.id || "");
    formData.append("JobId", values.jobId || "");
    formData.append("StudentId", values.studentId || "");

    formData.append("Status", values.status.toString());
    formData.append("AppliedAt", values.appliedAt || new Date().toISOString());

    if (values.cvFile) {
      formData.append("CvFile", values.cvFile); 
    } 

    const response = await axios.post(
      "https://localhost:7085/api/Application",
      formData 
    );
    setJobApplication(true);
    sendToOverview();
  } catch (error: any) {
      if (axios.isAxiosError(error)) {
      const msg = error.response?.data?.message;

      if (msg) {
        toast.error(msg);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  }
};



function sendToOverview(){
  navigate('/JobApplicationTable');
 }

 const statusSelectList =  Object.keys(Status).map((key,i) => ({
        key: i,
        value: +i,
        text: Status[+key]
      })).filter(x=> x.text != '' && x.text != null);
const handleChange = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const { name, value } = e.target;
  setValues({ ...values, [name]: value });
};
const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const { name, value } = e.target;
  setValues({ ...values, [name]: value });
};
  return (
    <>  
    <h1 style={{ marginLeft: "15px", fontFamily: "Georgia", color: "black" }}>
        {values.id != null ? 'Edit' : 'Add'} Job Application
      </h1>
      <p style={{ marginLeft: "15px", color: "#555", fontSize: "14px" }}>
        Please fill out the form below to {values.id != null ? 'edit' : 'create'} a Job Application.
      </p>
      <Segment clearing style={{ margin: "30px 30px 0 10px", boxShadow: "0px 4px 6px rgba(0,0,0,0.1)", border: "1px solid rgb(15 179 126 / 87%)" }}>
    <form className='ui form' style={{ backgroundColor: "#f9f9f9", padding: "20px" }} onSubmit={handleSubmit} autoComplete="off">
        <div className="col-md-6-w-100%">
              <select className="form-control"
                name="jobId" 
                id="jobId"
                value= {values.jobId || ""}
                onChange={handleSelectChange}
                style={{ marginBottom: "15px"}}
                >
                  <option value="" disabled>Select Job</option>
                  {jobList.map((x) => (
                    <option key={x.id} value={x.id!}>{x.title}</option>
                  ))}
                </select>
          </div>
          <div className="col-md-6-w-100%">
              <select className="form-control"
                name="studentId" 
                id="studentId"
                value= {values.studentId || ""}
                onChange={handleSelectChange}
                style={{ marginBottom: "15px"}}
                >
                  <option value="" disabled>Select Student</option>
                  {studentList.map((x) => (
                    <option key={x.key} value={x.value!}>{x.text}</option>
                  ))}
                </select>
          </div>
        <div className='form-group'>
           <label>Status</label>
           <select
            style={{ padding: "5px", margin: "5px" }}
            className="form-control"
            id="status"
            name="status"
            value={values.status!}
            onChange={handleSelectChange}
           >
            {statusSelectList.map((x)=>
            (<option key={x.key} value={x.value}>{x.text}</option>))}
           </select>
          </div>
        <div className="form-group">
          <label>Upload CV</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx" 
            className="form-control"
            name="cvFile"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
              setValues({ ...values, cvFile: e.target.files[0] }); 
              }
            }}
          />
        </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "20px" }}>
          <button
          type="button"
           onClick={sendToOverview}
           className="ui blue basic button"
          style={{ backgroundColor: "rgb(32 76 60)", color: "#fff" }}
          >
          Cancel
        </button>
        <button
          type="submit"
          className="ui green button"
          style={{ backgroundColor: "rgb(32 76 60)", color: "#fff" }}
        >
          Submit
        </button>
        </div>
      </form>
      </Segment>
      <br/>
      <br/>
    </>
  );
}
