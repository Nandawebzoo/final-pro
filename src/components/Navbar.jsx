import React, { useState, useContext } from "react";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import LoginModal from "./LoginModal";
import { SessionContext } from "../App";
import { useNavigate } from "react-router-dom";
("./index.css");

function Navbar() {
  const [showModal, setShowModal] = useState(false);
  const session = useContext(SessionContext);
  const navigate = useNavigate();

  function signOut() {
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  return (
    <>
      <Nav className="navbar-beg">
        <div>
          <Nav.Item>
            <img src="/img/fix.png" alt="trafix" className="logo-img" />
          </Nav.Item>
        </div>
        <div className="nav-links">
          <Nav.Item>
            <Nav.Link href="/" className="a-navbar">
              Homepage
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/activities" className="a-navbar">
              Activities
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            {session !== null && session.userDetails.role === "admin" && (
              <Nav.Link href="/admin" className="a-navbar">
                Admin
              </Nav.Link>
            )}
          </Nav.Item>
        </div>
        <div className="nav-actions">
          {session?.userDetails && (
            <Button
              className="btn-profile-user"
              onClick={() => navigate("/profile")}
            >
              {session?.userDetails.profilePictureUrl ? (
                <img
                  title={session.userDetails.name}
                  src={session.userDetails.profilePictureUrl}
                  className="profile-user"
                />
              ) : (
                <>😎</>
              )}
            </Button>
          )}
          {session !== null ? (
            <Button className="sign-in-btn" variant="primary" onClick={signOut}>
              Log Out
            </Button>
          ) : (
            <Button
              className="sign-in-btn"
              variant="danger"
              onClick={() => setShowModal(true)}
            >
              Log In
            </Button>
          )}
        </div>
      </Nav>
      <LoginModal show={showModal} onHide={() => setShowModal(false)} />
    </>
  );
}

export default Navbar;
