import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const InterviwerProtectedRoute = ({children}) => {
    const {user,data} = useSelector(store=>store.auth);

    const navigate = useNavigate();

    useEffect(()=>{
        if(user!=="Interviewer"){
          if(user=="Company"){
            navigate('/company')
          }
          else{
            navigate('/')
          }
        }
        else {
          if (user == "Interviewer" && !data) {
            console.log("ABhishek");
            navigate("/interviewer")
          }
          else if (user == "Interviewer" && data) {
            navigate("/Dashboard")
          }
        }
    },[]);

    return (
        <>
        {children}
        </>
    )
};
export default InterviwerProtectedRoute;