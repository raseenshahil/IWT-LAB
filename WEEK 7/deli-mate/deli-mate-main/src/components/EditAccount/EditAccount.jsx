import { sendEmailVerification } from "firebase/auth";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { auth } from "../../firebase-config";
import "../Account/Account.css";
import "./EditAccount.css";

function EditAccount({ edit, setEdit, setUpdate, setImage }) {
  const [file, setFile] = useState("");
  const [img, setImg] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [flag, setFlag] = useState(false);
  const [check, setCheck] = useState(false);
  const [email, setEmail] = useState("");
  const [licence, setLicence] = useState("");
  const pic = useRef();

  const { role, emailUpdate, logout } = useAuth();

  useEffect(() => {
    file && setImg(URL.createObjectURL(file));
  }, [file]);

  function updateHandling(e) {
    e.preventDefault();
    setFlag(false);
    if (pincode) {
      if (pincode.length < 6) {
        setFlag(true);
        return;
      }
    }
    const List = [];
    let t = {};
    username && List.push({ name: username });
    phone && List.push({ phone });
    address && List.push({ address });
    pincode && List.push({ pincode });
    check && List.push({ rBusiness: "pending" });
    licence && List.push({ licence });
    email &&
      emailUpdate(email)
        .then(() => {
          sendEmailVerification(auth.currentUser).then(() => {
            logout();
          });
        })
        .catch((e) => console.log(e));

    file && setImage(file);
    if (List[0]) {
      List.map((e) => {
        t = { ...t, ...e };
      });
      setUpdate([t]);
    }

    setAddress("");
    setUsername("");
    setFile("");
    setPincode("");
    setPhone("");
    setImg("");
    setLicence("");
  }

  return (
    <section className={`editAccount ${edit}`}>
      <form onSubmit={updateHandling}>
        <i className="fa-solid fa-xmark" onClick={() => setEdit("scale")}></i>
        <div className="card">
          {flag && <h3 className="err">pincode is not right</h3>}
          <div className="profile-pic">
            <img
              src={img ? img : "./img/default_profile.png"}
              alt="profile_pic"
            />
            <div className="edit-pic">
              <label className="edit-title">Profile : </label>
              <input
                ref={pic}
                type="file"
                id="file"
                accept="image/png , image/jpeg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <div className="edit-username-div">
              <input
                placeholder="Username"
                type="text"
                className="edit-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="edit-email-div">
              <input
                placeholder="email"
                type="emai"
                className="edit-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                pattern="^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"
                title="give proper email"
              />
            </div>
            <div className="edit-phone-div">
              <input
                placeholder="Phone"
                type="number"
                className="edit-phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            {!(role === "Business") && (
              <div className="business-new-exist">
                <input
                  type="checkbox"
                  value={check}
                  onChange={(e) => setCheck(e.target.checked)}
                />
                <p>Do you want Business Account ?</p>
              </div>
            )}
            {(role === "Business" || check) && (
              <div className="edit-textarea-div">
                <textarea
                  className="edit-textarea"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            )}
            {(role === "Business" || check) && (
              <div className="edit-pincode-div">
                <input
                  placeholder="Pincode"
                  type="number"
                  className="edit-phone"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                />
              </div>
            )}
            {check && (
              <div className="edit-pincode-div">
                <input
                  placeholder="Licence"
                  type="text"
                  className="edit-phone"
                  value={licence}
                  required
                  onChange={(e) => setLicence(e.target.value)}
                />
              </div>
            )}
            <button>Update</button>
          </div>
        </div>
      </form>
    </section>
  );
}

export default EditAccount;
