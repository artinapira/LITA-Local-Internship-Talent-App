import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';
import { JobTypeModel } from '../../Interface/JobTypeModel';
import { JobTypeService } from '../../Services/JobTypeService';

export default function EditJobType() {
  const { id } = useParams<{ id: string}>();
  const [values, setValues] = useState<JobTypeModel>({
    id:id!,
    jobTypeName: '',
  } as JobTypeModel);

  const navigate = useNavigate();
  const [jobType, setJobType] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      if(id!=null){
     const response = await JobTypeService.GetJobType(id!);
     const userData = response;
     setValues({
       id: userData.id,
       jobTypeName: userData.jobTypeName,
     }as JobTypeModel);
    }
  };
  
  fetchData();

}, [id!]);
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
    let model = {
      id: values.id!,
      jobTypeName: values.jobTypeName,
    } as JobTypeModel;

    console.log(model)
    const response = await axios.post(
      "https://localhost:7085/api/JobType",
      model
    );
    setJobType(true);
    sendToOverview();
  } catch (error) {
    console.error("Error creating Job Type:", error);
  }
};
function sendToOverview(){
  navigate('/JobTypeTable');
 }
const handleChange = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const { name, value } = e.target;
  setValues({ ...values, [name]: value });
};
  return (
    <>  
    <h1 style={{ marginLeft: "15px", fontFamily: "Georgia", color: "black" }}>
        {values.id != null ? 'Edit' : 'Add'} Job Type
      </h1>
      <p style={{ marginLeft: "15px", color: "#555", fontSize: "14px" }}>
        Please fill out the form below to {values.id != null ? 'edit' : 'create'} a Job Type.
      </p>
      <Segment clearing style={{ margin: "30px 30px 0 10px", boxShadow: "0px 4px 6px rgba(0,0,0,0.1)", border: "1px solid rgb(15 179 126 / 87%)" }}>
    <form className='ui form' style={{ backgroundColor: "#f9f9f9", padding: "20px" }} onSubmit={handleSubmit} autoComplete="off">
        <div className="form-group">
        <label>Job Type Name</label>
          <input
            style={{ padding: "5px", margin: "5px" }}
            type="text"
            placeholder="Job Type Name"
            className="form-control"
            id="jobTypeName"
            name="jobTypeName"
            value={values.jobTypeName!}
            onChange={handleChange}
          />
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
