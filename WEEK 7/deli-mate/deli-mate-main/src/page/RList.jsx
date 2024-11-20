import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Request from "../components/Request/Request";
import "../components/Request/Request.css";
import { db } from "../firebase-config";
import { toast, ToastContainer } from "react-toastify";
import ReactLoading from "react-loading";

function RList() {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);

  function update() {
    toast.success("submit successfully");
  }

  useEffect(() => {
    setLoad(true);
    const q = query(
      collection(db, "users"),
      where("rBusiness", "==", "pending")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const List = [];
      setLoad(true);
      querySnapshot.forEach((doc) => {
        List.push({ id: doc.id, ...doc.data() });
        setLoad(false);
      });
      !List[0] && setLoad(false);
      setData(List);
    });

    return unsubscribe;
  }, []);
  return (
    <section className="RList">
      <div className="container">
        <ToastContainer theme="colored" autoClose="3000" position="top-right" />
        {!data[0] && !load && (
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
        {data.map((elt) => (
          <Request
            ud={update}
            lid={elt.licence}
            ph={elt.phone}
            ads={elt.address}
            pc={elt.pincode}
            name={elt.name}
            id={elt.id}
            key={elt.id}
          />
        ))}
      </div>
    </section>
  );
}

export default RList;
