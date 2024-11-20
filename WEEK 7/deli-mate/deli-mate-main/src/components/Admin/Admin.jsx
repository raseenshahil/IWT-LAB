import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import FList from "../../page/FList";
import RepList from "../../page/RepList";
import RList from "../../page/RList";
import "./Admin.css";

function Admin() {
  return (
    <section className="Admin">
      <div className="container">
        <div className="navbar">
          <h1>Admin Panel</h1>
          <div className="add-booked">
            <ul>
              <Link to={"/Admin/"}>
                <li>Request</li>
              </Link>
              <li>
                <Link to={"/Admin/report"}>Report</Link>
              </li>
              <li>
                <Link to={"/Admin/feedback"}>Feedback</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="body-Admin">
          <Routes>
            <Route path="/">
              <Route index element={<RList />} />
              <Route path="report" element={<RepList />} />
              <Route path="feedback" element={<FList />} />
            </Route>
          </Routes>
        </div>
      </div>
    </section>
  );
}

export default Admin;
