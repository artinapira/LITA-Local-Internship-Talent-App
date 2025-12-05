import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';
import { UserModel } from '../../Interface/UserModel';
import { Role } from '../../Enum/Role';
import { UserService } from '../../Services/UserService';
import { SelectListItem } from '../../Interface/SelectListItem';
import { LocationService } from '../../Services/LocationService';
import { StudyFieldService } from '../../Services/StudyFieldService';

export default function EditStudent() {
  const { id } = useParams<{ id: string}>();
  const [locationList, setLocationList] = useState<SelectListItem[]>([]);
  const [studyFieldList, setStudyFieldList] = useState<SelectListItem[]>([]);
  const [values, setValues] = useState<UserModel>({
    id:id!,
    email: '',
    userName: '',
    password: '',
    role: Role.Student,
    name: '',
    university: '',
    studyFieldId: '',
    createdAt:'',
    locationId: '',
    profileImagePath: '',
  } as UserModel);

  const navigate = useNavigate();
  const [student, setStudent] = useState(false);
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
       role: Role.Student,
       name: userData.name,
       university: userData.university,
       studyFieldId: userData.studyFieldId,
       createdAt: new Date().toISOString().slice(0, 16),
       locationId: userData.locationId,
       profileImagePath: userData.profileImagePath
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
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
    const formData = new FormData();
    formData.append("id", values.id || "");
    formData.append("email", values.email || "");
    formData.append("userName", values.userName || "");
    formData.append("role", values.role!.toString());
    formData.append("name", values.name || "");
    formData.append("password", values.password!);
    formData.append("university", values.university!);
    formData.append("studyFieldId", values.studyFieldId!);
    formData.append("createdAt", values.createdAt || new Date().toISOString())
    formData.append("locationId", values.locationId!);

  if (values.profileImage) {
    formData.append("profileImage", values.profileImage);
  } 

  await axios.post("https://localhost:7085/api/User/student", 
    formData);
    
    setStudent(true);
    sendToOverview();
  } catch (error: any) {
  if (error.response) {
    console.error("Backend validation errors:", error.response.data.errors);
  } else {
    console.error(error);
  }
}
};
function sendToOverview(){
  navigate('/StudentTable');
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
        {values.id != null ? 'Edit' : 'Add'} Student
      </h1>
      <p style={{ marginLeft: "15px", color: "#555", fontSize: "14px" }}>
        Please fill out the form below to {values.id != null ? 'edit' : 'create'} a Student.
      </p>
      <Segment clearing style={{ margin: "30px 30px 0 10px", boxShadow: "0px 4px 6px rgba(0,0,0,0.1)", border: "1px solid rgb(15 179 126 / 87%)" }}>
    <form className='ui form' style={{ backgroundColor: "#f9f9f9", padding: "20px" }} onSubmit={handleSubmit} autoComplete="off">
        <div className="form-group">
        <label>Email</label>
          <input
            style={{ padding: "5px", margin: "5px" }}
            type="email"
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
        <div className="form-group">
            <label>Password (Leave empty if you don't want to change)</label>
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
          <div className="form-group">
        <label>Name</label>
          <input
            style={{ padding: "5px", margin: "5px" }}
            type="text"
            placeholder="Name"
            className="form-control"
            id="name"
            name="name"
            value={values.name!}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
        <label>University</label>
          <input
            style={{ padding: "5px", margin: "5px" }}
            type="text"
            placeholder="University"
            className="form-control"
            id="university"
            name="university"
            value={values.university!}
            onChange={handleChange}
          />
        </div>
            <div className="col-md-6-w-100%">
              <select className="form-control"
                name="studyFieldId" 
                id="studyFieldId"
                value= {values.studyFieldId!}
                onChange={handleChange}
                style={{ marginBottom: "15px"}}
                >
                  <option value="" disabled>Select Study Field</option>
                  {studyFieldList.map((x) => (
                    <option key={x.key} value={x.value!}>{x.text}</option>
                  ))}
                </select>
            </div>
            <div className="col-md-6-w-100%">
              <select className="form-control"
                name="locationId" 
                id="locationId"
                value= {values.locationId!}
                onChange={handleChange}
                style={{ marginBottom: "15px"}}
                >
                  <option value="" disabled>Select Location</option>
                  {locationList.map((x) => (
                    <option key={x.key} value={x.value!}>{x.text}</option>
                  ))}
                </select>
            </div>
             
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "20px" }}>
          <button
          type="button"
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
