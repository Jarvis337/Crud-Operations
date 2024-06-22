import { useState } from "react";
import { Modal, Button } from 'react-bootstrap';
import PostService from "../services/postService";

function UpdateModelComponent(props){
  const [isShow, invokeModal] = useState(false);
  const initModal = ()=>{
    return invokeModal(!isShow);
  }

  //form updation data
  const [Name, setName] = useState(props.Name);
  const [Position, setPosition] = useState(props.Position);
  const [id, setId] = useState(props.id);
  const [selectedFile, setSelectedFile] = useState('');
  
  const handleSubmit = async(event)=>{
    event.preventDefault();

    const formData = new FormData();
    formData.append('id',id);
    formData.append('Name',Name);
    formData.append('Position',Position);

    if(selectedFile != '' && selectedFile.length != 0){
      formData.append('image', selectedFile);
    }

    const response = await PostService.update(formData);
    if(response.data.success == true){
      // alert(response.data.msg)
    }
    else{
      alert(response.data.msg);
    }
    initModal();
  }

    

  return(
    <>
    <Button variant="success" onClick={initModal}>
      Edit
    </Button>

    <Modal show={isShow}>
      <Modal.Header closeButton onClick={initModal}>
    <Modal.Title>Update Post</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          
          <input type="text"
                  name="Name"
                  placeholder="Enter Your Name"
                  value={Name}
                  onChange={event => setName(event.target.value)}
                  required/>
                  <br></br>

           <input type="text"
                  name="Position"
                  placeholder="Current Position"
                  value={Position}
                  onChange={event => setPosition(event.target.value)}
                  required/>
                  <br></br>

            <input type="file"
                  name="file"
                  onChange={event => setSelectedFile(event.target.files[0])}
                  />
                  
        </Modal.Body>


      <Modal.Footer>
        <Button variant="danger" onClick={initModal}>
          Close
        </Button>
        <Button type="submit" variant="dark">
          Update
        </Button>
      </Modal.Footer>
    </form>

    </Modal>

    </>
  )
}
export default UpdateModelComponent;