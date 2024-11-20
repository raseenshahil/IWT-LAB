import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";
import { dataEntry, updateData } from "../../dataManagement";
import "./Add.css";

function Add() {
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("");
  const [nPrice, setNprice] = useState("");
  const [type, setType] = useState("");
  const { currentUser } = useAuth();
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [flag, setFlag] = useState(false);

  const disp = useRef();

  const submitHandling = async (e) => {
    e.preventDefault();
    if (Number(price) <= 0 || Number(qty) <= 0 || Number(nPrice) <= 0) {
      toast.error("Negetive Not Allowed");
      return;
    }
    const data = { price, qty, nPrice, type, flag: true, nQty: 0, eFlag: true };
    try {
      dataEntry(data, "Foodlistings", currentUser.uid);
      toast.success("added successfully");
    } catch (e) {
      console.log(e);
    }
    setNprice("");
    setPrice([]);
    setQty("");
    setType("");
  };
  function coordHandling() {
    console.log(lon, lat);
    updateData("users", currentUser.uid, { lat: lat, lon: lon });
    toast.success("added successfully");
    setLat("");
    setLon("");
  }

  const successCallback = (position) => {
    setLat(position.coords.latitude);
    setLon(position.coords.longitude);
    toast.success("geo-location successfully");
  };

  const errorCallback = (error) => {
    console.log(error);
  };

  return (
    <section className="add">
      <ToastContainer theme="colored" autoClose="3000" />
      <form onSubmit={submitHandling}>
        <div className="container">
          <div className="add-body">
            <div className="location-div display" ref={disp}>
              <i
                className="fa-solid fa-xmark"
                onClick={() => {
                  disp.current.classList.add("display");
                }}
              ></i>
              {flag && <p className="err">please fill these two</p>}
              <label>Latitue : </label>
              <input
                type="number"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
              />
              <label>Longitude :</label>
              <input
                type="number"
                value={lon}
                onChange={(e) => setLon(e.target.value)}
              />
              <button
                type="button"
                onClick={() => {
                  if (!lat || !lon) {
                    setFlag(true);
                  } else {
                    setFlag(false);
                    coordHandling();
                  }
                }}
              >
                Submit
              </button>
              <div className="current-location">
                <label>current Location : </label>
                <i
                  className="fa-solid fa-map-location-dot"
                  onClick={() => {
                    navigator.geolocation.getCurrentPosition(
                      successCallback,
                      errorCallback
                    );
                  }}
                ></i>
              </div>
            </div>
            <button
              type="button"
              className="location"
              onClick={() => {
                disp.current.classList.remove("display");
              }}
            >
              map
            </button>

            <div className="heading">
              <h1>Add Details</h1>
            </div>
            <div className="qty">
              <label>Quantity : </label>
              <input
                type="number"
                required
                onChange={(e) => setQty(Number(e.target.value))}
                value={qty}
              />
            </div>
            <div className="price">
              <label>Old Price : </label>
              <input
                type="number"
                required
                onChange={(e) => setPrice(Number(e.target.value))}
                value={price}
              />
            </div>
            <div className="price">
              <label>New Price : </label>
              <input
                type="number"
                required
                onChange={(e) => setNprice(Number(e.target.value))}
                value={nPrice}
              />
            </div>
            <div className="type">
              <span>Type : </span>
              <select
                onChange={(e) => setType(e.target.value)}
                value={type}
                required
              >
                <option value="">--Type--</option>
                <option value="veg">veg</option>
                <option value="non-veg">non-veg</option>
              </select>
            </div>
            <button className="btn">Submit</button>
          </div>
        </div>
      </form>
    </section>
  );
}

export default Add;
