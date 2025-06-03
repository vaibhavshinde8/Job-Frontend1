import axiosInstance from "../axiosConfig";


async function CreateProfileInterviwer(data) {
    try {
        const response = await axiosInstance.post("interviewer/create-profile", data);
        console.log(response);
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data
        };
    }
}



async function UpdateProfile(data) {
    try {
        const response = await axiosInstance.put("interviewer/update-profile", data);
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data
        };
    }
}

async function UploadWorkProf(data) {
    try {
        const response = await axiosInstance.post("interviewer/upload-work-proof", data);
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data
        };
    }
}
async function AddProfilePic(data) {
    try {
        const response = await axiosInstance.post("interviewer/add-profile-pic", data);
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data
        };
    }
}
async function getProfile(data) {
    try {
        const response = await axiosInstance.get("interviewer/get-profile", data);
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data
        };
    }
}
export {CreateProfileInterviwer}
export{UpdateProfile}
export{UploadWorkProf}
export{AddProfilePic}
export{getProfile}
