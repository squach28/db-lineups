import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  Box,
  Button,
  Container,
  Divider,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AdminRequest } from "../types/AdminRequest";

const Profile = () => {
  const authContext = useContext(AuthContext);
  const [adminRequest, setAdminRequest] = useState<AdminRequest | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (authContext.user === null) {
      navigate("/", { replace: true });
    } else {
      fetchAdminRequests(authContext.user.uid).then((res) => {
        const request = res.data.request;
        setAdminRequest(request);
      });
    }
  }, []);

  const fetchAdminRequests = (uid: string) => {
    return axios.get(
      `${import.meta.env.VITE_API_URL}/admin/request?uid=${uid}`
    );
  };

  return (
    <Box>
      <Navbar />
      <Container>
        {authContext.user ? (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h4">Profile</Typography>
            <List
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <ListItem sx={{ display: "flex", gap: 2 }}>
                <Typography>Email:</Typography>
                <Typography>{authContext.user.email}</Typography>
              </ListItem>
              <Divider variant="middle" />
              <ListItem sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <Typography>Privileges:</Typography>

                {authContext.admin ? (
                  <Typography>Admin</Typography>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Typography>User</Typography>
                  </Box>
                )}
              </ListItem>
              {!authContext.admin ? (
                <ListItem>
                  <Button
                    sx={{ marginX: "auto" }}
                    variant="contained"
                    color="secondary"
                    disabled={adminRequest !== null}
                  >
                    Request Admin
                  </Button>
                </ListItem>
              ) : null}
              {adminRequest ? (
                <Box sx={{ ml: "auto", textAlign: "end" }}>
                  <Typography>Status: {adminRequest.status}</Typography>
                  <Typography>
                    Request created:{" "}
                    {new Date(adminRequest.created_at).toLocaleDateString()}
                  </Typography>
                </Box>
              ) : null}
              {authContext.admin ? (
                <Box>
                  <Typography variant="h4">Admin</Typography>
                </Box>
              ) : null}
            </List>
          </Box>
        ) : (
          <Box>
            <Typography>Currently not logged in</Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Profile;
