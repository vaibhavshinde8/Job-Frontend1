import axiosInstance from "../axiosConfig";
 
async function sendOtp(email) {
    try {
   // console.log(email);
        const response = await axiosInstance.post('otp/send-otp', { email });
        //console.log(response);
        return response.data;
    }
    catch (error) {
        console.log(error);
        return error.response.data;
    }
}
async function  verifyOtp(email,otp) {
    try {
        const response = await axiosInstance.post('otp/verify-otp', { email, otp });
        return response.data;
    }
    catch (error) {
        return error.response.data;
    }
}
export  {sendOtp,verifyOtp};