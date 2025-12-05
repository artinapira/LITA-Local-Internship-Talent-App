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

export default function AdminTable() {
  const [admins, setAdmins] = useState<UserModel[]>([]);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [deleteAdminId, setDeleteAdminId] = useState<string>("");
  
  const navigate = useNavigate();
  useEffect(()=>{
    const fetchData = async () => {
      const result = await UserService.GetAllAdmins();
      setAdmins(result);
    }
    fetchData();
  }, []);

  function deleteAdmin(id: string) {
    setOpenConfirm(true);
    setDeleteAdminId(id);
  }

  async function confirmedDeleteAdmin(id: string) {
    var result = await UserService.DeleteUser(id);
    setAdmins(admins.filter((admin) => admin.id !== id));
    setOpenConfirm(false);
    setDeleteAdminId("");
  }

  function sendToDetails(id:string | null) {
    navigate(`/EditAdmin/${id}`);
  }

  function AddAdmin() {
    navigate(`/AddAdmin`);
  }

  return (
    <Fragment>
      <div className="mt-5 d-flex align-items-center">
        <h1 style={{ marginLeft: "30px" }}>Admin</h1>
        <Button
          type="button"
          className="ui positive basic button ms-4"
          onClick={() => AddAdmin()}
        >
          Add New Admin
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
          <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {admins.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.userName}</TableCell>
              <TableCell>{Role[item.role]}</TableCell>
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
                  onClick={() => deleteAdmin(item.id!)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
          <Confirm
            open={openConfirm}
            onCancel={() => setOpenConfirm(false)}
            onConfirm={() => confirmedDeleteAdmin(deleteAdminId!)}
          />
        </TableBody>
      </Table>
    </Fragment>
  );
}
