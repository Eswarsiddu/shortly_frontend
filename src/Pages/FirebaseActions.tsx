import { useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ResetPassword } from "./ResetPassword";
import { ResetPasswordMailSend } from "./ResetPasswordMailSend";
import { VerifyEmailAddress } from "./VerifyEmailAddress";

export function FirebaseActions() {
  const [params, _] = useSearchParams();
  const { recoverEmail } = useAuth();
  const mode = params.get("mode");
  const oobCode = params.get("oobCode");
  if (mode == "recoverEmail") recoverEmail(oobCode!);
  return mode == "verifyEmail" ? (
    <VerifyEmailAddress oobCode={oobCode} />
  ) : mode == "recoverEmail" ? (
    <ResetPasswordMailSend />
  ) : (
    <ResetPassword obbCode={oobCode} />
  );
}
