import React, { useState } from "react";
import { useEffect } from "react";
import { getDataId } from "../../dataManagement";
import "./Review.css";

function Review({ msg, id, uid, date, rate }) {
  const [name, setName] = useState("");
  const [img, setImg] = useState("");

  let time;
  try {
    time = date?.toDate().toString().slice(0, 15);
  } catch (e) {
    console.log(e);
  }

  const getName = async (id) => {
    const dt = await getDataId("users", id);
    dt && setName(dt.name);
    dt && setImg(dt.pic);
  };

  useEffect(() => {
    getName(uid);
  }, []);
  return (
    <section className="review">
      <div className="container">
        <div className="profile">
          <div className="img-outline">
            <img src={img ? img : "/img/default_profile.png"} alt="profile" />
          </div>
          <label>{name}</label>
        </div>
        <div className="rating">
          <label>Rating : {rate}</label>
        </div>
        <div className="date-time">
          <p>Reviewed on {time}</p>
        </div>
        <div className="review-msg">
          <p>{msg}</p>
        </div>
      </div>
    </section>
  );
}

export default Review;
