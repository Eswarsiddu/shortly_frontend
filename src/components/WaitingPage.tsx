import { DotLoader, GridLoader, HashLoader, RingLoader } from "react-spinners";
import "../Styles/WaitingPage.css";

export function WaitingPage() {
  return (
    <div className="waiting-page">
      <RingLoader size={100} color="#c21ee7" />
      {/* <p>Please Wait</p> */}
    </div>
  );
}
