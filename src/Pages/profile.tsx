import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Profile() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      <button onClick={() => navigate("/dashboard")}>back</button>
      <p>Email Id: {currentUser?.email}</p>
    </>
  );
}
