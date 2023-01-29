import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { VerifyEmail } from "../Pages/VerifyEmail";
import { WaitingPage } from "./WaitingPage";
export function ProtectedRoute({ children }: any) {
  const { currentUser } = useAuth();
  // return <WaitingPage />;
  if (typeof currentUser == "undefined") return <WaitingPage />;
  else if (currentUser == null) return <Navigate to="/login" />;
  else if (!currentUser.emailVerified) return <VerifyEmail />;
  return children;
}
