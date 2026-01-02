import { Fragment, React, useEffect, useState } from "react";
import { Disclosure, Transition, Menu } from "@headlessui/react";
import styles from "./index.module.css";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  RiDiscountPercentFill,
  RiHome6Line,
  RiMoneyDollarCircleFill,
  RiShieldUserFill,
  RiUserSettingsFill,
} from "react-icons/ri";
import { TiArrowSortedDown } from "react-icons/ti";
import { TbUserShield } from "react-icons/tb";
import { TbUserCog } from "react-icons/tb";
import { RiUser6Line } from "react-icons/ri";
import { RiUserSettingsLine } from "react-icons/ri";
import { LuFilePenLine } from "react-icons/lu";
import { LuFileQuestion } from "react-icons/lu";
import {
  MdAnalytics,
  MdOutlineFeedback,
  MdOutlineGroups,
} from "react-icons/md";
import {
  FaFilePen,
  FaMoneyBills,
  FaMoneyBillTransfer,
  FaMoneyCheckDollar,
  FaUserGear,
} from "react-icons/fa6";
import environment from "../../../environment";
import ApiClient from "../../../methods/api/apiClient";
import { FiUsers } from "react-icons/fi";
import { LuLogOut, LuUser } from "react-icons/lu";
import { GoHome, GoLock } from "react-icons/go";
import { logout } from "../../../Pages/actions/user";
import methodModel from "../../../methods/methods";
import { IoArrowDownCircleSharp, IoHome, IoSettings } from "react-icons/io5";
import { RxDoubleArrowDown } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { TbCalendarClock } from "react-icons/tb";
import { GrUserSettings } from "react-icons/gr";
import { MdDisplaySettings } from "react-icons/md";
import { LuCalendarClock } from "react-icons/lu";
import { GiTakeMyMoney } from "react-icons/gi";
import {
  FaBell,
  FaCalendarDay,
  FaClipboardCheck,
  FaClipboardList,
  FaFile,
  FaListAlt,
  FaMoneyBillWaveAlt,
  FaMoneyCheck,
  FaPlaneDeparture,
  FaTools,
  FaUser,
  FaUserEdit,
  FaUsersCog,
  FaUserTie,
} from "react-icons/fa";
import { HiOutlineSwitchHorizontal, HiReceiptTax } from "react-icons/hi";
import { BiSolidBox, BiSolidCategory, BiSolidUserBadge } from "react-icons/bi";
import { FaCircle } from "react-icons/fa";
import { SiInfracost } from "react-icons/si";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Html = ({ ListItemLink, tabclass, isAllow, route, isOpen, user }) => {
  const [activeplan, setActiveplan] = useState();
  const dispatch = useDispatch();
  const history = useNavigate();
  const role = user?.customerRole?.name === "Group Leader";
  const getactivePlan = () => {
    let filter = {};
    if (user?.subRole?.id == environment.SubRolePartner) {
      filter = { id: user?.id || user?._id };
    } else {
      filter = {};
    }
    ApiClient.get("api/getMyPlan", filter).then((res) => {
      if (res.success) {
        setActiveplan(res?.data);
      }
    });
  };

  const location = useLocation();
  useEffect(() => {
    if (user?.customerRole?.name === "Group Leader") {
      getactivePlan();
    }
  }, []);

  const activecls = (tab) => {
    let url = window.location.href;
    let value = false;
    tab?.map((itm) => {
      if (url.includes(itm)) value = true;
    });
    return value;
  };

  const menus = [
    {
      name: "Dashboard",
      icon: <IoHome className="text-[#494949] text-[18px] min-w-[18px]" />,
      activeIcon: (
        <IoHome className="text-[#1E9ABC] text-[20px] min-w-[18px]" />
      ),
      url: "/dashboard",
      key: "readDashboard",
    },

    {
      name: "Project",
      icon: <FaFile className="text-[#494949] text-[18px] min-w-[18px]" />,
      activeIcon: (
        <FaFile className="text-[#1E9ABC] text-[20px] min-w-[18px]" />
      ),
      url: "/project",
      key: "readProject",
    },
    {
      name: "Jobs",
      icon: (
        <FaClipboardCheck className="text-[#494949] text-[18px] min-w-[18px]" />
      ),
      activeIcon: (
        <FaClipboardCheck className="text-[#1E9ABC] text-[20px] min-w-[18px]" />
      ),
      url: "/job",
      key: "readJob",
    },

    // {
    //   name: "Reviews",
    //   icon: (
    //     <MdOutlineFeedback className="text-[#494949] text-[18px] min-w-[18px]" />
    //   ),
    //   activeIcon: (
    //     <MdOutlineFeedback className="text-[#1E9ABC] text-[20px] min-w-[18px]" />
    //   ),
    //   url: "/review",
    //   key: user?.role?._id === environment.userRoleId ? "readReview" : "",
    // },

    {
      name: "Order Materials",
      icon: <FaFilePen className="text-[#494949] text-[18px] min-w-[18px]" />,
      activeIcon: (
        <FaFilePen className="text-[#1E9ABC] text-[20px] min-w-[18px]" />
      ),
      url: "/order",
      key: "readOrder",
    },
    {
      name: "Requested Materials",
      icon: (
        <LuFileQuestion className="text-[#494949] text-[18px] min-w-[18px]" />
      ),
      activeIcon: (
        <LuFileQuestion className="text-[#1E9ABC] text-[20px] min-w-[18px]" />
      ),
      url: "/request/materials",
      key: "readRequest",
    },
    {
      name: "Transactions",
      icon: (
        <HiOutlineSwitchHorizontal className="text-[#494949] text-[18px] min-w-[18px]" />
      ),
      activeIcon: (
        <HiOutlineSwitchHorizontal className="text-[#1E9ABC] text-[20px] min-w-[18px]" />
      ),
      url: "/transaction",
      key: "readTransaction",
    },
    {
      name: "Payslips",
      icon: (
        <FaMoneyCheck className="text-[#494949] text-[18px] min-w-[18px]" />
      ),
      activeIcon: (
        <FaMoneyCheck className="text-[#1E9ABC] text-[20px] min-w-[18px]" />
      ),
      url: "/payslip",
      key: "readPayslip",
    },
    {
      name: "Reports",
      icon: (
        <FaClipboardCheck className="text-[#494949] text-[18px] min-w-[18px]" />
      ),
      activeIcon: (
        <FaClipboardCheck className="text-[#1E9ABC] text-[20px] min-w-[18px]" />
      ),
      url: "/report",
      key: "readReport",
    },
    {
      name: "Working Weeks",
      icon: (
        <FaClipboardCheck className="text-[#494949] text-[18px] min-w-[18px]" />
      ),
      activeIcon: (
        <FaClipboardCheck className="text-[#1E9ABC] text-[20px] min-w-[18px]" />
      ),
      url: "/workingweek",
      key: "readWorkingweeks",
    },

    {
      name: "Dashboard",
      icon: <IoHome className="text-[#494949] text-[18px] min-w-[18px]" />,
      activeIcon: (
        <IoHome className="text-[#1E9ABC] text-[20px] min-w-[18px]" />
      ),
      url: "/dashboard/business",
      key: "readdashboard",
    },
    {
      name: "Company Statistics",
      icon: <MdAnalytics className="text-[#494949] text-[18px] min-w-[18px]" />,
      activeIcon: (
        <MdAnalytics className="text-[#1E9ABC] text-[20px] min-w-[18px]" />
      ),
      url: "/statistics",
      key: "readStatistics",
    },
    {
      name: "Admin Settings",
      icon: <FaListAlt className="text-[#494949] text-[18px] min-w-[18px]" />,
      activeIcon: (
        <FaListAlt className="text-[#494949] text-[18px] min-w-[18px]" />
      ),
      menu: [
        {
          name: "Roles and Permissions",
          icon: (
            <RiUserSettingsFill className="text-[#494949] text-[18px] min-w-[18px]" />
          ),
          activeIcon: (
            <RiUserSettingsFill className="text-[#1E9ABC] text-[20px] min-w-[18px]" />
          ),
          url: "/role",
          key: "readrolesandpermissions",
        },
        {
          name: "Staff",
          icon: <FaUser className="text-[#494949] text-[18px] min-w-[18px]" />,
          activeIcon: (
            <FaUser className="text-[#1E9ABC] text-[20px] min-w-[18px]" />
          ),
          url: "/user",
          key: "readstaff",
        },
        {
          name: "Skills",
          icon: (
            <FaUsersCog className="text-[#494949] text-[18px] min-w-[18px]" />
          ),
          activeIcon: (
            <FaUsersCog className="text-[#1E9ABC] text-[20px] min-w-[18px]" />
          ),
          url: "/skill",
          key: "readskills",
        },
        // {
        //   name: "Service",
        //   icon: <img src="/assets/img/dashboard.svg" alt="" />,
        //   activeIcon:  <img src="/assets/img/dashboard.svg" alt="" />,
        //   url: "/service",
        //   key: "readService",
        // },
      ],
    },

    {
      name: "Client",
      icon: (
        <RiShieldUserFill className="text-[#494949] text-[18px] min-w-[18px]" />
      ),
      activeIcon: (
        <RiShieldUserFill className="text-[#494949] text-[18px] min-w-[18px]" />
      ),
      menu: [
        {
          name: "Client",
          icon: (
            <RiShieldUserFill className="text-[#494949] text-[18px] min-w-[18px]" />
          ),
          activeIcon: (
            <RiShieldUserFill className="text-[#1E9ABC] text-[20px] min-w-[18px]" />
          ),
          url: "/customers",
          key: "readclient",
        },
        {
          name: "Project",
          icon: <FaFile className="text-[#494949] text-[18px] min-w-[18px]" />,
          activeIcon: (
            <FaFile className="text-[#1E9ABC] text-[20px] min-w-[18px]" />
          ),
          url: "/project/business",
          key: "readproject",
        },
        {
          name: "Reminder",
          icon: <FaBell className="text-[#494949] text-[18px] min-w-[18px]" />,
          activeIcon: (
            <FaBell className="text-[#1E9ABC] text-[20px] min-w-[18px]" />
          ),
          url: "/reminder",
          key: "readReminder",
        },

        {
          name: "Transactions",
          icon: (
            <HiOutlineSwitchHorizontal className="text-[#494949] text-[18px] min-w-[18px]" />
          ),
          activeIcon: (
            <HiOutlineSwitchHorizontal className="text-[#1E9ABC] text-[20px] min-w-[18px]" />
          ),
          url: "/transaction/business",
          key: "readtransaction",
        },
      ],
    },

    {
      name: "Financial",
      icon: (
        <FaMoneyCheck className="text-[#494949] text-[18px] min-w-[18px]" />
      ),
      activeIcon: (
        <FaMoneyCheck className="text-[#494949] text-[18px] min-w-[18px]" />
      ),
      menu: [
        {
          name: "Category",
          icon: (
            <BiSolidCategory className="text-[#494949] text-[18px] min-w-[18px]" />
          ),
          activeIcon: (
            <BiSolidCategory className="text-[#1E9ABC] text-[20px] min-w-[18px]" />
          ),
          url: "/category",
          key: "readCategory",
        },
        {
          name: "Current Expense",
          icon: (
            <FaMoneyBills className="text-[#494949] text-[18px] min-w-[18px]" />
          ),
          activeIcon: (
            <FaMoneyBills className="text-[#1E9ABC] text-[20px] min-w-[18px]" />
          ),
          url: "/spending",
          key: "readSpending",
        },
        {
          name: "Fixed Expense",
          icon: (
            <FaMoneyCheckDollar className="text-[#494949] text-[18px] min-w-[18px]" />
          ),
          activeIcon: (
            <FaMoneyCheckDollar className="text-[#1E9ABC] text-[20px] min-w-[18px]" />
          ),
          url: "/expense/log",
          key: "readOtherexp",
        },
        {
          name: "Invoices",
          icon: (
            <RiDiscountPercentFill className="text-[#494949] text-[18px] min-w-[18px]" />
          ),
          activeIcon: (
            <RiDiscountPercentFill className="text-[#494949] text-[18px] min-w-[18px]" />
          ),
          submenu: [
            {
              name: "Invoices",
              icon: (
                <RiDiscountPercentFill className="text-[#494949] text-[18px] min-w-[18px]" />
              ),
              activeIcon: (
                <RiDiscountPercentFill className="text-[#1E9ABC] text-[20px] min-w-[18px]" />
              ),
              url: "/invoice",
              key: "readinvoices",
            },
            {
              name: "Invoice Reports",
              icon: (
                <RiDiscountPercentFill className="text-[#494949] text-[18px] min-w-[18px]" />
              ),
              activeIcon: (
                <RiDiscountPercentFill className="text-[#1E9ABC] text-[20px] min-w-[18px]" />
              ),
              url: "/inv/reports",
              key: "readinvoices",
            },
          ],
        },
      ],
    },
    {
      name: "Supplier",
      icon: <FaUser className="text-[#494949] text-[18px] min-w-[18px]" />,
      activeIcon: (
        <FaUser className="text-[#494949] text-[18px] min-w-[18px]" />
      ),
      menu: [
        {
          name: "Materials",
          icon: (
            <FaListAlt className="text-[#494949] text-[18px] min-w-[18px]" />
          ),
          activeIcon: (
            <FaListAlt className="text-[#494949] text-[18px] min-w-[18px]" />
          ),
          submenu: [
            // {
            //   name: "Category",
            //   icon: <img src="/assets/img/usero.svg" alt="" />,
            //   activeIcon: <img src="/assets/img/dashboard.svg" alt="" />,
            //   url: "/category",
            //   key: "readcategory",
            // },
            {
              name: "Materials",
              icon: <img src="/assets/img/usero.svg" alt="" />,
              activeIcon: <img src="/assets/img/dashboard.svg" alt="" />,
              url: "/material",
              key: "readmaterials",
            },
            {
              name: "Order Materials",
              icon: (
                <img src="/assets/img/jobs.svg" className="w-[22px]" alt="" />
              ),
              activeIcon: (
                <img
                  src="/assets/img/jobs-blue.svg"
                  className="w-[22px]"
                  alt=""
                />
              ),
              url: "/order",
              key: "readBusinessOrder",
            },
          ],
        },
        {
          name: "Contractor",
          icon: (
            <BiSolidUserBadge className="text-[#494949] text-[18px] min-w-[18px]" />
          ),
          activeIcon: (
            <BiSolidUserBadge className="text-[#1E9ABC] text-[20px] min-w-[18px]" />
          ),
          url: "/contractor",
          key: "readcontractor",
        },
        {
          name: "Materials Supplier",
          icon: (
            <FaUserEdit className="text-[#494949] text-[18px] min-w-[18px]" />
          ),
          activeIcon: (
            <FaUserEdit className="text-[#1E9ABC] text-[20px] min-w-[18px]" />
          ),
          url: "/supplier",
          key: "readsuppliers",
        },
        {
          name: "Tools Supplier",
          icon: (
            <FaUserGear className="text-[#494949] text-[18px] min-w-[18px]" />
          ),
          activeIcon: (
            <FaUserGear className="text-[#1E9ABC] text-[20px] min-w-[18px]" />
          ),
          url: "/tools-supplier",
          key: "readsuppliers",
        },

        {
          name: "Accountants",
          icon: (
            <FaUserTie className="text-[#494949] text-[18px] min-w-[18px]" />
          ),
          activeIcon: (
            <FaUserTie className="text-[#1E9ABC] text-[20px] min-w-[18px]" />
          ),
          url: "/accountant",
          key: "readaccoutants",
        },
      ],
    },
    {
      name: "Cost to Company",
      icon: <SiInfracost className="text-[#494949] text-[18px] min-w-[18px]" />,
      activeIcon: (
        <SiInfracost className="text-[#1E9ABC] text-[20px] min-w-[18px]" />
      ),
      url: "/cost/register",
      key: "readCostResiter",
    },
    {
      name: "Estimates",
      icon: (
        <TbCalendarClock className="text-[#494949] text-[18px] min-w-[18px]" />
      ),
      activeIcon: (
        <TbCalendarClock className="text-[#494949] text-[18px] min-w-[18px]" />
      ),
      menu: [
        {
          name: "Job Configuration",
          icon: (
            <GrUserSettings className="text-[#494949] text-[18px] min-w-[18px]" />
          ),
          activeIcon: (
            <GrUserSettings className="text-[#1E9ABC] text-[20px] min-w-[18px]" />
          ),
          url: "/job/configuration",
          key: "readjobconfig",
        },
        {
          name: "Services",
          icon: (
            <MdDisplaySettings className="text-[#494949] text-[18px] min-w-[18px]" />
          ),
          activeIcon: (
            <MdDisplaySettings className="text-[#494949] text-[18px] min-w-[18px]" />
          ),
          url: "/service",
          key: "readService",
        },
        {
          name: "Estimates",
          icon: (
            <LuCalendarClock className="text-[#494949] text-[18px] min-w-[18px]" />
          ),
          activeIcon: (
            <LuCalendarClock className="text-[#1E9ABC] text-[20px] min-w-[18px]" />
          ),
          url: "/estimate",
          key: "readEstimate",
        },
      ],
    },

    {
      name: "Jobs",
      icon: (
        <FaClipboardCheck className="text-[#494949] text-[18px] min-w-[18px]" />
      ),
      activeIcon: (
        <FaClipboardCheck className="text-[#1E9ABC] text-[20px] min-w-[18px]" />
      ),
      url: "/job/business",
      key: "readjobs",
    },
    {
      name: "Tools",
      icon: <FaTools className="text-[#494949] text-[18px] min-w-[18px]" />,
      activeIcon: (
        <FaTools className="text-[#1E9ABC] text-[20px] min-w-[18px]" />
      ),
      url: "/tools",
      key: "readTool",
    },
    {
      name: "Settings",
      icon: <IoSettings className="text-[#494949] text-[18px] min-w-[18px]" />,
      activeIcon: (
        <IoSettings className="text-[#494949] text-[18px] min-w-[18px]" />
      ),
      menu: [
        {
          name: "CIS Tax",
          icon: (
            <HiReceiptTax className="text-[#494949] text-[18px] min-w-[18px]" />
          ),
          activeIcon: (
            <HiReceiptTax className="text-[#1E9ABC] text-[20px] min-w-[18px]" />
          ),
          url: "/cis",
          key: "readCISTax",
        },
        {
          name: "Travel Rates",
          icon: (
            <FaPlaneDeparture className="text-[#494949] text-[18px] min-w-[18px]" />
          ),
          activeIcon: (
            <FaPlaneDeparture className="text-[#1E9ABC] text-[20px] min-w-[18px]" />
          ),
          url: "/travel",
          key: "readtravelrates",
        },
        {
          name: "VAT",
          icon: (
            <BiSolidBox className="text-[#494949] text-[18px] min-w-[18px]" />
          ),
          activeIcon: (
            <BiSolidBox className="text-[#1E9ABC] text-[20px] min-w-[18px]" />
          ),
          url: "/vat",
          key: "readvat",
        },
        {
          name: "Company Details",
          icon: (
            <FaClipboardList className="text-[#494949] text-[18px] min-w-[18px]" />
          ),
          activeIcon: (
            <FaClipboardList className="text-[#1E9ABC] text-[20px] min-w-[18px]" />
          ),
          url: "/company",
          key: "readcompanydetails",
        },
      ],
    },

    {
      name: "Payables",
      icon: (
        <GiTakeMyMoney className="text-[#494949] text-[18px] min-w-[18px]" />
      ),
      activeIcon: (
        <GiTakeMyMoney className="text-[#494949] text-[18px] min-w-[18px]" />
      ),
      menu: [
        {
          name: "Payable to Contractor",
          icon: (
            <FaMoneyBillWaveAlt className="text-[#494949] text-[18px] min-w-[18px]" />
          ),
          activeIcon: (
            <FaMoneyBillWaveAlt className="text-[#1E9ABC] text-[20px] min-w-[18px]" />
          ),
          url: "/payable",
          key: "readpayabletocontractor",
        },
        {
          name: "Payslips",
          icon: (
            <FaMoneyCheck className="text-[#494949] text-[18px] min-w-[18px]" />
          ),
          activeIcon: (
            <FaMoneyCheck className="text-[#1E9ABC] text-[20px] min-w-[18px]" />
          ),
          url: "/payslip/business",
          key: "readpayslips",
        },
        {
          name: "Reports",
          icon: (
            <FaClipboardCheck className="text-[#494949] text-[18px] min-w-[18px]" />
          ),
          activeIcon: (
            <FaClipboardCheck className="text-[#1E9ABC] text-[20px] min-w-[18px]" />
          ),
          url: "/custom/report",
          key: "readreports",
        },
      ],
    },

    {
      name: "Scheduling",
      icon: (
        <FaCalendarDay className="text-[#494949] text-[18px] min-w-[18px]" />
      ),
      activeIcon: <FaCalendarDay className="text-[22px] text-[#1E9ABC]" />,
      menu: [
        {
          name: "Week Planner",
          icon: (
            <FaCalendarDay className="text-[#494949] text-[18px] min-w-[18px]" />
          ),
          activeIcon: (
            <FaCalendarDay className="text-[#1E9ABC] text-[20px] min-w-[18px]" />
          ),
          url: "/schedule",
          key: "readschedule",
        },
        {
          name: "Working Week",
          icon: (
            <FaClipboardCheck className="text-[#494949] text-[18px] min-w-[18px]" />
          ),
          activeIcon: (
            <FaClipboardCheck className="text-[#1E9ABC] text-[20px] min-w-[18px]" />
          ),
          url: "/working/week",
          key: "readschedule",
        },
      ],
    },
    // {
    //   name: "Scheduling",
    //   icon: <FaCalendarDay className="text-[#494949] text-[18px] min-w-[18px]" />,
    //   activeIcon: <FaCalendarDay className="text-[#1E9ABC] text-[20px] min-w-[18px]" />,
    //   url: "/schedule",
    //   key: "readschedule",
    // },
    // {
    //   name: "Reviews",
    //   icon: (
    //     <MdOutlineFeedback className="text-[#494949] text-[18px] min-w-[18px]" />
    //   ),
    //   activeIcon: (
    //     <MdOutlineFeedback className="text-[#1E9ABC] text-[20px] min-w-[18px]" />
    //   ),
    //   url: "/review",
    //   key: "readReview",
    // },

    {
      name: "Plan",
      icon: (
        <FaClipboardList className="text-[#494949] text-[18px] min-w-[18px]" />
      ),
      activeIcon: (
        <FaClipboardList className="text-[#1E9ABC] text-[20px] min-w-[18px]" />
      ),
      url: "/active/plan",
      key: "readPlans",
    },

    {
      name: "Billing",
      icon: (
        <FaMoneyBillTransfer className="text-[#494949] text-[18px] min-w-[18px]" />
      ),
      activeIcon: (
        <FaMoneyBillTransfer className="text-[#1E9ABC] text-[20px] min-w-[18px]" />
      ),
      url: "/subscriptions",
      key: "readsubscriptions",
    },
  ];

  const Logout = () => {
    dispatch(logout());
    localStorage.removeItem("persist:admin-app");
    localStorage.removeItem("token");
    history("/login");
  };

  const ClearFilter = () => {
    localStorage.removeItem("jobsFilter");
    localStorage.removeItem("staffFilter");
    localStorage.removeItem("skillsFilter");
    localStorage.removeItem("blogsFilter");
    localStorage.removeItem("contentFilter");
    localStorage.removeItem("customersFilter");
    localStorage.removeItem("projectsFilter");
    localStorage.removeItem("categorysFilter");
    localStorage.removeItem("materialsFilter");
    localStorage.removeItem("contractorsFilter");
    localStorage.removeItem("suppliersFilter");
    localStorage.removeItem("accsFilter");
    localStorage.removeItem("invoicesFilter");
    localStorage.removeItem("payablesFilter");
    localStorage.removeItem("datesFilter");
    localStorage.removeItem("reportsFilter");
    localStorage.removeItem("tab");
  };

  return (
    <>
      <div
        className={`sidebar-padding h-[90%] ${isOpen && styles.sm_sidebar}`}
        component="siderbar"
      >
        {/* <div className="flex items-center gapx-4 py-3  justify-center w-full  rounded-[5px] border bg-[#e9f0f9] relative  my-1 p-3 profile-hidden">
          <div className="flex items-center justify-center">
            <img
              alt="image"
              src={methodModel.userImg(user.image)}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div className="ml-2 text-left ">
              <b className="capitalize text-[14px]">{user.fullName}</b>
              <p className="grayCls mb-0 text-capitalize text-[12px]">
                {user.role?.name}
              </p>
            </div>
          </div>
          <Menu as="div" className=" ps-2 delete-drop">
            <div>
              <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md    py-1 text-sm font-semibold text-gray-900 ">
                <div className="flex items-center bg-white border p-3 rounded-[50px]">

                  <RxDoubleArrowDown className="text-[#5b6b79] text-[16px] " />

                </div>
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white w-full shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                        onClick={() => logout()}
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
        </div> */}
        <ul className="space-y-2">
          {menus.map((itm) => (
            <li key={itm.name}>
              {itm.icon ? (
                <>
                  {itm.menu
                    ? isAllow(itm.menu.map((itm) => itm.key).toString()) && (
                        <Disclosure
                          as="div"
                          defaultOpen={activecls([
                            ...(itm.menu?.map((itm) => itm.url) || []),
                            ...(itm.menu?.flatMap((item) =>
                              item?.submenu?.map((ptm) => ptm.url)
                            ) || []),
                          ])}
                        >
                          {({ open }) => (
                            <>
                              <tooltip placement="right" title={itm.name}>
                                <Disclosure.Button className="pl-6 py-3 px-4 w-full flex items-center justify-between gap-[12px] text-[#494949] hover:bg-[#f8f8f8] font-[600] transition-all duration-300 sidebar-drop">
                                  <span className="min_sidebar text-sm !flex items-center gap-[12px] sidebar-center">
                                    {open ||
                                    itm?.url == window?.location?.pathname
                                      ? itm.activeIcon
                                      : itm.icon}
                                    <span className="text-inherit leading-none w-full text-[12px]">
                                      {itm.name}
                                    </span>
                                  </span>
                                  <TiArrowSortedDown
                                    className={`${
                                      open ||
                                      itm?.url == window?.location?.pathname
                                        ? ""
                                        : "-rotate-90 transform"
                                    } h-3 w-3 transition-all duration-500`}
                                  />
                                </Disclosure.Button>
                              </tooltip>
                              <Transition
                                enter="transition duration-300 ease-in-out"
                                enterFrom="transform scale-95 opacity-0"
                                enterTo="transform scale-300 opacity-300"
                                leave="transition duration-300 ease-in-out"
                                leaveFrom="transform scale-300 opacity-300"
                                leaveTo="transform scale-95 opacity-0"
                              >
                                <Disclosure.Panel className="disclose_pannel mt-[4px] ml-4">
                                  <ul className="space-y-2">
                                    {itm.menu.map((sitm) => (
                                      <li key={sitm.name}>
                                        {sitm.icon ? (
                                          <>
                                            {sitm.submenu
                                              ? isAllow(
                                                  sitm.submenu
                                                    .map((itm) => itm.key)
                                                    .toString()
                                                ) && (
                                                  <Disclosure
                                                    as="div"
                                                    defaultOpen={activecls(
                                                      sitm.submenu.map(
                                                        (itm) => itm.url
                                                      )
                                                    )}
                                                  >
                                                    {({ open }) => (
                                                      <>
                                                        <tooltip
                                                          placement="right"
                                                          title={sitm.name}
                                                        >
                                                          <Disclosure.Button className="pl-6 py-3 px-4 w-full flex items-center justify-between gap-[12px] text-[#494949] hover:bg-[#0000000f] font-[600] transition-all duration-300 sidebar-drop">
                                                            <span className="text-sm flex items-center gap-[12px] sidebar-center">
                                                              {open ||
                                                              sitm?.url ==
                                                                window?.location
                                                                  ?.pathname
                                                                ? sitm.activeIcon
                                                                : sitm.icon}
                                                              <span className="text-inherit leading-none w-full text-[12px]">
                                                                {sitm.name}
                                                              </span>
                                                            </span>
                                                            <TiArrowSortedDown
                                                              className={`${
                                                                open ||
                                                                sitm?.url ==
                                                                  window
                                                                    ?.location
                                                                    ?.pathname
                                                                  ? ""
                                                                  : "-rotate-90 transform"
                                                              } h-3 w-3 transition-all duration-500`}
                                                            />
                                                          </Disclosure.Button>
                                                        </tooltip>
                                                        <Transition
                                                          enter="transition duration-300 ease-in-out"
                                                          enterFrom="transform scale-95 opacity-0"
                                                          enterTo="transform scale-300 opacity-300"
                                                          leave="transition duration-300 ease-in-out"
                                                          leaveFrom="transform scale-300 opacity-300"
                                                          leaveTo="transform scale-95 opacity-0"
                                                        >
                                                          <Disclosure.Panel className="mt-[4px]">
                                                            <ul className="space-y-2">
                                                              {sitm.submenu.map(
                                                                (kitm) =>
                                                                  isAllow(
                                                                    kitm.key
                                                                  ) && (
                                                                    <li
                                                                      key={
                                                                        kitm.name
                                                                      }
                                                                      className="px-4 center-set"
                                                                    >
                                                                      <NavLink
                                                                        to={
                                                                          kitm.url
                                                                        }
                                                                        onClick={(
                                                                          e
                                                                        ) =>
                                                                          ClearFilter()
                                                                        }
                                                                        className={(
                                                                          isActive
                                                                        ) =>
                                                                          `pl-6 py-3 px-4 w-full flex items-center justify-between gap-[12px] text-[#494949] hover:bg-[#0000000f] font-[600] transition-all duration-300 ${
                                                                            window?.location?.pathname.includes(
                                                                              kitm.url
                                                                            )
                                                                              ? "!text-[#1E9ABC]"
                                                                              : ""
                                                                          }`
                                                                        }
                                                                      >
                                                                        <div className="flex gap-[12px] items-center relative center-set-inner">
                                                                          <FaCircle className="text-[#B1B1B1] text-[10px]" />
                                                                          <span
                                                                            className="text-inherit leading-none w-full text-[12px] sidebar_text position-text position-text"
                                                                            title={
                                                                              kitm.name
                                                                            }
                                                                          >
                                                                            {
                                                                              kitm.name
                                                                            }
                                                                          </span>
                                                                        </div>
                                                                      </NavLink>
                                                                    </li>
                                                                  )
                                                              )}
                                                            </ul>
                                                          </Disclosure.Panel>
                                                        </Transition>
                                                      </>
                                                    )}
                                                  </Disclosure>
                                                )
                                              : isAllow(sitm.key) && (
                                                  <tooltip
                                                    placement="top"
                                                    color="#1E5DBC"
                                                    title={sitm.name}
                                                  >
                                                    <NavLink
                                                      to={sitm.url}
                                                      onClick={(e) =>
                                                        ClearFilter()
                                                      }
                                                      className={(isActive) =>
                                                        `pl-6 py-3 px-4 w-full flex items-center justify-between gap-[12px] text-[#494949] hover:bg-[#0000000f] font-[600] transition-all duration-300 ${
                                                          location?.pathname.includes(
                                                            sitm.url
                                                          )
                                                            ? "!text-[#1E9ABC]"
                                                            : ""
                                                        }`
                                                      }
                                                    >
                                                      <span className="text-sm rounded-md !flex items-center gap-[12px] sidebar-center">
                                                        {sitm.url ==
                                                        window?.location
                                                          ?.pathname
                                                          ? sitm.activeIcon
                                                          : sitm.icon}
                                                        <span className="text-inherit leading-none w-full text-[12px]">
                                                          {sitm.name}
                                                        </span>
                                                      </span>
                                                    </NavLink>
                                                  </tooltip>
                                                )}
                                          </>
                                        ) : (
                                          <h6 className="p-[12px] text-xs font-medium text-[#7E8B99] mt-[12px]">
                                            <span className="sidebar_text text-center">
                                              {sitm.name}
                                            </span>
                                          </h6>
                                        )}
                                      </li>
                                    ))}
                                  </ul>
                                </Disclosure.Panel>
                              </Transition>
                            </>
                          )}
                        </Disclosure>
                      )
                    : isAllow(itm.key) && (
                        <tooltip
                          placement="top"
                          color="#1E5DBC"
                          title={itm.name}
                        >
                          <NavLink
                            to={itm.url}
                            onClick={(e) => ClearFilter()}
                            className={(isActive) =>
                              `pl-6 py-3 px-4 m-0 flex gap-[12px] items-center relative text-sm text-[#494949] hover:bg-[#f8f8f8] font-[600] !no-underline transition-all relative ${
                                location?.pathname.includes(itm.url)
                                  ? "active_left !text-[#1E9ABC] text-white !font-medium"
                                  : ""
                              }`
                            }
                          >
                            {window?.location?.pathname == itm?.url
                              ? itm.activeIcon
                              : itm.icon}
                            <span className="text-inherit leading-none w-full text-[12px] sidebar_text">
                              {itm.name}
                            </span>
                          </NavLink>
                        </tooltip>
                      )}
                </>
              ) : (
                <h6 className="p-[12px] text-xs font-medium text-[#7E8B99] mt-[12px]">
                  <span className="sidebar_text text-center">{itm.name}</span>
                </h6>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Html;
