import express from "express";
import { createAdminRequest } from "../controllers/admin.controller";

export const adminRouter = express.Router();

adminRouter.post("/request", createAdminRequest);
