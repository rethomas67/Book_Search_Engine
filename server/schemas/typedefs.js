//const { gql } = require("apollo-server-express");
const typeDefs = `
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    bookCount: Int
    savedBooks: [Book]
  }
  type Auth {
    token: ID!
    user: User
  }
  type Book {
    bookId: ID!
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }
  input InputBook {
    bookId: ID!
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }
  type Query {
    me: User
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(addBook:InputBook!):User
    removeBook(bookId:String!):User
  }
`;

module.exports = typeDefs;