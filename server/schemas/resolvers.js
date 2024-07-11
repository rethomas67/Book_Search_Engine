//const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    //query for the user
    me: async (parent, args, context) => {
      if (context.user) {
        data = await User.findOne({ _id: context.user._id }); //.select(
        //"-__v -password"
        //);
        return data;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
  //CRUD methods to signup, login, add a book, remove a book
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (_parent, { email, password }, context) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError(
          "User not found. Do you have an account?"
        );
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials!");
      }

      const token = signToken(user);

      return { token, user };
    },
    //check if the user is logged in and add/remove a book from the list
    saveBook: async (parent, { addBook }, context) => {
      if (context.user) {
        const addBook = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: addBook } },
          { new: true }
        );
        return addBook;
      }
      throw new AuthenticationError("You need to be loggedin!");
    },
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const deleteBook = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
        return deleteBook;
      }
      throw new AuthenticationError("You need to be loggedin!");
    },
  },
};

module.exports = resolvers;
