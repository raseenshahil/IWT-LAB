import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Feedback from "../components/Feedback/Feedback";
import "../components/Feedback/Feedback.css";
import { db } from "../firebase-config";
import ReactLoading from "react-loading";

function FList() {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    setLoad(true);
    const q = query(collection(db, "feedback"), where("flag", "==", true));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setLoad(true);
        const List = [];
        snapshot.docs.forEach((doc) => {
          List.push({
            uid: doc.data().user_Id,
            id: doc.id,
            ...doc.data(),
          });
          setLoad(false);
        });
        !List[0] && setLoad(false);
        setData(List);
      },
      (error) => {
        console.log(error);
      }
    );

    return unsubscribe;
  }, []);
  return (
    <section className="FList">
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
      {data.map((elt) => {
        return (
          <Feedback
            uid={elt.user_Id}
            time={elt.time}
            msg={elt.feedback}
            id={elt.id}
          />
        );
      })}
    </section>
  );
}

export default FList;
