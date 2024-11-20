import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { dataEntry, updateData } from "../../dataManagement";
import { db } from "../../firebase-config";
import "./SelfReview.css";
function SelfReview({ sid }) {
  const [rate, setRate] = useState("");
  const [msg, setMsg] = useState("");
  const star = useRef([]);
  const [nRate, setNrate] = useState("");
  const [rt, setRt] = useState("");

  const { currentUser } = useAuth();

  useEffect(() => {
    let unsub;
    try {
      unsub = onSnapshot(doc(db, "users", sid), (docs) => {
        setRt(Number(docs.data().rate));
        setNrate(Number(docs.data().nRate));
      });
    } catch (e) {
      console.log(e);
    }
    return unsub;
  }, []);

  function reviewHandling() {
    if (rate === "" || msg === "") {
      return;
    } else {
      const newNumRatings = Number(nRate) + 1;
      const oldRatingTotal = Number(rt) * Number(nRate);
      const newAvgRating = (oldRatingTotal + rate) / newNumRatings;

      updateData("users", sid, { nRate: newNumRatings, rate: newAvgRating });
      dataEntry({ msg, rate, sid }, "reviews", currentUser.uid);
      setMsg("");
      setRate("");
      star.current.map((e) => {
        e.checked = false;
      });
    }
  }
  return (
    <section className="self-review">
      <div className="container">
        <div className="rate">
          <input
            ref={(element) => {
              star.current[0] = element;
            }}
            type="radio"
            id="star5"
            name="rate"
            value="5"
            onClick={() => {
              setRate(5);
            }}
          />
          <label htmlFor="star5" title="text">
            5 stars
          </label>
          <input
            ref={(element) => {
              star.current[1] = element;
            }}
            type="radio"
            id="star4"
            name="rate"
            value="4"
            onClick={() => setRate(4)}
          />
          <label htmlFor="star4" title="text">
            4 stars
          </label>
          <input
            ref={(element) => {
              star.current[3] = element;
            }}
            type="radio"
            id="star3"
            name="rate"
            value="3"
            onClick={() => setRate(3)}
          />
          <label htmlFor="star3" title="text">
            3 stars
          </label>
          <input
            ref={(element) => {
              star.current[4] = element;
            }}
            type="radio"
            id="star2"
            name="rate"
            value="2"
            onClick={() => setRate(2)}
          />
          <label htmlFor="star2" title="text">
            2 stars
          </label>
          <input
            ref={(element) => {
              star.current[5] = element;
            }}
            type="radio"
            id="star1"
            name="rate"
            value="1"
            onClick={() => setRate(1)}
          />
          <label htmlFor="star1" title="text">
            1 star
          </label>
        </div>
        <textarea
          placeholder="Enter your Review"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        ></textarea>
        <h1 onClick={reviewHandling}>Submit</h1>
      </div>
    </section>
  );
}

export default SelfReview;
