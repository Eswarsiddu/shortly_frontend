import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { currentUser, verifyEmail } = useAuth();
  return (
    <>
      <p>dashboard</p>
      {!currentUser?.emailVerified && (
        <button
          onClick={async () => {
            await verifyEmail();
          }}
        >
          verifyEmail
        </button>
      )}
    </>
  );
}

export { Dashboard };
