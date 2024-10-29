import express from "express";
import {
  addMultiplePaddlers,
  addPaddler,
  confirmAddPaddlers,
  getPaddlerById,
  getPaddlers,
} from "../controllers/paddlers.controller";
import multer from "multer";
import path from "node:path";
import { v4 as uuidv4 } from "uuid";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    console.log(file);
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
});

export const paddlersRouter = express.Router();

paddlersRouter.get("/", getPaddlers);
paddlersRouter.get("/:id", getPaddlerById);
paddlersRouter.post("/", addPaddler);
paddlersRouter.post(
  "/multiple",
  upload.single("paddlers"),
  addMultiplePaddlers
);
paddlersRouter.post("/confirm", confirmAddPaddlers);
