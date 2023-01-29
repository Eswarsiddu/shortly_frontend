import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../Styles/VerifyEmailAddress.css";

export function VerifyEmailAddress({ oobCode }: any) {
  const { verifyEmailAddress } = useAuth();
  verifyEmailAddress(oobCode);
  return (
    <div className="verify-email-address flex-column align-center">
      <i className="fa-solid fa-circle-check check-icon"></i>
      <p>You have successfully verified your account</p>
      <Link to="/shortly_frontend/login">Login here</Link>
    </div>
  );
}
