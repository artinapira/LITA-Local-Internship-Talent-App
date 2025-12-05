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
import { StudentSkillsService } from "../../Services/StudentSkillsService";
import { StudentStudentSkillsModel } from "../../Interface/StudentStudentSkillsModel";
import { StudentStudentSkillsService } from "../../Services/StudentStudentSkillsService";

export default function StudentStudentSkillsTable() {
  const [studentStudentSkills, setStudentStudentSkills] = useState<StudentStudentSkillsModel[]>([]);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [deleteStudentStudentSkillsId, setDeleteStudentStudentSkillsId] = useState<string>("");
  const [studentSkillsList, setStudentSkillsList] = useState<SelectListItem[]>([]);
  const [studentList, setStudentList] = useState<SelectListItem[]>([]);
  const navigate = useNavigate();
  useEffect(()=>{
    const fetchData = async () => {
      const result = await StudentStudentSkillsService.GetAllStudentStudentSkills();
      setStudentStudentSkills(result);
    };
    fetchData();
  }, []);

  const fetchStudentSkillsList = async () => {
    const response = await StudentSkillsService.GetSelectList();
  
    setStudentSkillsList(response.map((item,i)=>({
      key: i,
      value: item.id,
      text: item.name
    } as SelectListItem)).filter(x=>x.text != '' &&x.text != null));
  
  
  }
  useEffect(() => {
    fetchStudentSkillsList();
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

  function getStudentSkills(studentSkillsId: string) {
  return studentSkillsList.find(j => j.value === studentSkillsId)?.text || "Unknown StudentSkills";
}

function getStudentName(studentId: string) {
  return studentList.find(s => s.value === studentId)?.text || "Unknown Student";
}

  function deleteStudentStudentSkills(id: string) {
    setOpenConfirm(true);
    setDeleteStudentStudentSkillsId(id);
  }

  async function confirmedDeleteStudentStudentSkills(id: string) {
    var result = await StudentStudentSkillsService.DeleteStudentStudentSkills(id);
    setStudentStudentSkills(studentStudentSkills.filter((studentStudentSkills) => studentStudentSkills.id !== id));
    setOpenConfirm(false);
    setDeleteStudentStudentSkillsId("");
  }

  function sendToDetails(id:string | null) {
    navigate(`/EditStudentStudentSkills/${id}`);
  }

  function AddStudentStudentSkills() {
    navigate(`/AddStudentStudentSkills`);
  }

  return (
    <Fragment>
      <div className="mt-5 d-flex align-items-center">
        <h1 style={{ marginLeft: "30px" }}>StudentStudentSkills</h1>
        <Button
          type="button"
          className="ui positive basic button ms-4"
          onClick={() => AddStudentStudentSkills()}
        >
          Add New StudentStudentSkills
        </Button>
        <div className="col-12 col-sm-8 col-md-6 col-lg-4 col-xl-3">
      </div>
      </div>
      <Table striped>
        <TableHeader>
          <TableRow>
          <TableHeaderCell>Student</TableHeaderCell>
          <TableHeaderCell>StudentSkills</TableHeaderCell>
          <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {studentStudentSkills.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{getStudentName(item.studentId!)}</TableCell>
              <TableCell>{getStudentSkills(item.studentSkillsId!)}</TableCell>
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
                  onClick={() => deleteStudentStudentSkills(item.id!)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
          <Confirm
            open={openConfirm}
            onCancel={() => setOpenConfirm(false)}
            onConfirm={() => confirmedDeleteStudentStudentSkills(deleteStudentStudentSkillsId!)}
          />
        </TableBody>
      </Table>
    </Fragment>
  );
}
