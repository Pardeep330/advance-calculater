import React, { useState } from "react";
import { Link } from "react-router-dom";
import methodModel from "../../../methods/methods";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import Sidebar from "../sidebar";
import { FiMenu, FiX } from "react-icons/fi";
import { LuLogOut, LuUser } from "react-icons/lu";
import { RxDashboard } from "react-icons/rx";
import { IoSettingsOutline } from "react-icons/io5";
import { GoLock } from "react-icons/go";
import environment from "../../../environment";
import { FaUsers } from "react-icons/fa";
import Recommendationmodal from "../../../Pages/Recommendatio";
import { HiMenuAlt1 } from "react-icons/hi";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Html = ({
  isOpen,
  toggle,
  searchHandle,
  search,
  user,
  isOpen1,
  searchChange,
  clear,
  Logout,
  messageCount,
  customclass = false,
}) => {
  const [Recommendation, setRecommendation] = useState(false);
  const url = window.location.pathname;
  const result = url.split("/");

  const getReplacenames = () => {
    let name = "";
    const idPattern = /^[a-f0-9]{24}$/;
    const ignoreList = ["business"];
    if (result.includes("user")) {
      name = "Staff";
    } else if (result.includes("customers")) {
      name = "Client";
    } else if (result.includes("custom")) {
      name = "Report";
    } else if (result.includes("active")) {
      name = "active Plan";
    } else {
      const filteredResult = result.filter(
        (part) => !idPattern.test(part) && !ignoreList.includes(part)
      );
      name =
        methodModel.capitalizeFirstLetter(filteredResult[1] || "") +
        " " +
        methodModel.capitalizeFirstLetter(filteredResult[2] || "") +
        " " +
        methodModel.capitalizeFirstLetter(filteredResult[3] || "");
    }
    return methodModel.capitalizeFirstLetter(name);
  };

  return (
    <>
      <nav
        component="header"
        className={`${
          isOpen ? "min-sidebar w-[calc(100%_-_80px)]" : " header-width "
        } ${
          customclass ? "" : "z-10"
        } shadow-btn px-[15px] sm:px-[20px] py-1.5 bg-white fixed transition-[width] duration-300 ml-auto right-0 flex items-center border-b h-[70px] `}
      >
        <div id="logoutBtn" onClick={() => Logout()}></div>
        <button
          onClick={toggle}
          className="h-8 w-8 shrink-0 shadow-btn hover:shadow-none rounded-lg !text-[#1E9ABC]"
        >
          {!isOpen ? (
            <HiMenuAlt1 className="w-full h-full" />
          ) : (
            <FiX className="w-full h-full" />
          )}
        </button>
        <div
          className={`${
            isOpen ? "w-[calc(100%-80px)]" : ""
          } flex sm:hidden block items-start py-2 px-[15px] bg-[#fff] justify-between top-[70px] left-0 fixed w-[100%] shadow-sm right-0 ml-auto items-center`}
        >
          {user?.activePlan &&
          user?.role?._id == environment.businessUserRoleId ? (
            <>
              <div className="  flex items-center gap-2 w-full ">
                <button
                  className="bg-white justify-center md:leading-10 border rounded-full py-2 md:h-10 flex items-center text-[10px] whitespace-break shadow-btn px-3 hover:opacity-80 hover:bg-[#f6f6f6]  text-black w-full   "
                  onClick={(e) => setRecommendation(true)}
                >
                  Send Recommendation
                </button>
              </div>
              <div className="justify-center flex items-center gap-2 px-2 py-2 bg-[#fff] whitespace-break text-[10px] w-full">
                {/* <div className="bg-[#1E9ABC] !rounded-full p-2 rounded-full lg:block hidden ">
                  <FaUsers className="fill-[#fff] " />{" "}
                </div> */}
                <b className=" lg:text-[16px] md:text-[14px] text-[12px]">
                  Available Seats:
                </b>{" "}
                {user?.availableSeats}
              </div>
            </>
          ) : (
            ""
          )}
        </div>
        <div className="flex items-center lg:gap-4 gap-2 ml-auto flex-wrap justify-end">
          <div className="sm:flex hidden gap-2">
            {user?.activePlan &&
            user?.role?._id == environment.businessUserRoleId ? (
              <>
                <div className="  flex items-center gap-2 rounded-md  ">
                  <button
                    className="bg-white !rounded-full md:leading-10 md:h-10 flex items-center lg:text-[16px]  md:text-[14px] text-[11px] shadow-btn px-3 md:py-1 py-2 hover:opacity-80  text-black rounded-lg  "
                    onClick={(e) => setRecommendation(true)}
                  >
                    Send Recommendation
                  </button>
                </div>
                <div className="border  flex items-center gap-2 rounded-md px-2 py-1 bg-[#f7f7f7] lg:text-[16px] md:text-[14px] text-[12px]">
                  <div className="bg-[#1E9ABC] !rounded-full p-2 rounded-full lg:block hidden ">
                    <FaUsers className="fill-[#fff] " />{" "}
                  </div>
                  <b className=" lg:text-[16px] md:text-[14px] text-[12px]">
                    Available Seats:
                  </b>{" "}
                  {user?.availableSeats}
                </div>
              </>
            ) : (
              ""
            )}
          </div>
          <Menu as="div" className="relative h-fit">
            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 text-sm font-semibold text-gray-900">
              <div className="flex items-center">
                <div className="flex items-center">
                  <img
                    alt="image"
                    src={methodModel.userImg(user?.image)}
                    className="lg:h-9 lg:w-9 w-7 h-7 shrink-0 rounded-full object-cover "
                  />
                  <div className="ml-2 text-left">
                    <b className="capitalize lg:block hidden">
                      {user?.fullName}
                    </b>
                    <p className="grayCls mb-0 text-capitalize lg:block hidden">
                      {user?.role?.name}
                    </p>
                  </div>
                </div>
                <i
                  className="fa fa-angle-down top-1 relative h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
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
              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/profile"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm flex items-center gap-2"
                        )}
                      >
                        <LuUser /> Profile
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm flex align-center flex items-center gap-2"
                        )}
                      >
                        <RxDashboard /> Home
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/profile/change-password"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm flex items-center gap-2"
                        )}
                      >
                        <GoLock />
                        Change Password
                      </Link>
                    )}
                  </Menu.Item>

                  <Menu.Item className="divide-y-1 divide-gray-800 pt-1  mt-2">
                    <p className="border-t"></p>
                  </Menu.Item>

                  <Menu.Item className="">
                    {({ active }) => (
                      <span
                        onClick={() => Logout()}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block w-full px-4 py-2 text-left text-sm ancortag flex items-center gap-2 cursor-pointer"
                        )}
                      >
                        <LuLogOut /> Logout
                      </span>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
        {isOpen1 ? (
          <div className="w-100 mobi-dropdown">
            <Sidebar />
          </div>
        ) : (
          <></>
        )}
      </nav>
      {Recommendation ? (
        <Recommendationmodal
          setpayslip={setRecommendation}
          page={getReplacenames()}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Html;
