import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../Styles/VerifyEmail.css";

export function VerifyEmail() {
  const { verifyEmail, logout, currentUser } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="verify-email flex-column align-center">
      <h2>Verify your email</h2>
      <p>
        Hi {currentUser?.displayName}! Click on the button below to receive
        verification mail to your registered email address
      </p>
      <button
        className="verify-email-login-link"
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
