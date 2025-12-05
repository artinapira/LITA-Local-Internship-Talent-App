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
import { SelectListItem } from "../../Interface/SelectListItem";
import { UserService } from "../../Services/UserService";
import { IndustryService } from "../../Services/IndustryService";
import { EmployerIndustryModel } from "../../Interface/EmployerIndustryModel";
import { EmployerIndustryService } from "../../Services/EmployerIndustryService";

export default function EmployerIndustryTable() {
  const [jobs, setJobs] = useState<EmployerIndustryModel[]>([]);
  const [employerList, setEmployerList] = useState<SelectListItem[]>([]);
  const [industryList, setIndustryList] = useState<SelectListItem[]>([]);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [deleteEmployerIndustryId, setDeleteEmployerIndustryId] = useState<string>("");
  
  const navigate = useNavigate();
  useEffect(()=>{
    const fetchData = async () => {
      const result = await EmployerIndustryService.GetAllEmployerIndustry();
      setJobs(result);
    };
    fetchData();
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

  function deleteEmployerIndustrys(id: string) {
    setOpenConfirm(true);
    setDeleteEmployerIndustryId(id);
  }

  async function confirmedDeleteEmployerIndustry(id: string) {
    var result = await EmployerIndustryService.DeleteEmployerIndustry(id);
    setJobs(jobs.filter((job) => job.id !== id));
    setOpenConfirm(false);
    setDeleteEmployerIndustryId("");
  }

  

function getEmployer(employerId: string) {
  return employerList.find(s => s.value === employerId)?.text || "Unknown Employer";
}
function getIndustry(industryId: string) {
  return industryList.find(s => s.value === industryId)?.text || "Unknown Industry";
}

  function sendToDetails(id:string | null) {
    navigate(`/EditEmployerIndustry/${id}`);
  }

  function AddJob() {
    navigate(`/AddEmployerIndustry`);
  }

  return (
    <Fragment>
      <div className="mt-5 d-flex align-items-center">
        <h1 style={{ marginLeft: "30px" }}>Employer Industry</h1>
        <Button
          type="button"
          className="ui positive basic button ms-4"
          onClick={() => AddJob()}
        >
          Add New Employer Industry
        </Button>
        <div className="col-12 col-sm-8 col-md-6 col-lg-4 col-xl-3">
      </div>
      </div>
      <Table striped>
        <TableHeader>
          <TableRow>
          <TableHeaderCell>Employer</TableHeaderCell>
          <TableHeaderCell>Industry</TableHeaderCell>
          <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {jobs.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{getEmployer(item.employerId!)}</TableCell>
              <TableCell>{getIndustry(item.industryId!)}</TableCell>
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
                  onClick={() => deleteEmployerIndustrys(item.id!)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
          <Confirm
            open={openConfirm}
            onCancel={() => setOpenConfirm(false)}
            onConfirm={() => confirmedDeleteEmployerIndustry(deleteEmployerIndustryId!)}
          />
        </TableBody>
      </Table>
    </Fragment>
  );
}
