import { serverTimestamp } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { dataEntry, getDataId, updateData } from "../../dataManagement";
import "./PayBox.css";

function PayBox({
  box,
  setBox,
  qty,
  sid,
  uid,
  type,
  price,
  nQty,
  id,
  setQuantity,
  setBk,
}) {
  const [scale, setScale] = useState("scale");
  const [width, setWidth] = useState("width-0");
  const [display, setDisplay] = useState("display");
  const [width2, setWidth2] = useState("width-0");
  const [bookId, setBookId] = useState("");

  const setOrder = () => {
    updateData("Foodlistings", id, { nQty: Number(nQty) + Number(qty) });
    dataEntry(
      { qty, bookId, sid, type, price, status: "booked" },
      "orders",
      uid
    );
    setQuantity("");
    setBk(false);
  };

  useEffect(() => {
    setScale("");
    const d = new Date();
    setBookId(d.getMilliseconds() * 197436);
  }, []);
  return (
    <section className={`payBox`}>
      <div className="container-box">
        <div className="outer-shade" onClick={() => setBox(!box)}></div>
        <div className={`Box ${scale}`}>
          <div className={`complete ${width2}`}>
            <div className={`success-checkmark ${display}`}>
              <div className="check-icon">
                <span className="icon-line line-tip"></span>
                <span className="icon-line line-long"></span>
                <div className="icon-circle"></div>
                <div className="icon-fix"></div>
              </div>
            </div>
            <div className="book-no">
              <label>Book No : </label>
              <h1>{bookId}</h1>
            </div>
            <button onClick={() => setBox(!box)}>close</button>
          </div>
          <div className={`loading ${width}`}>
            <div className="container-loader">
              <div className="loader">
                <div className="loader--dot"></div>
                <div className="loader--dot"></div>
                <div className="loader--dot"></div>
                <div className="loader--dot"></div>
                <div className="loader--dot"></div>
                <div className="loader--dot"></div>
                <div className="loader--text"></div>
              </div>
            </div>
          </div>
          <img src="/img/pay.gif" alt="" />
          <div className="btn-qout">
            <h1>{`pay : ${Math.trunc((price * qty * 30) / 100)}/-  `}</h1>
            <button
              onClick={() => {
                setWidth("width-100");
                setTimeout(() => {
                  setWidth2("width-100");
                  setWidth("width-0");
                  setDisplay("");
                  setOrder();
                }, 4000);
              }}
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PayBox;
