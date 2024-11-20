import { collection, onSnapshot, query, where } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import BookedList from "../components/BookedList/BookedList";
import "../components/BookedList/BookedList.css";
import { db } from "../firebase-config";
import ReactLoading from "react-loading";

function BList() {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "orders"), where("status", "==", "booked"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const List = [];
        snapshot.docs.forEach((doc) => {
          List.push({ uid: doc.data().user_Id, id: doc.id, ...doc.data() });

          setData(List);
          setLoad(false);
        });
        !List[0] && setLoad(false);
      },
      (error) => {
        console.log(error);
      }
    );

    return unsubscribe;
  }, []);
  return (
    <section className="b-list">
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
        <BookedList
          bookId={elt.bookId}
          qty={elt.qty}
          uid={elt.user_Id}
          id={elt.id}
          key={elt.id}
          price={elt.price}
        />
      ))}
    </section>
  );
}

export default BList;
