import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Home,
  Info,
  List,
  FileText,
  Mail,
} from "lucide-react";

const PageLayout = ({ children }) => {
  const navigate = useNavigate()
  const user = null;
  // const user = { name: "Pardeep", image: "/avatar.png" };

  const menus = [
    { name: "Home", url: "/", icon: <Home className="w-4 h-4 mr-1" /> },
    { name: "Dashboard", url: "/dashboard", icon: <Mail className="w-4 h-4 mr-1" /> },
    { name: "Calculater", url: "/calculater", icon: <Info className="w-4 h-4 mr-1" /> },
    { name: "Profile", url: "/profile", icon: <List className="w-4 h-4 mr-1" /> },
  ];

  return (
    <>
      {/* HEADER */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-20">

            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img src="/favicon-32x32.png" alt="Logo" className="w-10 h-10" />
            </Link>

            {/* Center Menu */}
            <ul className="hidden md:flex items-center gap-8">
              {menus.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.url}
                    className={`flex items-center text-sm font-medium transition
                      ${window.location.pathname === item.url
                        ? "text-[#1E9ABC]"
                        : "text-gray-700 hover:text-[#1E9ABC]"}
                    `}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-3">
                  <img
                    src={user.image}
                    alt="User"
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <span className="text-sm font-semibold text-gray-800">
                    {user.name}
                  </span>
                </div>
              ) : (
                <>
                  <button
                    onClick={e => navigate("/login")}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition shadow-sm hover:shadow-md"
                  >
                    Login
                  </button>
                  <button
                    onClick={e => navigate("/login")}
                    className="w-full whitespace-nowrap bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition shadow-sm hover:shadow-md"
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>
          </nav>

          {/* Mobile Menu (STATIC STACKED) */}
          <div className="md:hidden pb-4">
            <ul className="flex flex-col gap-3">
              {menus.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.url}
                    className={`flex items-center text-sm font-medium
                      ${window.location.pathname === item.url
                        ? "text-[#1E9ABC]"
                        : "text-gray-700"}
                    `}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main>{children}</main>

      {/* FOOTER */}
      <footer className="bg-white py-12 border-t mt-20">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          © All rights reserved | Terms and conditions apply
        </div>
      </footer>
    </>
  );
};

export default PageLayout;
