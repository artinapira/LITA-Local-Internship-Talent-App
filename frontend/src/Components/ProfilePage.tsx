import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserModel } from "../Interface/UserModel";
import { EmployerIndustryModel } from "../Interface/EmployerIndustryModel";
import { Role } from "../Enum/Role";
import profile from "../Pictures/Profile.jpg"
import "../Css/StudentProfile.css";
import { UserService } from "../Services/UserService";
import { EmployerIndustryService } from "../Services/EmployerIndustryService";
import { LocationService } from "../Services/LocationService";
import { SelectListItem } from "../Interface/SelectListItem";
import { StudentStudentSkillsModel } from "../Interface/StudentStudentSkillsModel";
import { StudentInterestsModel } from "../Interface/StudentInterestsModel";
import { StudyFieldService } from "../Services/StudyFieldService";
import { StudentStudentSkillsService } from "../Services/StudentStudentSkillsService";
import { StudentInterestsService } from "../Services/StudentInterestsService";
import { Header } from "./Header";

export function ProfilePage() {
  const { id } = useParams();
  const [employeri, setEmployeri] = useState<UserModel>();
  const userRole = localStorage.getItem("role");
  const [studenti, setStudenti] = useState<UserModel>();
  const [industries, setIndustries] = useState<EmployerIndustryModel[]>([]);
  const [locationList, setLocationList] = useState<SelectListItem[]>([]);
  const [studyFieldList, setStudyFieldList] = useState<SelectListItem[]>([]);
  const [skills, setSkills] = useState<StudentStudentSkillsModel[]>([]);
  const [interests, setInterests] = useState<StudentInterestsModel[]>([]);
    useEffect(() => {
  if (!id) return;

  if (userRole === "Student") {
    const fetchStudentData = async () => {
      const response = await UserService.GetUserDetails(id);
      setEmployeri(response);  
    };
    fetchStudentData();
  } 
  else if (userRole === "Employer") {
    const fetchEmployerData = async () => {
      const response = await UserService.GetUserDetails(id);
      setStudenti(response);
    };
    fetchEmployerData();
  }
}, [id, userRole]);

console.log(userRole)
    const fetchIndustry = async () => {
        if (id) {
          const response = await EmployerIndustryService.GetAllByEmployerId(id);
          setIndustries(response);
        }
      };
      useEffect(() => {
        fetchIndustry();
      }, [id]);

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
    const fetchSkills = async () => {
      if (id) {
        const response = await StudentStudentSkillsService.GetSkillsByStudent(id);
        setSkills(response);
      }
    };
    useEffect(() => {
      fetchSkills();
    }, [id]);       
    const fetchInterests = async () => {
      if (id) {
        const response = await StudentInterestsService.GetInterestsByStudent(id);
        setInterests(response);
      }
    };
    useEffect(() => {
      fetchInterests();
    }, [id]);
  function getLocation(locationId: string) {
    return locationList.find(j => j.value === locationId)?.text || "Unknown Location";
  }
  function getStudyField(studyFieldId: string) {
    return studyFieldList.find(j => j.value === studyFieldId)?.text || "Unknown Study Field";
  }

  return (
    <>
    <Header/>
    {userRole === "Student" && <main className="hero_section d-flex-column justify-content-center align-items-center">
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
                              <h3 className="text-center">{industry.industries?.name}</h3>
                            </div>
                        ))
                        ) : (
                        <h4 className="text-center text-muted">No industries added yet.</h4>
                    )}
                </div>
            </div>
          </div>
        </div>
    </main>}
    {userRole === "Employer" &&<main className="hero_section d-flex-column justify-content-center align-items-center">
        <div className="d-flex justify-content-center w-50 m-auto align-items-center pt-5 d-inline-block">
          <img
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
                              <h3 className="text-center">{skill.studentSkills?.name}</h3>
                            </div>
                        ))
                        ) : (
                        <h4 className="text-center text-muted">No skills added yet.</h4>
                    )}
                </div>
            </div>
          </div>
        </div>
        <div className='clients'>
          <div className="">
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
                              <h3 className="text-center">{interest.interests?.name}</h3>
                            </div>
                        ))
                        ) : (
                        <h4 className="text-center text-muted">No interests added yet.</h4>
                    )}
                </div>
            </div>
          </div>
        </div>
    </main>}
    </>
  );
}