import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserService } from '../Services/UserService'; // Import your AuthService

interface StudentRouteProps {
  component: React.ComponentType<any>;
}

const StudentRoute: React.FC<StudentRouteProps> = ({ component: Component,...rest }) => {
  return UserService.isStudent() ? <Component {...rest} /> :  <Navigate to="/" replace />;
};

export default StudentRoute;
