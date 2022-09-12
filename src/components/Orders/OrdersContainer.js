import React, { useState, useEffect } from "react";
import Modal from "../UI/Modal";
import OrderForm from "./OrderForm";

import classes from "./OrdersContainer.module.css";

const OrdersContainer = (props) => {
  const [orderList, setOrderList] = useState([]);
  const [listIsLoading, setListIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getOrdersFromDatabase = async () => {
    try {
      setListIsLoading(true);
      const response = await fetch(
        "https://food-order-18bb0-default-rtdb.europe-west1.firebasedatabase.app/orders.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      const dataKeyVal = Object.entries(data);
      setOrderList(dataKeyVal[0][1]);
    } catch (error) {
      setError(error.message);
    }

    setListIsLoading(false);
  };
  useEffect(() => {
    getOrdersFromDatabase();
  }, []);
  console.log(orderList);
  let listContent = orderList.map((item) => (
    <li key={item.id}>
      <div className={classes["order-name"]}>{item.name}</div>
      <span className={classes["order-amount"]}>x{item.amount}</span>
      <div className={classes["order-price"]}>${item.amount * item.price}</div>
    </li>
  ));
  if (error) {
    listContent = <p>{error}</p>;
  }
  if (listIsLoading) {
    listContent = <p>Loading...</p>;
  }
  return (
    <Modal onClose={props.onClose}>
      <div className={classes["order-container"]}>
        <h2>Your Orders</h2>
        <ul className={classes["order-list"]}>{listContent}</ul>
      </div>
      {orderList.length > 0 && (
        <div className={classes["total-container"]}>
          <h3>Total Amount</h3>{" "}
          <span>
            $
            {orderList
              .reduce((sum, item) => {
                return sum + item.amount * item.price;
              }, 0)
              .toFixed(2)}
          </span>
        </div>
      )}
      <OrderForm orderList={orderList} />
      <button className={classes["close-btn"]} onClick={props.onClose}>
        Close
      </button>
    </Modal>
  );
};

export default OrdersContainer;
