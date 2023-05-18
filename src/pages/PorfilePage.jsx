import React, { useState, useContext } from "react";
import { Button, Container, Form, InputGroup, Modal } from "react-bootstrap";
import { SessionContext } from "../App";
import EditProfileModal from "../components/EditProfileModal";
import Card from "react-bootstrap/Card";
import "./profilePage.css";

function ProfilePage() {
  const [showModal, setShowModal] = useState(false);
  const session = useContext(SessionContext);

  return (
    <>
      <div>
        <Card className="container-profile">
          <Card.Img
            variant="top"
            src={session?.userDetails?.profilePictureUrl}
          />
          <Card.Body>
            <Card.Title className="profile-name">
              {session?.userDetails?.name}
            </Card.Title>
            <Card.Text>{session?.userDetails?.email}</Card.Text>
            <Card.Text>{session?.userDetails?.phoneNumber}</Card.Text>

            <Button
              className="edit-profile-button"
              onClick={() => setShowModal(true)}
            >
              Edit Profile
            </Button>
          </Card.Body>
        </Card>

        <EditProfileModal show={showModal} onHide={() => setShowModal(false)} />
      </div>
    </>
  );
}

export default ProfilePage;
