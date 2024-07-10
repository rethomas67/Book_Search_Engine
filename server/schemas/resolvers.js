//const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      //console.log(context);
      console.log(context.user);
      if (context.user) {
        data = await User.findOne({ _id: context.user._id }); //.select(
        //"-__v -password"
        //);
        return data;
      }
      //throw new AuthenticationError("You need to be logged in!");
    },
  },
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
      console.log(context.user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
