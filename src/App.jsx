import React, { useEffect, useState } from "react";
import axios from "axios";

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
      <h1>Vite + React</h1>
      <div className="card">
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      {items}
    </>
  );
}

export default App;
