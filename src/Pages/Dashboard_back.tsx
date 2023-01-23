import { useEffect, useState } from "react";
import { UrlInfo } from "../components/UrlInfo";
import { UrlList } from "../components/UrlList";
import { useAuth } from "../context/AuthContext";
import { getUrls } from "../utils/BackendRequests";
export function Dashboard() {
  const { currentUser } = useAuth();
  const { uid } = currentUser!;
  const [urlsData, setUrlsData] = useState<any[]>([]);
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  let pageNo = 1;

  function nextPage() {
    setLoading(true);
    pageNo++;
    getUrls(pageNo, uid).then((_data) => {
      console.log("data", _data);
      setUrlsData((prev) => [...prev, ..._data]);
      setLoading(false);
    });
  }

  function selectUrl(index: number) {
    setCurrentUrlIndex(index);
  }

  useEffect(() => {
    console.log("initial loading");
    // setLoading(true);
    getUrls(1, uid).then((_data) => {
      console.log("data", _data);
      setUrlsData(_data);
      // urlsData.push(..._data);
      // console.log("new urls data", urlsData);
      // setUrlsData(_data);
      // setLoading(false);
    });
  }, []);

  // useEffect(() => {
  //   console.log("updated urls data");
  // }, [urlsData]);

  // if (urlsData.length > 0) {
  return (
    <div className="flex" style={{ height: "88%" }}>
      <UrlList
        urlsData={urlsData}
        selectUrl={selectUrl}
        currentUrlIndex={currentUrlIndex}
        nextPage={nextPage}
        // loading={loading}s
      />
      <UrlInfo urlData={urlsData[currentUrlIndex]} loading={loading} />
    </div>
  );
  // }
  // return <>Loading</>;
}
