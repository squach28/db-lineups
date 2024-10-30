import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <Container>
      <main>
        <Box sx={{ p: 2 }}>
          <Typography variant="h4">Sign up</Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
            <TextField type="email" label="Email" />
            <TextField type="password" label="Password" />
            <Button variant="contained">Sign up</Button>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                marginX: "auto",
              }}
            >
              <Typography>Already have an account?</Typography>
              <Link to="/login" className="underline">
                Log in
              </Link>
            </Box>
          </Box>
        </Box>
      </main>
    </Container>
  );
};

export default Signup;
