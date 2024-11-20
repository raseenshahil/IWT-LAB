import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { getDataId, updateData } from "../../dataManagement";
import "./BookedList.css";

function BookedList({ bookId, qty, uid, id, price }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [bid, setBid] = useState();
  const close = useRef();

  function submitHandling(e) {
    e.preventDefault();
    if (bid === String(bookId)) {
      toast.success("order success");
      setTimeout(() => (close.current.style.scale = "0"), 800);
      setTimeout(() => updateData("orders", id, { status: "complete" }), 1500);
    } else {
      toast.error("incorrect");
    }
  }

  useEffect(() => {
    const getName = async (id) => {
      const dt = await getDataId("users", id);
      dt && setName(dt.name);
      dt && setNumber(dt.phone);
    };

    getName(uid);
  }, []);
  return (
    <section className="booked-list">
      <div className="container">
        <ToastContainer theme="colored" autoClose="1500" />
        <div className="body-list" ref={close}>
          <div className="yesOrNo">
            <div className="conatiner-yesorno"></div>
          </div>
          <h1>{name}</h1>
          <div className="qty flex">
            <label>Quantity : </label>
            <p>{qty}</p>
          </div>
          <div className="qty flex">
            <label>Price : </label>
            <p>
              {Number(price) * Number(qty) -
                Math.trunc((price * qty * 30) / 100)}
            </p>
          </div>
          <div className="phone flex">
            <label>Phone : </label>
            <p>{number}</p>
          </div>
          <form onSubmit={submitHandling}>
            <div className="gNumber">
              <input
                type="number"
                required
                onChange={(e) => setBid(e.target.value)}
              />
              <div className="btn">
                <button type="submit">
                  <i className="fa-solid fa-check"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default BookedList;
