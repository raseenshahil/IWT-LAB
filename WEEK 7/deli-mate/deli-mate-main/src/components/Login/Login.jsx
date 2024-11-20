import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./login.css";

function Login({ setLogged }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [eyeSize1, setEyeSize1] = useState("hide-eye");
  const [eyeSize2, setEyeSize2] = useState("show-eye");
  const [flag, setFlag] = useState(false);
  const { login } = useAuth();
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");

  const navigate = useNavigate();

  const submitHandle = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/Home", { replace: true });
      setLogged(true);
    } catch (error) {
      setColor("err");
      if (error.message.search("invalid-email") > 0) {
        setMessage("Invalid Email");
      } else if (error.message.search("wrong-password") > 0) {
        setMessage("Wrong Password");
      } else if (error.message.search("user-not-found") > 0) {
        setMessage("User Not Found");
      } else {
        setMessage("Something Wrong");
        console.log(error.message);
      }
    }
  };
  const { resetPassword } = useAuth();

  const handleForgotPassword = async () => {
    try {
      if (email) {
        await resetPassword(email);
        setColor("rmd");
        setMessage("Please check your email for further instructions");
      } else {
        setColor("err");
        setMessage("Please enter the email");
      }
    } catch (error) {
      setColor("err");
      setMessage("Enter a vailid email");
    }
  };
  const eyeShow = (e) => {
    if (flag) {
      setEyeSize1("hide-eye");
      setFlag(!flag);
      setEyeSize2("show-eye");
    } else {
      setEyeSize1("show-eye");
      setFlag(!flag);
      setEyeSize2("hide-eye");
    }
  };

  return (
    <section className="login">
      <div className="bg-img"></div>
      <div className="login-box">
        <span className="heading">Deli-Mate</span>
        {message && <p className={`wrn-msg ${color}`}>{message}</p>}
        <form onSubmit={submitHandle} className="form login-form">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <i
            className={`fa-solid fa-eye show-hide ${eyeSize1}`}
            onClick={eyeShow}
          ></i>
          <i
            className={`fa-sharp fa-solid fa-eye-slash show-hide ${eyeSize2}`}
            onClick={eyeShow}
          ></i>
          <input
            type={flag ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button>Login</button>
          <div className="login-other">
            <span onClick={handleForgotPassword}>forgot password?</span>
            <span>
              <Link to="/create">
                <span>create account</span>
              </Link>
            </span>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;
