import React, { useState, useRef } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Snackbar,
  Alert,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function UserLogin({ onSignUpClick, onForgotPasswordClick }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const loginRef = useRef(null); // Define the reference for the login button

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  // Helper function for email validation
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailBlur = () => {
    if (email && !isValidEmail(email)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  
    // If email is invalid and password is entered, move focus back to email field
    if (newPassword && !isValidEmail(email)) {
      emailRef.current.focus(); // Move focus back to email if email is invalid
      setEmailError(true); // Show email error if invalid
    } else {
      setEmailError(false); // Clear email error if email is valid
    }
  
    // If both email and password are valid, focus on the login button
    if (isValidEmail(email) && newPassword) {
      loginRef.current.focus(); // Focus on the login button if both fields are valid
    }
  };
  
  
  
  const handleLogin = async (e) => {
    e.preventDefault();

    // Validation for empty fields
    if (!email.trim() || !password.trim()) {
      setSnackbar({
        open: true,
        message: "Please fill out all fields.",
        severity: "error",
      });
      return;
    }

    // Email format validation
    if (!isValidEmail(email)) {
      setSnackbar({
        open: true,
        message: "Please enter a valid email address.",
        severity: "error",
      });
      return;
    }

    setLoading(true);

    try {
      // Simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSnackbar({
        open: true,
        message: "Login successful!",
        severity: "success",
      });
    } catch {
      setSnackbar({
        open: true,
        message: "An error occurred. Please try again.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        maxWidth: 400,
        mx: "auto",
        p: 3,
        textAlign: "center",
        backgroundColor: "background.paper",
        borderRadius: 2,
      }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        gutterBottom
        sx={{ fontSize: "1.25rem" }}
      >
        Login
      </Typography>
      <form onSubmit={handleLogin} noValidate>
        <TextField
          label="Email"
          fullWidth
          variant="outlined"
          margin="dense"
          type="email"
          size="small"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={handleEmailBlur}
          error={emailError} // Highlight the field if invalid
          helperText={emailError ? "Enter a valid email address." : ""}
          inputRef={emailRef} // Attach ref to email field
          InputProps={{
            sx: { fontSize: "0.875rem" },
          }}
          InputLabelProps={{
            sx: { fontSize: "0.85rem" },
          }}
          required
        />
        <TextField
          label="Password"
          fullWidth
          variant="outlined"
          margin="dense"
          type={showPassword ? "text" : "password"}
          size="small"
          value={password}
          onChange={handlePasswordChange}
          inputRef={passwordRef} // Attach ref to password field
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
            sx: { fontSize: "0.875rem" },
          }}
          InputLabelProps={{
            sx: { fontSize: "0.85rem" },
          }}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2, py: 1 }}
          disabled={loading}
          ref={loginRef} // Attach ref to login button
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
        </Button>
      </form>
      <Box mt={2} display="flex" justifyContent="space-between">
        <Button
          variant="text"
          color="secondary"
          onClick={onSignUpClick}
          disabled={loading}
          sx={{ fontSize: "0.85rem" }}
        >
          Sign Up
        </Button>
        <Button
          variant="text"
          color="secondary"
          onClick={onForgotPasswordClick}
          disabled={loading}
          sx={{ fontSize: "0.85rem" }}
        >
          Forgot Password?
        </Button>
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default UserLogin;
