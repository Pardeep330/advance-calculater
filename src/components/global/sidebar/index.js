import React, { useEffect, useState } from "react";
import "./style.scss";
import { Link, useNavigate } from "react-router-dom";
import Html from "./Html";
import environment from "../../../environment";
import { useDispatch, useSelector } from "react-redux";
import ApiClient from "../../../methods/api/apiClient";
import { featuresSuccess } from "../../../Pages/actions/features";

const Sidebar = ({ isOpen }) => {
  const user = useSelector((state) => state.user);
  const history = useNavigate();
  const dispatch = useDispatch();
  const [role, setRole] = useState(user?.customerRole);
  const features = useSelector((state) => state.features);
  const allFeatures = {
    readPlans: true,
    readReview: true,
    readjobconfig: true,
    readCostResiter: true,
    readEstimate: true,
    readOtherexp: true,
    readStatistics: true,
    readsubscriptions: true,
    readService: true,
    readReminder: true,
    readTool: true,
    readdashboard: true,
    readrolesandpermissions: true,
    readstaff: true,
    readskills: true,
    readclient: true,
    readproject: true,
    readtransaction: true,
    readCategory: true,
    readSpending: true,
    readmaterials: true,
    readcontractor: true,
    readsuppliers: true,
    readaccoutants: true,
    readjobs: true,
    readinvoices: true,
    readCISTax: true,
    readtravelrates: true,
    readvat: true,
    readcompanydetails: true,
    readpayabletocontractor: true,
    readpayslips: true,
    readschedule: true,
    readreports: true,
    readBusinessOrder: true,
  };
  const AccountantPermission = [
    {
      readinvoices: true,
      readDashboard: true,
    },
  ];
  const menus = {
    user: ["roles", "users"],
    catalogue: ["types", "categories", "category/"],
    plan: ["features", "plans"],
    api: ["bookingSystem", "pos", "reviews", "accountingSystem"],
    geo: ["continents", "countries", "regions", "cities"],
    dynamicPricing: ["dynamicprice"],
    skills: ["skills", "skill-roles"],
  };

  const supplierPermissions = [{ readDashboard: true, readRequest: true }];
  const clintPermissions = [
    {
      readJob: true,
      readProject: true,
      readDashboard: true,
      readTransaction: true,
      readReview: true,
    },
  ];
  const contractorPermissions = [
    {
      readJob: true,
      readPayslip: true,
      readDashboard: true,
      readReport: true,
      readOrder: true,
      readCostResiter: true,
      readWorkingweeks: true,
    },
  ];
  const ListItemLink = ({ to, type = "link", disabled = false, ...rest }) => {
    let url = window.location.href;
    const host = window.location.host;
    url = url.split(host)[1];
    return (
      <>
        {type == "link" ? (
          <li
            className={`nav-item ${url.includes(to) ? "active" : ""} ${
              disabled ? "disabled" : ""
            }`}
          >
            {/* {...rest} */}
            <Link to={to} {...rest} className="" />
          </li>
        ) : (
          <li
            className={`nav-item main ${url.includes(to) ? "active" : ""}`}
            {...rest}
          ></li>
        )}
      </>
    );
  };

  const tabclass = (tab) => {
    let url = window.location.href;
    let value = false;
    menus[tab]?.map((itm) => {
      if (url.includes(itm)) value = true;
    });
    return value;
  };

  const getallFeatures = () => {
    ApiClient.get(`subscription/active/subscription?user_id=${user?._id}`).then(
      (res) => {
        if (res.success) {
          const activePlan = res?.data?.subscription_plan_id?.features.map(
            (itm) => itm?.slug
          );
          let featurePermissions = {};
          activePlan?.forEach((slug) => {
            featurePermissions[`read${slug.charAt(0) + slug.slice(1)}`] = true;
          });
          dispatch(featuresSuccess(featurePermissions));
        }
      }
    );
  };

  const isAllow = (url = "") => {
    let permissions = "";
    if (user?.role?._id == environment.businessUserRoleId) {
      permissions = allFeatures;
    } else if (user?.role?._id == environment.accountantRoleId) {
      permissions = AccountantPermission?.[0];
    } else if (user?.role?._id == environment.contractorRoleId) {
      permissions = contractorPermissions?.[0];
    } else if (user?.role?._id == environment.userRoleId) {
      permissions = clintPermissions?.[0];
    } else if (user?.role?._id == environment.supplierRoleId) {
      permissions = supplierPermissions?.[0];
    } else {
      permissions = user?.role?.permissions?.[0];
    }
    let arr = url.split(",");
    let value = false;
    arr.map((itm) => {
      if (permissions?.[itm]) value = permissions?.[itm];
    });
    return value;
  };

  const route = (p) => {
    history(p);
  };

  return (
    <>
      <Html
        user={user}
        route={route}
        tabclass={tabclass}
        isAllow={isAllow}
        ListItemLink={ListItemLink}
        isOpen={isOpen}
      />
    </>
  );
};

export default Sidebar;
