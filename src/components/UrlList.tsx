import { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/UrlList.css";
import { getDate, getShortUrl } from "../utils/Utils";
export function UrlList({ urls, selected, currentUrlIndex }: any) {
  const [searchText, setSearchText] = useState("");
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
              setSearchText("");
            }}
            className="fa-solid fa-arrows-rotate refresh"
          ></i>
          <input
            type="search"
            placeholder="Title / Back half"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />

          <button className="search">
            <i className="fa fa-search"></i>
            Search
          </button>
        </div>
      </div>
      {urls &&
        urls.map(
          ({ createDate, backHalf, title, hits, scans }: any, id: number) =>
            UrlTile({
              createDate,
              backHalf,
              title,
              totalHits: hits + scans,
              id,
              selected,
              currentUrlIndex,
            })
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
  selected,
  currentUrlIndex,
}: any) {
  return (
    <div
      className={`url-tile ${id == currentUrlIndex ? "active" : ""}`}
      onClick={() => {
        selected(id);
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
