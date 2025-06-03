import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompanyProtectedRoute = ({ children }) => {
  const { user, data } = useSelector(store => store.auth);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(data);
    console.log(user);
    if (user !== "Company") {
      if (user == "Interviewer") {
        navigate('/interviewer')
      }

      else {
        navigate('/')
      }
    }
    else {
      if (user == "Company" && !data) {
        console.log("ABhishek");
        navigate("/company")
      }
      else if (user == "Company" && data) {
        navigate("/companyInfo")
      }
    }
  }, []);

  return (
    <>
      {children}
    </>
  )
};
export default CompanyProtectedRoute;