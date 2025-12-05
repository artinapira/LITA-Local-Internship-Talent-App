import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserService } from '../Services/UserService'; 

interface EmployerRouteProps {
  component: React.ComponentType<any>;
}

const EmployerRoute: React.FC<EmployerRouteProps> = ({ component: Component,...rest }) => {
  return UserService.isEmployer() ? <Component {...rest} /> :  <Navigate to="/" replace />;
};

export default EmployerRoute;
