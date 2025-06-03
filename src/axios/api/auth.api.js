
import axiosInstance from "../axiosConfig";


 async function login(email, password, userType) {
    try {
        const response = await axiosInstance.post("auth/login", { email, password, userType });
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message || "Login failed",
        };
    }
}
async function register(user) {//"User"
    try {
        const response = await axiosInstance.post("auth/register", user);
        console.log(response.data);
        return response.data;

    } catch (error) {
        console.log(error.response.data);
        return error.response.data;
    }
}
async function resetPassword(email,newPassword,isConformed) {
    try {
        const response = await axiosInstance.post("auth/resetpassword", { email, newPassword, isConformed });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}
 async function isRegisterd(email) {
    try {
        const response = await axiosInstance.post("auth/isRegisterd", { email });
        return response.data;
    } catch (error) {
        console.log(error)
        return error.response?.data;
    }
 }
 async function RegisterByEmail(email) {
    try {
        const response = await axiosInstance.post("auth/google-register", { email });
        return response.data;
    } catch (error) {
        console.log(error)
        return error.response?.data;
    }
 }
 async function Logout() {
    try {
        const response = await axiosInstance.get("auth/logout");
        return response.data;
    } catch (error) {
        console.log(error)
        return error.response?.data;
    }
 }
 export {Logout};
 export {isRegisterd};
export  { register };
export  { login };
export { resetPassword };