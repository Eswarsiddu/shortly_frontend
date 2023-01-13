import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { currentUser } = useAuth();
  const uid = currentUser?.uid;
  return (
    <>
      <p>dashboard {uid}</p>
    </>
  );
}

export { Dashboard };
