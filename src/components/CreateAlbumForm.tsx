import { useMutation } from "@apollo/client";
import { CREATE_ALBUM } from "../mutations/Mutations";
import { FormEvent, useRef } from "react";
import { Alert, Container, Form, Spinner, Button } from "react-bootstrap";

const CreateAlbumForm = () => {
  // useRef will make a reference to an element in our application
  // in this case, useRef will get the value of what is inside our input fields
  // a benefit we gain is that useRef will NOT cause a rerender when our data changes as opposed to useState
  // you CAN also use useState like we've been!!!
  const inputTitle = useRef<HTMLInputElement>(null);
  const inputUserId = useRef<HTMLInputElement>(null);

  // useMutation gives us access to the mutate function that we can call to perform our mutation
  // it also gives us back data, loading, and error like with use query
  // in this case, createAlbum is our mutate function that we can call whenever we want
  const [createAlbum, { data, loading, error }] = useMutation(CREATE_ALBUM);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (inputTitle.current && inputUserId.current) {
        createAlbum({
            variables: {
                title: inputTitle.current.value,
                userId: inputUserId.current.value
            }
        })
        inputTitle.current.value = "";
        inputUserId.current.value = "";
    }
  };

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return (
      <Alert variant="danger" dismissible>
        <Alert.Heading>ERROR</Alert.Heading>
        <p>{error.message}</p>
      </Alert>
    );
  }



  return (
    <Container>
    <h1>Create Album</h1>
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="albumTitle">
        <Form.Label>Title: </Form.Label>
        {/* set our useRef for our input field to be associated with inputTitle*/}
        <Form.Control type="text" placeholder="Enter album title" ref={inputTitle}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="userId">
        <Form.Label>UserId: </Form.Label>
        <Form.Control type="text" placeholder="Enter user Id" ref={inputUserId}/>
      </Form.Group>

      <Button type="submit">
          Create Album
      </Button>
    </Form>
    {data && data.createAlbum && (
        <div>
            <h2>New Album: {data.createAlbum.title}</h2>
            <p>Album Id: {data.createAlbum.id}</p>
            <p>User Id:</p>
            <p>User Name:</p>
        </div>
    )}
  </Container>
  );
};

export default CreateAlbumForm;
