import { useSearchParams } from "react-router-dom";
import { ResetPassword } from "./ResetPassword";
import { VerifyEmailAddress } from "./VerifyEmailAddress";

export function FirebaseActions() {
  const [params, _] = useSearchParams();
  const mode = params.get("mode");
  const oobCode = params.get("oobCode");
  return mode == "verifyEmail" ? (
    <VerifyEmailAddress oobCode={oobCode} />
  ) : (
    <ResetPassword obbCode={oobCode} />
  );
}
