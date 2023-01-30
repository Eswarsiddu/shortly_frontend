// export const BACKEND_URL = "127.0.0.1:8000";
export const BACKEND_URL = "shortly-jn8h.onrender.com";
// https://shortly-jn8h.onrender.com
// export const BACKEND_URL_HTTP: string = "http://127.0.0.1:8000";
export const BACKEND_URL_HTTP: string = "https://shortly-jn8h.onrender.com";
export const PAGE_URL = "shortly.com";
export const DATA_LENGTH_SIZE = 15;
export const passwordRegEx =
  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
export function checkPasswordConstraints(password: string) {
  const matches = password.match(passwordRegEx);
  if (matches) return matches.length >= 0;
  return false;
}

export function getShortUrl(backHalf: string) {
  return `${BACKEND_URL}/${backHalf}`;
}

export function getShortUrlHttp(backHalf: string) {
  return `${BACKEND_URL_HTTP}/${backHalf}`;
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

const MonthNumber = (month: number) => {
  switch (month + 1) {
    case 1: {
      return "January";
    }
    case 2: {
      return "February";
    }
    case 3: {
      return "March";
    }
    case 4: {
      return "april";
    }
    case 5: {
      return "May";
    }
    case 6: {
      return "June";
    }
    case 7: {
      return "July";
    }
    case 8: {
      return "August";
    }
    case 9: {
      return "September";
    }
    case 10: {
      return "October";
    }
    case 11: {
      return "November";
    }
    case 12: {
      return "December";
    }
  }
};

export function getDate(time: number) {
  const fullDate = new Date(time);
  const date = fullDate.getDate();
  const month = fullDate.getMonth();
  const year = fullDate.getFullYear();
  // console.log({ date, month, year });
  return `${date} ${MonthNumber(month)?.slice(0, 3).toUpperCase()} ${year}`;
}

function getHour(hour: number) {
  if (hour < 12 && hour > 0) {
    return [hour, "AM"];
  }
  if (hour == 0) return [12, "AM"];
  if (hour == 12) return [hour, "PM"];
  return [hour - 12, "PM"];
}

export function getFullDate(time: number) {
  const fullDate = new Date(time);
  const date = fullDate.getDate();
  const month = fullDate.getMonth();
  const year = fullDate.getFullYear();
  const _hours = fullDate.getHours();
  const minutes = fullDate.getMinutes();
  const [hours, amPm] = getHour(_hours);
  return `${MonthNumber(month)} ${date}, ${year} ${hours}:${minutes} ${amPm}`;
}

export const authErrorMessage = (code: string) =>
  code.replace("auth/", "").replaceAll("-", " ");
