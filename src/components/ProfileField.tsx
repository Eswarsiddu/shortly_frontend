import { useState } from "react";
import { BeatLoader, BounceLoader, PulseLoader } from "react-spinners";
import { authErrorMessage, showToast } from "../utils/Utils";

export function ProfileField({
  fieldName,
  currentUser,
  valueKey,
  setter,
  type,
}: any) {
  const [fieldUpdate, setFieldUpdate] = useState(false);
  const value = currentUser[valueKey];
  const [newValue, setNewValue] = useState("");
  const [filedError, setFieldError] = useState("");
  const [loading, setLoading] = useState(false);
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
                setLoading(true);
                if (newValue != value) {
                  try {
                    await setter(newValue.trim());
                  } catch ({ code }: any) {
                    setFieldError(authErrorMessage(code as string));
                    setLoading(false);
                    return;
                  }
                }
                setFieldUpdate(false);
                setLoading(false);
              }}
            >
              {loading ? <BeatLoader size={15} color="#36d7b7" /> : "Update"}
            </button>
            <button
              className="cancel-btn"
              onClick={() => {
                setFieldUpdate(false);
              }}
            >
              Cancel
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
              setLoading(false);
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
