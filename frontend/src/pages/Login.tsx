import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginInfo } from "../types/LoginInfo";
import isEmail from "validator/lib/isEmail";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    email: "",
    password: "'",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setLoginInfo({
      ...loginInfo,
      [name]: value,
    });
  };

  const handleLogin = () => {
    const isValid = validateFields(loginInfo);
    if (!isValid) {
      return;
    }
    setLoading(true);
    login().then((res) => {
      if (res != null) {
        navigate("/?login=success", { replace: true });
      }
      setLoading(false);
    });
  };

  const validateFields = (loginInfo: LoginInfo) => {
    let isValid = true;
    const MIN_PASSWORD_LENGTH = 6;
    for (const [name, value] of Object.entries(loginInfo)) {
      if (value === "") {
        isValid = false;
        setErrors((prev) => {
          return {
            ...prev,
            [name]: `${fieldToLabel(name)} cannot be empty`,
          };
        });
      } else if (name === "email" && !isEmail(value)) {
        isValid = false;
        setErrors((prev) => {
          return {
            ...prev,
            [name]: `Email is not valid`,
          };
        });
      } else if (name === "password" && value.length < MIN_PASSWORD_LENGTH) {
        setErrors((prev) => {
          return {
            ...prev,
            [name]: "Password is incorrect",
          };
        });
      } else {
        setErrors({
          ...errors,
          [name]: "",
        });
      }
    }

    return isValid;
  };

  const fieldToLabel = (field: string) => {
    if (field === "email") {
      return "Email";
    } else {
      return "Password";
    }
  };

  const login = async () => {
    return signInWithEmailAndPassword(auth, loginInfo.email, loginInfo.password)
      .then((user) => user)
      .catch((e) => {
        const code = e.code;
        switch (code) {
          case "auth/invalid-credential":
            setErrors({
              ...errors,
              password: "Password is incorrect",
            });
        }
      });
  };

  return (
    <Container>
      <main>
        <Box sx={{ p: 2 }}>
          <Typography variant="h4">Log in</Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
            <TextField
              required
              type="email"
              label="Email"
              name="email"
              onChange={onFormChange}
              error={errors.email !== ""}
              helperText={errors.email}
            />
            <TextField
              required
              type="password"
              label="Password"
              name="password"
              onChange={onFormChange}
              error={errors.password !== ""}
              helperText={errors.password}
            />
            <Button
              variant="contained"
              disabled={loading}
              onClick={handleLogin}
            >
              Login
            </Button>
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
