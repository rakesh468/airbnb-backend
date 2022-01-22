import express from "express";
import {
  UpdateRoomsById,
  DeleteRoomById,
  CreateRooms,
  GetroomsById,
  Getrooms,
} from "../helper.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router
  .route("/")
  .post(async (request, response) => {
    const data = request.body;
    console.log(data);
    const result = await CreateRooms(data);
    response.send(result);
  }) //adding rooms using post method//
  .get(async (request, response) => {
    const data = await Getrooms();
    response.send(data);
  }); //getting all rooms using get method//

//get rooms by id using get method//
router
  .route("/:id")
  .get(auth,async (request, response) => {
    const { id } = request.params;
    const aribnb = await GetroomsById(id);
    response.send(aribnb);
  })
  .delete(async (request, response) => {
    const { id } = request.params;
    const airbnb = await DeleteRoomById(id);
    airbnb.deletedCount > 0
      ? response.send(airbnb)
      : response.status(401).send({ message: "Page not found" });
  }) //delete room by id using delete method//

  .put(async (request, response) => {
    const { id } = request.params;
    const data = request.body;
    const result = await UpdateRoomsById(id, data);
    const aribnb = await GetroomsById(id);
    response.send(aribnb);
  }); //edit rooms using put method //

export const AirbnbRouter = router;
