import React, { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import "./home.css";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";

function Home({ log, setLogged }) {
  const { currentUser } = useAuth();

  useEffect(() => {
    log && toast.error("Logged Out");

    return () => setLogged(false);
  }, []);

  if (currentUser?.emailVerified) {
    return <Navigate to={"/Home"} />;
  }
  return (
    <section className="start">
      <ToastContainer theme="colored" autoClose="3000" position="bottom-left" />
      <div className="container">
        <div className="head">
          <h3>Deli-Mate</h3>
        </div>
        <div className="body">
          <h1>LET'S START SAVING FOOD.</h1>
          <div className="button">
            <Link to={"/login"}>
              <button className="btn">
                <span>Login</span>
              </button>
            </Link>
            <Link to={"/Create"}>
              <button className="btn">
                <span>Create</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
