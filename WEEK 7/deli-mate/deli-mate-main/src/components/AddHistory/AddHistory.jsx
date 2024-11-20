import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { dateTime, updateData } from "../../dataManagement";
import "./AddHistory.css";

function AddHistory({ time, qty, price, type, id, flag, nQty }) {
  const [date, setDate] = useState("");
  useEffect(() => {
    setDate(dateTime(time.toDate().toString()));
  }, []);
  return (
    <section className="addHistory">
      <ToastContainer theme="colored" autoClose="3000" position="top-right" />
      <div className="container">
        <div className="flex time">
          <label>Time : </label>
          <p>{date}</p>
        </div>
        <div className="flex price">
          <label>Price : </label>
          <p>{`${price}/-`}</p>
        </div>
        <div className="flex qty">
          <label>Quantitiy : </label>
          <p>{qty}</p>
        </div>
        <div className="flex type">
          <label>Type : </label>
          <p>{type}</p>
        </div>
        {Boolean(nQty) && (
          <div className="flex type">
            <label>Selled : </label>
            <p>{nQty}</p>
          </div>
        )}
        {flag && (
          <button
            className="btn-flag"
            onClick={() => {
              updateData("Foodlistings", id, { flag: false });
              toast.success("List Stopped");
            }}
          >
            Stop
          </button>
        )}
      </div>
    </section>
  );
}

export default AddHistory;
