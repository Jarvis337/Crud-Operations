import React, { useState } from 'react';
import postService from '../services/postService';
import { Modal, Button } from 'react-bootstrap';

function CreateComponent({ show, handleClose, handleRefresh }) {
  const [Name, setName] = useState('');
  const [Position, setPosition] = useState('');
  const [image, setImage] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('Name', Name);
    formData.append('Position', Position);
    formData.append('image', image);

    try {
      const response = await postService.create(formData);
      if (response.data.success) {
        setMessage('Post created successfully.');
        handleRefresh(); 
        handleClose(); 
      } else {
        setMessage('Failed to create post. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }

    setTimeout(() => {
      setMessage('');
    }, 2000);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Post</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <input
            type="text"
            name="Name"
            placeholder="Enter Name"
            onChange={(event) => setName(event.target.value)}
            required
            className="form-control mb-3"
          />
          <input
            type="text"
            name="Position"
            placeholder="Current Position"
            onChange={(event) => setPosition(event.target.value)}
            required
            className="form-control mb-3"
          />
          <input
            type="file"
            name="image"
            onChange={(event) => setImage(event.target.files[0])}
            className="form-control mb-3"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </Modal.Footer>
      </form>
      <p className="text-center">{message}</p>
    </Modal>
  );
}

export default CreateComponent;
