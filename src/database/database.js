import Sequelice from "sequelize";


export const sequelize = new Sequelice(
  "bd_sequelize",
  "postgres",
  "13991987Ft",
  {
    host: "localhost", 
    dialect: "postgres",
    logging: false,
  }
);

// para docker
// export const sequelize = new Sequelice(
//   "bd_sequelize",
//   "root", // "postgres",
//   "root", //"13991987Ft",
//   {
//     host: "postgres", //host: "localhost"
//     dialect: "postgres",
//     logging: false,
//   }
// );


