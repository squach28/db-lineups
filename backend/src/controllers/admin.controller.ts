import { Request, Response } from "express";
import { commitTransaction, queries } from "../utils/queries";

export const createAdminRequest = async (req: Request, res: Response) => {
  try {
    const { uid } = req.body;
    const INITIAL_REQUEST_STATUS = "PENDING";
    const result = await commitTransaction(queries.createAdminRequest, [
      uid,
      INITIAL_REQUEST_STATUS,
      new Date(),
    ]);
    const { id } = result?.rows[0];
    res.status(201).json({ id });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong, try again later." });
  }
};
