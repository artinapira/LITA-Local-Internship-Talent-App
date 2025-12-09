import React from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaSignOutAlt } from "react-icons/fa";
import {
  MdDashboard,
  MdGroup,
  MdLocationOn,
  MdSchedule,
  MdSchool,
  MdAdd,
  MdPeople,
} from "react-icons/md";
import { UserService } from "../Services/UserService";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ collapsed, toggleSidebar }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    UserService.Logout(); 
    navigate("/"); 
  };
  const activeStyle = {
    fontWeight: "bold",
    color: "#a0c4ff",
    backgroundColor: "#34495e",
    borderRadius: "8px",
    padding: "0.5rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    textDecoration: "none",
    fontSize: "1.05rem",
  };

  const defaultStyle = {
    color: "#ecf0f1",
    textDecoration: "none",
    padding: "0.5rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    borderRadius: "8px",
    fontSize: "1.05rem",
  };
 const isAdmin = UserService.GetUserRole()=== "Admin";

  const sidebarLinks = [
     { name: "Dashboard Admin", path: "/AdminDashboard", icon: <MdDashboard /> },
    { name: "Admin", path: "/AdminTable", icon: <MdSchedule /> },
    { name: "Employer", path: "/EmployerTable", icon: <MdSchedule /> },
    { name: "Industry", path: "/IndustryTable", icon: <MdSchool /> },
    { name: "Job", path: "/JobTable", icon: <MdGroup /> },
    { name: "JobApplication", path: "/JobApplicationTable", icon: <MdLocationOn /> },
    { name: "JobType", path: "/JobTypeTable", icon: <MdLocationOn /> },
    { name: "Location", path: "/LocationTable", icon: <MdLocationOn /> },
    { name: "Student", path: "/StudentTable", icon: <MdLocationOn /> },
    { name: "StudentSkills", path: "/StudentSkillsTable", icon: <MdSchedule /> },
    { name: "Interests", path: "/InterestsTable", icon: <MdSchedule /> },
    { name: "StudyField", path: "/StudyFieldTable", icon: <MdPeople /> },
    { name: "Home", path: "/Home", icon: <MdDashboard /> },
    { name: "Logout", path: "/", icon: <FaSignOutAlt /> },
  ];
  

  return (
    <nav
      style={{
        width: collapsed ? "80px" : "230px",
        background: "#2c3e50",
        color: "white",
        height: "100vh",
        transition: "width 0.3s ease",
        position: "fixed",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          padding: "1rem",
          borderBottom: "1px solid #34495e",
        }}
      >
        <button
          onClick={toggleSidebar}
          style={{
            fontSize: "1.3rem",
            background: "none",
            border: "none",
            color: "#a0c4ff",
            cursor: "pointer",
          }}
          aria-label="Toggle sidebar"
        >
          <FaBars />
        </button>
      </div>

      {/* Menu */}
      <ul
        style={{
          listStyle: "none",
          padding: collapsed ? "0.5rem" : "1rem",
          marginTop: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.3rem",
          width: "100%",
          overflowY: "auto",
          flexGrow: 1,
        }}
      >
        {sidebarLinks.map((link, index) => (
          <li key={index}>
            {link.name === "Logout" ? (
              <button
                onClick={handleLogout}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  width: "100%",
                  textAlign: "left",
                  ...defaultStyle,
                }}
              >
                {link.icon}
                {!collapsed && <span>{link.name}</span>}
              </button>
            ) : (
              <NavLink
                to={link.path}
                style={({ isActive }) => (isActive ? activeStyle : defaultStyle)}
              >
                {link.icon}
                {!collapsed && <span>{link.name}</span>}
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
