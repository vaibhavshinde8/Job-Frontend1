import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserProtectedRoute = ({children}) => {
    const {user,data} = useSelector(store=>store.auth);

    const navigate = useNavigate();
  console.log(data);
    useEffect(()=>{
    //  console.log(data);
      console.log(user);
        if(user!=="User" && user){
          if(user=="Interviewer"){
            navigate('/interviewer')
          }
           

          else{
     
            navigate('/Company')
          }
        }
        else{
          if(user=="User" && !data){
            console.log("ABhishek");
            navigate("/create")
          }
          
        }
    },[]);

    return (
        <>
        {children}
        </>
    )
};
export default UserProtectedRoute;