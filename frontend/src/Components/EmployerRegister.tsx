import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Role } from "../Enum/Role";
import { UserModel } from "../Interface/UserModel";
import axios from "axios";
import { LocationService } from "../Services/LocationService";
import { SelectListItem } from "../Interface/SelectListItem";

export default function EmployerRegister() {
  const [locationList, setLocationList] = useState<SelectListItem[]>([]);
  const [values, setValues] = useState<UserModel>({
    id: '',
    email: '',
    userName: '',
    password: '',
    role: Role.Student,
    companyName: '',
    locationId: '',
    profileImagePath: '',
  }as UserModel);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
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

  async function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    e.preventDefault();
    try {
        const formData = new FormData();
        formData.append("id", values.id || "");
        formData.append("email", values.email || "");
        formData.append("userName", values.userName || "");
        formData.append("role", values.role!.toString());
        formData.append("name", values.companyName || "");
        formData.append("password", values.password!);
        formData.append("locationId", values.locationId!);

        if (values.profileImage) {
            formData.append("profileImage", values.profileImage);
        } 

        await axios.post("https://localhost:7085/api/User/employer", 
        formData);
      navigate("/");
    } catch (error) {
      alert("Login failed. Please check your credentials.");
      console.log(error)
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      style={{
        background: "linear-gradient(135deg,rgb(80, 76, 44), #34495e)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflowX: "hidden",
        boxSizing: "border-box",
        padding: "0.5rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "#1f2a38",
          borderRadius: "1rem",
          padding: "2rem",
          color: "white",
          boxShadow: "0 8px 16px rgba(0,0,0,0.25)",
        }}
      >
        <h2 className="text-center fw-bold mb-2 text-uppercase">Register</h2>
        <p className="text-center text-white-50 mb-2">
          Please enter your information
        </p>

        <form onSubmit={submitForm}>
          <div className="mb-2">
            <label htmlFor="email" className="form-label text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={values.email!}
              onChange={handleChange}
              required
              style={{
                backgroundColor: "#34495e",
                border: "none",
                color: "white",
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="userName" className="form-label text-white">
              Username
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              className="form-control"
              value={values.userName!}
              onChange={handleChange}
              required
              style={{
                backgroundColor: "#34495e",
                border: "none",
                color: "white",
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={values.password!}
              onChange={handleChange}
              required
              style={{
                backgroundColor: "#34495e",
                border: "none",
                color: "white",
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="companyName" className="form-label text-white">
              Company name
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              className="form-control"
              value={values.companyName!}
              onChange={handleChange}
              required
              style={{
                backgroundColor: "#34495e",
                border: "none",
                color: "white",
              }}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="locationId" className="form-label text-white">
              Location
            </label>
            <select
            style={{
                backgroundColor: "#34495e",
                border: "none",
                color: "white",
            }}
            className="form-control"
            id="locationId"
            name="locationId"
            value={values.locationId!}
            onChange={handleChange}
           >
            <option value="" disabled>Select Location</option>
            {locationList.map((x)=>
            (<option key={x.key} value={x.value!}>{x.text}</option>))}
           </select>
          </div>

          <button
            type="submit"
            className="btn btn-light w-100"
            disabled={isSubmitting}
            style={{
              fontWeight: "bold",
              padding: "10px",
              borderRadius: "0.5rem",
            }}
          >
            {isSubmitting ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              "Register"
            )}
          </button>
          <p className="mb-0 text-center">Already have an account? <Link to="/" className="link-info">
            Login here
           </Link></p>
           <p className="mb-0 mt-1 text-center">Sign in like a student <Link to="/Register" className="link-info">
            Sign in here
           </Link></p>
        </form>
      </div>
    </div>
  );
}
