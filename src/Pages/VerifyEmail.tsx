import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function VerifyEmail() {
  const { verifyEmail, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      <p>Verify Email</p>
      <button
        onClick={async () => {
          await verifyEmail();
          await logout();
          navigate("/login");
        }}
      >
        Verify Email
      </button>
    </>
  );
}
