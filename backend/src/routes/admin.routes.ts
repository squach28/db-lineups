import express from "express";
import {
  createAdminRequest,
  getAdminRequest,
} from "../controllers/admin.controller";

export const adminRouter = express.Router();

adminRouter.post("/request", createAdminRequest);
adminRouter.get("/request", getAdminRequest);
