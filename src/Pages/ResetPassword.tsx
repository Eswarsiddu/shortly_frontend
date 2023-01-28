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
    <form
      className="flex-column align-center"
      onSubmit={async (e) => {
        e.preventDefault();

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
      <div className="input-block flex-column">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        {passwordError && (
          <p className="form-error m-0">
            Password must contain at least 6 characters, including Upper, Lower,
            Special Character, Number
          </p>
        )}
      </div>
      <div className="input-block flex-column">
        <label htmlFor="password">confirm Password</label>
        <input
          type="password"
          id="confirm-password"
          onChange={(event) => {
            setCnfPassword(event.target.value);
          }}
        />
        {confirmPasswordError && (
          <p className="form-error m-0">Password doesn't match</p>
        )}
      </div>
      <button className="submit-btn" type="submit">
        Reset
      </button>
    </form>
  );
}
