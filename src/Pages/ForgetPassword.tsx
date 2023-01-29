import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../Styles/ForgetPassword.css";

export function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const { forgotPassword } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="forget-password flex-column">
      <h2 className="m-0">Reset Password</h2>
      <p className="m-0">
        Enter the email associated with your account and we'll send and email
        with instruction to reset your password
      </p>
      <input
        type="email"
        placeholder="Email address"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      {emailError != "" && <p className="error m-0">{emailError}</p>}
      <button
        className="recover-password"
        onClick={async () => {
          setEmailError("");
          try {
            await forgotPassword(email);
            navigate("/shortly_frontend/passwordrecoverysend");
          } catch (e) {
            setEmailError("Email not found");
          }
        }}
      >
        Recover Password
      </button>
    </div>
  );
}
