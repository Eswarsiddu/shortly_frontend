import { Link } from "react-router-dom";
import "./Home.css";
function Home() {
  return (
    <div className="intro">
      <p>The shorter,</p>
      <div className="browser-bar">
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
        <div className="url-block">
          <div className="security">
            <i className="fa-solid fa-lock"></i>
          </div>
          <p className="website-url-text">
            https://<span id="website-domain">shortly.com</span>/shots/
            <span>
              <i className="fa-solid fa-scissors"></i>
            </span>
            <span className="trailing-part">
              search?q=shorturlsxsrf=ALiCzsYypIJq7IVonUdFdRNBk5wfMA......
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
