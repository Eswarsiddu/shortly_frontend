import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useFormik } from "formik";
import { loginSchema } from "../Schemas/LoginSchema";

interface LoginValues {
  email: string;
  password: string;
}

function Login() {
  const [passwordHide, setPasswordHide] = useState(true);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [serverError, setServerError] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const initialValues: LoginValues = {
    email: "",
    password: "",
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: loginSchema,
      onSubmit: (values, _) => {
        console.log(values);
        Login(values.email, values.password);
      },
    });

  const Login = async (email: string, password: string) => {
    setEmailError(false);
    setPasswordError(false);
    setServerError(false);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (e: any) {
      if (e.code == "auth/wrong-password") {
        setPasswordError(true);
      } else if (e.code == "auth/user-not-found") {
        setEmailError(true);
      } else {
        setServerError(true);
      }
      console.log(e.code);
    }
  };

  return (
    <>
      <h3 className="heading">Login and start sharing</h3>
      {/* <Link to="/forgetPassword">Forget password</Link> */}
      <p className="redirect">
        don't have an account? <Link to="/signUp">Create one</Link>
      </p>
      <form onSubmit={handleSubmit}>
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
              {emailError ? "Email not found" : errors.email}
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
          {passwordError ? (
            <p className="form-error">Incorrect password</p>
          ) : null}
        </div>
        {serverError && (
          <p className="form-error">Please try after some time</p>
        )}
        <button className="submit-btn" type="submit">
          Login
        </button>
      </form>
    </>
  );
}

export { Login };
