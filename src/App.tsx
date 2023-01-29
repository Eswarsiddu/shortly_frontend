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
      <Route element={<NavBar onlyTitle={true} />}>
        <Route
          path="/shortly_frontend/login"
          element={
            <AuthenticatedRoute>
              <Login />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/shortly_frontend/signUp"
          element={
            <AuthenticatedRoute>
              <SignUp />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/shortly_frontend/forgetPassword"
          element={<ForgetPassword />}
        />
        <Route
          path="/shortly_frontend/firebaseActions"
          element={<FirebaseActions />}
        />
        <Route
          path="/shortly_frontend/verificationsend"
          element={<VerificationSend />}
        />
        <Route
          path="/shortly_frontend/passwordrecoverysend"
          element={<ResetPasswordMailSend />}
        />
      </Route>
      <Route element={<NavBar />}>
        <Route path="/shortly_frontend/create" element={<CreateNew />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route
          path="/shortly_frontend/"
          element={
            <AuthenticatedRoute>
              <Home />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/shortly_frontend/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/shortly_frontend/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
