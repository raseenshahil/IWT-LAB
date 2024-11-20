import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { dataEntry } from "../../dataManagement";
import { db } from "../../firebase-config";
import PayBox from "../PayBox/PayBox";
import "./Booking.css";

const select = (num) => {
  const n = [];
  for (let i = 1; i <= num; i++) {
    n.push(i);
  }
  return n;
};

let shadow;
function Booking({
  repClick,
  setRepClick,
  name,
  price,
  qty,
  type,
  sid,
  nPrice,
  pic,
  nQty,
  id,
  address,
  setBk,
}) {
  const { currentUser } = useAuth();
  const [box, setBox] = useState(false);
  const [rate, setRate] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");

  function reportHandling() {
    if (report) {
      dataEntry({ report, sid, flag: true }, "report", currentUser.uid);
      setReport("");
    } else console.log("nothing");
  }

  useEffect(() => {
    let unsub;
    if (sid) {
      onSnapshot(doc(db, "users", sid), (docs) => {
        setRate(Number(docs.data().rate).toFixed(2));
        docs.data().lat && setLat(docs.data().lat);
        docs.data().lon && setLon(docs.data().lon);
      });
    }
    return unsub;
  }, [sid]);

  const [quantity, setQuantity] = useState("");
  const [block, setBlock] = useState(false);
  const [report, setReport] = useState("");
  repClick ? (shadow = "report-bg") : (shadow = "null");

  return (
    <section className={`Booking`}>
      {box && (
        <PayBox
          box={box}
          setBox={setBox}
          setQuantity={setQuantity}
          qty={quantity}
          nQty={nQty}
          sid={sid}
          uid={currentUser.uid}
          price={nPrice}
          type={type}
          id={id}
          setBk={setBk}
        />
      )}
      <div
        className={`report-field ${shadow}`}
        onClick={() => setRepClick(block)}
      >
        <div className={`field`}></div>
      </div>
      {repClick && (
        <div className={`div-field`}>
          <i className="fa-solid fa-circle-exclamation exclamation"></i>
          <div className="field">
            <textarea
              className="textarea-report"
              placeholder="write your reason"
              value={report}
              onChange={(e) => setReport(e.target.value)}
            ></textarea>
          </div>
          <button className="report-submit" onClick={reportHandling}>
            submit
          </button>
        </div>
      )}
      <div className="container">
        <div className="report">
          <div
            className="three-dot"
            onClick={() => {
              setBlock(!block);
            }}
          >
            <div></div>
            <div></div>
            <div></div>
          </div>
          {block && (
            <label
              onClick={() => {
                setBlock(!block);
                setRepClick(block);
              }}
            >
              Report!!
            </label>
          )}
        </div>
        <div className="outline">
          <div className="img-book">
            <img src={pic ? pic : "/img/default_profile.png"} alt="img" />
            <div className="total-qty">
              <span>Package Left!!!</span>
              <h1>{qty - nQty}</h1>
            </div>
            <div className="food-type">
              <span>Type</span>
              <h1>{type}</h1>
            </div>
            {qty !== nQty && (
              <form className="form" onSubmit={(e) => e.preventDefault()}>
                <div className="booking-qty">
                  <span>Quantity</span>
                  <select
                    value={quantity}
                    required
                    className="qty-select"
                    onChange={(e) => setQuantity(e.target.value)}
                  >
                    <option value="">--quantity--</option>
                    {select(Number(qty) - Number(nQty)).map((num, index) => (
                      <option value={num}>{num}</option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={() => {
                    quantity && setBox(!box);
                    setBk(true);
                  }}
                >
                  Book Now
                </button>
              </form>
            )}
          </div>
          <div className="book-details">
            <div className="head-rate">
              <h1 className="name">{name}</h1>
              <div className="rating">
                <h1>{Number(rate)}</h1>
                <i className="fa-sharp fa-solid fa-star"></i>
              </div>
            </div>
            <div className="price">
              <p>{`${nPrice}/-`}</p>
              <p className="strike">{`${price}/-`}</p>
            </div>
            <div className="map">
              <div className="location-title">
                <h1>Location</h1>
              </div>
              {
                <iframe
                  title="google-map"
                  loading="lazy"
                  src={
                    lat && lon
                      ? `https://maps.google.com/maps?q=${lat},${lon}&hl=en&z=14&output=embed`
                      : ``
                  }
                ></iframe>
              }
              <div className="addrs">
                <p>{address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Booking;
