import React, { useState } from "react";

import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";

function ForgotPassword({ onBackClick }) {
  const [email, setEmail] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const handleReset = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setSnackbar({
        open: true,
        message: "Please enter your registered email address.",
        severity: "error",
      });
      return;
    }

    // Simulate an API call
    setSnackbar({
      open: true,
      message: "Password reset instructions have been sent to your email!",
      severity: "success",
    });

    setTimeout(() => onBackClick(), 3000); // Redirect to Login after showing success
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
        Forgot Password
      </Typography>
      <form onSubmit={handleReset} noValidate>
        <TextField
          label="Email"
          fullWidth
          type="email"
          variant="outlined"
          margin="dense"
          size="small" // Reduces the field height
          placeholder="Enter Registered Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            sx: { fontSize: "0.875rem" }, // Adjust text size
          }}
          InputLabelProps={{
            sx: { fontSize: "0.85rem" }, // Adjust label size
          }}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2, py: 1 }}
        >
          Reset Password
        </Button>
      </form>
      <Button
        variant="text"
        color="secondary"
        fullWidth
        onClick={onBackClick}
        sx={{ mt: 2, fontSize: "0.85rem" }}
      >
        Back to Login
      </Button>
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

export default ForgotPassword;
