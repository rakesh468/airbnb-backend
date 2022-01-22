import { client } from "./index.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

async function UpdateRoomsById(id, data) {
  return await client
    .db("airbnb")
    .collection("rooms")
    .updateOne({ _id: ObjectId(id) }, { $set: data });
}
async function DeleteRoomById(id) {
  return await client.db("airbnb").collection("rooms").deleteOne({_id: ObjectId(id) });
}
async function CreateRooms(data) {
  return await client.db("airbnb").collection("rooms").insertMany(data);
}

async function GetroomsById(id) {
  console.log(id)
  return await client.db("airbnb").collection("rooms").findOne({ _id: ObjectId(id) });
}

async function CreateUser(data) {
  return await client.db("airbnb").collection("users").insertOne(data);
}

async function Getuserbyname(email) {
  return await client
    .db("airbnb")
    .collection("users")
    .findOne({ email: email });
}

async function Getrooms() {
  return await client.db("airbnb").collection("rooms").find().toArray();
}

// generating hashedpassword using bcrypt package //
async function getpassword(password) {
  const no_of_rounds = 10;
  const salt = await bcrypt.genSalt(no_of_rounds);
  console.log(salt);
  const hashedpassword = await bcrypt.hash(password, salt);
  console.log(hashedpassword);
  return hashedpassword;
}

export {
  UpdateRoomsById,
  DeleteRoomById,
  CreateRooms,
  GetroomsById,
  getpassword,
  CreateUser,
  Getuserbyname,
  Getrooms,
};
