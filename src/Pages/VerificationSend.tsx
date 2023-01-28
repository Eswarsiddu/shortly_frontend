import "../Styles/VerificationSend.css"
export function VerificationSend() {
  return (
    <div className="verificatiom-mail-send flex-column align-center">
      <h3>Verify Your Account</h3>
      <i className="fa-solid fa-envelope-open-text mail-send-icon"></i>
      <p>
        Account activation link has been send to your registered email address
      </p>
      {/* <p>animation</p> */}
    </div>
  );
}
