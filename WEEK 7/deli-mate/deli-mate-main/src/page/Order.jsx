import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Booking from "../components/Booking/Booking";
import Review from "../components/Review/Review";
import SelfReview from "../components/SelfReview/SelfReview";
import { useAuth } from "../contexts/AuthContext";
import { getDataId } from "../dataManagement";
import { db } from "../firebase-config";
import ReactLoading from "react-loading";

let height;

function Order() {
  const { currentUser } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [sid, setSid] = useState("");

  const getName = async (id) => {
    const dt = await getDataId("users", id);
    dt && setName(dt.name);
    dt && setImg(dt.pic);
    dt && setAddress(dt.address);
  };

  useEffect(() => {
    let unsub;
    try {
      unsub = onSnapshot(doc(db, "Foodlistings", id), (docs) => {
        if (!docs.data()) {
          navigate("*");
        }
        setSid(docs.data().user_Id);
        setData({ id: docs.id, ...docs.data() });
        getName(docs.data().user_Id);
      });
    } catch (e) {
      console.log(e);
    }
    return unsub;
  }, []);

  useEffect(() => {
    let unsub;
    if (sid) {
      const q = query(collection(db, "reviews"), where("sid", "==", sid));
      unsub = onSnapshot(
        q,
        (snapshot) => {
          const List = [];
          snapshot.docs.forEach((doc) => {
            List.push({ uid: doc.data().user_Id, id: doc.id, ...doc.data() });
            setReviews(List);
          });
        },
        (error) => {
          console.log(error);
        }
      );
    }

    return unsub;
  }, [sid]);

  const [repClick, setRipClick] = useState(false);
  const [bk, setBk] = useState(false);
  const [data, setData] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [img, setImg] = useState("");
  bk || repClick ? (height = "bg-height") : (height = "null");
  return (
    <section className={`order ${height}`}>
      {!data && (
        <div className="loading-login">
          <ReactLoading
            type={"spin"}
            color={"rgb(100, 140, 127)"}
            height={"10%"}
            width={"10%"}
          />
        </div>
      )}
      {data && (
        <div className="Booking">
          <Booking
            setRepClick={setRipClick}
            repClick={repClick}
            price={data.price}
            qty={Number(data.qty)}
            nQty={Number(data.nQty)}
            type={data.type}
            sid={data.user_Id}
            nPrice={data.nPrice}
            name={name}
            pic={img}
            id={data.id}
            address={address}
            setBk={setBk}
          />
        </div>
      )}
      {data && (
        <div className="reviews">
          {reviews.map((elt) => {
            return (
              <Review
                msg={elt.msg}
                id={elt.id}
                uid={elt.user_Id}
                date={elt.time}
                rate={elt.rate}
                key={elt.id}
              />
            );
          })}
        </div>
      )}
      {sid !== currentUser.uid && data && (
        <div className="reviewing">
          <SelfReview sid={data.user_Id} />
        </div>
      )}
    </section>
  );
}

export default Order;
