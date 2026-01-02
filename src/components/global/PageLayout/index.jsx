import React, { useEffect, useState, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu, Transition } from "@headlessui/react";
import {
  Facebook,
  Twitter,
  Github,
  Dribbble,
  Users,
  Home,
  List,
  FileText,
  User,
  LayoutDashboard,
  Info,
  Settings,
  LogOut,
  Mail,
} from "lucide-react";

// import "./style.scss";
// import environment from "../../../environment";
import Modal from "../../common/Modal";
// import methodModel from "../../../methods/methods";
// import ApiClient from "../../../methods/api/apiClient";

const PageLayout = ({ children }) => {
  // const user = useSelector((state) => state.user);
  const [isLoginModal, setIsLoginModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const history = useNavigate();

  const menus = [
    { name: "Home", url: "/", icon: <Home className="lg:hidden w-5 h-5 mr-2" /> },
    { name: "About Us", url: "/about-us", icon: <Info className="lg:hidden w-5 h-5 mr-2" /> },
    { name: "Plans", url: "/plans", icon: <List className="lg:hidden w-5 h-5 mr-2" /> },
    { name: "Blog", url: "/blogs", icon: <FileText className="lg:hidden w-5 h-5 mr-2" /> },
    { name: "Contact Us", url: "/contactus", icon: <Mail className="lg:hidden w-5 h-5 mr-2" /> },
  ];

  // useEffect(() => {
  //   if (user?.loggedIn) {
  //     const browseload = localStorage.getItem("browseload");
  //     if (!browseload) {
  //       // ApiClient.get("user/profile", { id: user?._id }).then((res) => {
  //       //   if (res.success) {
  //       //     // Update user profile if needed
  //       //   }
  //       // });
  //     }
  //   }
  // }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    history("/login");
  };

  const handleNavigation = (path) => history(path);

  const handleJobNavigation = () => {
    // if (!user?.loggedIn) return setIsLoginModal(true);

    history("/job");
  };

  const handlePricingNavigation = () => {
    history("/plans");
  };

  const renderUserMenu = (isMobile = false) => (
    <div className={isMobile ? "flex flex-col mt-4" : ""}>
      <Link onClick={() => handleNavigation("/profile")} className="flex items-center py-2 px-3 hover:text-[#1E9ABC]">
        <User className="w-5 h-5 mr-2" /> Profile
      </Link>
      <Link
        onClick={() =>
          handleNavigation("/dashboard")
        }
        className="flex items-center py-2 px-3 hover:text-[#1E9ABC]"
      >
        <LayoutDashboard className="w-5 h-5 mr-2" /> Dashboard
      </Link>
      <Link onClick={() => handleNavigation("/profile/change-password")} className="flex items-center py-2 px-3 hover:text-[#1E9ABC]">
        <Settings className="w-5 h-5 mr-2" /> Change Password
      </Link>
      <button onClick={handleLogout} className="flex items-center py-2 px-3 text-red-600 hover:text-red-800">
        <LogOut className="w-5 h-5 mr-2" /> Logout
      </button>
    </div>
  );

  return (
    <>
      <header className="bg-white fixed w-full z-50 shadow-md">
        <nav className="flex justify-between items-center px-4 lg:px-6 py-4">
          <Link to="/" className="flex items-center">
            <img src="/favicon-32x32.png" alt="Calculator Logo" className="w-12 h-12" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-4">


            {/* {user?.loggedIn ? (
              <Menu as="div" className="relative">
                <Menu.Button className="flex items-center gap-2 text-gray-900">
                  <img
                    src={(user?.image)}
                    alt="user"
                    className="h-9 w-9 rounded-full object-cover"
                  />
                  <div className="text-left capitalize">
                    <b>{user?.fullName}</b>
                    <p className="text-gray-500">{user?.role?.name}</p>
                  </div>
                  <i className="fa fa-angle-down text-gray-400"></i>
                </Menu.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">{renderUserMenu()}</div>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : ( */}
              <Link
                to="/login"
                className="bg-gradient-to-r from-[#1E9ABC] to-[#073171] text-white font-medium px-4 py-2 rounded-md"
              >
                Get Started
              </Link>
            {/* )} */}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 rounded bg-gray-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d={
                  mobileMenuOpen
                    ? "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    : "M3 5h14M3 10h14M3 15h14"
                }
                clipRule="evenodd"
              />
            </svg>
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white w-full px-4 py-4 flex flex-col gap-2">
            { renderUserMenu(true)}
            <ul className="flex flex-col gap-2">
              {menus.map((menu) => (
                <li key={menu.name}>
                  <Link
                    to={menu.url}
                    className={`flex items-center py-2 px-3 rounded hover:text-[#1E9ABC] ${window.location.pathname === menu.url ? "text-[#1E9ABC]" : "text-gray-900"
                      }`}
                  >
                    {menu.icon} {menu.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      <main className="">{children}</main>

      {/* Footer */}
      <footer className="bg-white py-14">
        <div className="container px-5 mx-auto">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 lg:col-span-4 mb-4 lg:mb-0">
              <img src="/favicon-32x32.png" alt="Calculator Logo" className="w-12 h-12 mb-5"  />
              <p className="text-sm max-w-[300px]">Builder management aims to control the quality of a project's scope, time, and cost.</p>
              <ul className="flex gap-3 mt-5">
                {[Facebook, Dribbble, Github, Twitter].map((Icon, idx) => (
                  <li key={idx} className="w-9 h-9 flex items-center justify-center rounded-full text-center cursor-pointer text-[#1B2D16] hover:text-[#1E9ABC]">
                    <Icon className="w-5 h-5" />
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer Links */}
            <div className="col-span-12 lg:col-span-8 grid grid-cols-12 gap-x-5 gap-y-10">
              {[
                {
                  title: "Company",
                  links: [
                    { name: "About Us", path: "/about-us" },
                    { name: "Contact Us", path: "/contactus" },
                  ],
                },
                {
                  title: "Product",
                  links: [
                    { name: "Jobs", action: handleJobNavigation },
                    { name: "Plans", action: handlePricingNavigation },
                  ],
                },
                {
                  title: "Legal",
                  links: [
                    { name: "Privacy Policies", path: "/privacy" },
                    { name: "Terms & Conditions", path: "/terms" },
                  ],
                },
              ].map((section, idx) => (
                <div key={idx} className="col-span-12 md:col-span-4 sm:col-span-6">
                  <h2 className="text-[#1E9ABC] font-bold text-lg mb-6">{section.title}</h2>
                  <ul>
                    {section.links.map((link, i) => (
                      <li key={i} onClick={() => (link.action ? link.action() : history(link.path))} className="text-[#1B2D16] cursor-pointer mb-2 hover:text-[#1E9ABC]">
                        {link.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="text-[#161C2D] text-sm text-center border-t border-[#000] pt-8 mt-8">
            © All rights reserved | Terms and conditions apply
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {isLoginModal && (
        <Modal
          className="max-w-xl flex items-center justify-center h-full"
          body={
            <div className="px-5 py-5 text-center">
              <img src="/assets/img/plan-purchase.svg" className="my-6 mx-auto w-20" alt="Login Required" />
              <p className="text-lg font-semibold text-gray-700 mb-2">You must log in to your account.</p>
              <p className="text-gray-500 mb-4">
                Don’t have an account?{" "}
                <span onClick={() => { setIsLoginModal(false); history("/signup"); }} className="text-primary hover:underline cursor-pointer">Sign up</span>
              </p>
              <button onClick={() => { setIsLoginModal(false); history("/login"); }} className="bg-[#1E9ABC] text-white px-6 py-3 rounded-full shadow-md hover:opacity-80 transition duration-300">
                Ok
              </button>
            </div>
          }
          result={() => setIsLoginModal(false)}
        />
      )}
    </>
  );
};

export default PageLayout;
