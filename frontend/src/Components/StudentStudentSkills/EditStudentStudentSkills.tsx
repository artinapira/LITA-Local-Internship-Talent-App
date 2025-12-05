import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';
import { SelectListItem } from '../../Interface/SelectListItem';
import { UserService } from '../../Services/UserService';
import { StudentStudentSkillsModel } from '../../Interface/StudentStudentSkillsModel';
import { StudentStudentSkillsService } from '../../Services/StudentStudentSkillsService';
import { StudentSkillsService } from '../../Services/StudentSkillsService';

export default function EditStudentStudentSkills() {
  const { id } = useParams<{ id: string}>();
  const [studentSkillsList, setStudentSkillsList] = useState<SelectListItem[]>([]);
  const [studentList, setStudentList] = useState<SelectListItem[]>([]);
  const [values, setValues] = useState<StudentStudentSkillsModel>({
    id:id!,
    studentId: '',
    studentSkillsId: '',
  } as StudentStudentSkillsModel);

  const navigate = useNavigate();
  const [studentStudentSkills, setStudentStudentSkills] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      if(id!=null){
     const response = await StudentStudentSkillsService.GetStudentStudentSkills(id!);
     const userData = response;
     setValues({
       id: userData.id,
       studentId: userData.studentId,
       studentSkillsId: userData.studentSkillsId,
     }as StudentStudentSkillsModel);
    }
  };
  
  fetchData();

}, [id!]);

const fetchStudentSkillsList = async () => {
  const response = await StudentSkillsService.GetSelectList();

  setStudentSkillsList(response.map((item,i)=>({
    key: i,
    value: item.id,
    text: item.name
  } as SelectListItem)).filter(x=>x.text != '' &&x.text != null));


}
useEffect(() => {
  fetchStudentSkillsList();
}, []);

const fetchStudentList = async () => {
  const response = await UserService.GetStudentSelectList();

  setStudentList(response.map((item,i)=>({
    key: i,
    value: item.id,
    text: item.name
  } as SelectListItem)).filter(x=>x.text != '' &&x.text != null));


}
useEffect(() => {
  fetchStudentList();
}, []);

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
    let model = {
      id: values.id!,
      studentId:values.studentId,
      studentSkillsId:values.studentSkillsId

    } as StudentStudentSkillsModel;

    console.log(model)
    const response = await axios.post(
      "https://localhost:7085/api/StudentStudentSkills",
      model
    );
    setStudentStudentSkills(true);
    sendToOverview();
  } catch (error) {
    console.error("Error creating StudentStudentSkills:", error);
  }
};
function sendToOverview(){
  navigate('/StudentStudentSkillsTable');
 }
const handleChange = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const { name, value } = e.target;
  setValues({ ...values, [name]: value });
};
const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const { name, value } = e.target;
  setValues({ ...values, [name]: value });
};
  return (
    <>  
    <h1 style={{ marginLeft: "15px", fontFamily: "Georgia", color: "black" }}>
        {values.id != null ? 'Edit' : 'Add'} StudentStudentSkills
      </h1>
      <p style={{ marginLeft: "15px", color: "#555", fontSize: "14px" }}>
        Please fill out the form below to {values.id != null ? 'edit' : 'create'} a StudentStudentSkills.
      </p>
      <Segment clearing style={{ margin: "30px 30px 0 10px", boxShadow: "0px 4px 6px rgba(0,0,0,0.1)", border: "1px solid rgb(15 179 126 / 87%)" }}>
    <form className='ui form' style={{ backgroundColor: "#f9f9f9", padding: "20px" }} onSubmit={handleSubmit} autoComplete="off">
          <div className="col-md-6-w-100%">
              <select className="form-control"
                name="studentId" 
                id="studentId"
                value= {values.studentId || ""}
                onChange={handleSelectChange}
                style={{ marginBottom: "15px"}}
                >
                  <option value="" disabled>Select Student</option>
                  {studentList.map((x) => (
                    <option key={x.key} value={x.value!}>{x.text}</option>
                  ))}
                </select>
          </div>
          <div className="col-md-6-w-100%">
              <select className="form-control"
                name="studentSkillsId" 
                id="studentSkillsId"
                value= {values.studentSkillsId || ""}
                onChange={handleSelectChange}
                style={{ marginBottom: "15px"}}
                >
                  <option value="" disabled>Select Student Skills</option>
                  {studentSkillsList.map((x) => (
                    <option key={x.key} value={x.value!}>{x.text}</option>
                  ))}
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
