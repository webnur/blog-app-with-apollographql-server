import { Query } from "./Query";
import { Mutation } from "./Mutation/Mutation";
import { Post } from "./post";
import { User } from "./user";

export const resolvers = {
  Query,
  Post,
  User,
  Mutation,
};

// mutation {
//   signup(name: "enamul", email: "enamul@com", password: "12345") {
//     token

//   }
// }

// mutation{
//   signin(email: "enamul@com", password: "12345") {

//   }
// }
