import React, { useEffect, useState } from "react";
import "./FoodList.css";
import { useNavigate } from "react-router-dom";
import { getDataId, updateData } from "../../dataManagement";
import { useAuth } from "../../contexts/AuthContext";

function FoodList({ uid, price, qty, type, id, eFlag, nQty }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [rate, setRate] = useState("");

  const [ePrice, setEprice] = useState("");
  const [eQty, setEqty] = useState("");
  const [eType, setEtype] = useState("");

  const { currentUser } = useAuth();

  function editOnce() {
    const List = [];
    ePrice && List.push({ nPrice: Number(ePrice) });
    eQty && List.push({ qty: Number(eQty) });
    eType && List.push({ type: eType });

    if (List[0]) {
      let t = { eFlag: false };
      List.map((e) => {
        t = { ...t, ...e };
      });
      console.log(id);
      updateData("Foodlistings", id, t);
      setEprice("");
      setEqty("");
      setEtype("");
      setWidth("width-once-0");
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setOpacity("null");
    }, 500);

    const getName = async () => {
      const dt = await getDataId("users", uid);
      setImg(dt.pic);
      setName(dt.name);
      setRate(dt.rate);
    };

    getName();

    return () => {
      setOpacity("opacity");
    };
  }, []);

  const [opacity, setOpacity] = useState("opacity");
  const [width, setWidth] = useState("width-once-0");
  return (
    <section className="FoodList">
      <div className={`container  ${opacity} `}>
        {currentUser.uid === uid && eFlag && (
          <i
            className="fa-solid fa-pen penTool"
            onClick={() => setWidth("width-once-100")}
          ></i>
        )}
        <div className={`edit-once ${width}`}>
          <i
            className="fa-solid fa-xmark"
            onClick={() => setWidth("width-once-0")}
          ></i>
          <div className="once-container">
            <div>
              <label>Price : </label>
              <input
                type="number"
                value={ePrice}
                onChange={(e) => setEprice(e.target.value)}
              />
            </div>
            <div>
              <label>Quantitiy : </label>
              <input
                type="number"
                value={eQty}
                onChange={(e) => setEqty(e.target.value)}
              />
            </div>
            <div>
              <label>Type : </label>
              <select value={eType} onChange={(e) => setEtype(e.target.value)}>
                <option value="">select</option>
                <option value="veg">veg</option>
                <option value="non-veg">non-veg</option>
              </select>
            </div>
            <div>
              <button
                onClick={() => {
                  if (ePrice || eQty || eType) {
                    editOnce();
                  }
                }}
              >
                Update
              </button>
            </div>
          </div>
        </div>
        <div className="img-bs">
          <img src={img ? img : "/img/default_profile.png"} alt="img" />
        </div>
        <div
          className="description"
          onClick={() => {
            navigate(`/Order/${id}`);
          }}
        >
          <h1>{name}</h1>
          <div className="details">
            <h1>Price : {`${price}/-`}</h1>
            <p className="qty">quantity : {`${Number(qty) - Number(nQty)}`}</p>
            <p> Type : {`${type}`}</p>
            <p id="rating">rating : {Number(rate).toFixed(2)}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FoodList;
