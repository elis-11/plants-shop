import React, { useContext, useEffect } from "react";
// import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { ImLeaf } from "react-icons/im";
import AppContext from "../AppContext";
import { NavLink } from "react-router-dom";
import Badge from "@mui/material/Badge";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import LogoutIcon from "@mui/icons-material/Logout";
import styles from "./MainNavbar.module.css";

// import AppContext from "../AppContext";

const theme = createTheme({
  palette: {
    primary: {
      main: "#777",
    },
    secondary: {
      main: "#b3f5b3",
    },
  },
});

const MainNavbar = () => {
  //setCurrentUser, currentUser, currentUserIsInGroup

  const context = useContext(AppContext);
  const { setCurrentUser, currentUser, currentUserIsInGroup } =
    useContext(AppContext);

  const numberOfItems = context.items.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.amount;
  }, 0);

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
    <div>
      <div className={styles.navbar}>
        <ThemeProvider theme={theme}>
          <div>
            <NavLink to="/">
              <div>
                <ImLeaf className={styles.icon}></ImLeaf>
                <span>Floral Garden</span>
              </div>
            </NavLink>
          </div>
          <div>
        
              <div className={styles.nav}>
        
              <NavLink to="/plants">
                <span>Products</span>
                </NavLink>

                <span>Blog</span>
                <NavLink to="/contact">
                  <span>Contact</span>
                </NavLink>
                <span>About us</span>
              </div>
         
          </div>
          <div>
            <NavLink to="/cart">
              <Badge badgeContent={numberOfItems} color="secondary">
                <ShoppingBagIcon fontSize="large" color="primary" />
              </Badge>
            </NavLink>
            <NavLink to="/myaccount">
            <PersonOutlineIcon
                  sx={{ m: 1 }}
                  fontSize="large"
                  color="primary"
                ></PersonOutlineIcon>

              {currentUser.login !== "anonymousUser"  && Object.keys(currentUser).length !== 0 && (
                <LogoutIcon fontSize="large" color="primary"
                  onClick={handle_logoutForm_logoutButton}
                ></LogoutIcon>
              )}

              
              
              
            </NavLink>
          </div>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default MainNavbar;
