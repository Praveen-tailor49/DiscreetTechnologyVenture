import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:5000/api/Details" });

// All Use
export const get_Vehicle = async () => {
    return await API.get("/getVehicle");
}
export const save_Vehicle = async (formData) => {
    return await API.post("/addVehicle", formData);
}

export const update_Vehicle = async (formData) => {
    return await API.post("/updateVehicle", formData);
}

export const delete_Vehicle = async (formData) => {
    return await API.post("/deleteVehicle", formData);
}
