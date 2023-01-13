import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useFormik } from "formik";
import { loginSchema } from "../Schemas/LoginSchema";

function Login() {
  const [passwordHide, setPasswordHide] = useState(true);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [serverError, setServerError] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
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
    } catch ({ code }: any) {
      if (code == "auth/wrong-password") setPasswordError(true);
      else if (code == "auth/user-not-found") setEmailError(true);
      else setServerError(true);
    }
  };

  return (
    <>
      <h3 className="heading">Login and start sharing</h3>
      <p className="redirect">
        don't have an account? <Link to="/signUp">Create one</Link>
      </p>
      <form className="flex-column align-center" onSubmit={handleSubmit}>
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
          {(errors.email && touched.email) ||
            (emailError && (
              <p className="form-error m-0">
                {emailError ? "Email not found" : errors.email}
              </p>
            ))}
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
          {passwordError && (
            <p className="form-error m-0">Incorrect password</p>
          )}
        </div>
        <Link to="/forgetPassword">Forget Password</Link>
        {serverError && (
          <p className="form-error m-0">Please try after some time</p>
        )}
        <button className="submit-btn" type="submit">
          Login
        </button>
      </form>
    </>
  );
}

export { Login };
