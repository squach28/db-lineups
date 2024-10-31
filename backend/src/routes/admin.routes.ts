import express from "express";
import {
  completeAdminRequest,
  createAdminRequest,
  getAdminRequest,
} from "../controllers/admin.controller";

export const adminRouter = express.Router();

adminRouter.post("/request", createAdminRequest);
adminRouter.get("/request", getAdminRequest);
adminRouter.post("/request/complete", completeAdminRequest);
