import { where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";
import {
  dataEntry,
  dataWhere,
  getDataId,
  updateData,
} from "../../dataManagement";
import { storage } from "../../firebase-config";
import EditAccount from "../EditAccount/EditAccount";
import OrderHistory from "../OrderHistory/OrderHistory";
import "./Account.css";
import ReactLoading from "react-loading";

let flag = true;
function Account({ setLogged }) {
  const [move, setMove] = useState("order-width-move");
  const [scale, setScale] = useState("scale");
  const [shade, setShade] = useState(false);
  const [block, setBlock] = useState(false);
  const [file, setFile] = useState("");
  const [img, setImg] = useState("");
  const [feedback, setFeedback] = useState("");
  const { currentUser, logout, role } = useAuth();
  const [data, setData] = useState({});
  const [history, setHistory] = useState([]);
  const [edit, setEdit] = useState("scale");
  const [update, setUpdate] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    update[0] &&
      updateData("users", currentUser.uid, ...update).then(() =>
        toast.success("update successfully")
      );
  }, [update]);

  useEffect(() => {
    setScale("null");
    const profile = async () => {
      try {
        const List = [];
        const dt = await getDataId("users", currentUser.uid);
        setImg(dt?.pic);
        List.push(dt);
        setData(List[0]);
      } catch (error) {
        console.log(error);
      }
    };
    const historyData = async () => {
      const List = await dataWhere("orders", [
        where("user_Id", "==", currentUser.uid),
      ]);
      setHistory(List);
      setLoad(false);
    };

    historyData();
    profile();
  }, []);

  useEffect(() => {
    console.log(file);

    const uploadFile = () => {
      const storageRef = ref(storage, currentUser.uid);
      console.log(storageRef);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");

          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImg(downloadURL);
            updateData("users", currentUser.uid, { pic: downloadURL });
            toast.success("profile updated");
          });
        }
      );
    };

    file && uploadFile();
  }, [file]);

  const handleLogout = async () => {
    try {
      await logout();
      setLogged(true);
    } catch (error) {
      console.log(error);
    }
  };

  function feedbacktHandling() {
    if (feedback) {
      dataEntry({ feedback, flag: true }, "feedback", currentUser.uid);
      setFeedback("");
    } else console.log("nothing");
  }
  return (
    <section className="account">
      <ToastContainer theme="colored" autoClose="3000" position="top-right" />
      {shade && <div className="shade" onClick={() => setShade(!shade)}></div>}
      {shade && (
        <div className={`div-field`}>
          <i className="fa-solid fa-comment-dots exclamation"></i>
          <div className="field">
            <textarea
              className="textarea-report"
              placeholder="write your feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            ></textarea>
          </div>
          <button className="report-submit" onClick={feedbacktHandling}>
            submit
          </button>
        </div>
      )}
      <div className="ac-container">
        <div className="feedback-dot" onClick={() => setBlock(!block)}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        {block && (
          <div
            className="feedback-btn"
            onClick={() => {
              setShade(!shade);
              setBlock(!block);
            }}
          >
            Feedback
          </div>
        )}
        <div className="heading">
          <h1 className="heading">Deli-Mate</h1>
          <p>LET'S START SAVING FOOD.</p>
        </div>
        {data && (
          <div className={`container ${scale}`}>
            <EditAccount
              edit={edit}
              setEdit={setEdit}
              setUpdate={setUpdate}
              setImage={setFile}
            />
            <div className="card">
              <div className="profile-pic">
                <img
                  src={img ? img : "./img/default_profile.png"}
                  alt="profile_pic"
                />
                <i
                  className="fa-solid fa-pen-to-square"
                  onClick={() => {
                    setEdit("null");
                    setMove("order-width-move");
                  }}
                />
              </div>
              <h1 className="profile-name">{data.name}</h1>
              <div className="account-data">
                <p>
                  <label>Phone :</label> {data.phone}
                </p>
                <p>
                  <label>Email :</label> {currentUser.email}
                </p>
                <p>
                  <label>Account :</label>{" "}
                  {role === "pending" ? "Business" : role}
                </p>
                <p className="status">
                  <label>Status :</label>{" "}
                  {role === "pending" ? "Pending...." : "Verified"}
                </p>
              </div>
              <p className="logout">
                <label onClick={handleLogout}>
                  Logout <i className="fa-solid fa-right-from-bracket"></i>
                </label>
              </p>
              <label
                className="orders"
                onClick={() => {
                  flag = !flag;
                  flag ? setMove("order-width-move") : setMove("width");
                }}
              >
                Orders <i> {`>`} </i>
              </label>
            </div>
            <div className={`order-details ${move}`}>
              {load && !history[0] && (
                <div className="loading-login">
                  <ReactLoading
                    type={"spin"}
                    color={"black"}
                    height={"20%"}
                    width={"20%"}
                  />
                </div>
              )}
              {!history[0] && !load && (
                <h1 className="noData">No Data Found</h1>
              )}
              {history.map((elt) => (
                <OrderHistory
                  sid={elt.user_Id}
                  price={elt.price}
                  date={elt.time}
                  qty={elt.qty}
                  type={elt.type}
                  bId={elt.bookId}
                  key={elt.id}
                  status={elt.status}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Account;
