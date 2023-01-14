import { BACKEND_URL } from "./Utils";

export async function setCookie(uid: string) {
  await fetch(`${BACKEND_URL}/uid`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      uid,
    }),
  });
}

export async function removeCookie() {
  await fetch(`${BACKEND_URL}/uid/remove`, {
    method: "POST",
  });
}

export async function createUrl(data: any, uid: string) {
  data.uid = uid;
  try {
    const response = await fetch(`${BACKEND_URL}/create`, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.status == 200) {
      return true;
    }
    if (response.status == 500) {
      throw "serverError";
    }
    if (response.status == 400) {
      throw "backHalfError";
    }
  } catch (e) {
    throw e;
  }
}

export async function getUrls(pageNo: Number, size: Number) {
  try {
    const response = await fetch(
      `${BACKEND_URL}/urls?pageNo=${pageNo}&size=${size}`
    );
    if (response.status == 200) {
      const data = await response.json();
      return data;
    }
  } catch (e) {}
}
