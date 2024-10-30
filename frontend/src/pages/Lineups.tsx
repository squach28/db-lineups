import { Box, Grid2, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

const Lineups = () => {
  const navigate = useNavigate();

  const handleCreateNewLineup = () => {
    navigate("/lineups/add");
  };
  return (
    <div>
      <Navbar />
      <main>
        <Box sx={{ p: 2 }}>
          <Typography variant="h3">Lineups</Typography>
          <Grid2 container spacing={2}>
            <Grid2
              size={{ xs: 12, sm: 12, md: 4 }}
              sx={{
                justifySelf: "center",
                alignSelf: "center",
                border: "1px solid black",
                textAlign: "center",
                borderRadius: "10px",
                p: 2,
                mt: 2,
                ":hover": {
                  cursor: "pointer",
                },
              }}
              onClick={handleCreateNewLineup}
            >
              <Box>
                <Typography variant="h6">Create new lineup</Typography>
                <AddIcon />
              </Box>
            </Grid2>
          </Grid2>
        </Box>
      </main>
    </div>
  );
};

export default Lineups;
