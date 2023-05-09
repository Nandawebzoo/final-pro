import React, { useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import { SessionContext } from "../App";
import { travelService } from "../services/travelService";

function DeleteActivityModal({ show, onHide, activity }) {
  const session = useContext(SessionContext);

  const deleteActivity = async () => {
    try {
      await travelService.deleteActivity(activity.id, session.token);
      onHide(activity.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Activity</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {`Are you sure you want to delete the activity '${activity?.title}'? 😒`}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={deleteActivity}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteActivityModal;
