import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  Box,
  Button,
  Container,
  Divider,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Navbar from "../components/Navbar";
import axios from "axios";
import { AdminRequest } from "../types/AdminRequest";

const Profile = () => {
  const authContext = useContext(AuthContext);
  const [adminRequest, setAdminRequest] = useState<AdminRequest | null>(null);
  const [loading, setLoading] = useState(false);
  const [adminRequests, setAdminRequests] = useState<Array<AdminRequest>>([]);
  useEffect(() => {
    if (authContext.user) {
      setLoading(true);
      fetchAdminRequest(authContext.user.uid)
        .then((res) => {
          const request = res.data.request;
          setAdminRequest(request);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    fetchAdminRequests().then((res) => setAdminRequests(res.data.requests));
  }, []);

  const fetchAdminRequest = (uid: string) => {
    return axios.get(
      `${import.meta.env.VITE_API_URL}/admin/request?uid=${uid}`
    );
  };

  const fetchAdminRequests = () => {
    return axios.get(`${import.meta.env.VITE_API_URL}/admin/requests`);
  };

  const createAdminRequest = () => {
    if (authContext.user) {
      return axios.post(`${import.meta.env.VITE_API_URL}/admin/request`, {
        uid: authContext.user.uid,
        email: authContext.user.email,
      });
    }
    return new Promise(() => null);
  };

  const handleRequestAdmin = () => {
    setLoading(true);
    createAdminRequest()
      .then((res) => {
        if (res && authContext.user) {
          fetchAdminRequest(authContext.user.uid).then((res) => {
            const request = res.data.request;
            setAdminRequest(request);
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const renderStatus = (id: string, status: string) => {
    const handleReject = () => {
      axios
        .post(`${import.meta.env.VITE_API_URL}/admin/request/complete`, {
          id,
          approve: false,
        })
        .then(() => {
          fetchAdminRequests().then((res) =>
            setAdminRequests(res.data.requests)
          );
        });
    };

    const handleApprove = () => {
      axios
        .post(`${import.meta.env.VITE_API_URL}/admin/request/complete`, {
          id,
          approve: true,
        })
        .then(() => {
          fetchAdminRequests().then((res) =>
            setAdminRequests(res.data.requests)
          );
        });
    };

    switch (status) {
      case "PENDING":
        return (
          <Box
            sx={{
              display: { xs: "flex", md: "block" },
              justifyContent: { xs: "end" },
              alignItems: { xs: "end" },
              gap: { xs: 2 },
              flexDirection: { sm: "column-reverse" },
            }}
          >
            <Button
              variant="contained"
              color="error"
              size="small"
              sx={{
                mr: 1,
              }}
              onClick={handleReject}
            >
              Reject
            </Button>
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={handleApprove}
            >
              Approve
            </Button>
          </Box>
        );
      case "APPROVED":
        return <Typography>Approved</Typography>;
      case "REJECTED":
        return <Typography>Rejected</Typography>;
      default:
        return null;
    }
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
                    disabled={adminRequest !== null || loading}
                    onClick={handleRequestAdmin}
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
              {!authContext.loading && authContext.admin ? (
                <Box>
                  <Typography variant="h4">Admin</Typography>
                  <Typography variant="h5">Requests</Typography>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Email</TableCell>
                        <TableCell align="right">Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {adminRequests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell>{request.email}</TableCell>
                          <TableCell align="right">
                            {renderStatus(request.id, request.status)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
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
