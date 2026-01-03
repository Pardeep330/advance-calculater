import React, { Suspense, lazy } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useLoader } from "./context/LoaderContext";
import GlobalLoader from "./components/GlobalLoader/GlobalLoader";


function App() {
  const { loading } = useLoader();

  const routes = [
    { url: "/login", path: "Login" },
    { url: "/signup", path: "SignUp" },
    { url: "/otp", path: "Otp" },
    { url: "/forgot-password", path: "Passwords/ForgotPassword" },
    { url: "/reset-password", path: "Passwords/ResetPassword" },
    { url: "/change-password", path: "Passwords/ChangePassword" },
    { url: "/", path: "Home" },
    { url: "/about-us", path: "AboutUs" },
    { url: "/contactus", path: "ContactUs" },
    { url: "/plans", path: "Plans" },
    { url: "/privacy", path: "PrivacyPolicy" },
    { url: "/terms", path: "TermsAndConditions" },
    { url: "/dashboard", path: "Dashboard" },
    { url: "/profile", path: "Profile" },
    { url: "/edit/profile", path: "EditProfile" },
    { url: "/calculater", path: "Calculater" },
    { url: "/", element: <Navigate to="/" /> },
  ];

  return (
    <>
      <GlobalLoader show={loading} />
      <Suspense

      >
        <Router>
          <Routes>
            {routes.map((itm, index) => {
              const Element = itm.path
                ? lazy(() => import(`./Pages/${itm.path}`))
                : null;

              return (
                <Route
                  key={index}
                  path={itm.url}
                  element={itm.path ? <Element /> : itm.element}
                />
              );
            })}
          </Routes>
        </Router>
      </Suspense>


      <ToastContainer position="top-right" />
    </>
  );
}

export default App;
