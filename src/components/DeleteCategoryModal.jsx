import React, { useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import { SessionContext } from "../App";
import { travelService } from "../services/travelService";

function DeleteCategoryModal({ show, onHide, category }) {
  const session = useContext(SessionContext);

  const deleteCategory = async () => {
    try {
      await travelService.deleteCategory(category.id, session.token);
      onHide();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Category</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {`Are you sure you want to delete the category '${category?.name}'? 😒`}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={deleteCategory}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteCategoryModal;
