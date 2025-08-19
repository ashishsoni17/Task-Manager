import { useState, useEffect } from "react";
import {useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import api from '../api';
import { login, logout } from '../store/authSlice';
export default function AuthLayout({ children}) {

  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await api.get("/current-user", {
          withCredentials: true,
        });

        if (response.data.success) {
          const userData = response.data.user;
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    checkAuthStatus();
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>; 
  }
  
  return authStatus ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" replace />
  );
}
