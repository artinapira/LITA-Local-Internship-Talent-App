import React, { useEffect, useState } from 'react'
import { Header } from './Header'
import { SelectListItem } from '../Interface/SelectListItem';
import { UserService } from '../Services/UserService';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "../Css/StudentProfile.css";
import { JobModel } from '../Interface/JobModel';
import { useParams } from 'react-router-dom';
import { JobService } from '../Services/JobService';
import { JobTypeModel } from '../Interface/JobTypeModel';
import { IndustryService } from '../Services/IndustryService';
import { StudyFieldService } from '../Services/StudyFieldService';
import { JobTypeService } from '../Services/JobTypeService';
import { LocationService } from '../Services/LocationService';
import { JobApplicationModel } from '../Interface/JobApplicationModel';
import { JobApplicationService } from '../Services/JobApplicationService';
import { Button } from 'semantic-ui-react';
import { Status } from '../Enum/Status';
import axios from 'axios';
import { toast } from 'react-toastify';


export default function Applicants()  {
  const { id } = useParams<{ id: string}>();
  const token = localStorage.getItem("token");
  const [job, setJob] = useState<JobModel>();
  const [locationList, setLocationList] = useState<SelectListItem[]>([]);
  const [jobTypeList, setJobTypeList] = useState<JobTypeModel[]>([]);
  const [studyFieldList, setStudyFieldList] = useState<SelectListItem[]>([]);
  const [industryList, setIndustryList] = useState<SelectListItem[]>([]);
  const [employerList, setEmployerList] = useState<SelectListItem[]>([]);
  const [applicationList, setApplicationList] = useState<JobApplicationModel[]>([]);
  const [jobList, setJobList] = useState<JobModel[]>([]);
  const [studentList, setStudentList] = useState<SelectListItem[]>([]);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [currentApplication, setCurrentApplication] = useState<JobApplicationModel | null>(null);
  const [values, setValues] = useState<JobApplicationModel>({
    id:'',
    jobId: '',
    studentId: '',
    status: Status.Pending,
    appliedAt: new Date().toISOString().slice(0, 16),
    cvFilePath:''
  } as JobApplicationModel);
  useEffect(()=>{
    const fetchData = async () => {
      const result = await JobService.GetJob(id!);
      setJob(result);
    };
    fetchData();
  }, []);

    const fetchApplications = async () => {
      const response = await JobApplicationService.GetApplicationsByJobId(id!);
      setApplicationList(response);
    };
    useEffect(()=>{
    fetchApplications();
  },[])

  const fetchLocationList = async () => {
    const response = await LocationService.GetSelectList();
  
    setLocationList(response.map((item,i)=>({
      key: i,
      value: item.id,
      text: item.name
    } as SelectListItem)).filter(x=>x.text != '' &&x.text != null));
  
  
  }
  useEffect(() => {
    fetchLocationList();
  }, []);
  
  const fetchEmployerList = async () => {
    const response = await UserService.GetEmployerSelectList();
  
    setEmployerList(response.map((item,i)=>({
      key: i,
      value: item.id,
      text: item.name
    } as SelectListItem)).filter(x=>x.text != '' &&x.text != null));
  
  
  }
  useEffect(() => {
    fetchEmployerList();
  }, []);
  
  useEffect(()=>{
      const fetchData = async () => {
        const result = await JobTypeService.GetAllJobTypes();
        setJobTypeList(result);
      }
      fetchData();
    }, []);
  
  
  const fetchStudyFieldList = async () => {
    const response = await StudyFieldService.GetSelectList();
  
    setStudyFieldList(response.map((item,i)=>({
      key: i,
      value: item.id,
      text: item.name
    } as SelectListItem)).filter(x=>x.text != '' &&x.text != null));
  
  
  }
  useEffect(() => {
    fetchStudyFieldList();
  }, []);
  
  const fetchIndustryList = async () => {
    const response = await IndustryService.GetSelectList();
  
    setIndustryList(response.map((item,i)=>({
      key: i,
      value: item.id,
      text: item.name
    } as SelectListItem)).filter(x=>x.text != '' &&x.text != null));
  
  
  }
  useEffect(() => {
    fetchIndustryList();
  }, []);

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
  
    function getJobTitle(jobId: string) {
    return jobList.find(j => j.id === jobId)?.title || "Unknown Job";
  }
  
  function getStudentName(studentId: string) {
    return studentList.find(s => s.value === studentId)?.text || "Unknown Student";
  }

  

  function getLocation(locationId: string) {
  return locationList.find(j => j.value === locationId)?.text || "Unknown Location";
}

function getEmployer(employerId: string) {
  return employerList.find(s => s.value === employerId)?.text || "Unknown Employer";
}
function getJobType(jobTypeId: string) {
  return jobTypeList.find(j => j.id === jobTypeId)?.jobTypeName || "Unknown Job Type";
}

function getStudyField(studyFieldId: string) {
  return studyFieldList.find(s => s.value === studyFieldId)?.text || "Unknown Study Field";
}
function getIndustry(industryId: string) {
  return industryList.find(s => s.value === industryId)?.text || "Unknown Industry";
}
const statusSelectList =  Object.keys(Status).map((key,i) => ({
    key: i,
    value: +i,
    text: Status[+key]
})).filter(x=> x.text != '' && x.text != null);


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

    console.log(formData)
    const response = await axios.post(
      "https://localhost:7085/api/Application",
      formData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    await fetchApplications();
    
    setShowApplyModal(false);
    setValues({
      id: "",
      jobId: "",
      studentId: "",
      status: Status.Pending,
      appliedAt: new Date().toISOString().slice(0, 16),
      cvFilePath: ""
    });
    setCurrentApplication({
      id: "",
      jobId: "",
      studentId: "",
      status: Status.Pending,
      appliedAt: new Date().toISOString().slice(0, 16),
      cvFilePath: ""
    });
    toast.success("You have successfully changed the status");
  } catch (error) {
  }
};
const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  async function downloadCV(cvFilePath: string) {
  if (!cvFilePath) return;

  const parts = cvFilePath.split("/");
  const fileName = parts[parts.length - 1];

  try {
    const response = await fetch(`https://localhost:7085/api/Application/Download/${fileName}`, {
      method: "GET",
    });

    if (!response.ok) throw new Error("File not found");

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Download failed:", err);
    alert("Failed to download CV");
  }
}


  return (
    <>
    <Header/>
    <main className="d-flex-column justify-content-center align-items-center">
        <div className='clients'>
            <div className="clients_section">
            <div className="">
                <div className="row d-flex flex-column m-auto">
                <div className="d-grid gap-3 my-5">
                    <h1 className='text-center'>Job details</h1>
                    <div className='lineservice m-auto' />
                </div>
                </div>
                <div className='row d-flex-row justify-content-center align-items-center'>
                    <div key={job?.id} className="card col-md-7 col-12 pt-4 px-4 pb-4 gap-5 client rounded-5">

                        <h1 className="mb-4 text-center">{job?.title}</h1>

                        <div className="row">
                            <div className="col-5 text-start fw-bold">
                                <p>Closes at:</p>
                                <p>Job Type:</p>
                                <p>Location:</p>
                                <p>Study Field:</p>
                                <p>Industry:</p>
                                <p>Required Skills</p>
                                <p>Salary:</p>
                                <p>Employer:</p>
                            </div>

                            <div className="col-7 text-start">
                                <p>{job?.closesAt}</p>
                                <p>{getJobType(job?.jobTypeId!)}</p>
                                <p>{getLocation(job?.locationId!)}</p>
                                <p>{getStudyField(job?.studyFieldId!)}</p>
                                <p>{getIndustry(job?.industryId!)}</p>
                                <p>{job?.requiredSkills}</p>
                                <p>{job?.salary}</p>
                                <p>{getEmployer(job?.employerId!)}</p>
                            </div>
                        </div>

                        <hr />

                        <div className="mt-3">
                            <h4>Description</h4>
                            <p>{job?.description}</p>
                        </div>
                    </div>
                </div>

                <div className='row d-flex-row justify-content-center mt-5 align-items-center'>
                    <table className="table table-bordered border-dark w-75 table-hover">
                        <thead className="table-head-custom">
                            <tr>
                                <th scope="col">Job</th>
                                <th scope="col">Student</th>
                                <th scope="col">Status</th>
                                <th scope="col">AppliedAt</th>
                                <th scope="col">CvFilePath</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="table-body-custom">
                            {applicationList.map((app) => (
                                <tr key={app.id}>
                                    <td>{getJobTitle(app.jobId!)}</td>
                                    <td>{getStudentName(app.studentId!)}</td>
                                    <td>{Status[app.status]}</td>
                                    <td>{app.appliedAt}</td>
                                    <td>{app.cvFilePath? (
                                                        <Button
                                                          type="button"
                                                          className="ui blue button"
                                                          onClick={() => downloadCV(app.cvFilePath!)}
                                                        >
                                                          Download CV
                                                        </Button>
                                                      ) : (
                                                        "No CV"
                                                    )}</td>
                                    <td><Button
                                            type="button"
                                            className="btn ui green basic button"
                                            onClick={() => {
                                              setValues(app);
                                              setCurrentApplication(app);
                                              setShowApplyModal(true);}
                                            }
                                        >
                                            Change status
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

      </div>

      <div className={`modal fade ${showApplyModal ? "show d-block" : ""}`} tabIndex={-1}>
        <div className="modal-dialog">
            <div className="modal-content">

                <div className="modal-header">
                    <h5 className="modal-title">Apply for this Job</h5>
                    <button 
                        type="button" 
                        className="btn-close" 
                        onClick={() => setShowApplyModal(false)}
                    ></button>
                </div>

                <div className="modal-body">
                    <form className='ui form' style={{ backgroundColor: "#f9f9f9", padding: "20px" }} onSubmit={handleSubmit} autoComplete="off">
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
                        <div className="modal-footer">
                            <button 
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setShowApplyModal(false)}
                            >
                                Close
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
                </div>
            </div>
        </div>
    </div>

    </main>
    </>
  )
}
