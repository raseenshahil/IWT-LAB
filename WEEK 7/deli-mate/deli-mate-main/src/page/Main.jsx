import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Hedear from "../components/Main/Header";
import Filter from "../components/Filter/Filter";
import Lists from "../components/Lists/Lists";
import "../components/Filter/Filter.css";
import { useAuth } from "../contexts/AuthContext";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import { removeArrayDup } from "../dataManagement";
import Notify from "../components/Notify/Notify";
import { db } from "../firebase-config";

let flag;

function Main({ log, setLogged }) {
  const { currentUser } = useAuth();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState([]);
  const [qry, setQry] = useState([]);
  const [filter, setFilter] = useState([]);
  const [max, setMax] = useState(["!=", null]);
  const [sort, setSort] = useState([]);
  const [type, setType] = useState([]);
  const [rate, setRate] = useState([]);

  useEffect(() => {
    log && toast.success("Logged In");
    flag = true;

    return setLogged(false);
  }, []);
  useEffect(() => {
    if (search[0] || filter[0] || rate[0]) {
      const List = removeArrayDup(search, filter, rate);
      List[0] && setQry(where("user_Id", "in", List));
    }
  }, [search, filter, rate]);

  const widthHandling = () => {
    if (flag) {
      setWidth("full");
      flag = !flag;
    } else {
      setWidth("zero");
      flag = !flag;
    }
  };
  useEffect(() => {
    const q = query(
      collection(db, "report"),
      where("wFlag", "==", true),
      where("sid", "==", currentUser.uid)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const List = [];
      querySnapshot.forEach((doc) => {
        List.push({ id: doc.id, ...doc.data() });
      });
      setData(List);
    });
    return unsubscribe;
  }, []);

  const [width, setWidth] = useState("zero");

  return (
    <section className="Main">
      <Hedear setWidth={widthHandling} setSearch={setSearch} />
      <div className="list-body">
        <ToastContainer
          theme="colored"
          autoClose="3000"
          position="bottom-left"
        />
        <div className="filter">
          <Filter
            width={width}
            setWidth={widthHandling}
            setFilter={setFilter}
            Max={setMax}
            Type={setType}
            Sort={setSort}
            st={sort}
            mx={max}
            tp={type}
            ft={filter}
            rt={rate}
            setRt={setRate}
            setQry={setQry}
          />
        </div>
        {currentUser.emailVerified && (
          <Routes>
            <Route
              path="/"
              element={<Lists search={qry} Max={max} Sort={sort} Type={type} />}
            />
          </Routes>
        )}
      </div>
      {data[0] && (
        <Notify id={data[0].id} report={data[0].report} warn={data[0].warn} />
      )}
    </section>
  );
}

export default Main;
