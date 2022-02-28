import styles from "./MemberDashboard.module.css";
import { useEffect, useContext } from "react";
import AppContext from "../AppContext";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SettingsIcon from "@mui/icons-material/Settings";




import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const MemberDashboard = () => {
  const { setCurrentUser, currentUser } =
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
            <PersonOutlineIcon fontSize="large" sx={{ m: 2 }} /> User info
          </li>

       
            {/* <li>
              <GroupIcon fontSize="large" sx={{ m: 2 }} /> Customers
            </li> */}
         

          <li>
            <FavoriteBorderIcon fontSize="large" sx={{ m: 2 }} /> favorites
          </li>
          <li>
            <ShoppingCartIcon fontSize="large" sx={{ m: 2 }} /> order history
          </li>
          <li>
            <SettingsIcon fontSize="large" sx={{ m: 2 }}></SettingsIcon>{" "}
            settings
          </li>
        </ul>
      </nav>

      <div>
        <div className={styles.userphoto}>
          <img src={`/images/users/${currentUser.photo}`} alt="cant load"></img>
          <div>
            {currentUser.firstName} {currentUser.lastName}
          </div>
          {/* <CameraAltIcon  ></CameraAltIcon> */}
        </div>

        <div className={styles.userinformation}>
          <div>
            <div>
              <label htmlFor="signupFormField_firstName">First Name</label>
              <input
                type="text"
                id="signupFormField_firstName"
                value={currentUser.firstName}
                readOnly
              />
            </div>

            <div>
              <label htmlFor="signupFormField_firstName">Last Name</label>
              <input
                type="text"
                id="signupFormField_firstName"
                value={currentUser.lastName}
                readOnly
              />
            </div>
          </div>

          <div>
            <div>
              <label htmlFor="signupFormField_firstName">Email Addresse</label>
              <input
                type="text"
                id="signupFormField_firstName"
                value={currentUser.email}
                readOnly
              />
            </div>

            <div>
              <label htmlFor="signupFormField_firstName">Phone Number</label>
              <input
                type="text"
                id="signupFormField_firstName"
                readOnly
                // value={}
                // onChange={}
              />
            </div>
          </div>

          <div>
            <div>
              <label htmlFor="signupFormField_firstName">Location</label>
              <input
                type="text"
                id="signupFormField_firstName"
                readOnly
                // value={}
                // onChange={}
              />
            </div>

            <div>
              <label htmlFor="signupFormField_firstName">Postal Code</label>
              <input
                type="text"
                id="signupFormField_firstName"
                // value={}
                // onChange={}
              />
          
            </div>
         
          </div>
          <button>Save changes</button> 
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;


