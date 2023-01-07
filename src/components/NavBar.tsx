import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./NavBar.css";
export function NavBar({ onlyTitle = false }) {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  if (onlyTitle)
    return (
      <>
        <nav>
          <div className="title mobile">
            <p onClick={() => navigate("/")}>Shortly</p>
          </div>
          {/*
            //TODO:REMOVE in production
            */}
          <p id="position">
            w:{window.innerWidth} <br /> h:{window.innerHeight}
          </p>
        </nav>
        <Outlet />
      </>
    );
  return (
    <>
      <nav>
        <div className="title">
          <p>Shortly</p>
        </div>
        {/*
            //TODO:REMOVE in production
            */}
        <p id="position center">
          sw:{window.innerWidth} <br /> sh:{window.innerHeight}
        </p>
        {currentUser && (
          <div className="username">
            <span>{currentUser?.email?.at(0)}</span>
          </div>
        )}
        {currentUser && location.pathname != "/profile" && (
          <Link to="/profile">profile</Link>
        )}
        {currentUser && (
          <button
            onClick={async () => {
              await logout();
              navigate("/login");
            }}
          >
            logout
          </button>
        )}
        {!currentUser && <Link to="/login">Login</Link>}
        {!currentUser && (
          <Link className="signUp" to="/signUp">
            Sign Up
          </Link>
        )}
      </nav>
      <Outlet />
    </>
  );
}
