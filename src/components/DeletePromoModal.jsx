import React, { useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import { SessionContext } from "../App";
import { travelService } from "../services/travelService";

function DeletePromoModal({ show, onHide, promo }) {
  const session = useContext(SessionContext);

  const deletePromo = async () => {
    try {
      await travelService.deletePromo(promo.id, session.token);
      onHide(promo.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Promo</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {`Are you sure you want to delete the promo '${promo?.title}'? 😒`}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={deletePromo}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeletePromoModal;
