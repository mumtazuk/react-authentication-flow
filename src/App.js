import React, { useState } from "react";
import { CssBaseline, Container, Box } from "@mui/material";
import UserLogin from "./components/user-login/user-login.component";
import SignUp from "./components/sign-up/sign-up.component";
import ForgotPassword from "./components/forgot-password/forgot-password.component";
import HomePage from "./components/home-page/home-page.component";

function App() {
  const [currentView, setCurrentView] = useState("login");

  const handleSignUpClick = () => setCurrentView("signUp");
  const handleForgotPasswordClick = () => setCurrentView("forgotPassword");
  const handleBackToLogin = () => setCurrentView("login");
  const handleHomePage = () => setCurrentView("home");

  const renderView = () => {
    switch (currentView) {
      case "login":
        return (
          <UserLogin
            onSignUpClick={handleSignUpClick}
            onForgotPasswordClick={handleForgotPasswordClick}
          />
        );
      case "signUp":
        return <SignUp onBackClick={handleBackToLogin} />;
      case "forgotPassword":
        return <ForgotPassword onBackClick={handleBackToLogin} />;
      case "home":
        return <HomePage />;
      default:
        return <UserLogin onSignUpClick={handleSignUpClick} onForgotPasswordClick={handleForgotPasswordClick} />;
    }
  };

  return (
    <>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          {renderView()}
        </Box>
      </Container>
    </>
  );
}

export default App;
