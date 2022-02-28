import { useState, useEffect } from "react";

const PageAdmin = () => {
  const [notYetApprovedUsers, setNotYetApprovedUsers] = useState([]);

  useEffect(() => {
    (async () => {
      loadNotYetApprovedUsers();
    })();
  }, []);

  const handle_approveUserButton = async (id) => {
    const requestOptions = {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    };
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/approveuser`,
      // "http://localhost:3335/approveuser",
      requestOptions
    );
    if (response.ok) {
      await response.json();
      loadNotYetApprovedUsers();
    }
  };

  const loadNotYetApprovedUsers = async () => {
    const requestOptions = {
      method: "GET",
      credentials: "include",
    };
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/notyetapprovedusers`,
      requestOptions
    );
    if (response.ok) {
      const data = await response.json();
      setNotYetApprovedUsers((prev) => [...data.users]);
    }
  };
  
  return (
    <div className="panel">
      <h3>Admin Section:</h3>
      <h4>{notYetApprovedUsers.length} Users to Approve:</h4>
      <table className="minimalistBlack">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Confirm</th>
          </tr>
        </thead>
        <tbody>
          {notYetApprovedUsers.map((user, index) => {
            return (
              <tr key={index}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>
                  <button onClick={() => handle_approveUserButton(user._id)}>
                    Approve
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default PageAdmin;
