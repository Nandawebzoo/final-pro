import React, { useEffect, useState, createContext } from "react";
import axios from "axios";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import Activities from "./pages/Activities";
import Admin from "./pages/Admin";
import Homepage from "./pages/Homepage";
import AppShell from "./components/Appshell";
import "bootstrap/dist/css/bootstrap.min.css";
import RegisterPage from "./components/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import ActivityPage from "./pages/ActivityPage";
import Promos from "./components/Promos";
import PromoPage from "./pages/PromoPage";

export const SessionContext = createContext(null);

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<AppShell />}>
        <Route index element={<Homepage />} />
        <Route path="activities" element={<Activities />} />
        <Route path="admin" element={<Admin />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="activities/:activityId" element={<ActivityPage />} />
        <Route path="promos" element={<Promos />} />
        <Route path="promos/:promoId" element={<PromoPage />} />
      </Route>
    </>
  )
);

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      getUserDetails(token);
    }
  }, []);

  async function getUserDetails(token) {
    try {
      const response = await axios.get(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/user`,
        {
          headers: {
            apiKey: import.meta.env.VITE_API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const userDetails = response.data.data;
      setSession({ token, userDetails });
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <SessionContext.Provider value={session}>
        <RouterProvider router={router} />
      </SessionContext.Provider>
    </>
  );
}

export default App;
