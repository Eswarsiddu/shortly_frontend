import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { checkPasswordConstraints, showToast } from "../utils/Utils";
import "./Profile.css";

export function Profile() {
  const {
    currentUser,
    updateEmailAddress,
    updateDisplayName,
    logout,
    _updatePassword: updatePassword,
  } = useAuth();
  const [account, setAccount] = useState(true);

  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [matchError, setMatchError] = useState(false);

  return (
    <>
      <Link className="back" to="/dashboard">
        <i className="fa-solid fa-caret-left"></i>Dashboard
      </Link>
      <div className="profile">
        <div className="tab-bar">
          <p
            className={"account " + (account ? "active" : "")}
            onClick={() => {
              setAccount(true);
            }}
          >
            Account
          </p>
          <p
            className={!account ? "active" : ""}
            onClick={() => setAccount(false)}
          >
            Security
          </p>
        </div>
        {account ? (
          <div className="profile-info">
            <ProfileField
              user={currentUser}
              fieldName="Email ID"
              setter={updateEmailAddress}
              logout={logout}
            />
            <ProfileField
              user={currentUser}
              fieldName="Full Name"
              setter={updateDisplayName}
              refresh={() => currentUser?.reload()}
            />
          </div>
        ) : (
          <div className="password-info">
            <div>
              <label htmlFor="new-password">New Password</label>
              <input
                autoComplete="false"
                autoFocus
                type="password"
                id="new-password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
              />
              {passwordError && (
                <p className="form-error">
                  Password must contain at least 6 characters, including UPPER,
                  lower, special character, number
                </p>
              )}
            </div>
            <div>
              <label htmlFor="cnf-password">Confirm Password</label>
              <input
                autoComplete="false"
                type="password"
                id="cnf-password"
                value={newConfirmPassword}
                onChange={(e) => {
                  setNewConfirmPassword(e.target.value);
                }}
              />
              {matchError && <p className="error">Password doesn't match</p>}
            </div>
            <div>
              <button
                className="update-btn"
                onClick={async () => {
                  setMatchError(false);
                  setPasswordError(false);
                  if (checkPasswordConstraints(newPassword)) {
                    if (newPassword == newConfirmPassword) {
                      await updatePassword(newPassword);
                      setNewPassword("");
                      setNewConfirmPassword("");
                      showToast("Password Updated Successfully");
                    } else {
                      setMatchError(true);
                    }
                  } else {
                    setPasswordError(true);
                  }
                }}
              >
                Change Password
              </button>
              <button
                className="cancel-btn"
                onClick={() => {
                  setMatchError(false);
                  setPasswordError(false);
                  setNewPassword("");
                  setNewConfirmPassword("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function ProfileField({ fieldName, user, setter, logout, refresh }: any) {
  const value = fieldName == "Email ID" ? user.email : user.displayName;
  const [fieldUpdate, setFieldUpdate] = useState(false);
  const [newValue, setNewValue] = useState("");
  const [filedError, setFieldError] = useState("");
  return (
    <div className="profile-field">
      <p className="profile-title">{fieldName}</p>
      {fieldUpdate ? (
        <div className="profile-update">
          <div>
            <input
              autoFocus
              type="email"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value.trim())}
            />
            <button
              className="update-btn"
              disabled={newValue == value}
              onClick={async () => {
                if (newValue != value) {
                  try {
                    await setter(newValue);
                  } catch ({ code }: any) {
                    console.log(code);
                    if (code == "auth/email-already-in-use") {
                      setFieldError("Email already in use");
                    } else if (code == "auth/requires-recent-login") {
                      setFieldError("Requires recent login");
                    }
                    return;
                  }
                }
                setFieldUpdate(false);
              }}
            >
              update
            </button>
            <button
              className="cancel-btn"
              onClick={() => {
                setFieldUpdate(false);
              }}
            >
              cancel
            </button>
          </div>
          <div>{filedError != "" && <p className="error">{filedError}</p>}</div>
        </div>
      ) : (
        <>
          <div className="field-info">
            <p>{value}</p>
            <button
              className="edit-btn"
              onClick={() => {
                setNewValue(value);
                setFieldUpdate(true);
                setFieldError("");
              }}
            >
              Edit
            </button>
          </div>
        </>
      )}
    </div>
  );
}
