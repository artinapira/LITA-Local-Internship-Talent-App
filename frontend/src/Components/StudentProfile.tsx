import React, { useEffect, useState } from 'react'
import { Header } from './Header'
import { Link, useParams } from 'react-router-dom'
import { SelectListItem } from '../Interface/SelectListItem';
import { UserModel } from '../Interface/UserModel';
import { Role } from '../Enum/Role';
import { UserService } from '../Services/UserService';
import { LocationService } from '../Services/LocationService';
import { StudyFieldService } from '../Services/StudyFieldService';
import axios from 'axios';
import { StudentStudentSkillsModel } from '../Interface/StudentStudentSkillsModel';
import { StudentStudentSkillsService } from '../Services/StudentStudentSkillsService';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "../Css/StudentProfile.css";
import profile from "../Pictures/Profile.jpg"
import EditProfileModal from './EditProfileModal';
import { StudentSkillsService } from '../Services/StudentSkillsService';
import { toast } from 'react-toastify';
import { Button, Confirm } from 'semantic-ui-react';
import { StudentInterestsModel } from '../Interface/StudentInterestsModel';
import { StudentInterestsService } from '../Services/StudentInterestsService';
import { InterestsService } from '../Services/InterestsService';
import { JobApplicationModel } from '../Interface/JobApplicationModel';
import { JobApplicationService } from '../Services/JobApplicationService';
import { Status } from '../Enum/Status';
import { JobModel } from '../Interface/JobModel';
import { JobService } from '../Services/JobService';


export default function StudentProfile()  {
  const id = localStorage.getItem('id');
  const [deleteStudentStudentSkillsId, setDeleteStudentStudentSkillsId] = useState<string>("");
  const [deleteStudentInterestsId, setDeleteStudentInterestsId] = useState<string>("");
  const [locationList, setLocationList] = useState<SelectListItem[]>([]);
  const [studyFieldList, setStudyFieldList] = useState<SelectListItem[]>([]);
  const [skills, setSkills] = useState<StudentStudentSkillsModel[]>([]);
  const [applications, setApplications] = useState<JobApplicationModel[]>([]);
  const [interests, setInterests] = useState<StudentInterestsModel[]>([]);
  const [studenti, setStudenti] = useState<UserModel>();
  const [studentSkillsList, setStudentSkillsList] = useState<SelectListItem[]>([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showEditApplicationModal, setShowEditApplicationModal] = useState(false);
  const [jobList, setJobList] = useState<JobModel[]>([]);
  const [values, setValues] = useState<UserModel>({
    id:id!,
    email: '',
    userName: '',
    password: '',
    role: Role.Student,
    name: '',
    university: '',
    studyFieldId: '',
    locationId: '',
  } as UserModel);

  const [showInterestModal, setShowInterestModal] = useState(false);
  const [interestValue, setInterestValue] = useState<StudentInterestsModel>({
    studentId: id,
    interestsId: ""
  }as StudentInterestsModel);
  const [interestsList, setInterestsList] = useState<SelectListItem[]>([]);
  const [skillValue, setSkillValue] = useState<StudentStudentSkillsModel>({
    studentId:id,
    studentSkillsId:''
  } as StudentStudentSkillsModel);
  const [applicationValues, setApplicationValues] = useState<JobApplicationModel>({
      id:'',
      jobId: '',
      studentId: id,
      status: Status.Pending,
      appliedAt: new Date().toISOString().slice(0, 16),
      cvFilePath: ''
    } as JobApplicationModel);

    const [jobApplication, setJobApplication] = useState(false);
  const [student, setStudent] = useState(false);
    useEffect(() => {
      const fetchData = async () => {
        if(id!=null){
       const response = await UserService.GetUserDetails(id!);
       const userData = response;
       setStudenti(response);
       setValues({
         id: userData.id,
         email: userData.email,
         userName: userData.userName,
         role: Role.Student,
         name: userData.name,
         university: userData.university,
         studyFieldId: userData.studyFieldId,
         locationId: userData.locationId,
         createdAt: new Date().toISOString().slice(0, 16),
       }as UserModel);
      }
    };
    
    fetchData();
  
  }, [id!]);
  useEffect(()=>{
        const fetchData = async () => {
          const result = await JobService.GetAllJobs();
          setJobList(result);
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
      const now = new Date().toISOString();
        let model = {
          id: values.id!,
          email: values.email,
          userName: values.userName,
          role: Role.Student,
          name: values.name,
          university: values.university,
          studyFieldId: values.studyFieldId,
          locationId: values.locationId,
          createdAt: now,
        } as UserModel;

        const response = await axios.post(
          "https://localhost:7085/api/User/student",
          model,
          );
        setStudent(true);
    } catch (error) {
        console.error("Error editing Student:", error);
    }
  };

  const fetchSkills = async () => {
  if (id) {
    const response = await StudentStudentSkillsService.GetSkillsByStudent(id);
    setSkills(response);
  }
};
useEffect(() => {
  fetchSkills();
}, [id]);

const fetchApplications = async () => {
  if (id) {
    const response = await JobApplicationService.GetApplicationsByStudentId(id);
    setApplications(response);
  }
};
useEffect(() => {
  fetchApplications();
}, [id]);


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


const fetchInterestsList = async () => {
  const response = await InterestsService.GetSelectList();

  setInterestsList(response.map((item,i)=>({
    key: i,
    value: item.id,
    text: item.name
  } as SelectListItem)).filter(x=>x.text != '' &&x.text != null));


}
useEffect(() => {
  fetchInterestsList();
}, []);
const fetchInterests = async () => {
  if (id) {
    const response = await StudentInterestsService.GetInterestsByStudent(id);
    setInterests(response);
  }
};
useEffect(() => {
  fetchInterests();
}, [id]);

const handleSkillSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const alreadyHasSkill = skills.some(
    (s) => s.studentSkillsId === skillValue.studentSkillsId
  );
  if (alreadyHasSkill) {
    toast.error("You already added this skill!");
    return;
  }
  try {
    let model = {
      studentId:id,
      studentSkillsId:skillValue.studentSkillsId

    } as StudentStudentSkillsModel;

    console.log(model)
    const response = await axios.post(
      "https://localhost:7085/api/StudentStudentSkills",
      model
    );

    await fetchSkills();
    setSkillValue({ studentId: id, studentSkillsId: "" }as StudentStudentSkillsModel);
    setShowApplyModal(false);
    toast.success("You have successfully added the skill");
  } catch (error) {
  }
};

const handleInterestSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const alreadyHasInterest = interests.some(
    (i) => i.interestsId === interestValue.interestsId
  );
  if (alreadyHasInterest) {
    toast.error("You already added this interest!");
    return;
  }

  try {
    const model = {
      studentId: id,
      interestsId: interestValue.interestsId
    };

    console.log(model)
    await axios.post("https://localhost:7085/api/StudentInterests", model);

    await fetchInterests();
    setInterestValue({ studentId: id, interestsId: "" }as StudentInterestsModel);
    setShowInterestModal(false);
    toast.success("Interest added!");
  } catch (error) {
  }
};

const handleApplicationSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
    const formData = new FormData();
    formData.append("Id", applicationValues.id || "");
    formData.append("JobId", applicationValues.jobId || "");
    formData.append("StudentId", applicationValues.studentId || id!);

    formData.append("Status", applicationValues.status.toString());
    formData.append("AppliedAt", applicationValues.appliedAt || new Date().toISOString());

    if (applicationValues.cvFile) {
      formData.append("CvFile", applicationValues.cvFile); 
    } 

    const response = await axios.post(
      "https://localhost:7085/api/Application",
      formData 
    );
    setJobApplication(true);

    await fetchApplications();

    setShowEditApplicationModal(false);
    setApplicationValues({
      id: "",
      jobId: "",
      studentId: "",
      status: Status.Pending,
      appliedAt: new Date().toISOString().slice(0, 16),
      cvFilePath: ""
    });
    toast.success("You have successfully updated your application");
  } catch (error: any) {
      if (axios.isAxiosError(error)) {
      const msg = error.response?.data?.message;

      if (msg) {
        toast.error(msg);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  }
};

  function getLocation(locationId: string) {
    return locationList.find(j => j.value === locationId)?.text || "Unknown Location";
  }

  function getStudyField(studyFieldId: string) {
    return studyFieldList.find(j => j.value === studyFieldId)?.text || "Unknown Study Field";
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const { name, value } = e.target;
      setValues({ ...values, [name]: value });
    };
  const handleSkillSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const { name, value } = e.target;
  setSkillValue({ ...skillValue, [name]: value });
};
const handleInterestSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const { name, value } = e.target;
  setInterestValue({ ...interestValue, [name]: value });
};
const handleApplicationSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const { name, value } = e.target;
  setApplicationValues({ ...applicationValues, [name]: value });
};
function getJobTitle(jobId: string) {
    return jobList.find(j => j.id === jobId)?.title || "Unknown Job";
  }

  async function downloadCV(cvFilePath: string) {
  if (!cvFilePath) return;

  try {
    const fileName = cvFilePath.split("/").pop(); // Extract file name
    if (!fileName) throw new Error("Invalid file path");

    const link = document.createElement("a");
    link.href = `https://localhost:7085${cvFilePath}`; // static files URL
    link.download = fileName; // browser will download instead of opening
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (err) {
    console.error("Download failed:", err);
    alert("Failed to download CV");
  }
}


  async function deleteStudentStudentSkills(id: string) {
    var result = await StudentStudentSkillsService.DeleteStudentStudentSkills(id);
    setSkills(skills.filter((studentStudentSkills) => studentStudentSkills.id !== id));
    setDeleteStudentStudentSkillsId("");
  }

  async function deleteStudentInterests(id: string) {
    var result = await StudentInterestsService.DeleteStudentInterests(id);
    setInterests(interests.filter((studentStudentSkills) => studentStudentSkills.id !== id));
    setDeleteStudentInterestsId("");
  }
console.log(studenti)

  return (
    <>
    <Header/>
    <main className="d-flex-column justify-content-center align-items-center">
        <div className="d-flex justify-content-center w-50 m-auto align-items-center pt-5 d-inline-block">
            <img
              key={studenti?.profileImagePath} 
              className='pfp'
              src={studenti?.profileImagePath 
              ? `https://localhost:7085${studenti.profileImagePath}?t=${new Date().getTime()}` 
              : profile}
              alt="Profile"
              style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              objectFit: "cover"
              }}
            />
        </div>
        <div className="d-flex-column justify-content-center pt-5 data text-center align-items-center">
            <h4>{studenti?.name}</h4>
            <div className='lineservice lines m-auto' />
            <h4>{studenti?.university}</h4>
            <div className='lineservice lines m-auto' />
            <h4>{getStudyField(studenti?.studyFieldId!)}</h4>
            <div className='lineservice lines m-auto' />
            <h4>{getLocation(studenti?.locationId!)}</h4>
            <div className='lineservice lines m-auto' />
        </div>
        <div className="d-flex justify-content-end w-25 m-auto align-items-center pt-5 d-inline-block">
          <button className="btn btn-light rounded-circle shadow d-flex justify-content-center align-items-center"
                onClick={() => setOpenEditModal(true)}
                style={{
                width: "40px",
                height: "40px",
                padding: 0
              }}>
                <FontAwesomeIcon icon={faPen} />
            </button>
        </div>
        <div className='clients'>
          <div className="">
            <div className="container">
                <div className="row d-flex flex-column w-50 m-auto">
                <div className="d-grid gap-3 my-5">
                    <h2 className='text-center'>Skills</h2>
                    <div className='lineservice m-auto' />
                </div>
                </div>
                <div className='row gap-5 d-flex justify-content-center w-50 m-auto'>
                    {skills.length > 0 ? (
                        skills.map((skill) => (
                            <div key={skill.id} className="card col-md-5 col-12 p-2 rounded-5">
                              <button
                                className="btn btn-danger btn-sm position-absolute"
                                style={{ top: "8px", right: "8px", borderRadius: "50%" }}
                                onClick={() => deleteStudentStudentSkills(skill.id!)}
                              >
                                &times;
                              </button>
                              <h3 className="text-center">{skill.studentSkills?.name}</h3>
                            </div>
                        ))
                        ) : (
                        <h4 className="text-center text-muted">No skills added yet.</h4>
                    )}
                    <div className="card skills col-md-5 col-12 p-3 rounded-5">
                      <Button
                        onClick={() => {setShowApplyModal(true)}}
                        style={{
                        all: 'unset',   
                        cursor: 'pointer', 
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        }}
                      >
                      <FontAwesomeIcon icon={faPlus} style={{ color: "#63E6BE" }} />
                      </Button>
                    </div>

                </div>
            </div>
          </div>
        </div>
      <div className='clients'>
            <div className="pb-5 pt-5">
            <div className="container">
                <div className="row d-flex flex-column w-50 m-auto">
                <div className="d-grid gap-3 my-5">
                    <h2 className='text-center'>Interests</h2>
                    <div className='lineservice m-auto' />
                </div>
                </div>
                <div className='row gap-5 d-flex justify-content-center w-50 m-auto'>
                    {interests.length > 0 ? (
                        interests.map((interest) => (
                            <div key={interest.id} className="card col-md-5 col-12 p-2 rounded-5">
                              <button
                                className="btn btn-danger btn-sm position-absolute"
                                style={{ top: "8px", right: "8px", borderRadius: "50%" }}
                                onClick={() => deleteStudentInterests(interest.id!)}
                              >
                                &times;
                              </button>
                                <h3 className="text-center">{interest.interests?.name}</h3>
                            </div>
                        ))
                        ) : (
                        <h4 className="text-center text-muted">No interests added yet.</h4>
                    )}
                    <div className="card skills col-md-5 col-12 p-3 rounded-5">
                      <Button
                        onClick={() => {setShowInterestModal(true)}}
                        style={{
                        all: 'unset',   
                        cursor: 'pointer', 
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        }}
                      >
                      <FontAwesomeIcon icon={faPlus} style={{ color: "#63E6BE" }} />
                      </Button>
                    </div>

                </div>
            </div>
        </div>
      </div>
      <div className='row d-flex-row justify-content-center mt-5 align-items-center'>
        <table className="table table-bordered border-dark w-75 table-hover">
          <thead className="table-head-custom">
            <tr>
              <th scope="col">Job</th>
              <th scope="col">Status</th>
              <th scope="col">AppliedAt</th>
              <th scope="col">CV</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody className="table-body-custom">
            {applications.map((app) => (
              <tr key={app.id}>
                <td>{getJobTitle(app.jobId!)}</td>
                <td>{Status[app.status]}</td>
                <td>{app.appliedAt}</td>
                <td>{app.cvFilePath? (
                    <Button
                      type="button"
                      className="ui blue button"
                      onClick={() => downloadCV(app.cvFilePath!)}
                    >
                      Download CV
                    </Button>
                  ) : (
                    "No CV"
                )}</td>
                <td>
                  <Button
                    onClick={() => {
                      setShowEditApplicationModal(true);
                      setApplicationValues(app);
                    }}
                    type="button"
                    className="btn ui green basic button"
                    >
                      Edit
                    </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={`modal fade ${showApplyModal ? "show d-block" : ""}`} tabIndex={-1}>
        <div className="modal-dialog">
            <div className="modal-content">

                <div className="modal-header">
                    <h5 className="modal-title">Add Skill</h5>
                    <button 
                        type="button" 
                        className="btn-close" 
                        onClick={() => setShowApplyModal(false)}
                    ></button>
                </div>

                <div className="modal-body">
                    <form className='ui form' style={{ backgroundColor: "#f9f9f9", padding: "20px" }} onSubmit={handleSkillSubmit} autoComplete="off">
                        <div className="col-md-6-w-100%">
                          <select className="form-control"
                            name="studentSkillsId" 
                            id="studentSkillsId"
                            value= {skillValue.studentSkillsId || ""}
                            onChange={handleSkillSelectChange}
                            style={{ marginBottom: "15px"}}
                          >
                            <option value="" disabled>Select Skills</option>
                            {studentSkillsList.map((x) => (
                              <option key={x.key} value={x.value!}>{x.text}</option>
                            ))}
                          </select>
                        </div>
                        <div className="modal-footer">
                            <button 
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setShowApplyModal(false)}
                            >
                                Close
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
                </div>
            </div>
        </div>
    </div>
    <div className={`modal fade ${showInterestModal ? "show d-block" : ""}`}>
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Add Interest</h5>
        <button className="btn-close" onClick={() => setShowInterestModal(false)}></button>
      </div>

      <div className="modal-body">
        <form onSubmit={handleInterestSubmit}>
          <div className="col-md-6-w-100%">
            <select className="form-control"
              name="interestsId" 
              id="interestsId"
              value= {interestValue.interestsId || ""}
              onChange={handleInterestSelectChange}
              style={{ marginBottom: "15px"}}
            >
            <option value="" disabled>Select Interest</option>
              {interestsList.map((x) => (
            <option key={x.key} value={x.value!}>{x.text}</option>
            ))}
            </select>
          </div>

          <div className="modal-footer">
            <button 
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowInterestModal(false)}
            >
              Close
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
      </div>
    </div>
  </div>
</div>
<div className={`modal fade ${showEditApplicationModal ? "show d-block" : ""}`} tabIndex={-1}>
        <div className="modal-dialog">
            <div className="modal-content">

                <div className="modal-header">
                    <h5 className="modal-title">Edit Application</h5>
                    <button 
                        type="button" 
                        className="btn-close" 
                        onClick={() => setShowEditApplicationModal(false)}
                    ></button>
                </div>

                <div className="modal-body">
                    <form className='ui form' style={{ backgroundColor: "#f9f9f9", padding: "20px" }} onSubmit={handleApplicationSubmit} autoComplete="off">
                        <div className="col-md-6-w-100%">
                          <select className="form-control"
                            name="jobId" 
                            id="jobId"
                            value= {applicationValues.jobId || ""}
                            onChange={handleApplicationSelectChange}
                            style={{ marginBottom: "15px"}}
                          >
                            <option value="" disabled>Select Job</option>
                              {jobList.map((x) => (
                            <option key={x.id} value={x.id!}>{x.title}</option>
                            ))}
                          </select>
                        </div>
                      <div className="form-group">
                        <label>Upload CV</label>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx" 
                          className="form-control"
                          name="cvFile"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setApplicationValues({ ...applicationValues, cvFile: e.target.files[0] }); 
                            }
                          }}
                        />
                      </div>
                        <div className="modal-footer">
                            <button 
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setShowEditApplicationModal(false)}
                            >
                                Close
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
                </div>
            </div>
        </div>
    </div>

    </main>
    {openEditModal && studenti && (
      <EditProfileModal
        student={studenti}
        onClose={() => setOpenEditModal(false)}
        onUpdate={(updatedStudent: UserModel) => setStudenti(updatedStudent)}
      />
    )}
    </>
  )
}
