import { useRef, useCallback, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUrls } from "../context/UrlsContext";
import "../Styles/UrlList.css";
import { useInView } from "react-intersection-observer";
import { getDate, getShortUrl } from "../utils/Utils";
export function UrlList({
  urlsData,
  selectUrl,
  loading,
  currentUrlIndex,
  nextPage,
  resetData,
  inputRef,
  searchData,
}: any) {
  // let inputRef = useRef<HTMLInputElement>(null);
  // const [pageNo,setPageNo] = useState(1);
  // let pageNo = 1;
  // const observer = useRef<HTMLDivElement>(null);
  // const lastUrlTileRef = useCallback((node: any) => {
  //   if (loading) return;
  //   if (observer.current) observer.current.disconnect();
  //   observer.current = new IntersectionObserver((entries) => {
  //     console.log("lastpage");
  //     if (entries[0].isIntersecting) {
  //       nextPage();
  //     }
  //   });
  //   if (node) observer.current.observe(node);
  // }, []);
  // useEffect(() => {}, [urlsData]);
  let listRef = useRef<HTMLDivElement>(null);
  const handelInfiniteScroll = (e) => {
    // console.log(e);
    // console.log(
    //   "window.innerHeight",
    //   window.innerHeight,
    //   ", scrollTop",
    //   document.documentElement.scrollTop,
    //   ", scrollHeight",
    //   document.documentElement.scrollHeight
    // );
    // if (
    //   window.innerHeight + document.documentElement.scrollTop + 1 >=
    //   document.documentElement.scrollHeight
    // ) {
    //   // nextPage();
    // }
  };

  const { ref, inView, entry } = useInView({
    onChange(inview, entry) {
      console.log({ inview, entry });
      if (inview) {
        nextPage();
      }
    },
  });

  // useEffect(() => {
  //   window.addEventListener("scroll", handelInfiniteScroll);
  //   return () => window.removeEventListener("scroll", handelInfiniteScroll);
  // }, []);

  if (urlsData.length <= 0) return <p>loading</p>;

  return (
    <div className="url-list" onScroll={handelInfiniteScroll}>
      <div className="flex-column search-bar">
        <Link id="create-url" to="/create">
          <i className="fa-solid fa-plus"></i>
          Create New URL
        </Link>
        <div className="flex search-box">
          <i
            onClick={() => {
              inputRef.current!.value = "";
              // searchData();
              resetData();
              // getUrlsData(1);
            }}
            className="fa-solid fa-arrows-rotate refresh"
          ></i>
          <input type="search" ref={inputRef} placeholder="Title / Back half" />

          <button
            className="search"
            onClick={() => {
              const value = inputRef.current!.value.trim();
              // resetData();
              searchData();
              if (value) {
                // searchUrls(value);
              } else {
                // getUrlsData(1);
              }
            }}
          >
            <i className="fa fa-search"></i>
            Search
          </button>
        </div>
      </div>
      {urlsData &&
        urlsData.map(
          ({ createDate, backHalf, title, hits, scans }: any, id: number) => {
            // if (urlsData.length == id + 1) {
            return UrlTile({
              createDate,
              backHalf,
              title,
              totalHits: hits + scans,
              id,
              selectUrl,
              currentUrlIndex,
              ref: urlsData.length == id + 1 ? ref : null,
            });
            // } else {
            //   return UrlTile({
            //     createDate,
            //     backHalf,
            //     title,
            //     totalHits: hits + scans,
            //     id,
            //     selectUrl,
            //     currentUrlIndex,
            //   });
            // }
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
}: any) {
  // console.log("last ref", lastUrlTileRef);
  return (
    <div
      key={id}
      ref={ref}
      className={`url-tile ${id == currentUrlIndex ? "active" : ""}`}
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
