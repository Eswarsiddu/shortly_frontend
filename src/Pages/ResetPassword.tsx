import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { checkPasswordConstraints } from "../utils/Utils";

export function ResetPassword({ obbCode }: any) {
  const [password, setPassword] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        {passwordError && (
          <p className="error">
            Password must contain at least 6 characters, including UPPER, lower,
            special character, number
          </p>
        )}
      </div>
      <div>
        <label htmlFor="password">confirm Password</label>
        <input
          type="password"
          id="confirm-password"
          onChange={(event) => {
            setCnfPassword(event.target.value);
          }}
        />
        {confirmPasswordError && (
          <p className="error">Password doesn't match</p>
        )}
      </div>
      <button
        onClick={async () => {
          if (obbCode) {
            setPasswordError(false);
            setConfirmPasswordError(false);
            if (checkPasswordConstraints(password)) {
              if (password == cnfPassword) {
                await resetPassword(obbCode, password);
                navigate("/login");
              } else setConfirmPasswordError(true);
            } else setPasswordError(true);
          }
        }}
      >
        Reset
      </button>
    </>
  );
}
