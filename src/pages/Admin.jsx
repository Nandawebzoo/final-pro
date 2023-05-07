import React, { useContext, useEffect } from "react";
import "./admin.css";
import AdminCategories from "../components/AdminCategories";
import { SessionContext } from "../App";

function Admin() {
  return (
    <>
      <div className="admin">
        <h1>Saya Admin</h1>
        <AdminCategories />
      </div>
    </>
  );
}

export default Admin;
