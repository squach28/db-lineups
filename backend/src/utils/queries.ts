import { db } from "./db";

export const queries = {
  getPaddlers: "SELECT * FROM paddlers",
  addPaddler:
    "INSERT INTO paddlers (full_name, gender, weight, side_preference, can_steer, can_drum) VALUES ($1, $2, $3, $4, $5, $6)",
  createAdminRequest:
    "INSERT INTO admin_requests (uid, email, status, last_updated) VALUES ($1, $2, $3, $4) RETURNING id",
  getAdminRequestByUid: "SELECT * FROM admin_requests WHERE uid = $1",
  getAdminRequests:
    "SELECT * FROM admin_requests ORDER BY CASE WHEN status = 'PENDING' THEN 1 WHEN status = 'APPROVED' THEN 2 ELSE 3 END",
  updateAdminRequestById:
    "UPDATE admin_requests SET status = $1, last_updated = $2 WHERE id = $3 RETURNING id, uid, status",
  getLineups: "SELECT * FROM lineups",
  getLineupById: "SELECT * FROM lineups WHERE id = $1",
  createLineup: "INSERT INTO lineups (name) VALUES ($1) RETURNING id, name",
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
