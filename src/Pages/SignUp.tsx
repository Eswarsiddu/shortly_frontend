import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useFormik } from "formik";
import { signUpSchema } from "../Schemas/SignupSchema";
import "./Form.css";

interface SignUpValues {
  fullName: string;
  email: string;
  password: string;
  confirm_password: string;
}

export function SignUp() {
  const [passwordHide, setPasswordHide] = useState(true);
  const { register } = useAuth();
  const [emailError, setEmailError] = useState(false);
  const navigate = useNavigate();
  const initialValues: SignUpValues = {
    fullName: "",
    email: "",
    password: "",
    confirm_password: "",
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: signUpSchema,
      onSubmit: (values, _) => {
        console.log(values);
        Register(values.email, values.password);
      },
    });

  const Register = async (email: string, password: string) => {
    try {
      setEmailError(false);
      await register(email, password);
      navigate("/dashboard");
    } catch ({ code }) {
      console.log(code);
      setEmailError(true);
    }
  };
  return (
    <>
      <h3 className="heading">Sign up and start shortening</h3>
      <p className="redirect">
        Already have an account? <Link to="/login">Login</Link>
      </p>
      <form onSubmit={handleSubmit}>
        <div className="input-block">
          <div className="block">
            <label htmlFor="fullName">Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={values.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {errors.fullName && touched.fullName ? (
            <p className="form-error">{errors.fullName}</p>
          ) : null}
        </div>
        <div className="input-block">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {(errors.email && touched.email) || emailError ? (
            <p className="form-error">
              {emailError ? "Email already exists" : errors.email}
            </p>
          ) : null}
        </div>
        <div className="input-block">
          <div className="hide-block">
            <label htmlFor="password">Password</label>
            <p
              className="hideBtn"
              onClick={() => {
                setPasswordHide(!passwordHide);
              }}
            >
              <i className="fa-solid fa-eye"></i>
              <span>{passwordHide ? "show" : "hide"}</span>
            </p>
          </div>
          <input
            type={passwordHide ? "password" : "text"}
            name="password"
            id="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.password && touched.password ? (
            <p className="form-error">
              Password must contain at least 6 characters, including UPPER,
              lower, special character, number
            </p>
          ) : null}
        </div>
        {passwordHide && (
          <div className="input-block">
            <label htmlFor="password">Confirm Password</label>
            <input
              type="password"
              name="confirm_password"
              id="confirm_password"
              value={values.confirm_password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.confirm_password && touched.confirm_password ? (
              <p className="form-error">{errors.confirm_password}</p>
            ) : null}
          </div>
        )}
        <button className="submit-btn" type="submit">
          Sign Up
        </button>
      </form>

      <p className="footer">
        By signing in with an account, you agree to Shortly's
        <br />
        <Link to="/pages/terms" className="anchor" target="_blank">
          Terms of Services
        </Link>
        ,
        <Link to="/pages/privacy" className="anchor" target="_blank">
          Privacy Policy
        </Link>
        .
      </p>
    </>
  );
}
