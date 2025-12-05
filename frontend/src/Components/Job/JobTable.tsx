import React, { Fragment, useEffect, useState } from "react";
import {
  Table,
  Button,
  Input,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Confirm,
} from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom";
import { JobModel } from "../../Interface/JobModel";
import { JobService } from "../../Services/JobService";
import { SelectListItem } from "../../Interface/SelectListItem";
import { LocationService } from "../../Services/LocationService";
import { UserService } from "../../Services/UserService";
import { JobTypeService } from "../../Services/JobTypeService";
import { StudyFieldService } from "../../Services/StudyFieldService";
import { IndustryService } from "../../Services/IndustryService";
import { JobTypeModel } from "../../Interface/JobTypeModel";

export default function JobTable() {
  const [jobs, setJobs] = useState<JobModel[]>([]);
  const [locationList, setLocationList] = useState<SelectListItem[]>([]);
  const [employerList, setEmployerList] = useState<SelectListItem[]>([]);
  const [jobTypeList, setJobTypeList] = useState<JobTypeModel[]>([]);
  const [studyFieldList, setStudyFieldList] = useState<SelectListItem[]>([]);
  const [industryList, setIndustryList] = useState<SelectListItem[]>([]);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [deleteJobId, setDeleteJobId] = useState<string>("");
  
  const navigate = useNavigate();
  useEffect(()=>{
    const fetchData = async () => {
      const result = await JobService.GetAllJobs();
      setJobs(result);
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

  function deleteJobs(id: string) {
    setOpenConfirm(true);
    setDeleteJobId(id);
  }

  async function confirmedDeleteJob(id: string) {
    var result = await JobService.DeleteJob(id);
    setJobs(jobs.filter((job) => job.id !== id));
    setOpenConfirm(false);
    setDeleteJobId("");
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

  function sendToDetails(id:string | null) {
    navigate(`/EditJob/${id}`);
  }

  function AddJob() {
    navigate(`/AddJob`);
  }

  return (
    <Fragment>
      <div className="mt-5 d-flex align-items-center">
        <h1 style={{ marginLeft: "30px" }}>Job</h1>
        <Button
          type="button"
          className="ui positive basic button ms-4"
          onClick={() => AddJob()}
        >
          Add New Job
        </Button>
        <div className="col-12 col-sm-8 col-md-6 col-lg-4 col-xl-3">
      </div>
      </div>
      <Table striped>
        <TableHeader>
          <TableRow>
          <TableHeaderCell>Title</TableHeaderCell>
          <TableHeaderCell>Description</TableHeaderCell>
          <TableHeaderCell>Location</TableHeaderCell>
          <TableHeaderCell>Employer</TableHeaderCell>
          <TableHeaderCell>JobType</TableHeaderCell>
          <TableHeaderCell>StudyField</TableHeaderCell>
          <TableHeaderCell>Industry</TableHeaderCell>
          <TableHeaderCell>Required Skills</TableHeaderCell>
          <TableHeaderCell>Posted At</TableHeaderCell>
          <TableHeaderCell>Closes At</TableHeaderCell>
          <TableHeaderCell>Salary</TableHeaderCell>
          <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {jobs.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{getLocation(item.locationId!)}</TableCell>
              <TableCell>{getEmployer(item.employerId!)}</TableCell>
              <TableCell>{getJobType(item.jobTypeId!)}</TableCell>
              <TableCell>{getStudyField(item.studyFieldId!)}</TableCell>
              <TableCell>{getIndustry(item.industryId!)}</TableCell>
              <TableCell>{item.requiredSkills}</TableCell>
              <TableCell>{item.postedAt}</TableCell>
              <TableCell>{item.closesAt}</TableCell>
              <TableCell>{item.salary}</TableCell>
              <TableCell>
                <Button
                  type="button"
                  className="btn ui green basic button"
                  onClick={() => sendToDetails(item.id!)}
                >
                  Edit
                </Button>
                <Button
                  type="button"
                  className="btn btn-danger"
                  negative
                  onClick={() => deleteJobs(item.id!)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
          <Confirm
            open={openConfirm}
            onCancel={() => setOpenConfirm(false)}
            onConfirm={() => confirmedDeleteJob(deleteJobId!)}
          />
        </TableBody>
      </Table>
    </Fragment>
  );
}
