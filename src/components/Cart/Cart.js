import React, { useContext, useEffect } from "react";
import styles from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${Math.abs(cartCtx.totalAmount).toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const deleteDatabase = async () => {
    await fetch(
      "https://food-order-18bb0-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
      {
        method: "DELETE",
      }
    );
  };
  useEffect(() => {
    deleteDatabase();
  }, []);

  const saveDataHandler = async () => {
    await fetch(
      "https://food-order-18bb0-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify(cartCtx.items),
        headers: { "content-Type": "application/json" },
      }
    );
    props.onClose();
    props.showOrderForm();
  };
  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        ></CartItem>
      ))}
    </ul>
  );

  return (
    <>
      <Modal onClose={props.onClose}>
        {cartItems}
        <div className={styles.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
        <div className={styles.actions}>
          <button className={styles["button--alt"]} onClick={props.onClose}>
            Close
          </button>
          {hasItems && (
            <button onClick={saveDataHandler} className={styles.button}>
              Order
            </button>
          )}
        </div>
      </Modal>
    </>
  );
};

export default Cart;
