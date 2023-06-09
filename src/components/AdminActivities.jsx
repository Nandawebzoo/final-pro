import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import EditActivityModal from "../components/EditActivityModal";
import AddActivityModal from "../components/AddActivityModal";
import { travelService } from "../services/travelService";
import DeleteActivityModal from "../components/DeleteActivityModal";

function AdminActivities() {
  const [activities, setActivities] = useState([]); // There is useState to store categories array
  const [showModal, setShowModal] = useState(false);
  const [editActivity, setEditActivity] = useState(null);
  const [showAddActivityModal, setShowAddActivityModal] = useState(false);
  const [deleteActivity, setDeleteActivity] = useState(null);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    const activities = await travelService.getActivities();

    setActivities(activities); // set the data and store it in the state
  };

  const edit = (activity) => {
    setEditActivity(activity);
    setShowModal(true);
  };

  const add = () => {
    setShowAddActivityModal(true);
  };

  const onHideActivity = (activity) => {
    if (activity) {
      const index = activities.findIndex((x) => x.id === activity.id);

      const newActivities = [...activities];
      newActivities[index] = activity;

      setActivities(newActivities);
    }

    setShowModal(false);
  };

  return (
    <>
      <div className="add-activity-btn">
        <Button onClick={() => add(true)}>Add Activities</Button>
      </div>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th className="hide-sx">Image</th>
            <th className="hide-sx">Category</th>
            <th className="hide-sx">Price</th>
            <th className="hide-sx">Rating</th>
            <th className="hide-sx">City</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {activities.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.title}</td>
              <td className="hide-sx">
                <img
                  className="img-admin"
                  src={item.imageUrls[0]}
                  style={{ width: 100 }}
                />
              </td>
              <td className="hide-sx">{item.category?.name}</td>
              <td className="hide-sx">{item.price}</td>
              <td className="hide-sx">{item.rating}</td>
              <td className="hide-sx">{item.city}</td>
              <td className="activity-edit-btn">
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <Button variant="warning" onClick={() => edit(item)}>
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => setDeleteActivity(item)}
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <EditActivityModal
        show={showModal}
        onHide={(activity) => onHideActivity(activity)}
        activity={editActivity}
      />
      <AddActivityModal
        show={showAddActivityModal}
        onHide={(success) => {
          if (success === true) {
            fetchActivities(); // update the list
          }
          setShowAddActivityModal(false);
        }}
      />
      <DeleteActivityModal
        show={deleteActivity !== null}
        onHide={(activityId) => {
          if (activityId) {
            const newActivities = activities.filter(
              (activity) => activity.id !== activityId
            );
            setActivities(newActivities);
          }

          setDeleteActivity(null);
        }}
        activity={deleteActivity}
      />
    </>
  );
}
export default AdminActivities;
