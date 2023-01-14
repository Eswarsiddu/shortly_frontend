export const BACKEND_URL: string = "http://127.0.0.1:8000";
export const PAGE_URL = "shortly.com";
export const passwordRegEx =
  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
export function checkPasswordConstraints(password: string) {
  const matches = password.match(passwordRegEx);
  if (matches) return matches.length >= 0;
  return false;
}

export const backHalfRegEx = /^[a-zA-Z0-9_]{5,30}$/;

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

export const authErrorMessage = (code: string) =>
  code.replace("auth/", "").replaceAll("-", " ");
