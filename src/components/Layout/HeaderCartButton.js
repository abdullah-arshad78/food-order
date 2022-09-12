import React, { useContext, useEffect, useState } from "react";
import styles from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;
  const numberOfCartItems = items
    .map((meal) => meal.amount)
    .reduce((currentNum, item) => {
      return currentNum + item;
    }, 0);

  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);
    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  const btnClasses = `${styles.button} ${btnIsHighlighted ? styles.bump : ""}`;

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}> {numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
