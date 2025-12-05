import React, { useEffect, useState } from 'react'
import { Header } from './Header'
import { SelectListItem } from '../Interface/SelectListItem';
import { UserService } from '../Services/UserService';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "../Css/StudentProfile.css";
import { JobModel } from '../Interface/JobModel';
import { Link, useNavigate } from 'react-router-dom';
import { JobService } from '../Services/JobService';
import { JobTypeModel } from '../Interface/JobTypeModel';
import { LocationService } from '../Services/LocationService';
import { JobTypeService } from '../Services/JobTypeService';
import { StudyFieldService } from '../Services/StudyFieldService';
import { IndustryService } from '../Services/IndustryService';
import { UserModel } from '../Interface/UserModel';


export default function FindJob()  {
  const [jobs, setJobs] = useState<JobModel[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobModel[]>([]);
  const [locationList, setLocationList] = useState<SelectListItem[]>([]);
  const [employerList, setEmployerList] = useState<UserModel[]>([]);
  const [jobTypeList, setJobTypeList] = useState<JobTypeModel[]>([]);
  const [studyFieldList, setStudyFieldList] = useState<SelectListItem[]>([]);
  const [industryList, setIndustryList] = useState<SelectListItem[]>([]);

  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedJobType, setSelectedJobType] = useState<string>('');
  const [selectedStudyField, setSelectedStudyField] = useState<string>('');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('');
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchData = async () => {
      const result = await JobService.GetAllJobs();
      setJobs(result);
      setFilteredJobs(result);
    };
    fetchData();
  }, []);

  useEffect(() => { fetchLocationList(); fetchJobTypeList(); fetchStudyFieldList(); fetchIndustryList(); }, []);

  const fetchLocationList = async () => {
    const response = await LocationService.GetSelectList();
    setLocationList(response.map((item, i) => ({ key: i, value: item.id, text: item.name } as SelectListItem)).filter(x => x.text));
  }

  const fetchJobTypeList = async () => {
    const response = await JobTypeService.GetAllJobTypes();
    setJobTypeList(response);
  }

  const fetchStudyFieldList = async () => {
    const response = await StudyFieldService.GetSelectList();
    setStudyFieldList(response.map((item, i) => ({ key: i, value: item.id, text: item.name } as SelectListItem)).filter(x => x.text));
  }

  const fetchIndustryList = async () => {
    const response = await IndustryService.GetSelectList();
    setIndustryList(response.map((item, i) => ({ key: i, value: item.id, text: item.name } as SelectListItem)).filter(x => x.text));
  }

  const fetchEmployerList = async () => {
    const response = await UserService.GetAllEmployers();
    
    setEmployerList(response)
    
    }
    useEffect(() => {
      fetchEmployerList();
    }, []);

    const filterJobs = () => {
    let tempJobs = [...jobs];

    if (selectedLocation) tempJobs = tempJobs.filter(job => job.locationId === selectedLocation);
    if (selectedJobType) tempJobs = tempJobs.filter(job => job.jobTypeId === selectedJobType);
    if (selectedStudyField) tempJobs = tempJobs.filter(job => job.studyFieldId === selectedStudyField);
    if (selectedIndustry) tempJobs = tempJobs.filter(job => job.industryId === selectedIndustry);

    setFilteredJobs(tempJobs);
  }
  useEffect(() => {
    filterJobs();
  }, [selectedLocation, selectedJobType, selectedStudyField, selectedIndustry]);


  function getEmployer(employerId: string) {
    return employerList.find(j => j.id === employerId)?.companyName || "Unknown Job";
  }
    
  function sendToDetails(id:string | null) {
    navigate(`/JobDetails/${id}`);
  }



  return (
    <>
    <Header/>
    <main className="d-flex-column justify-content-center align-items-center">
        <div className='clients'>
            <div className="clients_section">
            <div className="container">
              <div className="d-flex flex-wrap justify-content-center gap-3 pt-4">
                <select className="form-select filter-select" value={selectedLocation} onChange={e => setSelectedLocation(e.target.value)}>
                  <option value="">All Locations</option>
                  {locationList.map(loc => <option key={loc.key} value={loc.value!}>{loc.text}</option>)}
                </select>

                <select className="form-select filter-select" value={selectedJobType} onChange={e => setSelectedJobType(e.target.value)}>
                  <option value="">All Job Types</option>
                  {jobTypeList.map(type => <option key={type.id} value={type.id!}>{type.jobTypeName}</option>)}
                </select>

                <select className="form-select filter-select" value={selectedStudyField} onChange={e => setSelectedStudyField(e.target.value)}>
                  <option value="">All Study Fields</option>
                  {studyFieldList.map(field => <option key={field.key} value={field.value!}>{field.text}</option>)}
                </select>

                <select className="form-select filter-select" value={selectedIndustry} onChange={e => setSelectedIndustry(e.target.value)}>
                  <option value="">All Industries</option>
                  {industryList.map(ind => <option key={ind.key} value={ind.value!}>{ind.text}</option>)}
                </select>
              </div>

                <div className="row d-flex flex-column w-50 m-auto">
                <div className="d-grid gap-3 my-5">
                    <h1 className='text-center'>Jobs</h1>
                    <div className='lineservice m-auto' />
                </div>
                </div>
                <div className='row gap-5 d-flex justify-content-center m-auto'>
                    {filteredJobs.length > 0 ? (
                        filteredJobs.map((job) => (
                            <div key={job.id} className="card col-md-5 col-12 pt-4 px-4 client rounded-5">
                                <h3>{job.title}</h3>
                                <div className="card-body p-4">
                                    <p className="card-text text-center">{job.description}</p>
                                    <h5 className="card-title boldtext employer">{getEmployer(job.employerId!)}</h5>
                                    <button
                                        type="button"
                                        className="butoni text-center"  
                                        onClick={()=>sendToDetails(job.id)}
                                    >
                                        See more
                                    </button>
                                </div>
                            </div>
                        ))
                        ) : (
                        <h4 className="text-center text-muted">No jobs available</h4>
                    )}

                </div>
            </div>
        </div>
      </div>
    </main>
    </>
  )
}
