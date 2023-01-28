import { useEffect, useRef, useState } from "react";
import { UrlInfo } from "../components/UrlInfo";
import { UrlInfoMobile } from "../components/UrlInfoMobile";
import { UrlList } from "../components/UrlList";
import { useAuth } from "../context/AuthContext";
import { getUrls } from "../utils/BackendRequests";
export function Dashboard() {
  const { currentUser } = useAuth();
  const { uid } = currentUser!;
  const [urlsData, setUrlsData] = useState<any[]>([]);
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0);
  const [pageNo, setPageNo] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  let inputRef = useRef<HTMLInputElement>(null);
  const [width, setWidth] = useState(window.innerWidth);
  const [urlInfo, setUrlInfo] = useState(false);

  function nextPage() {
    if (loading || !hasMore) return;
    setLoading(true);
    setPageNo((prev) => prev + 1);
  }

  const loadData = () => {
    getUrls(pageNo, uid, inputRef.current?.value.trim() as string).then(
      ({ _data, _hasMore }) => {
        setHasMore(_hasMore);
        setUrlsData((prev) => (pageNo != 1 ? [...prev, ..._data] : _data));
        setLoading(false);
      }
    );
  };

  useEffect(loadData, [pageNo]);

  const resetData = () => {
    inputRef.current!.value = "";
    setLoading(true);
    if (pageNo != 1) {
      setPageNo(1);
    } else {
      loadData();
    }
    setCurrentUrlIndex(0);
  };

  const searchData = () => {
    setLoading(true);
    setPageNo(1);
    setCurrentUrlIndex(0);
    loadData();
  };

  useEffect(() => {
    loadData();
    function handleResize() {
      console.log("resized");
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex" style={{ height: "88%" }}>
      <UrlList
        urlsData={urlsData}
        setCurrentUrlIndex={(index: number) => {
          if (width <= 768) {
            setUrlInfo(true);
          }
          setCurrentUrlIndex(index);
        }}
        currentUrlIndex={currentUrlIndex}
        nextPage={nextPage}
        loading={loading}
        resetData={resetData}
        inputRef={inputRef}
        searchData={searchData}
        width={width}
      />
      {/* <UrlInfo urlData={urlsData[currentUrlIndex]} /> */}
      {/* 
      //TODO: implement null, 640
      */}
      {width <= 768 ? (
        urlInfo ? (
          <UrlInfoMobile
            urlData={urlsData[currentUrlIndex]}
            closeComponent={() => {
              setUrlInfo(false);
            }}
          />
        ) : null
      ) : (
        <UrlInfo loading={loading} urlData={urlsData[currentUrlIndex]} />
      )}
    </div>
  );
}
