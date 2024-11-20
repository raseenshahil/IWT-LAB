import { serverTimestamp } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { dateTime, getDataId, updateData } from "../../dataManagement";
import "./Report.css";

function Report({ sid, uid, time, msg, id, res }) {
  const [uName, setUname] = useState("");
  const [sName, setSname] = useState("");
  const [warn, setWarn] = useState("");
  const [heightW, setHieghtW] = useState("height");
  const [heightA, setHieghtA] = useState("height");
  const [date, setDate] = useState("");

  function WarnHandling(e) {
    e.preventDefault();
    setWarn("");
    updateData("report", id, {
      warn: warn,
      warnTime: serverTimestamp(),
      flag: false,
      wFlag: true,
    });
  }
  useEffect(() => {
    setDate(dateTime(time.toDate().toString()));
    const getUname = async () => {
      const dt = await getDataId("users", uid);
      setUname(dt?.name);
    };
    const getSname = async () => {
      const dt = await getDataId("users", sid);
      setSname(dt?.name);
    };

    getUname();
    getSname();
  }, []);

  function Update() {
    updateData("users", sid, {
      rBusiness: "Normal",
    });
  }

  return (
    <section className="Report-list">
      <div className="container">
        <div className="report-body">
          <div className="heading">
            <h1>{sName}</h1>
            <i>{uName}</i>
          </div>
          <div className="date">
            <p>{date}</p>
          </div>
          <p className="msg">{msg}</p>
          {res && (
            <div className="warn-replay">
              <label>Replay : </label>
              <p>{res} </p>
            </div>
          )}
          <div className="btn">
            <button
              className="warning"
              onClick={() => {
                heightW === "height"
                  ? setHieghtW("null")
                  : setHieghtW("height");
                setHieghtA("height");
              }}
            >
              Warning
            </button>
            <button
              className="action"
              onClick={() => {
                heightA === "height"
                  ? setHieghtA("null")
                  : setHieghtA("height");
                setHieghtW("height");
              }}
            >
              Action
            </button>
          </div>
          <form>
            <div className={`msg-area ${heightW}`}>
              <textarea
                className="warning"
                required
                value={warn}
                onChange={(e) => setWarn(e.target.value)}
              ></textarea>
              <button onClick={WarnHandling}>sent</button>
            </div>
          </form>
          <div className={`action-div ${heightA}`}>
            <p>Are you sure to remove this business account ?</p>
            <i
              className="fa-solid fa-check"
              onClick={() => {
                Update();
                updateData("report", id, {
                  cancelTime: serverTimestamp(),
                  flag: false,
                });
              }}
            ></i>
            <i
              className="fa-solid fa-xmark"
              onClick={() => {
                updateData("report", id, {
                  cancelTime: serverTimestamp(),
                  flag: false,
                });
              }}
            ></i>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Report;
