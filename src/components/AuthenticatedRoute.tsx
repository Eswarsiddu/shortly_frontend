import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { WaitingPage } from "./WaitingPage";
export function AuthenticatedRoute({ children }: any) {
  const { currentUser } = useAuth();
  if (typeof currentUser == "undefined") return <WaitingPage />;
  if (currentUser) return <Navigate to="/dashboard" />;
  return children;
}
