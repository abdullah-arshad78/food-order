import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const updatedTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );
      const existingCartItem = state.items[existingCartItemIndex];

      let updatedItems;

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.item.amount,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.item);
      }

      return { items: updatedItems, totalAmount: updatedTotalAmount };

    case "REMOVE":
      const existingRedItemIdex = state.items.findIndex(
        (item) => action.id === item.id
      );
      const existingRedItem = state.items[existingRedItemIdex];

      const newTotal = state.totalAmount - existingRedItem.price;

      let newItems;
      if (existingRedItem.amount > 1) {
        const updatedItem = {
          ...existingRedItem,
          amount: existingRedItem.amount - 1,
        };
        newItems = [...state.items];
        newItems[existingRedItemIdex] = updatedItem;
      } else {
        newItems = state.items.filter((item) => item.id !== action.id);
      }
      return { items: newItems, totalAmount: newTotal };

    default:
      return defaultCartState;
  }
};
const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };
  const removeItemToCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
