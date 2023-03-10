import { useRef } from "react";
import "../Styles/UrlInfo.css";
import { QRCodeCanvas } from "qrcode.react";
import {
  getFullDate,
  getShortUrl,
  getShortUrlHttp,
  showToast,
} from "../utils/Utils";
export const UrlInfo = ({ urlData, loading }: any) => {
  if (loading) return <>loading</>;
  if (!urlData) return <>No data</>;
  const qrRef = useRef<HTMLInputElement>(null);
  const { createDate, destinationUrl, backHalf, title, hits, scans } = urlData;
  return (
    <>
      <div className="url-info">
        <div className="flex-column">
          <p className="url-info-title m-0">{title}</p>
          <p className="date m-0">
            <i className="fa-regular fa-calendar"></i>
            {getFullDate(createDate)}
          </p>
          <div className="short-url-block flex">
            <a target="_blank" href={getShortUrlHttp(backHalf)}>
              {getShortUrl(backHalf)}
            </a>
            <button
              className="copy"
              onClick={async () => {
                await navigator.clipboard.writeText(getShortUrlHttp(backHalf));
                showToast("copied to clipboard");
              }}
            >
              <i className="fa-regular fa-clone"></i>
              copy
            </button>
          </div>
          <p className="clicks m-0">
            <i className="fa-solid fa-turn-down"></i>
            {hits} {hits == 1 ? "click" : "clicks"}
          </p>
          <a className="destination-url" target="_blank" href={destinationUrl}>
            {destinationUrl}
          </a>
          <div className="flex qr-code-block" ref={qrRef}>
            <QRCodeCanvas
              value={`${getShortUrlHttp(backHalf)}?r=qr`}
              size={200}
              bgColor="#ffffff"
              fgColor="#000000"
              level="M"
              includeMargin={true}
              imageSettings={{
                src: "shortly_icon.png",
                x: undefined,
                y: undefined,
                height: 35,
                width: 30,
                excavate: true,
              }}
            />
            <div className="flex-column">
              <p className="scans m-0">
                {scans} {scans == 1 ? "scan" : "scans"}
              </p>
              <button
                className="download"
                onClick={() => {
                  const canvas = qrRef.current?.querySelector("canvas");
                  const image = canvas?.toDataURL();
                  const anchor = document.createElement("a");
                  anchor.download = `${backHalf}.png`;
                  anchor.href = image!;
                  document.body.appendChild(anchor);
                  anchor.click();
                  document.body.removeChild(anchor);
                }}
              >
                <i className="fa-sharp fa-solid fa-download"></i>
                Download PNG
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
