import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import FoodList from "../FoodList/FoodList";
import "./Lists.css";
import ReactLoading from "react-loading";
import { updateData } from "../../dataManagement";

function Lists({ search, Max, Sort, Type }) {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    setLoad(true);
    const q = query(
      collection(db, "Foodlistings"),
      search,
      where("flag", "==", true),
      where("nPrice", ...Max),
      ...Type,
      ...Sort
    );
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const List = [];
        snapshot.docs.forEach((doc) => {
          if (Number(doc.data().qty) === Number(doc.data().nQty)) {
            updateData("Foodlistings", doc.id, { flag: false });
          } else {
            List.push({ uid: doc.data().user_Id, id: doc.id, ...doc.data() });
            setLoad(false);
          }
        });
        setData(List);
        !List[0] && setLoad(false);
      },
      (error) => {
        console.log(error);
      }
    );
    return unsubscribe;
  }, [search, Max, Type, Sort]);

  return (
    <section className="main-body">
      <div className="contain-body">
        {!data[0] && !load && (
          <div className="load">
            <h1>No Data Found</h1>
          </div>
        )}
        {load && (
          <div className="load-react">
            <ReactLoading
              type={"bars"}
              color={"rgb(10 180 50)"}
              height={"20%"}
              width={"20%"}
            />
          </div>
        )}
        {data.map((elt) => {
          return (
            <FoodList
              uid={elt.uid}
              price={elt.nPrice}
              qty={elt.qty}
              type={elt.type}
              key={elt.id}
              id={elt.id}
              pic={elt.pic}
              eFlag={elt.eFlag}
              nQty={elt.nQty}
            />
          );
        })}
      </div>
    </section>
  );
}

export default Lists;
