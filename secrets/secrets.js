import {} from "dotenv/config";

export default {
  port: process.env.PORT,
  mongo_url: process.env.MONGO_URL,
  jwt_secret: process.env.JWT_SECRET,
};
