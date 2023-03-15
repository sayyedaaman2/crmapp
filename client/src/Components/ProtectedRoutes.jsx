import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import { useSelector} from 'react-redux'

const ProtectedRoutes = ({ children }) => {
  const navigate = useNavigate();
  const {data} = useSelector(state=> state.user);

  useEffect(() => {
    const authenticate = Cookie.get("x-access-token");
    console.log("Userdata",data);
    if (!authenticate) {
      navigate("/login");
    }
  });
  return <>{children}</>;
};

export default ProtectedRoutes;
