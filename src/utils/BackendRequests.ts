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

export async function getUrls(pageNo: Number, uid: string, search: string) {
  try {
    const response = await fetch(
      `${BACKEND_URL_HTTP}/urls?pageNo=${pageNo}&size=${DATA_LENGTH_SIZE}&uid=${uid}${
        search ? `&search=${search}` : ""
      }`
    );
    if (response.status == 200) {
      const data = await response.json();
      return { _data: data.data, _hasMore: data.hasMore };
    }
  } catch (e) {}
  return { _data: [], _hasMore: false };
}
