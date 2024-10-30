import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <Container>
      <main>
        <Box sx={{ p: 2 }}>
          <Typography variant="h4">Log in</Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
            <TextField type="email" label="Email" />
            <TextField type="password" label="Password" />
            <Button variant="contained">Login</Button>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                marginX: "auto",
              }}
            >
              <Typography>Don't have an account?</Typography>
              <Link to="/signup" className="underline">
                Sign up
              </Link>
            </Box>
          </Box>
        </Box>
      </main>
    </Container>
  );
};

export default Login;
