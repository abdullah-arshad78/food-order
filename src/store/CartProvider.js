import React, { useReducer } from "react";
import CartContext from "./cart-context";

let defaultCartState = {
  items: [],
  totalAmount: 0,
};
// const fetchOrderedData = async (applydata) => {
//   const response = await fetch(
//     "https://food-order-18bb0-default-rtdb.europe-west1.firebasedatabase.app/orders.json"
//   );
//   const data = await response.json();
//   const orderedData = Object.entries(data).map((item) => {
//     return { ...item[1], id: item[0] };
//   });
//   console.log(orderedData);
//   const totalPrice = orderedData
//     .map((item) => item.price * item.amount)
//     .reduce((sum, acc) => sum + acc);
//   if (orderedData) {
//     applydata({ items: orderedData, totalAmount: totalPrice });
//   }
// };
///Above we are fetching our readymade data for cart and setting it to cart state
//Below we are making a case for adding data using database
// {name:"Green Bowl", amount:1, price:2}
// const addData = async (item) => {
//   const fetchedData = await fetch(
//     "https://food-order-18bb0-default-rtdb.europe-west1.firebasedatabase.app/orders.json"
//   );
//   const data = await fetchedData.json();
//   const orderedData = Object.entries(data).map((item) => {
//     return { ...item[1], id: item[0] };
//   });
//   const retrievedValueIndex = orderedData.findIndex(
//     (entity) => entity.name === item.name
//   );
//   if (retrievedValueIndex > -1) {
//     const retrievedDataId = orderedData[retrievedValueIndex].id;
//     const fetchedValue = await fetch(
//       `https://food-order-18bb0-default-rtdb.europe-west1.firebasedatabase.app/orders/${retrievedDataId}.json`,
//       {
//         method: "PUT",
//         body: JSON.stringify({
//           ...item,
//           amount: orderedData[retrievedValueIndex].amount + item.amount,
//         }),
//         headers: { "content-Type": "application/json" },
//       }
//     );
//     const retrievedValueFromDatabase = await fetchedValue.json();
//     console.log(retrievedValueFromDatabase);

//     //Uptil now we were able to retrieve a data whose name is same as the name of item we passed
//     //Then we are able to manipulate that data in the database
//     // then We are able to fetch the new data from the database and render the dom with the new data
//     //Next step: We will
//   } else {
//     const postData = await fetch(
//       "https://food-order-18bb0-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
//       {
//         method: "POST",
//         body: JSON.stringify(item),
//         headers: { "content-Type": "application/json" },
//       }
//     );
//     const postedData = await postData.json();
//     console.log(postedData);
//   }
//   const response = await fetch(
//     "https://food-order-18bb0-default-rtdb.europe-west1.firebasedatabase.app/orders.json"
//   );
//   const updatedData = await response.json();
//   const updatedItemsArray = Object.entries(updatedData).map((item) => {
//     return { ...item[1], id: item[0] };
//   });
//   const newTotal = orderedData
//     .map((item) => item.price * item.amount)
//     .reduce((sum, acc) => sum + acc);

//   return { items: updatedItemsArray, totalAmount: newTotal };
//   //Something went wrong: when the data is being fetched the other processes are being run which are dependent on the data, so it gives us an error
// };

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
    // addData(action.item);
    // break;

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
    // case "FETCHED":
    //   return action.value;

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
  //The below function is to set cartstate to our fetched data when it is available
  // function cartDataHandler(data) {
  //   dispatchCartAction({ type: "FETCHED", value: data });
  // }
  // useEffect(() => {
  //   fetchOrderedData(cartDataHandler);
  //   // addData({ name: "Aloo Chat", amount: 1, price: 2 }, cartDataHandler);
  // }, []);
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
