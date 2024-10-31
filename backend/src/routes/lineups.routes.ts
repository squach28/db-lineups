import express from "express";
import {
  createLineup,
  getAllLineups,
  getLineupById,
} from "../controllers/lineups.controller";

export const lineupsRouter = express.Router();

lineupsRouter.get("/", getAllLineups);
lineupsRouter.get("/:id", getLineupById);
lineupsRouter.post("/", createLineup);
