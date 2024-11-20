import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { dateTime, getDataId } from "../../dataManagement";
import "../Account/Account.css";

function OrderHistory({ sid, date, price, qty, type, bId, status }) {
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  useEffect(() => {
    const getName = async () => {
      const dt = await getDataId("users", sid);
      setName(dt.name);
    };
    setTime(dateTime(date.toDate().toString()));
    getName();
  }, []);
  return (
    <section className="order-history">
      <div className="history-details">
        <p>
          <label>Date and Tme :</label> {time}
        </p>
        <p>
          <label>Source :</label> {name}
        </p>
        <p>
          <label>Generated Number :</label> {bId}
        </p>
        <p>
          <label>Type :</label> {type}
        </p>
        <p>
          <label>Quantitity :</label> {qty}
        </p>
        <p>
          <label>Price : </label> {`${price * qty}/-`}
        </p>
        <p>
          <label>Status : </label> {status}
        </p>
      </div>
    </section>
  );
}

export default OrderHistory;
