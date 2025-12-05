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
import { JobTypeModel } from "../../Interface/JobTypeModel";
import { JobTypeService } from "../../Services/JobTypeService";

export default function JobTypeTable() {
  const [jobTypes, setJobTypes] = useState<JobTypeModel[]>([]);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [deleteJobTypeId, setDeleteJobTypeId] = useState<string>("");
  
  const navigate = useNavigate();
  useEffect(()=>{
    const fetchData = async () => {
      const result = await JobTypeService.GetAllJobTypes();
      setJobTypes(result);
    }
    fetchData();
  }, []);

  function deleteJobType(id: string) {
    setOpenConfirm(true);
    setDeleteJobTypeId(id);
  }

  async function confirmedDeleteJobType(id: string) {
    var result = await JobTypeService.DeleteJobType(id);
    setJobTypes(jobTypes.filter((jobType) => jobType.id !== id));
    setOpenConfirm(false);
    setDeleteJobTypeId("");
  }

  function sendToDetails(id:string | null) {
    navigate(`/EditJobType/${id}`);
  }

  function AddJobType() {
    navigate(`/AddJobType`);
  }

  return (
    <Fragment>
      <div className="mt-5 d-flex align-items-center">
        <h1 style={{ marginLeft: "30px" }}>JobType</h1>
        <Button
          type="button"
          className="ui positive basic button ms-4"
          onClick={() => AddJobType()}
        >
          Add New Job Type
        </Button>
        <div className="col-12 col-sm-8 col-md-6 col-lg-4 col-xl-3">
      </div>
      </div>
      <Table striped>
        <TableHeader>
          <TableRow>
          <TableHeaderCell>Job Type Name</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {jobTypes.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.jobTypeName}</TableCell>
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
                  onClick={() => deleteJobType(item.id!)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
          <Confirm
            open={openConfirm}
            onCancel={() => setOpenConfirm(false)}
            onConfirm={() => confirmedDeleteJobType(deleteJobTypeId!)}
          />
        </TableBody>
      </Table>
    </Fragment>
  );
}
