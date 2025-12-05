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
import { StudentSkillsModel } from "../../Interface/StudentSkillsModel";
import { StudentSkillsService } from "../../Services/StudentSkillsService";

export default function StudentSkillsTable() {
  const [studentSkills, setStudentSkills] = useState<StudentSkillsModel[]>([]);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [deleteStudentSkillsId, setDeleteStudentSkillsId] = useState<string>("");
  
  const navigate = useNavigate();
  useEffect(()=>{
    const fetchData = async () => {
      const result = await StudentSkillsService.GetAllStudentSkills();
      setStudentSkills(result);
    }
    fetchData();
  }, []);

  function deleteStudentSkills(id: string) {
    setOpenConfirm(true);
    setDeleteStudentSkillsId(id);
  }

  async function confirmedDeleteStudentSkills(id: string) {
    var result = await StudentSkillsService.DeleteStudentSkills(id);
    setStudentSkills(studentSkills.filter((studentSkills) => studentSkills.id !== id));
    setOpenConfirm(false);
    setDeleteStudentSkillsId("");
  }

  function sendToDetails(id:string | null) {
    navigate(`/EditStudentSkills/${id}`);
  }

  function AddStudentSkills() {
    navigate(`/AddStudentSkills`);
  }

  return (
    <Fragment>
      <div className="mt-5 d-flex align-items-center">
        <h1 style={{ marginLeft: "30px" }}>StudentSkills</h1>
        <Button
          type="button"
          className="ui positive basic button ms-4"
          onClick={() => AddStudentSkills()}
        >
          Add New StudentSkills
        </Button>
        <div className="col-12 col-sm-8 col-md-6 col-lg-4 col-xl-3">
      </div>
      </div>
      <Table striped>
        <TableHeader>
          <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {studentSkills.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
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
                  onClick={() => deleteStudentSkills(item.id!)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
          <Confirm
            open={openConfirm}
            onCancel={() => setOpenConfirm(false)}
            onConfirm={() => confirmedDeleteStudentSkills(deleteStudentSkillsId!)}
          />
        </TableBody>
      </Table>
    </Fragment>
  );
}
