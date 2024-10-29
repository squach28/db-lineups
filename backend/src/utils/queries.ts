export const queries = {
  getPaddlers: "SELECT * FROM paddlers",
  addPaddler:
    "INSERT INTO paddlers (full_name, gender, weight, side_preference, can_steer, can_drum) VALUES ($1, $2, $3, $4, $5, $6)",
};
