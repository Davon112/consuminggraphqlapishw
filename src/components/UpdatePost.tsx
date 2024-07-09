
import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const UPDATE_POST = gql`
  mutation UpdatePost($id: ID!, $title: String!, $body: String!) {
    updatePost(id: $id, input: { title: $title, body: $body }) {
      id
      title
      body
    }
  }
`;

const UpdatePost: React.FC = () => {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [updatePost, { data, loading, error }] = useMutation(UPDATE_POST);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePost({ variables: { id, title, body } });
  };

  return (
    <div>
      <h2>Update Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="id">Post ID:</label>
          <input type="text" id="id" value={id} onChange={(e) => setId(e.target.value)} />
        </div>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label htmlFor="body">Body:</label>
          <textarea id="body" value={body} onChange={(e) => setBody(e.target.value)} />
        </div>
        <button type="submit">Update Post</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div>
          <h3>Post Updated</h3>
          <p>
            <strong>ID:</strong> {data.updatePost.id}
          </p>
          <p>
            <strong>Title:</strong> {data.updatePost.title}
          </p>
          <p>
            <strong>Body:</strong> {data.updatePost.body}
          </p>
        </div>
      )}
    </div>
  );
};

export default UpdatePost;
