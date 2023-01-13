import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../Styles/NavBar.css";
export function NavBar({ onlyTitle = false }) {
  const { currentUser, logout } = useAuth();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const navigate = useNavigate();

  return (
    <>
      <nav className="flex align-center">
        <div className={`title ${onlyTitle && "only-title"}`}>
          <p
            className="m-0"
            onClick={() => {
              if (onlyTitle) navigate("/");
              else if (currentUser && location.pathname != "/dashboard")
                navigate("/dashboard");
            }}
          >
            Shortly
          </p>
        </div>
        {/*
            //TODO:REMOVE p position in production
            */}
        <p id="position">
          <button
            onClick={() => {
              setWidth(window.innerWidth);
              setHeight(window.innerHeight);
            }}
          >
            get size
          </button>
          w:{width} h:{height}
        </p>
        {!onlyTitle &&
          (typeof currentUser == "undefined" ? null : currentUser ? (
            <>
              {location.pathname == "/dashboard" && (
                <Link to="/create">Create New</Link>
              )}
              <div className="username flex align-center">
                <span>{currentUser?.displayName?.at(0)}</span>
              </div>
              {location.pathname != "/profile" && (
                <Link to="/profile">Profile</Link>
              )}
              <i
                className="fa-solid fa-right-from-bracket"
                onClick={async () => {
                  await logout();
                  navigate("/");
                }}
              ></i>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link className="signUp" to="/signUp">
                Sign Up
              </Link>
            </>
          ))}
      </nav>
      <Outlet />
    </>
  );
}
