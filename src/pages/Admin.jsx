import React, { useContext, useEffect } from "react";
import "./admin.css";
import AdminCategories from "../components/AdminCategories";
import { SessionContext } from "../App";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import AdminActivities from "../components/AdminActivities";

function Admin() {
  return (
    <>
      <div className="admin">
        <h1>Admin</h1>
        <Tabs defaultActiveKey="category" className="mb-3 tab-admin" fill>
          <Tab eventKey="category" title="Categories">
            <AdminCategories />
          </Tab>
          <Tab eventKey="activity" title="Activities">
            <AdminActivities />
          </Tab>
        </Tabs>
      </div>
    </>
  );
}

export default Admin;
