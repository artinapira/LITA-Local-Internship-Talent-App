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
import { InterestsModel } from "../../Interface/InterestsModel";
import { InterestsService } from "../../Services/InterestsService";

export default function InterestsTable() {
  const [Interests, setInterests] = useState<InterestsModel[]>([]);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [deleteInterestsId, setDeleteInterestsId] = useState<string>("");
  
  const navigate = useNavigate();
  useEffect(()=>{
    const fetchData = async () => {
      const result = await InterestsService.GetAllInterests();
      setInterests(result);
    }
    fetchData();
  }, []);

  function deleteInterests(id: string) {
    setOpenConfirm(true);
    setDeleteInterestsId(id);
  }

  async function confirmedDeleteInterests(id: string) {
    var result = await InterestsService.DeleteInterests(id);
    setInterests(Interests.filter((Interests) => Interests.id !== id));
    setOpenConfirm(false);
    setDeleteInterestsId("");
  }

  function sendToDetails(id:string | null) {
    navigate(`/EditInterests/${id}`);
  }

  function AddInterests() {
    navigate(`/AddInterests`);
  }

  return (
    <Fragment>
      <div className="mt-5 d-flex align-items-center">
        <h1 style={{ marginLeft: "30px" }}>Interests</h1>
        <Button
          type="button"
          className="ui positive basic button ms-4"
          onClick={() => AddInterests()}
        >
          Add New Interests
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
          {Interests.map((item) => (
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
                  onClick={() => deleteInterests(item.id!)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
          <Confirm
            open={openConfirm}
            onCancel={() => setOpenConfirm(false)}
            onConfirm={() => confirmedDeleteInterests(deleteInterestsId!)}
          />
        </TableBody>
      </Table>
    </Fragment>
  );
}
