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
              if (onlyTitle) navigate("/shortly_frontend");
              else if (
                currentUser &&
                location.pathname != "/shortly_frontend/dashboard"
              )
                navigate("/shortly_frontend/dashboard");
            }}
          >
            Shortly
          </p>
        </div>
        {/*
            //TODO:REMOVE p position in production
            
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
        */}
        {!onlyTitle &&
          (typeof currentUser == "undefined" ? null : currentUser ? (
            <>
              {/* {location.pathname == "/dashboard" && (
                <Link id="create-url" to="/create">
                  Create New
                </Link>
              )} */}
              <div
                onClick={() => {
                  if (location.pathname != "/shortly_frontend/profile") {
                    navigate("/shortly_frontend/profile");
                  }
                }}
                className={`flex profile-block ${
                  location.pathname != "/shortly_frontend/profile"
                    ? "profile-block-hover"
                    : ""
                }`}
              >
                <div className="username flex align-center">
                  <span>{currentUser?.displayName?.at(0)}</span>
                </div>
                {location.pathname != "/shortly_frontend/profile" && (
                  <p className="m-0">{currentUser?.displayName}</p>
                )}
              </div>
              <i
                className="fa-solid fa-right-from-bracket"
                onClick={async () => {
                  await logout();
                  navigate("/shortly_frontend");
                }}
              ></i>
            </>
          ) : (
            <>
              <Link to="/shortly_frontend/login">Login</Link>
              <Link className="signUp" to="/shortly_frontend/signUp">
                Sign Up
              </Link>
            </>
          ))}
      </nav>
      <Outlet />
    </>
  );
}
