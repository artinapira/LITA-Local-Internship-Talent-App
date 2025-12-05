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
import { UserModel } from "../../Interface/UserModel";
import { UserService } from "../../Services/UserService";
import { Role } from "../../Enum/Role";
import { SelectListItem } from "../../Interface/SelectListItem";
import { LocationService } from "../../Services/LocationService";
import { StudyFieldService } from "../../Services/StudyFieldService";

export default function StudentTable() {
  const [students, setStudents] = useState<UserModel[]>([]);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [locationList, setLocationList] = useState<SelectListItem[]>([]);
  const [studyFieldList, setStudyFieldList] = useState<SelectListItem[]>([]);
  const [deleteStudentId, setDeleteStudentId] = useState<string>("");
  
  const navigate = useNavigate();
  useEffect(()=>{
    const fetchData = async () => {
      const result = await UserService.GetAllStudents();
      setStudents(result);
    }
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

  function deleteStudent(id: string) {
    setOpenConfirm(true);
    setDeleteStudentId(id);
  }

  async function confirmedDeleteStudent(id: string) {
    var result = await UserService.DeleteUser(id);
    setStudents(students.filter((student) => student.id !== id));
    setOpenConfirm(false);
    setDeleteStudentId("");
  }

  function getLocation(locationId: string) {
  return locationList.find(j => j.value === locationId)?.text || "Unknown Location";
}

function getStudyField(studyFieldId: string) {
  return studyFieldList.find(j => j.value === studyFieldId)?.text || "Unknown Study Field";
}

  function sendToDetails(id:string | null) {
    navigate(`/EditStudent/${id}`);
  }

  function AddStudent() {
    navigate(`/AddStudent`);
  }

  return (
    <Fragment>
      <div className="mt-5 d-flex align-items-center">
        <h1 style={{ marginLeft: "30px" }}>Student</h1>
        <Button
          type="button"
          className="ui positive basic button ms-4"
          onClick={() => AddStudent()}
        >
          Add New Student
        </Button>
        <div className="col-12 col-sm-8 col-md-6 col-lg-4 col-xl-3">
      </div>
      </div>
      <Table striped>
        <TableHeader>
          <TableRow>
          <TableHeaderCell>Email</TableHeaderCell>
          <TableHeaderCell>Username</TableHeaderCell>
          <TableHeaderCell>Role</TableHeaderCell>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>University</TableHeaderCell>
          <TableHeaderCell>Study Field</TableHeaderCell>
          <TableHeaderCell>Location</TableHeaderCell>
          <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {students.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.userName}</TableCell>
              <TableCell>{Role[item.role]}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.university}</TableCell>
              <TableCell>{getStudyField(item.studyFieldId!)}</TableCell>
              <TableCell>{getLocation(item.locationId!)}</TableCell>
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
                  onClick={() => deleteStudent(item.id!)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
          <Confirm
            open={openConfirm}
            onCancel={() => setOpenConfirm(false)}
            onConfirm={() => confirmedDeleteStudent(deleteStudentId!)}
          />
        </TableBody>
      </Table>
    </Fragment>
  );
}
