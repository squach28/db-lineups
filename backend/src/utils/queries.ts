import { db } from "./db";

export const queries = {
  getPaddlers: "SELECT * FROM paddlers",
  addPaddler:
    "INSERT INTO paddlers (full_name, gender, weight, side_preference, can_steer, can_drum) VALUES ($1, $2, $3, $4, $5, $6)",
};

export const commitTransaction = async (
  query: string,
  params: Array<string | number | boolean>
) => {
  try {
    await db.query("BEGIN");
    await db.query(query, params);
    await db.query("COMMIT");
  } catch (e) {
    console.log(e);
    await db.query("ROLLBACK");
  }
};
