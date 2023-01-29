import { Link } from "react-router-dom";
import "../Styles/UrlList.css";
import { useInView } from "react-intersection-observer";
import { getDate, getShortUrl } from "../utils/Utils";
import { PropagateLoader } from "react-spinners";
export function UrlList({
  urlsData,
  setCurrentUrlIndex: selectUrl,
  loading,
  currentUrlIndex,
  nextPage,
  resetData,
  inputRef,
  searchData,
  width,
}: any) {
  const {
    ref,
    inView: _,
    entry: __,
  } = useInView({
    onChange(inView, _) {
      if (inView) nextPage();
    },
  });

  if (loading) return <PropagateLoader color="#36d7b7" />;

  return (
    <div className="url-list">
      <div className="flex-column search-bar">
        <Link id="create-url" to="/create">
          <i className="fa-solid fa-plus"></i>
          Create New URL
        </Link>
        <div className="flex search-box">
          <i
            onClick={() => {
              inputRef.current!.value = "";
              resetData();
            }}
            className="fa-solid fa-arrows-rotate refresh"
          ></i>
          <input type="search" ref={inputRef} placeholder="Title / Back half" />

          <button className="search" onClick={searchData}>
            <i className="fa fa-search"></i>
            Search
          </button>
        </div>
      </div>
      {urlsData.length > 0 &&
        urlsData.map(
          ({ createDate, backHalf, title, hits, scans }: any, id: number) => {
            return UrlTile({
              createDate,
              backHalf,
              title,
              totalHits: hits + scans,
              id,
              selectUrl,
              currentUrlIndex,
              ref: urlsData.length == id + 1 ? ref : null,
              width,
            });
          }
        )}
    </div>
  );
}

function UrlTile({
  createDate,
  backHalf,
  title,
  totalHits,
  id,
  selectUrl,
  currentUrlIndex,
  ref,
  width,
}: any) {
  return (
    <div
      key={id}
      ref={ref}
      className={`url-tile ${
        id == currentUrlIndex && width > 768 ? "url-tile-active" : ""
      }`}
      onClick={() => {
        selectUrl(id);
      }}
    >
      <p className="time m-0">{getDate(createDate)}</p>
      <p className="url-tile-title m-0">{title}</p>
      <div className="bottom">
        <p className="short-url m-0">{getShortUrl(backHalf)}</p>
        <p className="hits-block m-0">
          <span className="total-hits">{totalHits}</span>
          <i className="fa-solid fa-chart-column"></i>
        </p>
      </div>
    </div>
  );
}
