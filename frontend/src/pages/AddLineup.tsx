import { Box, TextField } from "@mui/material";
import Navbar from "../components/Navbar";

const AddLineup = () => {
  return (
    <div>
      <Navbar />
      <Box>
        <TextField label="Name" name="name" />
      </Box>
    </div>
  );
};

export default AddLineup;
