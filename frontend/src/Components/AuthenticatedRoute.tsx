import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserService } from '../Services/UserService'

interface AuthenticatedRouteProps {
  component: React.ComponentType<any>;
}

const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = ({ component: Component,...rest }) => {
  return UserService.isAuthenticated() ? <Component {...rest} /> : <Navigate to="/" replace />;
};

export default AuthenticatedRoute;
