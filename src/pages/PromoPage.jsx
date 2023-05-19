import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./promoPage.css";

function PromoPage() {
  const [promo, setPromo] = useState();
  let { promoId } = useParams();

  useEffect(() => {
    getPromos(promoId);
  }, [promoId]);

  const getPromos = async (id) => {
    const response = await axios.get(
      `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promo/${id}`,
      {
        headers: {
          apiKey: import.meta.env.VITE_API_KEY,
        },
      }
    );

    setPromo(response.data.data);
  };

  return (
    <>
      <div>
        <section className="container-promo-page">
          <img alt="Promo Picture" src={promo?.imageUrl} />
          <div className="article2">
            <h1>{promo?.title}</h1>
            <div>
              <h3>Promo Code: {promo?.promo_code}</h3>
              <h4>Discount Price: {promo?.promo_discount_price}</h4>
              <h4>Minimum Claim: {promo?.minimum_claim_price}</h4>
            </div>
            <div className="prices">
              <p>{promo?.description}</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default PromoPage;
