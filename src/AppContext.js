import { createContext, useState, useReducer } from "react";

let initialState = {
  items: [],
  totalPrice: 0,
};

const savedCartState = localStorage.getItem("updatedCartState");
if (savedCartState !== null) {
  initialState = JSON.parse(savedCartState);
}
// console.log(savedCartState);
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    // console.log(action);
    const updatedTotalPrice =
      state.totalPrice + action.item.price * action.item.amount;

    const index = state.items.findIndex((item) => item._id === action.item._id);
    const existingItem = state.items[index];
    let updatedItems;

    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount + action.item.amount,
      };

      updatedItems = [...state.items];

      updatedItems[index] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    const updatedCartState = {
      items: updatedItems,
      totalPrice: updatedTotalPrice,
    };
    localStorage.setItem("updatedCartState", JSON.stringify(updatedCartState));
    return updatedCartState;
  }

  if (action.type === "REMOVE") {
    // console.log(action);
    const existingCartItemIndex = state.items.findIndex(
      (item) => item._id === action.id._id
    );
    // console.log(existingCartItemIndex);
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalPrice = state.totalPrice - existingItem.price;

    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item._id !== action.id._id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    const updatedCartState = {
      items: updatedItems,
      totalPrice: updatedTotalPrice,
    };
    localStorage.setItem("updatedCartState", JSON.stringify(updatedCartState));
    return updatedCartState;
  }

  return initialState;
};

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  const [cartState, dispatchCartAction] = useReducer(cartReducer, initialState);

  const removeFromCart = (id) => {
    // console.log(id._id);
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const addToCart = (item) => {
    // console.log(item);
    dispatchCartAction({ type: "ADD", item: { ...item, amount: 1 } });
  };

  const currentUserIsInGroup = (accessGroup) => {
    if (!currentUser.accessGroups) return;
    const accessGroupArray = currentUser.accessGroups
      .split(",")
      .map((m) => m.trim());
    return accessGroupArray.includes(accessGroup);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        currentUserIsInGroup,
        items: cartState.items,
        totalPrice: cartState.totalPrice,
        addItem: addToCart,
        removeItem: removeFromCart,
      
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
