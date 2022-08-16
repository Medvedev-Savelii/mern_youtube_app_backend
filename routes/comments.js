import express from "express";
import {
  addComment,
  deleteComment,
  getComments,
} from "../controllers/commentsController.js";
import authMiddleWare from "../authMiddleWare.js";
const router = express.Router();

router.post("/", authMiddleWare, addComment);
router.delete("/:id", authMiddleWare, deleteComment);
router.get("/:videoId", getComments);

export default router;
