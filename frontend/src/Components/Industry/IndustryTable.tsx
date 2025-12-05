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
import { IndustryModel } from "../../Interface/IndustryModel";
import { IndustryService } from "../../Services/IndustryService";

export default function IndustryTable() {
  const [industrys, setIndustry] = useState<IndustryModel[]>([]);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [deleteIndustryId, setDeleteIndustryId] = useState<string>("");
  
  const navigate = useNavigate();
  useEffect(()=>{
    const fetchData = async () => {
      const result = await IndustryService.GetAllIndustrys();
      setIndustry(result);
    }
    fetchData();
  }, []);

  function deleteIndustry(id: string) {
    setOpenConfirm(true);
    setDeleteIndustryId(id);
  }

  async function confirmedDeleteIndustry(id: string) {
    var result = await IndustryService.DeleteIndustry(id);
    setIndustry(industrys.filter((industry) => industry.id !== id));
    setOpenConfirm(false);
    setDeleteIndustryId("");
  }

  function sendToDetails(id:string | null) {
    navigate(`/EditIndustry/${id}`);
  }

  function AddIndustry() {
    navigate(`/AddIndustry`);
  }

  return (
    <Fragment>
      <div className="mt-5 d-flex align-items-center">
        <h1 style={{ marginLeft: "30px" }}>Industry</h1>
        <Button
          type="button"
          className="ui positive basic button ms-4"
          onClick={() => AddIndustry()}
        >
          Add New Industry
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
          {industrys.map((item) => (
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
                  onClick={() => deleteIndustry(item.id!)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
          <Confirm
            open={openConfirm}
            onCancel={() => setOpenConfirm(false)}
            onConfirm={() => confirmedDeleteIndustry(deleteIndustryId!)}
          />
        </TableBody>
      </Table>
    </Fragment>
  );
}
