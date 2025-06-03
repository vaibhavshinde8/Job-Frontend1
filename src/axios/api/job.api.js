import axiosInstance from "../axiosConfig";
async function Allposts() {
    try {
        const response = await axiosInstance.get(`/job/getAllPost`);
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message,
        };
    }
}
async function getAppliedJobsByUser() {
    try {
        const response = await axiosInstance.get(`/job/getAppliedJobsByUser`);
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message,
        };
    }
}
async function SelectedCandidates(id) {
    try {
        const response = await axiosInstance.get(`/job/getSelectedUsers/${id}`);
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message,
        };
    }
}
async function RejectedCandidates(id) {
    try {
        const response = await axiosInstance.get(`/job/getRejectedUsers/${id}`);
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message,
        };
    }
}
export {RejectedCandidates}
export {SelectedCandidates}
export {getAppliedJobsByUser}
export {Allposts}