import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Report from "../components/Report/Report";
import "../components/Report/Report.css";
import { db } from "../firebase-config";
import ReactLoading from "react-loading";

function RepList() {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    setLoad(true);
    const q = query(collection(db, "report"), where("flag", "==", true));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setLoad(true);
        const List = [];
        snapshot.docs.forEach((doc) => {
          List.push({
            did: doc.id,
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
    <section className="RepList">
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
          <Report
            sid={elt.sid}
            uid={elt.user_Id}
            time={elt.time}
            msg={elt.report}
            id={elt.id}
            res={elt.reason}
            key={elt.did}
          />
        );
      })}
    </section>
  );
}

export default RepList;
