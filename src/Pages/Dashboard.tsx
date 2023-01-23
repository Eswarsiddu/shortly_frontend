import { useEffect, useRef, useState } from "react";
import { UrlInfo } from "../components/UrlInfo";
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

  function nextPage() {
    console.log("next page loading", { loading, hasMore });
    if (loading || !hasMore) return;
    console.log("next page");
    setLoading(true);
    setPageNo((prev) => prev + 1);
    console.log("pageNo", pageNo);
  }

  const loadData = () => {
    console.log("current", inputRef.current?.value);
    getUrls(pageNo, uid, inputRef.current?.value as string).then(
      ({ _data, _hasMore }) => {
        console.log(
          "data",
          _data.map(({ backHalf }: any) => {
            backHalf;
          })
        );
        setHasMore(_hasMore);
        setUrlsData((prev) => {
          const d = [...prev, ..._data];
          console.log(
            "new d",
            d.map(({ backHalf }: any) => {
              return backHalf;
            })
          );
          return pageNo != 1 ? d : _data;
        });
        setLoading(false);
      }
    );
  };

  useEffect(loadData, [pageNo]);

  function selectUrl(index: number) {
    setCurrentUrlIndex(index);
  }

  const resetData = () => {
    // if (inputRef.current) {
    inputRef.current!.value = "";
    // }
    setLoading(true);
    // getUrls(1, uid).then(({ _data, _hasMore }) => {
    // console.log("data", _data);
    if (pageNo != 1) {
      setPageNo(1);
    } else {
      loadData();
    }
    setCurrentUrlIndex(0);
    // setUrlsData(_data);
    // setHasMore(_hasMore);
    // setLoading(false);
    // });
  };

  const searchData = () => {
    setLoading(true);
    setPageNo(1);
    setCurrentUrlIndex(0);
    loadData();
  };

  useEffect(loadData, []);

  // if (urlsData.length > 0) {
  return (
    <div className="flex" style={{ height: "88%" }}>
      <UrlList
        urlsData={urlsData}
        selectUrl={selectUrl}
        currentUrlIndex={currentUrlIndex}
        nextPage={nextPage}
        loading={loading}
        resetData={resetData}
        inputRef={inputRef}
        searchData={searchData}
      />
      <UrlInfo urlData={urlsData[currentUrlIndex]} />
    </div>
  );
  // }
  // return <>Loading</>;
}
