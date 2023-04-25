import React, { useEffect, useState } from "react";
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

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<AppShell />}>
        <Route index element={<Homepage />} />
        <Route path="Activities" element={<Activities />} />
        <Route path="Admin" element={<Admin />} />
      </Route>
    </>
  )
);

function App() {
  const [banners, setBanners] = useState([]);
  useEffect(() => {
    const fetchBanner = async () => {
      const response = await axios.get(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/banners`,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );

      console.log(response);
      setBanners(response.data.data);
    };

    fetchBanner();
  }, []);

  const items = banners.map((banner) => (
    <div key={banner.id} className="item" data-value={banner.id}>
      <img src={`${banner.imageUrl}`} alt={banner.name} className="poster" />
      <h2 className="title">{banner.name}</h2>
    </div>
  ));

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
