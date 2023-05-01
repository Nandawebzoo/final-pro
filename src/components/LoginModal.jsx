import React from "react";
import { Modal, Button } from "react-bootstrap";

function LoginModal({ show, onHide }) {
  async function signIn() {
    try {
      // Get request token
      const response = await axios.get(
        `https://api.themoviedb.org/3/authentication/token/new?api_key=${
          import.meta.env.VITE_TMDB_API_KEY
        }`
      );
      const requestToken = response.data.request_token;

      // Forward the user to the TMDB login page
      window.location.href = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${window.location.origin}/authenticated`;
    } catch (error) {
      console.error(error);
    }
  }

  async function signOut() {
    try {
      await axios.delete(
        `https://api.themoviedb.org/3/authentication/session?api_key=${
          import.meta.env.VITE_TMDB_API_KEY
        }`,
        {
          data: {
            session_id: localStorage.getItem("sessionId"),
          },
        }
      );

      localStorage.removeItem("sessionId");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Modal show={show} onHide={() => onHide()} className="movie-modal">
        <Modal.Body>
          <button
            type="button"
            className="btn-close"
            onClick={() => onHide()}
            aria-label="Close"
          />
          Login
        </Modal.Body>
      </Modal>
    </>
  );
}

export default LoginModal;
