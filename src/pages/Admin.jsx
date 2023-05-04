import React from "react";
import "./admin.css";
import AdminCategories from "../components/AdminCategories";

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
