import { useContext } from "react";
import AppContext from "../AppContext";

const PageWelcome = () => {
  const { currentUser } = useContext(AppContext);
  return (
    <div>
      <h1>Online Shop</h1>
      <h2>Welcome</h2>
      <p>
        Current user is: <span>{currentUser.firstName}</span>{" "}
        <span>{currentUser.lastName}</span>
      </p>
    </div>
  );
};

export default PageWelcome;
