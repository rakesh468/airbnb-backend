import express, { response } from "express";
import { MongoClient } from "mongodb";
import { AirbnbRouter } from "./routes/rooms.js";
import { UserRouter } from "./routes/users.js";
import { StripeRouter } from "./routes/stripe.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(cors()); //3rd party middleware to access the data//

app.use(express.json()); //inbuild middleware  every request in the app body parsed as JSON//

const MONGO_URL = process.env.MONGO_URL;

async function Connection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Connected");
  return client;
}
export const client = await Connection();

//welcome page of server //
app.get("/", (request, response) => {
  response.send("welcome to Airbnb");
});

app.use("/airbnb", AirbnbRouter);
app.use("/users", UserRouter);
app.use("/home",StripeRouter);


app.listen(PORT, () => console.log("Port Running in", PORT));
