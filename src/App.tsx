import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Login } from "./Pages/Login";
import { SignUp } from "./Pages/SignUp";
import { Dashboard } from "./Pages/Dashboard";
import { NotFoundPage } from "./Pages/NotFoundPage";
import { ForgetPassword } from "./Pages/ForgetPassword";
import { ResetPassword } from "./Pages/ResetPassword";
import { NavBar } from "./components/NavBar";
import { Profile } from "./Pages/profile";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthenticatedRoute } from "./components/AuthenticatedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route element={<NavBar onlyTitle={true} />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/reset" element={<ResetPassword />} />
        </Route>
        <Route element={<NavBar />}>
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
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
