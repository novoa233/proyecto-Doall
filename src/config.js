import { config } from "dotenv";
config();

const configurations = {
  PORT: process.env.PORT || 3000,
  POSTGRES_HOST: process.env.POSTGRES_HOST ||"localhost",
  POSTGRES_DATABASE: process.env.POSTGRES_DB || "bd_sequelize",
  POSTGRES_USER: process.env.POSTGRES_USER || "postgres",
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || "13991987Ft"

};
export default configurations;


/////parar docker
// const configurations = {
//   PORT: process.env.PORT || 3000,
//   POSTGRES_HOST: process.env.POSTGRES_HOST || "postgres", 
//   POSTGRES_DATABASE: process.env.POSTGRES_DB || "bd_sequelize",
//   POSTGRES_USER: process.env.POSTGRES_USER || "root", 
//   POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || "root" 
// };
// export default configurations;