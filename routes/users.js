import express from "express";
import { getpassword, CreateUser, Getuserbyname } from "../helper.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

//signup using post method//
router.post("/signup", async (request, response) => {
  const { email, password } = request.body;
  const userfromdb = await Getuserbyname(email);
  console.log(userfromdb);
  if (userfromdb) {
    response.status(401).send({ messaage: "Email_id already exist" });
    return;
  }
  if (password.length < 8) {
    response.status(401).send({ messsage: "Password must be longer" });
    return;
  }
  const hashedpassword = await getpassword(password);
  const result = await CreateUser({ email, password: hashedpassword });
  response.send(result);
});

//login using post method//
router.post("/login", async (request, response) => {
  const { email, password } = request.body;
  const userfromdb = await Getuserbyname(email);
  if (!userfromdb) {
    response.status(401).send({ message: "Inavalid credentials" });
    return;
  }
  const storedpassword = userfromdb.password;
  console.log(storedpassword);
  const passwordmatch = await bcrypt.compare(password, storedpassword);
  console.log(passwordmatch);
  if (passwordmatch) {
    const token = jwt.sign({ id: userfromdb._id }, process.env.SECRET_KEY, {
      expiresIn: "1hr",
    });
    response.send({ message: "Successful Login", token: token });
  } else {
    response.send({ message: "Invalid Credentials" });
  }
});
export const UserRouter = router;
