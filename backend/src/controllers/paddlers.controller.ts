import { Request, Response } from "express";
import { db } from "../utils/db";
import { queries } from "../utils/queries";
import fs from "node:fs";
import xlsx from "node-xlsx";
import { v4 as uuidv4 } from "uuid";
import { firestore } from "../utils/firebase";

export const getPaddlers = async (req: Request, res: Response) => {
  try {
    const result = await db.query(queries.getPaddlers);
    const paddlers = result.rows.map((paddler) => {
      return {
        id: paddler.id,
        fullName: paddler.full_name,
        gender: paddler.gender,
        weight: paddler.weight,
        sidePreference: paddler.side_preference,
        canSteer: paddler.can_steer,
        canDrum: paddler.can_drum,
      };
    });
    res.status(200).json({ paddlers });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong, try again later." });
  }
};

export const getPaddlerById = (req: Request, res: Response) => {};

export const addPaddler = async (req: Request, res: Response) => {
  try {
    const paddlerInfo = req.body;
    const result = await db.query(queries.addPaddler, [
      paddlerInfo.fullName,
      paddlerInfo.gender,
      paddlerInfo.weight,
      paddlerInfo.sidePreference,
      paddlerInfo.canSteer,
      paddlerInfo.canDrum,
    ]);
    res.status(201).json({ hello: "hello" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong, try again later." });
  }
};

export const addMultiplePaddlers = async (req: Request, res: Response) => {
  try {
    if (req.file) {
      const path = req.file.path;
      const worksheet = xlsx.parse(fs.readFileSync(path))[0];
      const isValid = validateSheet(worksheet);

      if (!isValid) {
        res.status(404).json({ message: "Sheet is formatted incorrectly" });
        return;
      }
      const sessionId = uuidv4();
      const paddlers = parseSheet(worksheet);
      const session = firestore.collection("paddler_sessions").doc(sessionId);
      await session.set({
        paddlers,
      });

      res.status(200).json({ sessionId });
      return;
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong, try again later." });
  }
};

const validateSheet = (sheet: { name: string; data: any[][] }) => {
  const headingNames = [
    "fullName",
    "gender",
    "weight",
    "sidePreference",
    "canSteer",
    "canDrum",
  ];
  const headings = sheet.data[0];
  const parsedHeadings = headings.map((heading: any) => {
    const split = heading.split(/\s+/);
    let camelCase = "";
    for (let i = 1; i < split.length; i++) {
      camelCase += split[i][0].toUpperCase() + split[i].slice(1).toLowerCase();
    }
    return split[0].toLowerCase() + camelCase;
  });

  const hasValidHeadings = compareArrays(headingNames, parsedHeadings);
  const correctNumOfItemsInEachRow = hasCorrectItemsInEachRow(
    sheet,
    headingNames.length
  );

  return hasValidHeadings && correctNumOfItemsInEachRow;
};

const compareArrays = (a: string[], b: string[]) => {
  if (a.length !== b.length) {
    return false;
  }
  let count = a.length;
  a.forEach((item) => {
    if (b.includes(item)) {
      count -= 1;
    }
  });

  if (count !== 0) {
    return false;
  }

  return true;
};

const hasCorrectItemsInEachRow = (
  sheet: { name: string; data: any[][] },
  numOfRows: number
) => {
  let valid = true;
  sheet.data.forEach((row) => {
    if (row.length !== numOfRows) {
      valid = false;
    }
  });
  return valid;
};

const mapHeadingsToIndex = (headings: string[]) => {
  const headingNames = [
    "fullName",
    "gender",
    "weight",
    "sidePreference",
    "canSteer",
    "canDrum",
  ];
  const parsedHeadings = headings.map((heading: any) => {
    const split = heading.split(/\s+/);
    let camelCase = "";
    for (let i = 1; i < split.length; i++) {
      camelCase += split[i][0].toUpperCase() + split[i].slice(1).toLowerCase();
    }
    return split[0].toLowerCase() + camelCase;
  });
  let mapping = {};
  headingNames.map((heading) => {
    const index = parsedHeadings.indexOf(heading);
    mapping = {
      ...mapping,
      [heading]: index,
    };
  });

  return mapping;
};

const parseSheet = (sheet: { name: string; data: any[][] }) => {
  const headings = sheet.data[0];
  const mapping = mapHeadingsToIndex(headings);
  const paddlers = [];
  for (let i = 1; i < sheet.data.length; i++) {
    let paddler = {};
    for (const [key, value] of Object.entries(mapping)) {
      if (typeof value === "number") {
        paddler = {
          ...paddler,
          [key]: sheet.data[i][value],
        };
      }
    }
    paddlers.push(paddler);
  }

  return paddlers;
};
