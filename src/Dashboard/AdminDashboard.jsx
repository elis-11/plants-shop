import { useEffect, useContext } from "react";
import AppContext from "../AppContext";
import { Link, NavLink, Routes, Route, Outlet } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupIcon from "@mui/icons-material/Group";
import DashboardIcon from "@mui/icons-material/Dashboard";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ReviewsIcon from "@mui/icons-material/Reviews";
import Customers from "./Customers";
import styles from "./AdminDashboard.module.css";

const AdminDashboard = () => {
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

  return (
    <div className={styles.account}>
      <nav>
        <ul>
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? styles.active : "")}
              to="dashboard"
            >
              <DashboardIcon fontSize="large" sx={{ m: 1 }} /> dashboard
            </NavLink>
          </li>

          <li>
            <NavLink
              className={(navData) => (navData.isActive ? styles.active : "")}
              to="customers"
            >
              <GroupIcon fontSize="large" sx={{ m: 1 }} /> customers
            </NavLink>
          </li>

          <li>
            <QueryStatsIcon fontSize="large" sx={{ m: 1 }} /> analytics
          </li>

          <li>
            <NavLink
              className={(navData) => (navData.isActive ? styles.active : "")}
              to="addproduct"
            >
              <CloudUploadIcon fontSize="large" sx={{ m: 1 }} /> add product
            </NavLink>
          </li>
          <li>
            <ReviewsIcon fontSize="large" sx={{ m: 1 }} /> reviews
          </li>

          <li>
            <SettingsIcon fontSize="large" sx={{ m: 1 }}></SettingsIcon>{" "}
            settings
          </li>
        </ul>
      </nav>

      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default AdminDashboard;

{
  /* {currentUserIsInGroup("admins") && (
            <li>
              <NavLink to="/admin">Admin</NavLink>
            </li>
          )} */
}

{
  /* <Customers></Customers> */
}
