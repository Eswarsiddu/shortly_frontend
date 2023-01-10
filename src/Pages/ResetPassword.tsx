import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function ResetPassword({ obbCode }: any) {
  const [password, setPassword] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");
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
      </div>
      <button
        onClick={async () => {
          if (obbCode) {
            await resetPassword(obbCode, password);
            console.log(password);
            navigate("/login");
          }
        }}
      >
        Reset
      </button>
    </>
  );
}
