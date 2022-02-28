import React, { useEffect, useState } from "react";
import styles from "./Customers.module.css";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Customers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    allUser();
  }, []);

  const allUser = async () => {
    const requestOptions = {
      method: "GET",
      credentials: "include",
    };

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/users`,
      requestOptions
    );

    if (response.ok) {
      const users = await response.json();
      setUsers(users);
    }
  };

  const handle_deleteuser = async (_id) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/deleteuser`,
      {
        method: "delete",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id }),
      }
    );
    if (response.ok) {
      allUser();
    }
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th></th>
          <th>username</th>
          <th>first name</th>
          <th>last name</th>
          <th>email</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, _id) => {
          if (user.login !== "anonymousUser" && user.login !== "newadmin") {
            return (
              <tr key={_id}>
                <td>
                  <img src={`/images/users/${user.photo}`} alt="" />
                </td>
                <td>{user.login}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>
                  <DeleteIcon
                    onClick={() => handle_deleteuser(user._id)}
                  ></DeleteIcon>
                </td>
              </tr>
            );
          }
        })}
      </tbody>
    </table>
  );
}
