import { orderBy, where } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { dataWhere } from "../../dataManagement";
import SearchForFilter from "../SearchForFilter/SearchForFilter";
import "./Filter.css";

function Filter({
  width,
  setWidth,
  setFilter,
  Max,
  Type,
  Sort,
  setQry,
  setRt,
}) {
  const [pincode, setPincode] = useState("");
  const [max, setMax] = useState("");
  const [rating, setRating] = useState([]);
  const [type, setType] = useState("");
  const [sorting, setSorting] = useState("");

  async function submitHandling() {
    const List = await dataWhere("users", [where("pincode", "==", pincode)]);
    const id = List.map((value) => {
      return value.id;
    });
    let rList = [];
    if (rating[0]) {
      rList = await dataWhere("users", [where("rate", ">=", Number(rating))]);
      if (!rList[0]) {
        rList = [{ id: "noData" }];
      }
    }
    const Rid = rList.map((value) => {
      return value.id;
    });

    console.log(Rid);

    id[0] && setFilter(id);
    max && Max(["<=", Number(max)]);
    type && Type([where("type", "==", type)]);
    sorting && Sort([orderBy("nPrice", sorting)]);
    setRt(Rid);
    if (!id[0]) {
      pincode && setFilter(["abs"]);
    }
  }

  return (
    <section className={`Filter ${width}`}>
      <h1 className="cross" onClick={setWidth}>
        <i className="fa-solid fa-xmark"></i>
      </h1>
      <div className="container">
        <SearchForFilter
          span="Search By Pincode : "
          placeholder="pincode"
          value={pincode}
          change={setPincode}
        />
        <SearchForFilter
          span="Max Price : "
          placeholder="price"
          value={max}
          change={setMax}
        />
        <div className="select">
          <div className="rating options">
            <span>Rating</span>
            <select value={rating} onChange={(e) => setRating(e.target.value)}>
              <option value="">--rating--</option>
              <option value="2">2 & above</option>
              <option value="3">3 & above</option>
              <option value="4">4 & above</option>
            </select>
          </div>
          <div className="type options">
            <span>Type</span>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="">--Type--</option>
              <option value="veg">veg</option>
              <option value="non-veg">non-veg</option>
            </select>
          </div>
          <div className="sorting options">
            <span>Sorting</span>
            <select
              defaultValue={`--Sorting--`}
              value={sorting}
              onChange={(e) => setSorting(e.target.value)}
            >
              <option value="">--Sorting--</option>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </div>
        </div>
        {
          <div className="clear-filter">
            <div
              className="clear-max"
              onClick={() => {
                Max(["!=", null]);
                setMax("");
                Type([]);
                setType("");
                setRt([]);
                setRating("");
                Sort([]);
                setSorting("");
                setQry([]);
                setPincode("");
                setFilter([]);
              }}
            >
              clear-all-filters
            </div>
          </div>
        }
        <button onClick={submitHandling}>ok</button>
      </div>
    </section>
  );
}

export default Filter;
