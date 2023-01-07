import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { VerifyEmail } from "../Pages/VerifyEmail";
export function ProtectedRoute({ children }: any) {
  const { currentUser } = useAuth();
  useEffect(() => {}, [currentUser]);
  if (typeof currentUser == "undefined") {
    return <p>Please Wait</p>;
  } else if (currentUser == null) {
    return <Navigate to="/login" />;
  } else if (!currentUser.emailVerified) {
    return <VerifyEmail />;
  }
  return children;
}
