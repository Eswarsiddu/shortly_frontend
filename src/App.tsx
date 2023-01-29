import "./Styles/App.css";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Login } from "./Pages/Login";
import { SignUp } from "./Pages/SignUp";
import { Dashboard } from "./Pages/Dashboard";
import { NotFoundPage } from "./Pages/NotFoundPage";
import { ForgetPassword } from "./Pages/ForgetPassword";
import { NavBar } from "./components/NavBar";
import { Profile } from "./Pages/Profile";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthenticatedRoute } from "./components/AuthenticatedRoute";
import { FirebaseActions } from "./Pages/FirebaseActions";
import { ToastContainer } from "react-toastify";
import { VerificationSend } from "./Pages/VerificationSend";
import { ResetPasswordMailSend } from "./Pages/ResetPasswordMailSend";
import { CreateNew } from "./Pages/CreateNew";

function App() {
  return (
    <Routes>
      {/* <Route path="/shortly_frontend"> */}
      <Route
        path="/shortly_frontend"
        element={
          <AuthenticatedRoute>
            <Home />
          </AuthenticatedRoute>
        }
      />
      <Route element={<NavBar onlyTitle={true} />}>
        <Route
          path="/login"
          element={
            <AuthenticatedRoute>
              <Login />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/signUp"
          element={
            <AuthenticatedRoute>
              <SignUp />
            </AuthenticatedRoute>
          }
        />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/firebaseActions" element={<FirebaseActions />} />
        <Route path="/verificationsend" element={<VerificationSend />} />
        <Route
          path="/passwordrecoverysend"
          element={<ResetPasswordMailSend />}
        />
      </Route>
      <Route element={<NavBar />}>
        <Route path="/create" element={<CreateNew />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route
          path="/"
          element={
            <AuthenticatedRoute>
              <Home />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Route>
      {/* </Route> */}
      <ToastContainer />
    </Routes>
  );
}

export default App;
