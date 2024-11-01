import { Box, TextField } from "@mui/material";
import Navbar from "../components/Navbar";

const LineupDetail = () => {
  return (
    <div>
      <Navbar />
      <Box>
        <TextField label="Name" name="name" />
      </Box>
    </div>
  );
};

export default LineupDetail;
