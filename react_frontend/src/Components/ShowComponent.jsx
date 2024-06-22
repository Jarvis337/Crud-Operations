import { useState, useEffect } from "react";
import postService from "../services/postService";
import UpdateModelComponent from "./UpdateModelComponent";
import CreateComponent from "./CreateComponent";
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function ShowComponent() {
  const [posts, setPosts] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const fetchPosts = async () => {
    const result = await postService.getPosts();
    setPosts(result.data.data || []);
  };

  useEffect(() => {
    fetchPosts();
  }, [posts]);

  const deletePost = async (id) => {
    var response = await postService.deletePost(id);
    if (response.data.success) {
      // alert(response.data.msg);
      setPosts(posts.filter(post => post._id !== id));
    } else {
      alert(response.data.msg);
    }
  };

  return (
    <div className="App">
      <h1>Employee Post Details</h1>
      <Button variant="primary" onClick={() => setShowCreateModal(true)}>
        Create
      </Button>
      {posts.length > 0 && (
        <table style={{ width: '100%' }} border='1'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Image</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
              <tr key={post._id}>
                <td>{post.Name}</td>
                <td>{post.Position}</td>
                <td>
                  <img src={'http://127.0.0.1:8000/api/postImages/' + post.image} style={{ width: '100px', height: '100px' }} alt={post.Name} />
                </td>
                <td>
                  <Button variant="danger" onClick={() => deletePost(post._id)}>Delete</Button>
                </td>
                <td>
                  <UpdateModelComponent id={post._id} Name={post.Name} Position={post.Position} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <CreateComponent show={showCreateModal} handleClose={() => setShowCreateModal(false)} handleRefresh={fetchPosts} />
    </div>
  );
}

export default ShowComponent;
