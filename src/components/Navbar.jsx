import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import LoginModal from "./LoginModal";

function Navbar() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Nav className="navbar-beg">
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
          <Nav.Link href="/admin" className="a-navbar">
            Admin
          </Nav.Link>
        </Nav.Item>
        <Button
          className="sign-in-btn"
          variant="danger"
          onClick={() => setShowModal(true)}
        >
          Sign In
        </Button>
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
