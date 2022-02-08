import { string, validate } from "joi";
import { Schema, model } from "mongoose";
import { sign } from "jsonwebtoken";


const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 5,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  emailToken: {
    type: String,
    default: "Elixia",
  },
  accessToken: [
    {
      type: String,
    },
  ],
});

userSchema.methods.generateAuthToken = function () {
  const token = sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
    },
    process.env.jwtPrivateKey
  );
  return token;
};
const User = model("User", userSchema);

function validateUser(user) {
  const schema = {
    name: string().min(3).max(50).required(),
    email: string().min(5).max(100).required().email(),
    password: string().min(6).max(500).required(),
  };
  return validate(user, schema);
}


export { User as User };
export const validate = validateUser;
