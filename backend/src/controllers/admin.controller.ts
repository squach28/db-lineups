import { Request, Response } from "express";
import { commitTransaction, queries } from "../utils/queries";
import { db } from "../utils/db";
import { auth } from "firebase-admin";

export const createAdminRequest = async (req: Request, res: Response) => {
  try {
    const { uid, email } = req.body;
    if (uid === undefined || email === undefined) {
      res.status(404).json({ message: "Missing uid or email" });
      return;
    }
    const INITIAL_REQUEST_STATUS = "PENDING";
    const result = await commitTransaction(queries.createAdminRequest, [
      uid,
      email,
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
    const request = result.rowCount ? result.rows[0] : null;
    res.status(200).json({ request });
    return;
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong, try again later." });
  }
};

export const getAdminRequests = async (req: Request, res: Response) => {
  try {
    const result = await db.query(queries.getAdminRequests);

    res.status(200).json({ requests: result.rows });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong, try again later." });
  }
};

export const completeAdminRequest = async (req: Request, res: Response) => {
  const APPROVED_STATUS = "APPROVED";
  const REJECTED_STATUS = "REJECTED";
  try {
    const { id, approve } = req.body;
    if (id === undefined || approve === undefined) {
      res
        .status(404)
        .json({ message: "Invalid data: missing id or approve in body" });
      return;
    }
    const approveStatus = approve ? APPROVED_STATUS : REJECTED_STATUS;
    commitTransaction(queries.updateAdminRequestById, [
      approveStatus,
      new Date(),
      id,
    ]).then((result) => {
      if (result) {
        const uid = result.rows[0].uid;
        if (approve) {
          grantAdmin(uid);
        }
      } else {
        throw new Error();
      }
    });

    res.status(200).json({ id, approve });
    return;
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong, try again later." });
  }
};

export const grantAdmin = async (uid: string) => {
  await auth().setCustomUserClaims(uid, {
    admin: true,
  });
};
