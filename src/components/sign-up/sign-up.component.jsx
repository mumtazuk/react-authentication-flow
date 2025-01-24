import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const MESSAGES = {
  required: "This field is required.",
  emailInvalid: "Invalid email address.",
  passwordLength: "Password must be at least 6 characters long.",
  passwordMismatch: "Passwords do not match.",
  success: "Account created successfully!",
  error: "An error occurred. Please try again.",
};

// Utility function for validation
const validateInput = (field, value, userInfo) => {
  switch (field) {
    case "name":
      return value.trim() ? "" : MESSAGES.required;
    case "email":
      return /\S+@\S+\.\S+/.test(value.trim())
        ? ""
        : value.trim()
        ? MESSAGES.emailInvalid
        : MESSAGES.required;
    case "password":
      return value.length >= 6 ? "" : MESSAGES.passwordLength;
    case "confirmPassword":
      return value === userInfo.password ? "" : MESSAGES.passwordMismatch;
    default:
      return "";
  }
};

function SignUp({ onBackClick }) {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prev) => !prev);

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
    setErrors({
      ...errors,
      [field]: validateInput(field, userInfo[field], userInfo),
    });
  };

  const handleChange = (field, value) => {
    setUserInfo({ ...userInfo, [field]: value });
    if (touched[field]) {
      setErrors({
        ...errors,
        [field]: validateInput(field, value, userInfo),
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(userInfo).forEach((field) => {
      newErrors[field] = validateInput(field, userInfo[field], userInfo);
    });
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setTouched({
        name: true,
        email: true,
        password: true,
        confirmPassword: true,
      });
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call
      setSnackbar({
        open: true,
        message: MESSAGES.success,
        severity: "success",
      });
      onBackClick();
    } catch {
      setSnackbar({
        open: true,
        message: MESSAGES.error,
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
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Create Your Account
      </Typography>
      <form onSubmit={handleSignUp} noValidate>
        {["name", "email", "password", "confirmPassword"].map((field, index) => (
          <TextField
            key={field}
            label={field === "confirmPassword" ? "Confirm Password" : field[0].toUpperCase() + field.slice(1)}
            fullWidth
            variant="outlined"
            margin="dense"
            size="small"
            type={
              field === "password" && !showPassword
                ? "password"
                : field === "confirmPassword" && !showConfirmPassword
                ? "password"
                : "text"
            }
            value={userInfo[field]}
            onChange={(e) => handleChange(field, e.target.value)}
            onBlur={() => handleBlur(field)}
            error={!!errors[field] && touched[field]}
            helperText={touched[field] && errors[field]}
            required
            InputProps={{
              sx: { fontSize: "0.875rem" },
              ...(field === "password" || field === "confirmPassword"
                ? {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={
                            field === "password"
                              ? togglePasswordVisibility
                              : toggleConfirmPasswordVisibility
                          }
                        >
                          {(field === "password" && showPassword) || (field === "confirmPassword" && showConfirmPassword) ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }
                : {}),
            }}
            InputLabelProps={{
              sx: { fontSize: "0.85rem" },
            }}
          />
        ))}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2, py: 1 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
        </Button>
      </form>
      <Button
        variant="text"
        color="secondary"
        fullWidth
        onClick={onBackClick}
        sx={{ mt: 2, fontSize: "0.85rem" }}
        disabled={loading}
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

export default SignUp;
