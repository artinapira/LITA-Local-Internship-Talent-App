import React, { useState, useEffect } from "react";
import axios from "axios";
import { UserModel } from "../Interface/UserModel";
import { LocationService } from "../Services/LocationService";
import { StudyFieldService } from "../Services/StudyFieldService";
import { SelectListItem } from "../Interface/SelectListItem";
import { toast } from "react-toastify";
import { Role } from "../Enum/Role";

interface Props {
  student: UserModel;
  onClose: () => void;
  onUpdate: (updatedStudent: UserModel) => void;
}

export default function EditProfileModal({ student, onClose, onUpdate }: Props) {
  const id = localStorage.getItem('id');
  const [formData, setFormData] = useState<UserModel>(student);
  const [previewImage, setPreviewImage] = useState<string>(
    student.profileImagePath
      ? `https://localhost:5000${student.profileImagePath}`
      : ""
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const [locationList, setLocationList] = useState<SelectListItem[]>([]);
    const [studyFieldList, setStudyFieldList] = useState<SelectListItem[]>([]);

  
  useEffect(() => {
    (async () => {
      const locations = await LocationService.GetSelectList();
      const fields = await StudyFieldService.GetSelectList();

      setStudyFieldList(fields.map((item,i)=>({
              key: i,
              value: item.id,
              text: item.name
            } as SelectListItem)).filter(x=>x.text != '' &&x.text != null));
      setLocationList(locations.map((item,i)=>({
              key: i,
              value: item.id,
              text: item.name
            } as SelectListItem)).filter(x=>x.text != '' &&x.text != null));
    })();
  }, []);
  const roleSelectList =  Object.keys(Role).map((key,i) => ({
         key: i,
         value: +i,
         text: Role[+key]
       })).filter(x=> x.text != '' && x.text != null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
  const model = new FormData();
  model.append("id", id || "");
  model.append("email", formData.email || "");
  model.append("userName", formData.userName || "");
  model.append("role", formData.role!.toString());
  model.append("name", formData.name || "");
  if (formData.password) model.append("password", formData.password);
  model.append("university", formData.university!);
  model.append("studyFieldId", formData.studyFieldId || "");
  model.append("locationId", formData.locationId || "");
  model.append("createdAt", formData.createdAt || new Date().toISOString());

  if (selectedFile) {
    model.append("profileImage", selectedFile);
  }

  try {
    const response = await axios.post("https://localhost:7085/api/User/student", model);
    const updatedStudent: UserModel = response.data;

    setPreviewImage(
      updatedStudent.profileImagePath
        ? `https://localhost:7085${updatedStudent.profileImagePath}?t=${new Date().getTime()}`
        : ""
    );
    onUpdate(updatedStudent); 
    toast.success("Profile updated successfully!");
    onClose();
  } catch (err) {
    console.error(err);
    toast.error("Failed to update profile.");
  }
};


  return (
    <div className="modal show d-block" tabIndex={-1} style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">Edit Profile</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">

            <div className="text-center mb-3">
              <img
                src={previewImage || "https://via.placeholder.com/150"}
                alt="Profile"
                className="rounded-circle"
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  display: "block",
                  margin: "0 auto",
                }}
              />
              <input
                type="file"
                name="profileImage"
                className="form-control mt-3"
                onChange={handleImageChange}
              />
            </div>

            <div className="form-group mb-3">
              <label>Email</label>
              <input
                className="form-control"
                name="email"
                value={formData.email!}
                onChange={handleChange}
              />
            </div>
            <div className="form-group mb-3">
              <label>Username</label>
              <input
                className="form-control"
                name="userName"
                value={formData.userName!}
                onChange={handleChange}
              />
            </div>
            <div className='form-group'>
              <label>Role</label>
                <select
                  style={{ padding: "5px", margin: "5px" }}
                  className="form-control"
                  id="role"
                  name="role"
                  value={formData.role!}
                  onChange={handleChange}
                >
                  {roleSelectList.map((x)=>
                  (<option key={x.key} value={x.value}>{x.text}</option>))}
                </select>
            </div>
            <div className="form-group">
            <label>Password (Leave empty if you don't want to change)</label>
            <input
              style={{ padding: "5px", margin: "5px" }}
              type="password"
              placeholder="Password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password!}
              onChange={handleChange}
            />
          </div>
            <div className="form-group mb-3">
              <label>Name</label>
              <input
                className="form-control"
                name="name"
                value={formData.name!}
                onChange={handleChange}
              />
            </div>

            <div className="form-group mb-3">
              <label>University</label>
              <input
                className="form-control"
                name="university"
                value={formData.university!}
                onChange={handleChange}
              />
            </div>

            <div className="form-group mb-3">
              <label>Study Field</label>
              <select className="form-control"
                name="studyFieldId" 
                id="studyFieldId"
                value= {formData.studyFieldId!}
                onChange={handleChange}
                style={{ marginBottom: "15px"}}
                >
                  <option value="" disabled>Select Study Field</option>
                  {studyFieldList.map((x) => (
                    <option key={x.key} value={x.value!}>{x.text}</option>
                  ))}
                </select>
            </div>

            <div className="form-group mb-3">
              <label>Location</label>
              <select className="form-control"
                name="locationId" 
                id="locationId"
                value= {formData.locationId!}
                onChange={handleChange}
                style={{ marginBottom: "15px"}}
                >
                  <option value="" disabled>Select Location</option>
                  {locationList.map((x) => (
                    <option key={x.key} value={x.value!}>{x.text}</option>
                  ))}
                </select>
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-success" onClick={handleSubmit}>
              Save Changes
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
