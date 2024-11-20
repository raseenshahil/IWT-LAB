import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { getData } from "../../dataManagement";
import "./Header.css";

function Hedear(props) {
  const { role } = useAuth();
  const [data, setData] = useState("");

  async function clickHandling() {
    const List = await getData("users");

    const reg = new RegExp(data, "i");

    const sh = List.filter((e) => {
      return e.name.search(reg) === 0;
    });

    const id = sh.map((value) => {
      return value.id;
    });

    id[0] && props.setSearch(id);
    if (!id[0]) {
      data && props.setSearch(["abs"]);
    }
  }

  return (
    <section className="Header">
      <div className="container">
        <div className="header">
          <div className="search">
            <input
              type="text"
              placeholder="search"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
            <i
              className="icon fa-sharp fa-solid fa-magnifying-glass"
              onClick={() => {
                if (data) {
                  clickHandling();
                }
              }}
            />
          </div>
          <div className="menu">
            <ul>
              <li>
                <Link to={"/Account"}>Account</Link>
              </li>
              <li onClick={props.setWidth}>Filter</li>
              {role === "Business" && (
                <li>
                  <Link to={"/Business"}>Business</Link>
                </li>
              )}
              {role === "Admin" && (
                <li>
                  <Link to={"/Admin"}>Admin</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hedear;
