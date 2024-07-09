// Posts.tsx
import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_POSTS = gql`
  query GetPosts {
    posts {
        data{
          id
          title
          body
          user{
            id
          }
        }
  }
  }
`;

const Posts: React.FC = () => {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
    <h2>Posts</h2>
    <ul>
      {data.posts.data.map((post: { id: string; userId: string; title: string; body: string }, index: number) => (
        <li key={index}>
          <h3>{post.title}</h3>
          <p><strong>Post ID:</strong> {post.id}</p>
          <p><strong>User ID:</strong> {post.userId}</p>
          <p>{post.body}</p>
        </li>
      ))}
    </ul>
  </div>
);
};

export default Posts;
