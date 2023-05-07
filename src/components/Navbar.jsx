import React, { useState, useContext } from "react";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import LoginModal from "./LoginModal";
import { SessionContext } from "../App";

function Navbar() {
  const [showModal, setShowModal] = useState(false);
  const session = useContext(SessionContext);

  function signOut() {
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  return (
    <>
      <Nav className="navbar-beg">
        <div>
          <Nav.Item>✈️</Nav.Item>
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
          <Button>
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

/* {session?.userDetails.avatar.tmdb.avatar_path && (
              <img
                title={session.userDetails.username}
                src={`https://image.tmdb.org/t/p/w500${session.userDetails.avatar.tmdb.avatar_path}`}
                className="avatar-prof"
              />
            )}
            {session !== null ? (
              <Button className="btn-sign" variant="primary" onClick={signOut}>
                Sign Out
              </Button>
            ) : (
              <Button className="btn-sign" variant="primary" onClick={signIn}>
                Sign In
              </Button>
            )} 
    
            
}*/

export default Navbar;
