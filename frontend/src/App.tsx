import React from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AdminTable from './Components/Admin/AdminTable';
import EditAdmin from './Components/Admin/EditAdmin';
import EmployerTable from './Components/Employer/EmployerTable';
import EditEmployer from './Components/Employer/EditEmployer';
import StudentTable from './Components/Student/StudentTable';
import EditStudent from './Components/Student/EditStudent';
import JobTable from './Components/Job/JobTable';
import EditJob from './Components/Job/EditJob';
import JobApplicationTable from './Components/JobApplication/JobApplicationTable';
import EditJobApplication from './Components/JobApplication/EditJobApplication';
import JobTypeTable from './Components/JobType/JobTypeTable';
import EditJobType from './Components/JobType/EditJobType';
import LocationTable from './Components/Location/LocationTable';
import EditLocation from './Components/Location/EditLocation';
import StudyFieldTable from './Components/StudyField/StudyFieldTable';
import EditStudyField from './Components/StudyField/EditStudyField';
import StudentSkillsTable from './Components/StudentSkills/StudentSkillsTable';
import EditStudentSkills from './Components/StudentSkills/EditStudentSkills';
import StudentInterestsTable from './Components/StudentInterests/StudentInterestsTable';
import EditStudentInterests from './Components/StudentInterests/EditStudentInterests';
import InterestsTable from './Components/Interests/InterestsTable';
import EditInterests from './Components/Interests/EditInterests';
import IndustryTable from './Components/Industry/IndustryTable';
import EditIndustry from './Components/Industry/EditIndustry';
import EmployerIndustryTable from './Components/EmployerIndustry/EmployerIndustryTable';
import EditEmployerIndustry from './Components/EmployerIndustry/EditEmployerIndustry';
import StudentStudentSkillsTable from './Components/StudentStudentSkills/StudentStudentSkillsTable';
import EditStudentStudentSkills from './Components/StudentStudentSkills/EditStudentStudentSkills';
import StudentProfile from './Components/StudentProfile';
import Login from './Components/Login';
import FindJob from './Components/FindJob';
import JobDetails from './Components/JobDetails';
import HomePage from './Components/HomePage';
import Jobs from './Components/Jobs';
import Applicants from './Components/Applicants';
import AboutUs from './Components/AboutUs';
import EmployerProfile from './Components/EmployerProfile';
import StudentRegister from './Components/StudentRegister';
import EmployerRegister from './Components/EmployerRegister';
import LayoutWithSideBar from './Components/LayoutWithSideBar';
import AdminRoute from './Components/AdminRoute';
import AuthenticatedRoute from './Components/AuthenticatedRoute';
import StudentRoute from './Components/StudentRoute';
import EmployerRoute from './Components/EmployerRoute';
import AdminDashboard from './Components/AdminDashboard';
import { ProfilePage } from './Components/ProfilePage';

function App() {
  return (
    <>
    <Router>
      <Routes>

        <Route path="/" element={<Login/>}/>
        <Route path="/Register" element={<StudentRegister/>}/>
        <Route path="/EmployerRegister" element={<EmployerRegister/>}/>

        <Route element={<LayoutWithSideBar />}>

        <Route path="/AdminTable" element={<AdminRoute component={AdminTable} />}/>
        <Route path="/EditAdmin/:id" element={<AdminRoute component={EditAdmin} />}/>
        <Route path="/AddAdmin" element={<AdminRoute component={EditAdmin} />}/>

        <Route path="/EmployerTable" element={<AdminRoute component={EmployerTable} />}/>
        <Route path="/EditEmployer/:id" element={<AdminRoute component={EditEmployer} />}/>
        <Route path="/AddEmployer" element={<AdminRoute component={EditEmployer} />}/>

        <Route path="/StudentTable" element={<AdminRoute component={StudentTable} />}/>
        <Route path="/EditStudent/:id" element={<AdminRoute component={EditStudent} />}/>
        <Route path="/AddStudent" element={<AdminRoute component={EditStudent} />}/>

        <Route path="/JobTable" element={<AdminRoute component={JobTable} />}/>
        <Route path="/EditJob/:id" element={<AdminRoute component={EditJob} />}/>
        <Route path="/AddJob/" element={<AdminRoute component={EditJob} />}/>

        <Route path="/JobApplicationTable" element={<AdminRoute component={JobApplicationTable} />}/>
        <Route path="/EditJobApplication/:id" element={<AdminRoute component={EditJobApplication} />}/>
        <Route path="/AddJobApplication/" element={<AdminRoute component={EditJobApplication} />}/>

        <Route path="/JobTypeTable" element={<AdminRoute component={JobTypeTable} />}/>
        <Route path="/EditJobType/:id" element={<AdminRoute component={EditJobType} />}/>
        <Route path="/AddJobType/" element={<AdminRoute component={EditJobType} />}/>

        <Route path="/LocationTable" element={<AdminRoute component={LocationTable} />}/>
        <Route path="/EditLocation/:id" element={<AdminRoute component={EditLocation} />}/>
        <Route path="/AddLocation/" element={<AdminRoute component={EditLocation} />}/>

        <Route path="/StudyFieldTable" element={<AdminRoute component={StudyFieldTable} />}/>
        <Route path="/EditStudyField/:id" element={<AdminRoute component={EditStudyField} />}/>
        <Route path="/AddStudyField/" element={<AdminRoute component={EditStudyField} />}/>

        <Route path="/StudentSkillsTable" element={<AdminRoute component={StudentSkillsTable} />}/>
        <Route path="/EditStudentSkills/:id" element={<AdminRoute component={EditStudentSkills} />}/>
        <Route path="/AddStudentSkills" element={<AdminRoute component={EditStudentSkills} />}/>

        <Route path="/InterestsTable" element={<AdminRoute component={InterestsTable} />}/>
        <Route path="/EditInterests/:id" element={<AdminRoute component={EditInterests} />}/>
        <Route path="/AddInterests/" element={<AdminRoute component={EditInterests} />}/>

        <Route path="/IndustryTable" element={<AdminRoute component={IndustryTable} />}/>
        <Route path="/EditIndustry/:id" element={<AdminRoute component={EditIndustry} />}/>
        <Route path="/AddIndustry/" element={<AdminRoute component={EditIndustry} />}/>
        <Route path="/AdminDashboard" element={<AdminRoute component={AdminDashboard} />} />

        </Route>
        <Route path="/Home" element={<AuthenticatedRoute component={HomePage} />}/>
        <Route path="/AboutUs" element={<AuthenticatedRoute component={AboutUs} />}/>
        <Route path="/profile/:id" element={<AuthenticatedRoute component={ProfilePage} />} />
        <Route path="/StudentProfile" element={<StudentRoute component={StudentProfile} />}/>
        <Route path="/EmployerProfile" element={<EmployerRoute component={EmployerProfile} />}/>
        <Route path="/FindJob" element={<StudentRoute component={FindJob} />}/>
        <Route path="/JobDetails/:id" element={<StudentRoute component={JobDetails} />}/>
        <Route path="/Jobs" element={<EmployerRoute component={Jobs} />}/>
        <Route path="/Applicants/:id" element={<EmployerRoute component={Applicants} />}/>
      </Routes>

    </Router>
    <ToastContainer position="top-right" autoClose={5000} />
    </>
  );
}

export default App;
