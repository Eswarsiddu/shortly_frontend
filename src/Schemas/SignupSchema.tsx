import * as Yup from "yup";
import { regEx } from "../utils/Utils";

export const signUpSchema = Yup.object({
  fullName: Yup.string().min(2).max(25).required("Please enter your name"),
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().matches(regEx).required("Please enter your password"),
  confirm_password: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Password must match"),
});
