import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useFormik } from "formik";
import { signUpSchema } from "../Schemas/SignupSchema";
import "../Styles/Form.css";
import { PulseLoader } from "react-spinners";

export function SignUp() {
  const [passwordHide, setPasswordHide] = useState(true);
  const { register } = useAuth();
  const [emailError, setEmailError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        fullName: "",
        email: "",
        password: "",
        confirm_password: "",
      },
      validationSchema: signUpSchema,
      onSubmit: (values, _) => {
        Register(values.email, values.password, values.fullName);
      },
    });

  const Register = async (
    email: string,
    password: string,
    fullName: string
  ) => {
    try {
      setLoading(true);
      setEmailError(false);
      await register(email, password, fullName);
      navigate("/dashboard");
    } catch ({ code }) {
      setEmailError(true);
      setLoading(false);
    }
  };
  return (
    <>
      <h3 className="heading">Sign up and start shortening</h3>
      <p className="redirect">
        Already have an account? <Link to="/login">Login</Link>
      </p>
      <form className="flex-column align-center" onSubmit={handleSubmit}>
        <div className="input-block flex-column">
          <div className="flex-column">
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
          {errors.fullName && touched.fullName && (
            <p className="form-error m-0">{errors.fullName}</p>
          )}
        </div>
        <div className="input-block flex-column">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {((errors.email && touched.email) || emailError) && (
            <p className="form-error m-0">
              {emailError ? "Email already exists" : errors.email}
            </p>
          )}
        </div>
        <div className="input-block flex-column">
          <div className="hide-block flex">
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
          {errors.password && touched.password && (
            <p className="form-error m-0">
              Password must contain at least 6 characters, including UPPER,
              lower, special character, number
            </p>
          )}
        </div>
        {passwordHide && (
          <div className="input-block flex-column">
            <label htmlFor="password">Confirm Password</label>
            <input
              type="password"
              name="confirm_password"
              id="confirm_password"
              value={values.confirm_password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.confirm_password && touched.confirm_password && (
              <p className="form-error m-0">{errors.confirm_password}</p>
            )}
          </div>
        )}
        <button className="submit-btn" type="submit" disabled={loading}>
          {loading ? <PulseLoader color="#36d7b7" /> : "Sign Up"}
        </button>
      </form>

      <p className="footer m-0">
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
