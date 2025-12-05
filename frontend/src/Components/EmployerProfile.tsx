import React, { useEffect, useState } from 'react'
import { Header } from './Header'
import { SelectListItem } from '../Interface/SelectListItem';
import { UserModel } from '../Interface/UserModel';
import { Role } from '../Enum/Role';
import { UserService } from '../Services/UserService';
import { LocationService } from '../Services/LocationService';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus } from "@fortawesome/free-solid-svg-icons";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "../Css/StudentProfile.css";
import profile from "../Pictures/Profile.jpg"
import EditEmployerProfileModal from './EditEmployerProfileModal';
import { Button } from 'semantic-ui-react';
import { EmployerIndustryService } from '../Services/EmployerIndustryService';
import { toast } from 'react-toastify';
import { EmployerIndustryModel } from '../Interface/EmployerIndustryModel';
import { IndustryService } from '../Services/IndustryService';


export default function EmployerProfile()  {
  const id = localStorage.getItem('id');
  const [locationList, setLocationList] = useState<SelectListItem[]>([]);
  const [deleteEmployerIndustryId, setDeleteEmployerIndustryId] = useState<string>("");
  const [employeri, setEmployeri] = useState<UserModel>();
  const [industries, setIndustries] = useState<EmployerIndustryModel[]>([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [values, setValues] = useState<UserModel>({
    id:id!,
    email: '',
    userName: '',
    password: '',
    role: Role.Student,
    companyName: '',
    locationId: '',
  } as UserModel);

  const [employer, setEmployer] = useState(false);
    useEffect(() => {
      const fetchData = async () => {
        if(id!=null){
       const response = await UserService.GetUserDetails(id!);
       const userData = response;
       setEmployeri(response);
       setValues({
         id: userData.id,
         email: userData.email,
         userName: userData.userName,
         role: Role.Student,
         companyName: userData.companyName,
         locationId: userData.locationId,
       }as UserModel);
      }
    };
    
    fetchData();
  
  }, [id!]);
  const [showIndustryModal, setShowIndustryModal] = useState(false);
    const [industryValue, setIndustryValue] = useState<EmployerIndustryModel>({
      employerId: id,
      industryId: ""
    }as EmployerIndustryModel);
    const [industryList, setIndustryList] = useState<SelectListItem[]>([]);
    const fetchIndustryList = async () => {
      const response = await IndustryService.GetSelectList();
    
      setIndustryList(response.map((item,i)=>({
        key: i,
        value: item.id,
        text: item.name
      } as SelectListItem)).filter(x=>x.text != '' &&x.text != null));
    
    
    }
    useEffect(() => {
      fetchIndustryList();
    }, []);
  const fetchIndustry = async () => {
    if (id) {
      const response = await EmployerIndustryService.GetAllByEmployerId(id);
      setIndustries(response);
    }
  };
  useEffect(() => {
    fetchIndustry();
  }, [id]);

  const handleIndustrySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const alreadyHasIndustry = industries.some(
    (i) => i.industryId === industryValue.industryId
  );
  if (alreadyHasIndustry) {
    toast.error("You already added this industry!");
    return;
  }

  try {
    const model = {
      employerId: id,
      industryId: industryValue.industryId
    };

    console.log(model)
    await axios.post("https://localhost:7085/api/EmployerIndustry", model);

    await fetchIndustry();
    setIndustryValue({ employerId: id, industryId: "" }as EmployerIndustryModel);
    setShowIndustryModal(false);
    toast.success("Industry added!");
  } catch (error) {
  }
};


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
  
      const handleIndustrySelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setIndustryValue({ ...industryValue, [name]: value });
      };
      

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        let model = {
          id: values.id!,
          email: values.email,
          userName: values.userName,
          role: Role.Employer,
          companyName: values.companyName,
          locationId: values.locationId,
        } as UserModel;

        const response = await axios.post(
        "https://localhost:7085/api/User/employer",
      model
    );
        setEmployer(true);
    } catch (error) {
        console.error("Error editing Employer:", error);
    }
  };



  function getLocation(locationId: string) {
    return locationList.find(j => j.value === locationId)?.text || "Unknown Location";
  }
  async function deleteEmployerIndustry(id: string) {
      var result = await EmployerIndustryService.DeleteEmployerIndustry(id);
      setIndustries(industries.filter((industry) => industry.id !== id));
      setDeleteEmployerIndustryId("");
    }
  
  return (
    <>
    <Header/>
    <main className="hero_section d-flex-column justify-content-center align-items-center">
        <div className="d-flex justify-content-center w-50 m-auto align-items-center pt-5 d-inline-block">
                    <img
                    className='pfp'
                      src={employeri?.profileImagePath 
                        ? `https://localhost:7085${employeri.profileImagePath}?t=${new Date().getTime()}` 
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
                    <h4>{employeri?.companyName}</h4>
                    <div className='lineservice lines m-auto' />
                    <h4>{getLocation(employeri?.locationId!)}</h4>
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
                    <h2 className='text-center'>Industry</h2>
                    <div className='lineservice m-auto' />
                </div>
                </div>
                <div className='row gap-5 d-flex justify-content-center w-50 m-auto'>
                    {industries.length > 0 ? (
                        industries.map((industry) => (
                            <div key={industry.id} className="card col-md-5 col-12 p-2 rounded-5">
                              <button
                                className="btn btn-danger btn-sm position-absolute"
                                style={{ top: "8px", right: "8px", borderRadius: "50%" }}
                                onClick={() => deleteEmployerIndustry(industry.id!)}
                              >
                                &times;
                              </button>
                              <h3 className="text-center">{industry.industries?.name}</h3>
                            </div>
                        ))
                        ) : (
                        <h4 className="text-center text-muted">No industries added yet.</h4>
                    )}
                    <div className="card skills col-md-5 col-12 p-3 rounded-5">
                      <Button
                        onClick={() => {setShowIndustryModal(true)}}
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
        <div className={`modal fade ${showIndustryModal ? "show d-block" : ""}`} tabIndex={-1}>
        <div className="modal-dialog">
            <div className="modal-content">

                <div className="modal-header">
                    <h5 className="modal-title">Add Industry</h5>
                    <button 
                        type="button" 
                        className="btn-close" 
                        onClick={() => setShowIndustryModal(false)}
                    ></button>
                </div>

                <div className="modal-body">
                    <form className='ui form' style={{ backgroundColor: "#f9f9f9", padding: "20px" }} onSubmit={handleIndustrySubmit} autoComplete="off">
                        <div className="col-md-6-w-100%">
                          <select className="form-control"
                            name="industryId" 
                            id="industryId"
                            value= {industryValue.industryId || ""}
                            onChange={handleIndustrySelectChange}
                            style={{ marginBottom: "15px"}}
                          >
                            <option value="" disabled>Select Industry</option>
                            {industryList.map((x) => (
                              <option key={x.key} value={x.value!}>{x.text}</option>
                            ))}
                          </select>
                        </div>
                        <div className="modal-footer">
                            <button 
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setShowIndustryModal(false)}
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
    {openEditModal && employeri && (
  <EditEmployerProfileModal
    employer={employeri}
    onClose={() => setOpenEditModal(false)}
    onUpdate={(updated) => setEmployeri(updated)}
  />
)}
    </>
  )
}
