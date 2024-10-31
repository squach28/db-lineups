import { Request, Response } from "express";
import { commitTransaction, queries } from "../utils/queries";
import { db } from "../utils/db";

export const getAllLineups = async (req: Request, res: Response) => {
  try {
    const result = await db.query(queries.getLineups);
    res.status(200).json({ lineups: result.rows });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong, try again later." });
  }
};

export const getLineupById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const result = await db.query(queries.getLineupById, [id]);
    res.status(200).json({ lineup: result.rows[0] });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong, try again later." });
  }
};

export const createLineup = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (name === undefined) {
      res.status(404).json({ message: "Lineup is missing a name" });
      return;
    }
    const result = await commitTransaction(queries.createLineup, [name]);

    if (!result) {
      res
        .status(500)
        .json({ message: "Something went wrong, please try again later." });
      return;
    } else {
      const { id, name } = result.rows[0];
      res.status(201).json({ id, name });
      return;
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong, try again later." });
  }
};