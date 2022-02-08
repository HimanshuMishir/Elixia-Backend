import jwt from "jsonwebtoken";
import secrets from "../secrets/secrets";
import { User } from "../models/users";
require("dotenv").config;

export default async function (req, res, next) {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).send("Access denied");

  try {
    const decoded = verify(token, process.env.jwtPrivateKey);
    userData = await User.findById(decoded._id);
    if (!userData.accessToken.includes(token)) {
      throw new Error();
    }
    req.user = decoded;
    next();
  } catch (err) {
    return res
      .status(403)
      .json({ message: "Invalid token. please login again!" });
  }
}
