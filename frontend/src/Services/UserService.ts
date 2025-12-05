import axios from "axios"
import { UserModel } from "../Interface/UserModel";
import { AuthenticationModel } from "../Interface/AuthenticationModel";
import { LoginModel } from "../Interface/LoginModel";
import { ToastContainer, toast } from "react-toastify";
import { redirect } from "react-router-dom";

export class UserService{
    
    private static BaseUrl = "https://localhost:7085/api/User";
    public static LoggedInUser: UserModel | null = null;
    public static token: string | null = null;
    public static role: string | null = null;
  
    public static async Login(user: LoginModel): Promise<AuthenticationModel> {
      const response = await axios.post<AuthenticationModel>(
        `${UserService.BaseUrl}/login`,
        user
      );
      localStorage.setItem("jwt", response.data.token);
      UserService.token = response.data?.token;
      localStorage.setItem("refreshToken", response.data.refreshToken);
      localStorage.setItem("userModel", JSON.stringify(response.data.userData));
      UserService.LoggedInUser = response.data?.userData;
      localStorage.setItem("role", response.data.userRole);
      UserService.role = response.data?.userRole;
      toast.success("Logged in successfully");
      return response.data;
    }
    public static async AddOrEditStudent(model: UserModel): Promise<void> {
        const result = await axios.post(`${UserService.BaseUrl}/student`,model);
    }
    public static async AddOrEditEmployer(model: UserModel): Promise<void> {
        const result = await axios.post(`${UserService.BaseUrl}/employer`,model);
    }
    public static async AddOrEditAdmin(model: UserModel): Promise<void> {
        const result = await axios.post(`${UserService.BaseUrl}/admin`,model);
    }
    public static GetUserRole():string | null{
       return localStorage.getItem("role");
    }
    public static GetUserId():string | null{
       return localStorage.getItem("id");
    }

    public static async DeleteUser(id: string): Promise<void> {
        var result = await axios.delete(`${UserService.BaseUrl}/${id}`);
    }

    public static async GetAllUsers(): Promise<UserModel[]> {
        const result = await axios.get(UserService.BaseUrl);
        return result.data;
    }
    public static async GetUserDetails(id: string): Promise<UserModel> {
        const result = await axios.get(`${UserService.BaseUrl}/${id}`);
        return result.data;
    }
    public static async GetAllAdmins(): Promise<UserModel[]> {
        const result = await axios.get(`${UserService.BaseUrl}/admins`);
        return result.data;
    }
    public static async GetAllEmployers(): Promise<UserModel[]> {
        const result = await axios.get(`${UserService.BaseUrl}/employers`);
        return result.data;
    }
    public static async GetAllStudents(): Promise<UserModel[]> {
        const result = await axios.get(`${UserService.BaseUrl}/students`);
        return result.data;
    }
    public static async GetStudentSelectList() : Promise<UserModel[]> {
      const result = await axios.get(`${UserService.BaseUrl}/GetStudent`);
      return result.data;
    }
    public static async GetEmployerSelectList() : Promise<UserModel[]> {
      const result = await axios.get(`${UserService.BaseUrl}/GetEmployer`);
      return result.data;
    }

    public static Logout() {
        localStorage.removeItem("jwt");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userModel");
        localStorage.removeItem("role");
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        localStorage.removeItem("id");
        UserService.token = null;
        UserService.LoggedInUser = null;
        UserService.role = null;
  
    }

    public static isAuthenticated() {
        if (UserService.token) {
        return true;
        }
        const token = localStorage.getItem("jwt");
        return token != null;
    }

    public static isAdmin(): boolean{
        return UserService.GetUserRole() == 'Admin';
    }
    public static isEmployer(): boolean{
        return UserService.GetUserRole() == 'Employer';
    }
    public static isStudent(): boolean{
        return UserService.GetUserRole() == 'Student';
    }
    public static async CountStudents() : Promise<number>{
    const result = await axios.get(`${UserService.BaseUrl}/studentCount`);
    return result.data;
    }
    public static async CountEmployers() : Promise<number>{
    const result = await axios.get(`${UserService.BaseUrl}/employerCount`);
    return result.data;
    }
}