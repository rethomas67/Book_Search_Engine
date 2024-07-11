//define the entities and the mutations the input type allows the data
//grouped for InputBook to be passed as a parameter to save a book
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
    saveBook(inputBook:InputBook!):User
    removeBook(bookId:ID!):User
  }
`;

module.exports = typeDefs;
