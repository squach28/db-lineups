import { Request, Response } from "express";
import { commitTransaction, queries } from "../utils/queries";
import { db } from "../utils/db";

export const createAdminRequest = async (req: Request, res: Response) => {
  try {
    const { uid } = req.body;
    if (uid === undefined) {
      res.status(404).json({ message: "Missing uid" });
      return;
    }
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

export const getAdminRequest = async (req: Request, res: Response) => {
  try {
    const { uid } = req.query;
    if (uid === undefined) {
      res.status(404).json({ message: "Missing uid" });
      return;
    }
    const result = await db.query(queries.getAdminRequestByUid, [uid]);
    const requests = result.rows;
    res.status(200).json({ requests });
    return;
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong, try again later." });
  }
};
