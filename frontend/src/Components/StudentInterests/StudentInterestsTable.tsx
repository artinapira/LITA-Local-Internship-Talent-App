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
import { StudentInterestsModel } from "../../Interface/StudentInterestsModel";
import { StudentInterestsService } from "../../Services/StudentInterestsService";
import { IndustryService } from "../../Services/IndustryService";

export default function StudentInterestsTable() {
  const [studentInterests, setStudentInterests] = useState<StudentInterestsModel[]>([]);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [deleteStudentInterestsId, setDeleteStudentInterestsId] = useState<string>("");
  const [interestsList, setInterestsList] = useState<SelectListItem[]>([]);
    const [studentList, setStudentList] = useState<SelectListItem[]>([]);
  
  const navigate = useNavigate();
  useEffect(()=>{
    const fetchData = async () => {
      const result = await StudentInterestsService.GetAllStudentInterests();
      setStudentInterests(result);
    };
    fetchData();
  }, []);

  const fetchInterestsList = async () => {
    const response = await IndustryService.GetSelectList();
  
    setInterestsList(response.map((item,i)=>({
      key: i,
      value: item.id,
      text: item.name
    } as SelectListItem)).filter(x=>x.text != '' &&x.text != null));
  
  
  }
  useEffect(() => {
    fetchInterestsList();
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

  function getInterests(interestsId: string) {
  return interestsList.find(j => j.value === interestsId)?.text || "Unknown Interests";
}

function getStudentName(studentId: string) {
  return studentList.find(s => s.value === studentId)?.text || "Unknown Student";
}

  function deleteStudentInterests(id: string) {
    setOpenConfirm(true);
    setDeleteStudentInterestsId(id);
  }

  async function confirmedDeleteStudentInterests(id: string) {
    var result = await StudentInterestsService.DeleteStudentInterests(id);
    setStudentInterests(studentInterests.filter((studentInterests) => studentInterests.id !== id));
    setOpenConfirm(false);
    setDeleteStudentInterestsId("");
  }

  function sendToDetails(id:string | null) {
    navigate(`/EditStudentInterests/${id}`);
  }

  function AddStudentInterests() {
    navigate(`/AddStudentInterests`);
  }

  return (
    <Fragment>
      <div className="mt-5 d-flex align-items-center">
        <h1 style={{ marginLeft: "30px" }}>StudentInterests</h1>
        <Button
          type="button"
          className="ui positive basic button ms-4"
          onClick={() => AddStudentInterests()}
        >
          Add New StudentInterests
        </Button>
        <div className="col-12 col-sm-8 col-md-6 col-lg-4 col-xl-3">
      </div>
      </div>
      <Table striped>
        <TableHeader>
          <TableRow>
          <TableHeaderCell>Student</TableHeaderCell>
          <TableHeaderCell>Interest</TableHeaderCell>
          <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {studentInterests.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{getStudentName(item.studentId!)}</TableCell>
              <TableCell>{getInterests(item.interestsId!)}</TableCell>
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
                  onClick={() => deleteStudentInterests(item.id!)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
          <Confirm
            open={openConfirm}
            onCancel={() => setOpenConfirm(false)}
            onConfirm={() => confirmedDeleteStudentInterests(deleteStudentInterestsId!)}
          />
        </TableBody>
      </Table>
    </Fragment>
  );
}
