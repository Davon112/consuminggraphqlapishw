
import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id)
  }
`;

const DeletePost: React.FC = () => {
  const [id, setId] = useState('');
  const [deletePost, { data, loading, error }] = useMutation(DELETE_POST);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    deletePost({ variables: { id } });
  };

  return (
    <div>
      <h2>Delete Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="id">Post ID:</label>
          <input type="text" id="id" value={id} onChange={(e) => setId(e.target.value)} />
        </div>
        <button type="submit">Delete Post</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <p>Post deleted successfully</p>}
    </div>
  );
};

export default DeletePost;
