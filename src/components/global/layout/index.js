import React, { useEffect, useMemo, useState } from "react";
import "./style.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../sidebar";
import Header from "../header";
import permissionModel from "../../../models/permisstion.model";
import ApiClient from "../../../methods/api/apiClient";
import methodModel from "../../../methods/methods";
import environment from "../../../environment";
import { FcOvertime } from "react-icons/fc";
import { BsExclamationTriangle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { login_success } from "../../../Pages/actions/user";

import { memo } from "react";

const Layout = memo(function Layout({ children, customclass = false }) {
  const user = useSelector((state) => state.user);
  const history = useNavigate();
  const [isOpen, setIsopen] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (!user?.loggedIn) {
      history("/login");
    } else {
      let permissions = user?.roleDetail?.permissions?.[0];
      if (!permissionModel.urlAllow(permissions)) {
        // history("/profile")
      }
      let browseload = localStorage.getItem("browseload");
      if (!browseload) {
        ApiClient.get("user/profile", { id: user?._id }).then(async (res) => {
          if (res.success) {
            let data = {};
            if (res?.data?.role?._id == environment.adminRoleId) {
              data = {
                ...user,
                ...res.data,
                role: {
                  createdAt: res?.data?.role?.createdAt,
                  isDeleteAble: true,
                  isDeleted: false,
                  isEditable: true,
                  loginPortal: "front",
                  name: "Business",
                  permissions: res?.data?.role?.permissions,
                  status: "active",
                  updatedAt: res?.data?.role?.updatedAt,
                  __v: 0,
                  _id: environment.businessUserRoleId,
                },
              };
            } else {
              data = { ...user, ...res.data };
            }

            dispatch(login_success(data));
          }
        });
      }
    }
  }, []);

  const logo = () => {
    let value = "/assets/img/logo.svg";
    return value;
  };

  const logowhite = () => {
    let value = "/assets/img/logo.svg";
    return value;
  };

  const logos = () => {
    let value = "/assets/img/logo-small.png";
    return value;
  };

  const router = () => {
    let route = localStorage.getItem("route");
    history(route);
  };

  const [state, setstate] = useState(false);

  useEffect(() => {
    setstate(localStorage.getItem("sidebar"));
  }, [localStorage.getItem("sidebar")]);

  const verifyInvoice = () => {
    let value = false;
    let path = window.location.pathname;
    if (
      path === "/invoice/add" ||
      path === `/edit/invoice/${id}` ||
      path === `/generate/invoice/${id}`
    ) {
      value = true;
    }
    return value;
  };

  return (
    <>
      <div component="layout">
        <div onClick={(e) => router()} id="routerDiv"></div>
        <Header
          customclass={customclass}
          isOpen={isOpen}
          setIsOpen={setIsopen}
        />

        <div className={`main-wrapper flex ${isOpen ? "active-sidebar" : ""}`}>
          <div
            className={`${
              customclass ? "main-sidebarnew" : "main-sidebar"
            } scrollbar scrollbar-hide transition-[width] duration-300 bg-white border-r !z-[1]`}
          >
            <div className="sidebar-brand text-center px-3 py-6 flex items-center justify-center min-h-[70px] mb-0">
              <Link to="/" className="h-[22px]">
                <div className="editLogo">
                  <img
                    src={logowhite()}
                    className=" show-logo w-[190px]"
                  />
                  <img src={logos()} className="hide-logo" />
                </div>
              </Link>
            </div>
            {user?.logo ? (
              <div
                className="flex justify-center"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={methodModel.userImg(user?.logo || "")}
                  alt="photo"
                  width="40"
                  height="40"
                  style={{
                    width: "40px",
                    marginBottom: "2px",
                    height: "40px",
                    borderRadius: "50%",
                  }}
                />
              </div>
            ) : null}
            <Sidebar isOpen={isOpen} />
          </div>

          {/* <div className="main-sidebar  d-md-block">

            <div className="sidebar-brand p-3 pt-4  text-left pl-5">
              <label className='editLogo'>
                <img src={logo()} className="logocls show-logo" />
                <img src={logos()} className=" hide-logo" />
              </label>

            </div>
            <Sidebar />
          </div> */}
          <main className={`main ${isOpen && "main-2"}`}>
            <div
              className={`${
                verifyInvoice() ? "mainarea mainarea-new" : "mainarea "
              }`}
            >
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
});
export default Layout;
