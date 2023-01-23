import { createContext, useContext, useEffect, useState } from "react";
import { getSearchUrls, getUrls } from "../utils/BackendRequests";
import { urlInterface } from "../utils/Types/UrlInterface";
import { useAuth } from "./AuthContext";

export function useUrls__() {
  const { currentUser } = useAuth();
  const { uid } = currentUser!;
  const [urlsData, setUrlsData] = useState([]);
  // let currentUrlIndex = 0;
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  useEffect(() => {
    getUrls(1, uid).then((_data) => {
      setUrlsData(_data);
    });
  }, []);
  useEffect(() => {}, [currentUrlIndex]);
  const value: urlInterface = {
    urlsData,
    currentUrlIndex,
    // getCurrentUrl: () => urlsData[currentUrlIndex],
    currentUrl: urlsData[currentUrlIndex],
    selectUrl(index: number) {
      console.log("setting url index", index);
      // currentUrlIndex = index;
      // setCurrentUrlIndex(index);
    },
    getUrlsData(pageNo: number) {
      getUrls(pageNo, uid).then((_data) => {
        setUrlsData(_data);
        // currentUrlIndex = 0;
        // setCurrentUrlIndex(0);
      });
    },
    searchUrls(search: string) {
      getSearchUrls(search, uid).then((_data) => {
        setUrlsData(_data);
      });
    },
  };
  return value;
}
