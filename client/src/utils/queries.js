//standardized method to interact with apollo client
import { gql } from "@apollo/client";

//logged in user book and personal attributes
export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;
