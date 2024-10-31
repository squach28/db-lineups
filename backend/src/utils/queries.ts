import { db } from "./db";

export const queries = {
  getPaddlers: "SELECT * FROM paddlers",
  addPaddler:
    "INSERT INTO paddlers (full_name, gender, weight, side_preference, can_steer, can_drum) VALUES ($1, $2, $3, $4, $5, $6)",
  createAdminRequest:
    "INSERT INTO admin_requests (uid, status, last_updated) VALUES ($1, $2, $3) RETURNING id",
};

export const commitTransaction = async (
  query: string,
  params: Array<string | number | boolean>
) => {
  try {
    await db.query("BEGIN");
    const result = await db.query(query, params);
    await db.query("COMMIT");
    return result;
  } catch (e) {
    console.log(e);
    await db.query("ROLLBACK");
  }
};
