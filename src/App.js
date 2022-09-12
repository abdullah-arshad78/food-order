import React, { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import OrdersContainer from "./components/Orders/OrdersContainer";
function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [orderFormIsShown, setOrderFormIsShown] = useState(false);
  const showCartHandler = () => {
    setCartIsShown(true);
  };
  const hideCartHandler = () => {
    setCartIsShown(false);
  };
  const showOrderForm = () => {
    setOrderFormIsShown(true);
  };
  const hideOrderForm = () => {
    setOrderFormIsShown(false);
  };
  return (
    <CartProvider>
      {cartIsShown && (
        <Cart onClose={hideCartHandler} showOrderForm={showOrderForm} />
      )}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
        {orderFormIsShown && <OrdersContainer onClose={hideOrderForm} />}
      </main>
    </CartProvider>
  );
}

export default App;
