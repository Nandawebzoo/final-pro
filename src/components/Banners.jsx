import React from "react";

function Banners() {
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

      setBanners(response.data.data);
    };

    fetchBanner();
  }, []);
  return (
    <>
      {banners.map((banner) => (
        <div key={banner.id} className="item" data-value={banner.id}>
          <img
            src={`${banner.imageUrl}`}
            alt={banner.name}
            className="poster"
          />
          <h2 className="title">{banner.name}</h2>
        </div>
      ))}
    </>
  );
}

export default Banners;
