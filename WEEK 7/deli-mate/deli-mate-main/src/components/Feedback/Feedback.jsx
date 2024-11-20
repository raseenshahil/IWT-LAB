import React, { useEffect, useState } from "react";
import { dateTime, getDataId, updateData } from "../../dataManagement";
import "./Feedback.css";

function Feedback({ uid, time, msg, id }) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(dateTime(time.toDate().toString()));
    const getName = async () => {
      const dt = await getDataId("users", uid);
      setName(dt.name);
      console.log();
    };

    getName();
  }, []);

  return (
    <section className="Feedback">
      <div className="container">
        <i
          className="fa-solid fa-xmark"
          onClick={() => updateData("feedback", id, { flag: false })}
        ></i>
        <div className="feedback-body">
          <h1>{name}</h1>
          <div className="date">
            <p>{date}</p>
          </div>
          <p>{msg}</p>
        </div>
      </div>
    </section>
  );
}

export default Feedback;
