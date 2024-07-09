import { gql } from "urql";

export const CREATE_ALBUM = gql`
  mutation CreateAlbum($title: String!, $userId: ID!) {
    createAlbum(input: { title: $title, userId: $userId }) {
      id
      title
      user {
        id
        name
      }
    }
  }
`;

export const UPDATE_POST = gql`
mutation UpdatePost($id: ID!, $title: String!, $body: String!) {
  updatePost(id: $id, input: { title: $title, body: $body }) {
    id
    title
    body
  }
}
`;

export const DELETE_POST = gql`
mutation DeletePost($id: ID!) {
  deletePost(id: $id)
}

`
