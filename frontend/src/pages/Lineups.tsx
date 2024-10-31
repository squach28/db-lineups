import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid2,
  TextField,
  Typography,
} from "@mui/material";
import Navbar from "../components/Navbar";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Lineups = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCreateNewLineup = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (loading) {
      return;
    }
    setOpen(false);
  };

  const handleCreateLineup = () => {
    setLoading(true);
  };

  const createNewLineup = () => {
    // TODO: post to axios with lineup name
  };
  return (
    <div>
      <Navbar />
      <main>
        <Box sx={{ p: 2 }}>
          <Typography variant="h3">Lineups</Typography>
          <Grid2 container spacing={2}>
            {authContext.admin ? (
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
            ) : null}
          </Grid2>
        </Box>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Create Lineup</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ mb: 2 }}>
              Choose a cool name for this lineup 😎
            </DialogContentText>
            <TextField required fullWidth name="name" label="Name" />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="outlined" color="error">
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleCreateLineup}
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </main>
    </div>
  );
};

export default Lineups;
