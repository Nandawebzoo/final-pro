import React, { useState, useContext } from "react";
import { Button, Container, Form, InputGroup, Modal } from "react-bootstrap";
import { SessionContext } from "../App";
import EditProfileModal from "../components/EditProfileModal";

function ProfilePage() {
  const [showModal, setShowModal] = useState(false);
  const session = useContext(SessionContext);

  return (
    <>
      <Container>
        <div>
          <img
            alt="Profile Picture"
            src={session?.userDetails?.profilePictureUrl}
          />
        </div>
        <h1>{session?.userDetails?.name}</h1>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Edit Profile
        </Button>
      </Container>
      <EditProfileModal show={showModal} onHide={() => setShowModal(false)} />
    </>
  );
}

export default ProfilePage;
