import express from "express";
import {
  update,
  deleteUser,
  getUser,
  subscribe,
  unsubscribe,
  like,
  dislike,
} from "../controllers/usersController.js";
import authMiddleWare from "../authMiddleWare.js";

const router = express.Router();

//update user
router.put("/:id", authMiddleWare, update);
//delete user
router.delete("/:id", authMiddleWare, deleteUser);
//get a user
router.get("/find/:id", getUser);
//subscribe a user
router.put("/sub/:id", authMiddleWare, subscribe);
//unsubscribe a user
router.put("/unsub/:id", authMiddleWare, unsubscribe);
//like a video
router.put("/like/:videoId", authMiddleWare, like);
//dislike a video
router.put("/dislike/:videoId", authMiddleWare, dislike);

export default router;
