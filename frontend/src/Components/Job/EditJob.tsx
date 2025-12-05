import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';
import { SelectListItem } from '../../Interface/SelectListItem';
import { JobService } from '../../Services/JobService';
import { UserService } from '../../Services/UserService';
import { JobModel } from '../../Interface/JobModel';
import { LocationService } from '../../Services/LocationService';
import { JobTypeService } from '../../Services/JobTypeService';
import { StudyFieldService } from '../../Services/StudyFieldService';
import { IndustryService } from '../../Services/IndustryService';
import { JobTypeModel } from '../../Interface/JobTypeModel';

export default function EditJob() {
  const { id } = useParams<{ id: string}>();
  const [locationList, setLocationList] = useState<SelectListItem[]>([]);
  const [employerList, setEmployerList] = useState<SelectListItem[]>([]);
  const [jobTypeList, setJobTypeList] = useState<JobTypeModel[]>([]);
  const [studyFieldList, setStudyFieldList] = useState<SelectListItem[]>([]);
  const [industryList, setIndustryList] = useState<SelectListItem[]>([]);
  const [values, setValues] = useState<JobModel>({
    id:id!,
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
  } as JobModel);

  const navigate = useNavigate();
  const [job, setJob] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      if(id!=null){
     const response = await JobService.GetJob(id!);
     const userData = response;
     setValues({
       id: userData.id,
       title: userData.title,
       description: userData.description,
       locationId: userData.locationId,
       employerId: userData.employerId,
       jobTypeId: userData.jobTypeId,
       studyFieldId: userData.studyFieldId,
       industryId: userData.industryId,
       requiredSkills: userData.requiredSkills,
       postedAt: userData.postedAt,
       closesAt: userData.closesAt,
       salary: userData.salary,
     }as JobModel);
    }
  };
  
  fetchData();

}, [id!]);

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

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
    let model = {
      id: values.id || null,
      title: values.title,
      description:values.description,
      locationId:values.locationId,
      employerId:values.employerId,
      jobTypeId: values.jobTypeId,
      studyFieldId:values.studyFieldId,
      industryId: values.industryId,
      requiredSkills: values.requiredSkills,
      postedAt:values.postedAt,
      closesAt:values.closesAt,
      salary: values.salary,

    } as JobModel;

    console.log(model)
    const response = await axios.post(
      "https://localhost:7085/api/Job",
      model
    );
    setJob(true);
    sendToOverview();
  } catch (error) {
    console.error("Error creating job:", error);
  }
};
function sendToOverview(){
  navigate('/JobTable');
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
    <h1 style={{ marginLeft: "15px", fontFamily: "Georgia", color: "black" }}>
        {values.id != null ? 'Edit' : 'Add'} Job
      </h1>
      <p style={{ marginLeft: "15px", color: "#555", fontSize: "14px" }}>
        Please fill out the form below to {values.id != null ? 'edit' : 'create'} a Job.
      </p>
      <Segment clearing style={{ margin: "30px 30px 0 10px", boxShadow: "0px 4px 6px rgba(0,0,0,0.1)", border: "1px solid rgb(15 179 126 / 87%)" }}>
    <form className='ui form' style={{ backgroundColor: "#f9f9f9", padding: "20px" }} onSubmit={handleSubmit} autoComplete="off">
        <div className="form-group">
        <label>Title</label>
          <input
            style={{ padding: "5px", margin: "5px" }}
            type="text"
            placeholder="Title"
            className="form-control"
            id="title"
            name="title"
            value={values.title!}
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
            value={values.description!}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6-w-100%">
              <select className="form-control"
                name="locationId" 
                id="locationId"
                value= {values.locationId || ""}
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
                name="employerId" 
                id="employerId"
                value= {values.employerId || ""}
                onChange={handleSelectChange}
                style={{ marginBottom: "15px"}}
                >
                  <option value="" disabled>Select Employer</option>
                  {employerList.map((x) => (
                    <option key={x.key} value={x.value!}>{x.text}</option>
                  ))}
                </select>
          </div>
          <div className="col-md-6-w-100%">
              <select className="form-control"
                name="jobTypeId" 
                id="jobTypeId"
                value= {values.jobTypeId || ""}
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
                value= {values.studyFieldId || ""}
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
                value= {values.industryId || ""}
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
            value={values.requiredSkills!}
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
            value={values.closesAt!}
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
            value={values.salary!}
            onChange={handleChange}
          />
        </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "20px" }}>
          <button
          type="submit"
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
