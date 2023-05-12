import React, { useState, useContext } from "react";
import { Button, Container, Form, InputGroup, Modal } from "react-bootstrap";
import { SessionContext } from "../App";
import EditProfileModal from "../components/EditProfileModal";
import "./profilePage.css";

function ProfilePage() {
  const [showModal, setShowModal] = useState(false);
  const session = useContext(SessionContext);

  return (
    <>
      <Container>
        <div className="profile-picture">
          <img
            alt="Profile Picture"
            src={session?.userDetails?.profilePictureUrl}
          />
        </div>
        <h1 className="profile-name">{session?.userDetails?.name}</h1>
        <button
          className="edit-profile-button"
          onClick={() => setShowModal(true)}
        >
          Edit Profile
        </button>
      </Container>
      <EditProfileModal show={showModal} onHide={() => setShowModal(false)} />
    </>
  );
}

export default ProfilePage;
