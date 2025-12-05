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
import { JobApplicationModel } from "../../Interface/JobApplicationModel";
import { JobApplicationService } from "../../Services/JobApplicationService";
import { SelectListItem } from "../../Interface/SelectListItem";
import { JobService } from "../../Services/JobService";
import { UserService } from "../../Services/UserService";
import { JobModel } from "../../Interface/JobModel";
import { Status } from "../../Enum/Status";

export default function JobApplicationTable() {
  const [jobApplications, setJobApplications] = useState<JobApplicationModel[]>([]);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [deleteJobApplicationId, setDeleteJobApplicationId] = useState<string>("");
  const [jobList, setJobList] = useState<JobModel[]>([]);
  const [studentList, setStudentList] = useState<SelectListItem[]>([]);
  
  const navigate = useNavigate();
  useEffect(()=>{
    const fetchData = async () => {
      const result = await JobApplicationService.GetAllJobApplications();
      setJobApplications(result);
    };
    fetchData();
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

  function deleteJobApplications(id: string) {
    setOpenConfirm(true);
    setDeleteJobApplicationId(id);
  }

  async function confirmedDeleteJobApplication(id: string) {
    var result = await JobApplicationService.DeleteJobApplication(id);
    setJobApplications(jobApplications.filter((jobApplication) => jobApplication.id !== id));
    setOpenConfirm(false);
    setDeleteJobApplicationId("");
  }

  function sendToDetails(id:string | null) {
    navigate(`/EditJobApplication/${id}`);
  }

  function AddJobApplication() {
    navigate(`/AddJobApplication`);
  }

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
    <Fragment>
      <div className="mt-5 d-flex align-items-center">
        <h1 style={{ marginLeft: "30px" }}>Job Application</h1>
        <Button
          type="button"
          className="ui positive basic button ms-4"
          onClick={() => AddJobApplication()}
        >
          Add New Job Application
        </Button>
        <div className="col-12 col-sm-8 col-md-6 col-lg-4 col-xl-3">
      </div>
      </div>
      <Table striped>
        <TableHeader>
          <TableRow>
          <TableHeaderCell>Job</TableHeaderCell>
          <TableHeaderCell>Student</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
          <TableHeaderCell>AppliedAt</TableHeaderCell>
          <TableHeaderCell>Cv</TableHeaderCell>
          <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {jobApplications.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{getJobTitle(item.jobId!)}</TableCell>
              <TableCell>{getStudentName(item.studentId!)}</TableCell>
              <TableCell>{Status[item.status]}</TableCell>
              <TableCell>{item.appliedAt}</TableCell>
              <TableCell>
                {item.cvFilePath ? (
                  <Button
                    type="button"
                    className="ui blue button"
                    onClick={() => downloadCV(item.cvFilePath!)}
                  >
                    Download CV
                  </Button>
                ) : (
                  "No CV"
                )}
              </TableCell>
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
                  onClick={() => deleteJobApplications(item.id!)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
          <Confirm
            open={openConfirm}
            onCancel={() => setOpenConfirm(false)}
            onConfirm={() => confirmedDeleteJobApplication(deleteJobApplicationId!)}
          />
        </TableBody>
      </Table>
    </Fragment>
  );
}
