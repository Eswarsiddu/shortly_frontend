import { useState } from "react";
import { Link } from "react-router-dom";
import { ProfileField } from "../components/ProfileField";
import { useAuth } from "../context/AuthContext";
import { checkPasswordConstraints, showToast } from "../utils/Utils";
import "../Styles/Profile.css";

export function Profile() {
  const {
    currentUser,
    updateEmailAddress,
    updateDisplayName,
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
        <div className="tab-bar flex">
          <p
            className={"account m-0 " + (account ? "active" : "")}
            onClick={() => {
              setAccount(true);
            }}
          >
            Account
          </p>
          <p
            className={"m-0 " + (!account ? "active" : "")}
            onClick={() => setAccount(false)}
          >
            Security
          </p>
        </div>
        {account ? (
          <div className="profile-info flex-column">
            <ProfileField
              value={currentUser?.email}
              fieldName={"Email ID"}
              type="email"
              setter={updateEmailAddress}
            />
            <ProfileField
              value={currentUser?.displayName}
              fieldName="Full Name"
              type="text"
              setter={updateDisplayName}
            />
          </div>
        ) : (
          <div className="password-info flex-column">
            <div className="flex-column">
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
                <p className="form-error m-0">
                  Password must contain at least 6 characters, including UPPER,
                  lower, special character, number
                </p>
              )}
            </div>
            <div className="flex-column">
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
              {matchError && (
                <p className="error m-0">Password doesn't match</p>
              )}
            </div>
            <div className="flex-column">
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
