import { useSearchParams } from "react-router-dom";
import { ResetPassword } from "./ResetPassword";
import { VerifyEmailAddress } from "./VerifyEmailAddress";

export function FirebaseActions() {
  const [params, _] = useSearchParams();
  const mode = params.get("mode");
  const oobCode = params.get("oobCode");
  if (mode == "verifyEmail") {
    return <VerifyEmailAddress oobCode={oobCode} />;
  }
  return <ResetPassword obbCode={oobCode} />;
}
