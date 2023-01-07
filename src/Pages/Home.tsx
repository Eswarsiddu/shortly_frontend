import { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
function Home() {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  return (
    <div className="intro">
      {/*
      //TODO: remove after designing
      */}
      <p id="intro-pos">
        <button
          onClick={() => {
            setHeight(document.querySelector(".intro")!.clientWidth);
            setWidth(document.querySelector(".intro")!.clientHeight);
          }}
        >
          getSize
        </button>
        <br />
        w:{height}
        <br />
        h:{width}
      </p>
      <p>The shorter,</p>
      <div className="browser-bar">
        <div className="controls">
          <div className="control-buttons">
            <div className="close"></div>
            <div className="minimize"></div>
            <div className="maximize"></div>
          </div>
          <div className="redo-undo">
            <i className="fa-solid fa-chevron-left"></i>
            <i className="fa-solid fa-chevron-right"></i>
          </div>
          <div className="favorites">
            <i className="fa-regular fa-star"></i>
          </div>
        </div>
        <div className="url-block">
          <div className="security">
            <i className="fa-solid fa-lock"></i>
          </div>
          <p className="website-url-text">
            https://
            <span id="website-domain">{location.host}</span>
            /shots/
            <span>
              <i className="fa-solid fa-scissors"></i>
            </span>
            <span className="trailing-part">
              search?q=shorturlsxsrf=ALiCzsYypIJq7IVonUdFdR......
            </span>
          </p>
        </div>
      </div>
      <p>the better</p>
      <Link className="get-started" to="/signUp">
        Get started
      </Link>
    </div>
  );
}

export { Home };
