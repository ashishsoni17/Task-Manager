import  { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

function Protected() {
  const isAuthenticated = useSelector((state) => state.auth.status);
  const currentLocation = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      if (
        currentLocation.pathname === "/" ||
        currentLocation.pathname === "/login" ||
        currentLocation.pathname === "/register"
      ){
        navigate("dashboard", { replace: true });
      }
    }
  }, [isAuthenticated, currentLocation, navigate]);

  return null;
}

export default Protected;
