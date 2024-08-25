import { Query } from "./Query";
import { Mutation } from "./Mutation/Mutation";

export const resolvers = {
  Query,
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
