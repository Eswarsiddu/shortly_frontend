import "../Styles/ResetMailSend.css"
export function ResetPasswordMailSend() {
  return (
    <div className="reset-mail-send flex-column">
      <h3>Recover Password</h3>
      <i className="fa-solid fa-envelope-open-text mail-send-icon"></i>
      <p>We have sent a password recovery instruction to your mail</p>
    </div>
  );
}
