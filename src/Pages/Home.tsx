import { Link } from "react-router-dom";
import "../Styles/Home.css";
export function Home() {
  return (
    <div className="intro flex-column">
      <p className="m-0">The shorter,</p>
      <div className="browser-bar flex-column">
        <div className="controls flex">
          <div className="control-buttons flex">
            <div className="close"></div>
            <div className="minimize"></div>
            <div className="maximize"></div>
          </div>
          <div className="redo-undo ">
            <i className="fa-solid fa-chevron-left"></i>
            <i className="fa-solid fa-chevron-right"></i>
          </div>
          <div className="favorites">
            <i className="fa-regular fa-star"></i>
          </div>
        </div>
        <div className="url-block flex">
          <div className="security">
            <i className="fa-solid fa-lock"></i>
          </div>
          <p className="website-url-text m-0">
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
      <p className="m-0">the better</p>
      <Link className="get-started" to="/signUp">
        Get started
      </Link>
    </div>
  );
}
