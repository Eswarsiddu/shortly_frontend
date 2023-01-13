import { Link } from "react-router-dom";
import "../Styles/Form.css";

export function CreateNew() {
  return (
    <>
      <Link to="/dashboard" className="back">
        back to dashboard
      </Link>
      <form>
        <div className=""></div>
      </form>
    </>
  );
}
