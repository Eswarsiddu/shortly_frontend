import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../Styles/VerifyEmail.css";

export function VerifyEmail() {
  const { verifyEmail, logout, currentUser } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="verify-email flex-column align-center">
      <p>Verify your email</p>
      <p>
        Hi {currentUser?.displayName}! Use the link below to receive
        verification mail to your registered email address
      </p>
      <button
        onClick={async () => {
          await verifyEmail();
          await logout();
          navigate("/verificationsend");
        }}
      >
        Verify Email
      </button>
    </div>
  );
}
