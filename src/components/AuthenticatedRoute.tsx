import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
export function AuthenticatedRoute({ children }: any) {
  const { currentUser } = useAuth();
  useEffect(() => {}, [currentUser]);
  if (typeof currentUser == "undefined") {
    return <p>Please wait</p>;
  }
  if (currentUser) {
    return <Navigate to="/dashboard" />;
  }
  return children;
}
