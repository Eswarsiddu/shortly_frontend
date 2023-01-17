import * as Yup from "yup";
import { backHalfRegEx } from "../utils/Utils";
export const CreateUrlSchema = Yup.object({
  destinationUrl: Yup.string().url().required("please enter destination url"),
  backHalf: Yup.string()
    .matches(
      backHalfRegEx,
      "Back half must contain 5 - 30 characters, include only Uppercase, lowercase and numbers"
    )
    .required("please enter back Half"),
  title: Yup.string().min(3).max(20).required("please enter title"),
});
