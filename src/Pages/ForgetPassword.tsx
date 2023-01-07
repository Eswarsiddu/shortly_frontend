import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function ForgetPassword() {
  const [email, setEmail] = useState("");
  const { forgotPassword } = useAuth();
  return (
    <>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
      </div>
      <button
        onClick={() => {
          forgotPassword(email);
        }}
      >
        forgot password
      </button>
      <Link to="/login">login</Link>
    </>
  );
}
