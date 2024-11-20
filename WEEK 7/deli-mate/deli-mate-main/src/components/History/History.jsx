import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import AddHistory from "../AddHistory/AddHistory";
import "./History.css";
import ReactLoading from "react-loading";
import { db } from "../../firebase-config";

function History() {
  const [history, setHistory] = useState([]);
  const { currentUser } = useAuth();
  const [load, setLoad] = useState(true);
  useEffect(() => {
    const q = query(
      collection(db, "Foodlistings"),
      where("user_Id", "==", currentUser.uid),
      orderBy("time", "desc")
    );
    const unsub = onSnapshot(
      q,
      (snapshot) => {
        const List = [];
        snapshot.docs.forEach((doc) => {
          List.push({ uid: doc.data().user_Id, id: doc.id, ...doc.data() });
          setHistory(List);
          setLoad(false);
        });
        !List[0] && setLoad(false);
      },
      (error) => {
        console.log(error);
      }
    );

    return unsub;
  }, []);
  return (
    <section className="history">
      {!load && !history[0] && (
        <div className="load">
          <h1>No Data Found</h1>
        </div>
      )}
      {load && (
        <div className="react-load">
          <ReactLoading
            type={"spinningBubbles"}
            color={"rgb(63 55 55)"}
            height={"30%"}
            width={"30%"}
          />
        </div>
      )}
      <div className="container">
        {history.map((elt) => (
          <AddHistory
            price={elt.nPrice}
            time={elt.time}
            qty={elt.qty}
            type={elt.type}
            key={elt.id}
            id={elt.id}
            flag={elt.flag}
            nQty={elt.nQty}
          />
        ))}
      </div>
    </section>
  );
}

export default History;
