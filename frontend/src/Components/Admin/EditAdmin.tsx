import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';
import { UserModel } from '../../Interface/UserModel';
import { Role } from '../../Enum/Role';
import { UserService } from '../../Services/UserService';

export default function EditAdmin() {
  const { id } = useParams<{ id: string}>();
  const [values, setValues] = useState<UserModel>({
    id:id!,
    email: '',
    userName: '',
    password: '',
    role: Role.Admin,
  } as UserModel);

  const navigate = useNavigate();
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      if(id!=null){
     const response = await UserService.GetUserDetails(id!);
     const userData = response;
     setValues({
       id: userData.id,
       email: userData.email,
       userName: userData.userName,
       password: userData.password,
       role: Role.Admin
     }as UserModel);
    }
  };
  
  fetchData();

}, [id!]);
const roleSelectList =  Object.keys(Role).map((key,i) => ({
       key: i,
       value: +i,
       text: Role[+key]
     })).filter(x=> x.text != '' && x.text != null);
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
    let model = {
      id: values.id!,
      email: values.email,
      userName: values.userName,
      password: values.password,
    } as UserModel;

    const response = await axios.post(
      "https://localhost:7085/api/User/admin",
      model
    );
    setAdmin(true);
    sendToOverview();
  } catch (error) {
    console.error("Error creating Admin:", error);
  }
};
function sendToOverview(){
  navigate('/AdminTable');
 }
const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  const { name, value } = e.target;
  setValues({ ...values, [name]: value });
};
  return (
    <>  
    <h1 style={{ marginLeft: "15px", fontFamily: "Georgia", color: "black" }}>
        {values.id != null ? 'Edit' : 'Add'} Admin
      </h1>
      <p style={{ marginLeft: "15px", color: "#555", fontSize: "14px" }}>
        Please fill out the form below to {values.id != null ? 'edit' : 'create'} a Admin.
      </p>
      <Segment clearing style={{ margin: "30px 30px 0 10px", boxShadow: "0px 4px 6px rgba(0,0,0,0.1)", border: "1px solid rgb(15 179 126 / 87%)" }}>
    <form className='ui form' style={{ backgroundColor: "#f9f9f9", padding: "20px" }} onSubmit={handleSubmit} autoComplete="off">
        <div className="form-group">
        <label>Email</label>
          <input
            style={{ padding: "5px", margin: "5px" }}
            type="text"
            placeholder="Email"
            className="form-control"
            id="email"
            name="email"
            value={values.email!}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
        <label>Username</label>
          <input
            style={{ padding: "5px", margin: "5px" }}
            type="text"
            placeholder="Username"
            className="form-control"
            id="userName"
            name="userName"
            value={values.userName!}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
        <label>Password</label>
          <input
            style={{ padding: "5px", margin: "5px" }}
            type="password"
            placeholder="Password"
            className="form-control"
            id="password"
            name="password"
            value={values.password!}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
           <label>Role</label>
           <select
            style={{ padding: "5px", margin: "5px" }}
            className="form-control"
            id="role"
            name="role"
            value={values.role!}
            onChange={handleChange}
           >
            {roleSelectList.map((x)=>
            (<option key={x.key} value={x.value}>{x.text}</option>))}
           </select>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "20px" }}>
          <button
          type="submit"
           onClick={sendToOverview}
           className="ui blue basic button"
          style={{ backgroundColor: "rgb(32 76 60)", color: "#fff" }}
          >
          Cancel
        </button>
        <button
          type="submit"
          className="ui green button"
          style={{ backgroundColor: "rgb(32 76 60)", color: "#fff" }}
        >
          Submit
        </button>
        </div>
      </form>
      </Segment>
      <br/>
      <br/>
    </>
  );
}
