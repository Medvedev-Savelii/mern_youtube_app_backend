import express from "express";
import {
  addVideo,
  updateVideo,
  deleteVideo,
  addView,
  getByTag,
  getVideo,
  random,
  search,
  sub,
  trend,
} from "../controllers/videosController.js";
import authMiddleWare from "../authMiddleWare.js";

const router = express.Router();

//create a video
router.post("/", authMiddleWare, addVideo);
router.put("/:id", authMiddleWare, updateVideo);
router.delete("/:id", authMiddleWare, deleteVideo);
router.get("/find/:id", getVideo);

router.put("/view/:id", addView);
router.get("/trend", trend);
router.get("/random", random);
router.get("/sub", authMiddleWare, sub);
router.get("/tags", getByTag);
router.get("/search", search);

export default router;
