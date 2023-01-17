import { createContext, useContext, useEffect, useState } from "react";
import { getSearchUrls, getUrls } from "../utils/BackendRequests";
import { urlInterface } from "../utils/Types/UrlInterface";
import { useAuth } from "./AuthContext";
const UrlContext = createContext<urlInterface>({
  currentUrlIndex: 0,
  getUrlsData: (_) => {},
  getUrl: () => {},
  searchUrls: (_) => {},
  urlsData: [],
});

export const useUrls = () => useContext(UrlContext);

export default function UrlContextProvider({ children }: any) {
  const { currentUser } = useAuth();
  const { uid } = currentUser!;
  const [urlsData, setUrlsData] = useState([]);
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0);
  useEffect(() => {
    getUrls(1, uid).then((_data) => {
      setUrlsData(_data);
    });
  }, []);
  const contextValue = {
    urlsData,
    currentUrlIndex,
    getUrl(index: number) {
      setCurrentUrlIndex(index);
      return urlsData[index];
    },
    getUrlsData(pageNo: number) {
      getUrls(pageNo, uid).then((_data) => {
        setUrlsData(_data);
      });
    },
    searchUrls(search: string) {
      getSearchUrls(search, uid).then((_data) => {
        setUrlsData(_data);
      });
    },
  };
  return (
    <UrlContext.Provider value={contextValue}>{children}</UrlContext.Provider>
  );
}
