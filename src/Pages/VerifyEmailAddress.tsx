import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function VerifyEmailAddress({ oobCode }: any) {
  const { verifyEmailAddress } = useAuth();
  verifyEmailAddress(oobCode);
  return (
    <>
      <p>Email has been verified</p>
      <Link to="/login">Login</Link>
    </>
  );
}
