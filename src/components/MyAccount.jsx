import { useEffect, useContext } from "react";
import AccountNavbar from "../layout/AccountNavbar";
import { Route, Routes, Navigate } from "react-router-dom";
import AppContext from "../AppContext";
import PageLogin from "../pages/PageLogin";
import { NavLink } from "react-router-dom";

import SettingsIcon from "@mui/icons-material/Settings";
import styles from "./MyAccount.module.css";

import MemberDashboard from "../Dashboard/MemberDashboard";
import AdminDashboard from "../Dashboard/AdminDashboard";

const MyAccount = () => {
  const { setCurrentUser, currentUser, currentUserIsInGroup } =
    useContext(AppContext);

  useEffect(() => {
    (async () => {
      const requestOptions = {
        method: "GET",
        credentials: "include",
      };
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/currentuser`,
        requestOptions
      );
      if (response.ok) {
        const _currentUser = await response.json();
        setCurrentUser((prev) => ({ ...prev, ..._currentUser }));
      }
    })();
  }, [setCurrentUser]);

  const handle_logoutForm_logoutButton = async (e) => {
    const requestOptions = {
      method: "GET",
      credentials: "include",
    };
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/logout`,
      requestOptions
    );
    if (response.ok) {
      const _currentUser = await response.json();
      setCurrentUser((prev) => ({ ...prev, ..._currentUser }));
    }
  };

  return (
    <div className="mein-conto">
      {currentUser.login === "anonymousUser" && <PageLogin></PageLogin>}
      {currentUserIsInGroup("loggedInUsers") &&
        currentUser.accessGroups.includes("members") && (
          <MemberDashboard></MemberDashboard>
        )}
      {currentUserIsInGroup("loggedInUsers") &&
        currentUser.accessGroups.includes("admins") && (
          <AdminDashboard></AdminDashboard>
        )}
    </div>
  );
};

export default MyAccount;
