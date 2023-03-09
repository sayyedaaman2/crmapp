import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
const ProtectedRoutes = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const authenticate = Cookie.get("x-access-token");

    if (!authenticate) {
      navigate("/login");
    }
  });
  return <>{children}</>;
};

export default ProtectedRoutes;
