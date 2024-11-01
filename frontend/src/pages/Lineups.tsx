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
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Lineup } from "../types/Lineup";
import axios from "axios";

const Lineups = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [lineups, setLineups] = useState<Array<Lineup>>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    fetchLineups().then((res) => setLineups(res.data.lineups));
  }, []);

  const fetchLineups = () => {
    return axios.get(`${import.meta.env.VITE_API_URL}/lineups`);
  };

  const handleCreateNewLineup = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (loading) {
      return;
    }
    setName("");
    setOpen(false);
  };

  const handleCreateLineup = () => {
    setLoading(true);
    createNewLineup().then((res) => {
      setLoading(false);
      setOpen(false);
      navigate(`lineups/${res.data.id}`);
    });
  };

  const createNewLineup = () => {
    return axios.post(`${import.meta.env.VITE_API_URL}/lineups`, { name });
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
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "200px",
                  justifySelf: "center",
                  alignSelf: "center",
                  border: "1px solid black",
                  textAlign: "center",
                  borderRadius: "10px",
                  p: 2,
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
            {lineups.map((lineup) => (
              <Grid2
                key={lineup.id}
                size={{ xs: 12, sm: 12, md: 4 }}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "200px",
                  justifySelf: "center",
                  alignSelf: "center",
                  border: "1px solid black",
                  textAlign: "center",
                  p: 2,
                  borderRadius: "10px",
                  ":hover": {
                    cursor: "pointer",
                  },
                }}
              >
                {lineup.name}
              </Grid2>
            ))}
          </Grid2>
        </Box>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Create Lineup</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ mb: 2 }}>
              Choose a cool name for this lineup 😎
            </DialogContentText>
            <TextField
              required
              fullWidth
              name="name"
              label="Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
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
