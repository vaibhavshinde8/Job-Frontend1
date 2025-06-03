import axiosInstance from "../axiosConfig";
async function CreateUser(data) {
    try {
        const response = await axiosInstance.post("user/create", { data });
        return response.data;
    } catch (error) {
        console.log(error)
        return error.response?.data;
    }
 }
 async function updateUser(data) {
    try {
        const response = await axiosInstance.put("user/update", { data });
        return response.data;
    } catch (error) {
        console.log(error)
        return error.response?.data;
    }
 }
 async function educationalDetails(data) {
    try {
        const response = await axiosInstance.put("user/educationalDetails", { data });
        return response.data;
    } catch (error) {
        console.log(error)
        return error.response?.data;
    }
 }
 async function otherDetails(data){
    try {
        const response = await axiosInstance.put("user/otherDetails", { data });
        return response.data;
    } catch (error) {
        console.log(error)
        return error.response?.data;
    }
 }
async function profilePicture(data){
    try {
        const response = await axiosInstance.post("user/profilePic", { data });
        return response.data;
    } catch (error) {
        console.log(error)
        return error.response?.data;
    }
}
async function resume(data){
    try {
        const response = await axiosInstance.post("user/resume", { data });
        return response.data;
    } catch (error) {
        console.log(error)
        return error.response?.data;
    }
}
async function isUserExist() {
    try {
        const response = await axiosInstance.get("user/isUserExist");
        return response.data;
    } catch (error) {
        console.log(error)
        return error.response?.data;
    }
}
export {CreateUser,updateUser,educationalDetails,otherDetails,profilePicture,resume,isUserExist}
 //name // contact // address