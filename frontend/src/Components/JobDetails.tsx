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
import axios from 'axios';
import { Status } from '../Enum/Status';
import { toast } from 'react-toastify';
import { JobApplicationService } from '../Services/JobApplicationService';


export default function JobDetails()  {
  const { id } = useParams<{ id: string}>();
  const studentId = localStorage.getItem('id');
  const [job, setJob] = useState<JobModel>();
  const [locationList, setLocationList] = useState<SelectListItem[]>([]);
  const [jobTypeList, setJobTypeList] = useState<JobTypeModel[]>([]);
  const [studyFieldList, setStudyFieldList] = useState<SelectListItem[]>([]);
  const [applications, setApplications] = useState<JobApplicationModel[]>([]);
  const [industryList, setIndustryList] = useState<SelectListItem[]>([]);
  const [employerList, setEmployerList] = useState<SelectListItem[]>([]);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [values, setValues] = useState<JobApplicationModel>({
      studentId: studentId,
      status: Status.Pending,
      appliedAt: new Date().toISOString().slice(0, 16),
      cvFilePath: ''
    } as JobApplicationModel);
  useEffect(()=>{
    const fetchData = async () => {
      const result = await JobService.GetJob(id!);
      setJob(result);
    };
    fetchData();
  }, []);

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
  const fetchApplications = async () => {
      const response = await JobApplicationService.GetAllJobApplications();
      setApplications(response);
    
  };
  useEffect(() => {
    fetchApplications();
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const alreadyapplied = applications.some(
      (i) => i.studentId === values.studentId && i.jobId === id
    );
    if (alreadyapplied) {
      toast.error("You already applied for this job check your profile!");
      return;
    }
  try {
    const formData = new FormData();
    formData.append("Id", values.id || "");
    formData.append("JobId", id || "");
    formData.append("StudentId", studentId || "");

    formData.append("Status", values.status.toString());
    formData.append("AppliedAt", values.appliedAt || new Date().toISOString());

    if (values.cvFile) {
      formData.append("CvFile", values.cvFile); 
    } 
    const tempPath = `/uploads/temp_${values.cvFile?.name}`;
    formData.append("CvFilePath", tempPath);

    console.log(formData)
    const response = await axios.post(
      "https://localhost:7085/api/Application",
      formData
    );
    setShowApplyModal(false);
    toast.success("You have successfully applied for this job!");
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
                        <div className="text-center mt-4">
                            <button 
                                className="btn btn-success px-4 py-2"
                                onClick={() => setShowApplyModal(true)}
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

      </div>

        <div 
            className={`modal fade ${showApplyModal ? "show d-block" : ""}`} 
            tabIndex={-1}
        >
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
        <div className="modal-footer">
        <button 
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
