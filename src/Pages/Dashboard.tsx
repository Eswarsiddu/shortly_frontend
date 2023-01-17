import { useEffect, useState } from "react";
import { UrlInfo } from "../components/UrlInfo";
import { UrlList } from "../components/UrlList";
import { useAuth } from "../context/AuthContext";
import { getUrls } from "../utils/BackendRequests";
import "../Styles/Dashboard.css";
export function Dashboard() {
  const { currentUser } = useAuth();
  const uid = currentUser!.uid;
  const [data, setData] = useState([]);
  const [currentUrl, setCurrentUrl] = useState(0);
  const getData = () => {
    getUrls(1, uid).then((_data) => {
      console.log("data", _data);
      setData(_data);
    });
  };
  useEffect(() => {
    getData();
    return () => {};
  }, []);

  const selected = (id: number) => {
    setCurrentUrl(id);
  };

  return (
    <div className="flex dashboard">
      <UrlList urls={data} selected={selected} currentUrlIndex={currentUrl} />
      <UrlInfo url={data[currentUrl]} />
    </div>
  );
}
