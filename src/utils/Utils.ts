export const BACKEND_URL: string = "http://127.0.0.1:8000/";
export const regEx = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
export function checkPasswordConstraints(password: string) {
  const matches = password.match(regEx);
  if (matches) return matches.length >= 0;
  return false;
}

import { toast } from "react-toastify";

export function showToast(msg: string) {
  toast.success(msg, {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
}
