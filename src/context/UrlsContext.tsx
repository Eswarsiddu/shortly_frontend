import { createContext, useContext, useEffect, useState } from "react";
import { getSearchUrls, getUrls } from "../utils/BackendRequests";
import { urlInterface } from "../utils/Types/UrlInterface";
import { useAuth } from "./AuthContext";

const UrlContext = createContext<urlInterface>({
  urlsData: [],
  currentUrlIndex: 0,
  currentUrl: {},
  selectUrl: (index: number) => {},
  getUrlsData: (pageNo: number) => [],
  searchUrls: (search: string) => [],
  hasMore: true,
  loading: false,
});

export const useUrls = () => useContext(UrlContext);

export default function UrlContextProvider({ children }: any) {
  const { currentUser } = useAuth();
  const { uid } = currentUser!;
  const urlsData: any[] = [];
  // const [urlsData, setUrlsData] = useState<any[]>([]);
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {}, [urlsData]);

  useEffect(() => {
    // setLoading(true);
    getUrls(1, uid).then((_data) => {
      urlsData.push(..._data);
      // setUrlsData(_data);
      // setLoading(false);
    });
  }, []);

  const contextValue = {
    urlsData: urlsData,
    currentUrlIndex,
    hasMore: true,
    loading,
    currentUrl: urlsData[currentUrlIndex],
    selectUrl(index: number) {
      setCurrentUrlIndex(index);
    },
    getUrlsData(pageNo: number) {
      // setLoading(true);
      console.log("page No", pageNo, "old data", urlsData);
      getUrls(pageNo, uid).then((_data) => {
        console.log("page No", pageNo, "old data", urlsData, "new Data", _data);
        urlsData.push(..._data);
        // setUrlsData([...urlsData, ..._data]);
        // setLoading(false);
      });
    },
    searchUrls(search: string) {
      setLoading(true);
      getSearchUrls(search, uid).then((_data) => {
        // setUrlsData(_data);
        setLoading(false);
      });
    },
  };

  return (
    <UrlContext.Provider value={contextValue}>{children}</UrlContext.Provider>
  );
}
