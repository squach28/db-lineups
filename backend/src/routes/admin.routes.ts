import express from "express";
import {
  completeAdminRequest,
  createAdminRequest,
  getAdminRequest,
  getAdminRequests,
} from "../controllers/admin.controller";

export const adminRouter = express.Router();

adminRouter.post("/request", createAdminRequest);
adminRouter.get("/request", getAdminRequest);
adminRouter.get("/requests", getAdminRequests);
adminRouter.post("/request/complete", completeAdminRequest);
