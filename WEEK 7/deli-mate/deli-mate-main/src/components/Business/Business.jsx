import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import BList from "../../page/BList";
import Add from "../Add/Add";
import History from "../History/History";
import "./Business.css";
import Notify from "../Notify/Notify";
import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase-config";
import { useState } from "react";

function Business() {
  const { currentUser } = useAuth();
  const [flag, setFlag] = useState(false);
  const [data, setDate] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "report"),
      where("sid", "==", currentUser.uid)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const List = [];
      querySnapshot.forEach((doc) => {
        setFlag(doc.data().wFlag);
        List.push({ id: doc.id, ...doc.data() });
      });
      setDate(List);
    });
    return unsubscribe;
  }, []);

  return (
    <section className="business">
      <div className="container">
        <div className="navbar">
          <h1>Business Panel</h1>
          <div className="add-booked">
            <ul>
              <Link to={"/Business/"}>
                <li>List</li>
              </Link>
              <li>
                <Link to={"/Business/add"}>Add</Link>
              </li>
              <li>
                <Link to={"/Business/history"}>History</Link>
              </li>
            </ul>
          </div>
        </div>
        {flag && (
          <Notify id={data[0].id} report={data[0].report} warn={data[0].warn} />
        )}
        <div className="body-business">
          <Routes>
            <Route path="/">
              <Route index element={<BList />} />
              <Route path="add" element={<Add />} />
              <Route path="history" element={<History />} />
            </Route>
          </Routes>
        </div>
      </div>
    </section>
  );
}

export default Business;
