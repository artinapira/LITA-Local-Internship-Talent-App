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

export default function EmployerTable() {
  const [employers, setEmployers] = useState<UserModel[]>([]);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [locationList, setLocationList] = useState<SelectListItem[]>([]);
  const [deleteEmployerId, setDeleteEmployerId] = useState<string>("");
  
  const navigate = useNavigate();
  useEffect(()=>{
    const fetchData = async () => {
      const result = await UserService.GetAllEmployers();
      setEmployers(result);
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


  function deleteEmployer(id: string) {
    setOpenConfirm(true);
    setDeleteEmployerId(id);
  }

  async function confirmedDeleteEmployer(id: string) {
    var result = await UserService.DeleteUser(id);
    setEmployers(employers.filter((employer) => employer.id !== id));
    setOpenConfirm(false);
    setDeleteEmployerId("");
  }

  function getLocation(locationId: string) {
  return locationList.find(j => j.value === locationId)?.text || "Unknown Location";
}

  function sendToDetails(id:string | null) {
    navigate(`/EditEmployer/${id}`);
  }

  function AddEmployer() {
    navigate(`/AddEmployer`);
  }

  return (
    <Fragment>
      <div className="mt-5 d-flex align-items-center">
        <h1 style={{ marginLeft: "30px" }}>Employer</h1>
        <Button
          type="button"
          className="ui positive basic button ms-4"
          onClick={() => AddEmployer()}
        >
          Add New Employer
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
          <TableHeaderCell>Company Name</TableHeaderCell>
          <TableHeaderCell>Location</TableHeaderCell>
          <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {employers.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.userName}</TableCell>
              <TableCell>{Role[item.role]}</TableCell>
              <TableCell>{item.companyName}</TableCell>
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
                  onClick={() => deleteEmployer(item.id!)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
          <Confirm
            open={openConfirm}
            onCancel={() => setOpenConfirm(false)}
            onConfirm={() => confirmedDeleteEmployer(deleteEmployerId!)}
          />
        </TableBody>
      </Table>
    </Fragment>
  );
}
