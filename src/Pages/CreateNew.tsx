import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { useAuth } from "../context/AuthContext";
import { CreateUrlSchema } from "../Schemas/CreateUrlSchema";
import "../Styles/Form.css";
import { createUrl } from "../utils/BackendRequests";
import { PAGE_URL } from "../utils/Utils";

export function CreateNew() {
  const [urlError, setUrlError] = useState(false);
  const [backHalfError, setBackHalfError] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        destinationUrl: "",
        backHalf: "",
        title: "",
      },
      validationSchema: CreateUrlSchema,
      onSubmit: async (values, _) => {
        setLoading(true);
        if (
          values.destinationUrl.includes(location.host) ||
          values.destinationUrl.includes(PAGE_URL)
        ) {
          setUrlError(true);
          setLoading(false);
          return;
        }
        setUrlError(false);
        try {
          await createUrl(values, currentUser!.uid);
          navigate("/dashboard");
        } catch (e) {
          if (e == "serverError") {
            setServerError(true);
          } else {
            setBackHalfError(true);
          }
          setLoading(false);
          return;
        }
      },
    });
  return (
    <>
      <Link to="/dashboard" className="back">
        <i className="fa-solid fa-caret-left"></i>
        Back to Dashboard
      </Link>
      <form onSubmit={handleSubmit} className="flex-column align-center">
        <div className="input-block flex-column">
          <div className="flex-column">
            <label htmlFor="destination-url">Destination Url</label>
            <input
              type="text"
              id="destination-url"
              name="destinationUrl"
              value={values.destinationUrl}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {((errors.destinationUrl && touched.destinationUrl) || urlError) && (
            <p className="form-error m-0">
              {urlError
                ? "This URL has already been shortened."
                : errors.destinationUrl}
            </p>
          )}
        </div>
        <div className="input-block flex-column">
          <div className="flex-column">
            <label htmlFor="backHalf">
              <span style={{ color: "rgb(0,0,0,0.4)" }}>{`${PAGE_URL}/`}</span>
              Back Half
            </label>
            <input
              type="text"
              id="backHalf"
              name="backHalf"
              value={values.backHalf}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {((errors.backHalf && touched.backHalf) || backHalfError) && (
              <p className="form-error m-0">
                {backHalfError
                  ? "This back half already exists. Please select new back half"
                  : errors.backHalf}
              </p>
            )}
          </div>
        </div>
        <div className="input-block flex-column">
          <div className="flex-column">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.title && touched.title && (
              <p className="form-error m-0">{errors.title}</p>
            )}
          </div>
        </div>
        {serverError && (
          <p className="form-error m-0">
            We are some issues with our server. Please try after some time
          </p>
        )}
        <button className="submit-btn" type="submit" disabled={loading}>
          {loading ? <PulseLoader color="#36d7b7" /> : "Short Url"}
        </button>
      </form>
    </>
  );
}
