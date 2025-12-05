import React, { useEffect, useState } from 'react'
import { Header } from './Header'
import { SelectListItem } from '../Interface/SelectListItem';
import { UserService } from '../Services/UserService';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "../Css/StudentProfile.css";
import { JobModel } from '../Interface/JobModel';
import { Link, useNavigate } from 'react-router-dom';
import { JobService } from '../Services/JobService';
import { Button } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { IndustryService } from '../Services/IndustryService';
import { LocationService } from '../Services/LocationService';
import { JobTypeService } from '../Services/JobTypeService';
import { StudyFieldService } from '../Services/StudyFieldService';
import { JobTypeModel } from '../Interface/JobTypeModel';
import { toast } from 'react-toastify';


export default function Jobs()  {
  const [jobs, setJobs] = useState<JobModel[]>([]);
  const employerId = localStorage.getItem("id");
  const [employerList, setEmployerList] = useState<SelectListItem[]>([]);
  const [locationList, setLocationList] = useState<SelectListItem[]>([]);
  const [jobTypeList, setJobTypeList] = useState<JobTypeModel[]>([]);
  const [studyFieldList, setStudyFieldList] = useState<SelectListItem[]>([]);
  const [industryList, setIndustryList] = useState<SelectListItem[]>([]);
  const navigate = useNavigate();
  const [showJobModal, setShowJobModal] = useState(false);
  const [jobValue, setJobValue] = useState<JobModel>({
    id:'',
    title: '',
    description: '',
    locationId: '',
    employerId: '',
    jobTypeId: '',
    studyFieldId: '',
    industryId:'',
    requiredSkills: '',
    postedAt: new Date().toISOString().slice(0, 16),
    closesAt: new Date().toISOString().slice(0, 16),
    salary: 0,
  }as JobModel);

    const fetchJobData = async () => {
      const result = await JobService.GetByEmployerId(employerId!);
      setJobs(result);
    };
    useEffect(()=>{
    fetchJobData();
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

  function getEmployer(employerId: string) {
    return employerList.find(s => s.value === employerId)?.text || "Unknown Employer";
  }
    
  function sendToDetails(id:string | null) {
    navigate(`/Applicants/${id}`);
  }

  const handleJobSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
    let model = {
      id: jobValue.id || null,
      title: jobValue.title,
      description:jobValue.description,
      locationId:jobValue.locationId,
      employerId:employerId,
      jobTypeId: jobValue.jobTypeId,
      studyFieldId:jobValue.studyFieldId,
      industryId: jobValue.industryId,
      requiredSkills: jobValue.requiredSkills,
      postedAt:jobValue.postedAt,
      closesAt:jobValue.closesAt,
      salary: jobValue.salary,

    } as JobModel;

    console.log(model)
    const response = await axios.post(
      "https://localhost:7085/api/Job",
      model
    );

    await fetchJobData();
    setShowJobModal(false);
    toast.success("You have successfully added the job");
  } catch (error) {
    console.error("Error creating job:", error);
  }
};
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
const handleChange = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const { name, value } = e.target;
  setJobValue({ ...jobValue, [name]: value });
};
const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const { name, value } = e.target;
  setJobValue({ ...jobValue, [name]: value });
};
  return (
    <>
    <Header/>
    <main className="d-flex-column justify-content-center align-items-center">
        <div className='clients'>
            <div className="clients_section">
            <div className="container">
                <div className="row d-flex flex-column w-50 m-auto">
                <div className="d-grid gap-3 my-5">
                    <h1 className='text-center'>Jobs</h1>
                    <div className='lineservice m-auto' />
                </div>
                </div>
                <div className='row gap-5 d-flex justify-content-center m-auto'>
                    {jobs.length > 0 ? (
                        jobs.map((job) => (
                            <div key={job.id} className="card col-md-5 col-12 pt-4 px-4 client rounded-5">
                              <button
                                className="btn btn-light rounded-circle shadow btn-sm position-absolute"
                                style={{ top: "8px", right: "8px", borderRadius: "50%" }}
                                onClick={() => {
                                  setShowJobModal(true);
                                  setJobValue(job);
                                }}
                              >
                                <FontAwesomeIcon icon={faPen} />
                              </button>
                                <h3>{job.title}</h3>
                                <div className="card-body p-4">
                                    <p className="card-text text-center">{job.description}</p>
                                    <h5 className="card-title boldtext employer">{getEmployer(job.employerId!)}</h5>
                                    <button
                                        type="button"
                                        className="butoni text-center align-content-end"  
                                        onClick={()=>sendToDetails(job.id)}
                                    >
                                        Check
                                    </button>
                                </div>
                            </div>
                        ))
                        ) : (
                        <h4 className="text-center text-muted">No jobs available</h4>
                    )}
                    
                    <div className="card skills col-md-5 col-12 p-3 rounded-5">
                      <Button
                        onClick={() => {setShowJobModal(true)}}
                        style={{
                        all: 'unset',   
                        cursor: 'pointer', 
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        }}
                      >
                      <FontAwesomeIcon icon={faPlus} style={{ color: "#63E6BE" }} />
                      </Button>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <div className={`modal fade ${showJobModal ? "show d-block" : ""}`}>
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Add Job</h5>
        <button className="btn-close" onClick={() => setShowJobModal(false)}></button>
      </div>

      <div className="modal-body">
        <form onSubmit={handleJobSubmit}>
          <div className="form-group">
          <label>Title</label>
          <input
            style={{ padding: "5px", margin: "5px" }}
            type="text"
            placeholder="Title"
            className="form-control"
            id="title"
            name="title"
            value={jobValue.title!}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
        <label>Description</label>
          <input
            style={{ padding: "5px", margin: "5px" }}
            type="text"
            placeholder="Description"
            className="form-control"
            id="description"
            name="description"
            value={jobValue.description!}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6-w-100%">
              <select className="form-control"
                name="locationId" 
                id="locationId"
                value= {jobValue.locationId || ""}
                onChange={handleSelectChange}
                style={{ marginBottom: "15px"}}
                >
                  <option value="" disabled>Select Location</option>
                  {locationList.map((x) => (
                    <option key={x.key} value={x.value!}>{x.text}</option>
                  ))}
                </select>
          </div>
          <div className="col-md-6-w-100%">
              <select className="form-control"
                name="jobTypeId" 
                id="jobTypeId"
                value= {jobValue.jobTypeId || ""}
                onChange={handleSelectChange}
                style={{ marginBottom: "15px"}}
                >
                  <option value="" disabled>Select Job Type</option>
                  {jobTypeList.map((x) => (
                    <option key={x.id} value={x.id!}>{x.jobTypeName}</option>
                  ))}
                </select>
          </div>
          <div className="col-md-6-w-100%">
              <select className="form-control"
                name="studyFieldId" 
                id="studyFieldId"
                value= {jobValue.studyFieldId || ""}
                onChange={handleSelectChange}
                style={{ marginBottom: "15px"}}
                >
                  <option value="" disabled>Select Study Field</option>
                  {studyFieldList.map((x) => (
                    <option key={x.key} value={x.value!}>{x.text}</option>
                  ))}
                </select>
          </div>
          <div className="col-md-6-w-100%">
              <select className="form-control"
                name="industryId" 
                id="industryId"
                value= {jobValue.industryId || ""}
                onChange={handleSelectChange}
                style={{ marginBottom: "15px"}}
                >
                  <option value="" disabled>Select Industry</option>
                  {industryList.map((x) => (
                    <option key={x.key} value={x.value!}>{x.text}</option>
                  ))}
                </select>
          </div>
          <div className="form-group">
        <label>Required Skills</label>
          <input
            style={{ padding: "5px", margin: "5px" }}
            type="text"
            placeholder="Required Skills"
            className="form-control"
            id="requiredSkills"
            name="requiredSkills"
            value={jobValue.requiredSkills!}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
        <label>Closes at</label>
          <input
            style={{ padding: "5px", margin: "5px" }}
            type="datetime-local"
            placeholder="Closes at"
            className="form-control"
            id="closesAt"
            name="closesAt"
            value={jobValue.closesAt!}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
        <label>Salary</label>
          <input
            style={{ padding: "5px", margin: "5px" }}
            type="number"
            placeholder="Salary"
            className="form-control"
            id="salary"
            name="salary"
            value={jobValue.salary!}
            onChange={handleChange}
          />
        </div>

          <div className="modal-footer">
            <button 
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowJobModal(false)}
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
