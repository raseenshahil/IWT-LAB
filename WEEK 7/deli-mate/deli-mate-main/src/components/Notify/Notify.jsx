import React, { useState } from "react";
import { useRef } from "react";
import { updateData } from "../../dataManagement";
import "./Notify.css";

function Notify({ warn, id, report }) {
  const [size, setSize] = useState("msg-low");
  const [reason, setReason] = useState("");
  const close = useRef();

  function closeHandling(e, sent) {
    e.preventDefault();
    size === "msg-low" ? setSize("msg-high") : setSize("msg-low");
    setTimeout(() => {
      if (sent) {
        updateData("report", id, { flag: true, reason: reason });
      }
      updateData("report", id, { wFlag: false });
    }, 1000);
  }
  return (
    <section ref={close} className="notify">
      <div className={`warn-notify ${size}`}>
        <i
          className="fa-sharp fa-solid fa-xmark"
          onClick={(e) => closeHandling(e, false)}
        ></i>
        <h2>Warning</h2>
        <p>{warn} </p>
        <form onSubmit={(e) => closeHandling(e, true)}>
          <div className="reason">
            <textarea
              onChange={(e) => setReason(e.target.value)}
              value={reason}
              required
            ></textarea>
            <button>sent</button>
          </div>
        </form>
      </div>
      <i
        className="fa-solid fa-comment-dots"
        onClick={() => {
          size === "msg-low" ? setSize("msg-high") : setSize("msg-low");
        }}
      ></i>
    </section>
  );
}

export default Notify;
