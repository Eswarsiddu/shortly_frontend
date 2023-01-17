import { BACKEND_URL_HTTP, DATA_LENGTH_SIZE } from "./Utils";

export async function createUrl(data: any, uid: string) {
  data.uid = uid;
  try {
    const response = await fetch(`${BACKEND_URL_HTTP}/create`, {
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

export async function getUrls(pageNo: Number, uid: string) {
  // console.log("host", location.host);
  //TODO: replace with BACK_END_Http url
  const url =
    "http://" + location.host.slice(0, location.host.length - 4) + "8000";
  console.log("url", url);
  try {
    const response = await fetch(
      `${url}/urls?pageNo=${pageNo}&size=${DATA_LENGTH_SIZE}&uid=${uid}`
    );
    console.log("status", response.status);
    if (response.status == 200) {
      console.log("if block");
      const data = await response.json();
      console.log("data json", data);
      return data;
    }
  } catch (e) {}
}

//TODO: implement search function
export async function getSearchUrls(search: string, uid: string) {
  try {
    const response = await fetch(
      `${BACKEND_URL_HTTP}/urls?pageNo=${1}&size=${DATA_LENGTH_SIZE}&uid=${uid}`
    );
    console.log("status", response.status);
    if (response.status == 200) {
      console.log("if block");
      const data = await response.json();
      console.log("data json", data);
      return data;
    }
  } catch (e) {}
}
