import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import Html from "./Html";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../Pages/actions/user";

import { memo } from "react";
import Swal from "sweetalert2";
import loader from "../../../methods/loader";

const Header = memo(function Header({
  setIsOpen,
  isOpen,
  customclass = false,
}) {
  const user = useSelector((state) => state.user);
  const toggle = () => {
    setIsOpen(!isOpen);
    localStorage.setItem("sidebar", !isOpen);
  };
  const [isOpen1, setIsOpen1] = useState(false);
  let messagecount = localStorage.getItem("unreadMessages") || 0;
  const [messageCount, setUnreadMessagesCount] = useState(messagecount);
  const history = useNavigate();
  const dispatch = useDispatch();

  const searchState = { data: "" };

  const Logout = () => {
    // Swal.fire({
    //   title: "Are you sure?",
    //   text: `Do you want to logout?`,
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonColor: "bg-gradient-to-r from-[#1E9ABC] to-[#073171]",
    //   cancelButtonColor: "#d33",
    //   confirmButtonText: "Yes",
    //   cancelButtonText: "No",
    // }).then((result) => {
    //   if (result.isConfirmed) {
    dispatch(logout());
    localStorage.removeItem("persist:admin-app");
    localStorage.removeItem("token");
    localStorage.removeItem("reportsFilter");
    history("/login");
    //   }
    // });
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
    // if (searchState.data) {
    //   dispatch(search_success(''))
    // }
  }, []);

  useEffect(() => {
    setSearch(searchState.data);
  }, [searchState]);

  const [search, setSearch] = useState("");

  const searchHandle = (e) => {
    e.preventDefault();
    // dispatch(search_success(search))
  };

  const searchChange = (e) => {
    setSearch(e);
    if (!e) {
      // dispatch(search_success(''))
    }
  };

  const clear = () => {
    setSearch("");
    // dispatch(search_success(''))
  };

  return (
    <Html
      isOpen={isOpen}
      toggle={toggle}
      searchHandle={searchHandle}
      search={search}
      user={user}
      searchChange={searchChange}
      isOpen1={isOpen1}
      clear={clear}
      Logout={Logout}
      messageCount={messageCount}
      customclass={customclass}
    />
  );
});

export default Header;
