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
import { LocationService } from "../../Services/LocationService";
import { StudyFieldModel } from "../../Interface/StudyFieldModel";
import { StudyFieldService } from "../../Services/StudyFieldService";

export default function StudyFieldTable() {
  const [studyFields, setStudyFields] = useState<StudyFieldModel[]>([]);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [deleteStudyFieldId, setDeleteStudyFieldId] = useState<string>("");
  
  const navigate = useNavigate();
  useEffect(()=>{
    const fetchData = async () => {
      const result = await StudyFieldService.GetAllStudyFields();
      setStudyFields(result);
    }
    fetchData();
  }, []);

  function deleteStudyField(id: string) {
    setOpenConfirm(true);
    setDeleteStudyFieldId(id);
  }

  async function confirmedDeleteStudyField(id: string) {
    var result = await StudyFieldService.DeleteStudyField(id);
    setStudyFields(studyFields.filter((studyField) => studyField.id !== id));
    setOpenConfirm(false);
    setDeleteStudyFieldId("");
  }

  function sendToDetails(id:string | null) {
    navigate(`/EditStudyField/${id}`);
  }

  function AddStudyField() {
    navigate(`/AddStudyField`);
  }

  return (
    <Fragment>
      <div className="mt-5 d-flex align-items-center">
        <h1 style={{ marginLeft: "30px" }}>Study Field</h1>
        <Button
          type="button"
          className="ui positive basic button ms-4"
          onClick={() => AddStudyField()}
        >
          Add New Study Field
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
          {studyFields.map((item) => (
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
                  onClick={() => deleteStudyField(item.id!)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
          <Confirm
            open={openConfirm}
            onCancel={() => setOpenConfirm(false)}
            onConfirm={() => confirmedDeleteStudyField(deleteStudyFieldId!)}
          />
        </TableBody>
      </Table>
    </Fragment>
  );
}
