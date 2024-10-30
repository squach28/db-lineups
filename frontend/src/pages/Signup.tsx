import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupInfo } from "../types/SignupInfo";
import { isEmail } from "validator";
import { auth } from "../utils/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
const Signup = () => {
  const [signUpInfo, setSignUpInfo] = useState<SignupInfo>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setSignUpInfo({
      ...signUpInfo,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const validateFields = (signUpInfo: SignupInfo) => {
    let isValid = true;
    for (const [name, value] of Object.entries(signUpInfo)) {
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
      } else if (name === "password" && value.length < 6) {
        isValid = false;
        setErrors((prev) => {
          return {
            ...prev,
            [name]: `${fieldToLabel(name)} must have at least 6 characters`,
          };
        });
      } else if (
        name === "confirmPassword" &&
        signUpInfo.password !== signUpInfo.confirmPassword
      ) {
        isValid = false;
        setErrors((prev) => {
          return {
            ...prev,
            [name]: `Passwords do not match`,
          };
        });
      } else {
        setErrors((prev) => {
          return {
            ...prev,
            [name]: "",
          };
        });
      }
    }

    return isValid;
  };

  const fieldToLabel = (field: string) => {
    switch (field) {
      case "email":
        return "Email";
      case "password":
        return "Password";
      case "confirmPassword":
        return "Confirm Password";
      default:
        throw new Error();
    }
  };

  const handleSignUp = () => {
    const isValid = validateFields(signUpInfo);
    console.log(isValid);
    if (!isValid) {
      return;
    }

    signUp().then((res) => {
      if (res != null) {
        navigate("/?signup=success", { replace: true });
      }
    });
  };

  const signUp = async () => {
    return createUserWithEmailAndPassword(
      auth,
      signUpInfo.email,
      signUpInfo.password
    )
      .then((userCredential) => userCredential)
      .catch((e) => e);
  };

  return (
    <Container>
      <main>
        <Box sx={{ p: 2 }}>
          <Typography variant="h4">Sign up</Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
            <TextField
              required
              type="email"
              label="Email"
              name="email"
              onChange={handleFormChange}
              error={errors.email !== ""}
              helperText={errors.email}
            />
            <TextField
              required
              type="password"
              label="Password"
              name="password"
              onChange={handleFormChange}
              error={errors.password !== ""}
              helperText={errors.password}
            />
            <TextField
              required
              type="password"
              label="Confirm Password"
              name="confirmPassword"
              onChange={handleFormChange}
              error={errors.confirmPassword !== ""}
              helperText={errors.confirmPassword}
            />
            <Button variant="contained" onClick={handleSignUp}>
              Sign up
            </Button>
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
