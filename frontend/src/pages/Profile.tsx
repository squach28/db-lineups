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
  const [adminRequests, setAdminRequests] = useState<Array<AdminRequest>>([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (authContext.user === null) {
      navigate("/", { replace: true });
    } else {
      fetchAdminRequests(authContext.user.uid).then((res) => {
        const requests = res.data.requests;
        setAdminRequests(requests);
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
                    disabled={adminRequests.length > 0}
                  >
                    Request Admin
                  </Button>
                </ListItem>
              ) : null}
              {adminRequests.length > 0 ? (
                <Box sx={{ ml: "auto", textAlign: "end" }}>
                  <Typography>Admin request still pending</Typography>
                  <Typography>
                    Request created:{" "}
                    {new Date(adminRequests[0].created_at).toLocaleDateString()}
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
