import { useState } from "react";
import { authErrorMessage } from "../utils/Utils";

export function ProfileField({ fieldName, value, setter, type }: any) {
  const [fieldUpdate, setFieldUpdate] = useState(false);
  const [newValue, setNewValue] = useState("");
  const [filedError, setFieldError] = useState("");
  return (
    <div className="profile-field flex-column">
      <p className="profile-title m-0">{fieldName}</p>
      {fieldUpdate ? (
        <div className="profile-update flex-column">
          <div className="flex">
            <input
              autoFocus
              value={newValue}
              type={type}
              onChange={(e) => setNewValue(e.target.value)}
            />
            <button
              className="update-btn"
              disabled={newValue.trim() == value}
              onClick={async () => {
                if (newValue != value) {
                  try {
                    await setter(newValue.trim());
                  } catch ({ code }: any) {
                    setFieldError(authErrorMessage(code as string));
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
          <div>
            {filedError != "" && <p className="error m-0">{filedError}</p>}
          </div>
        </div>
      ) : (
        <div className="field-info flex">
          <p className="m-0">{value}</p>
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
      )}
    </div>
  );
}
