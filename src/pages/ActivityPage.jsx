import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./activitiesPage.css";

function ActivityPage() {
  const [activity, setActivity] = useState(); // useState undefined
  let { activityId } = useParams();

  useEffect(() => {
    //fetch activity
    getActivity(activityId);
  }, [activityId]);

  const getActivity = async (id) => {
    const response = await axios.get(
      `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activity/${id}`,
      {
        headers: {
          apiKey: import.meta.env.VITE_API_KEY,
        },
      }
    );

    setActivity(response.data.data);
  };

  return (
    <>
      <section className="container-activity-page">
        <img alt="Activity Picture" src={activity?.imageUrls[0]} />
        <div className="article2">
          <h1>{activity?.title}</h1>
          <div>
            <h4>Rating: {activity?.rating}</h4>
            <h4>Total Reviews: {activity?.total_reviews}</h4>
          </div>
          <div className="prices">
            <p>{activity?.description}</p>
            <span className="price-discount">{activity?.price_discount}</span>
            <span className="price-before-discount">{activity?.price}</span>
          </div>
        </div>
      </section>
    </>
  );
}

export default ActivityPage;
