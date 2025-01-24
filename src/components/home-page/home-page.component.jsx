import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";

function HomePage() {
  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        maxWidth: 600,
        mx: "auto",
        p: 3,
        textAlign: "center",
        backgroundColor: "background.paper",
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
        Welcome to the Home Page!
      </Typography>
      <Typography variant="body1" paragraph>
        Here you can find amazing content and features to enjoy!
      </Typography>
      <Button variant="contained" color="primary" fullWidth>
        Explore Content
      </Button>
    </Box>
  );
}

export default HomePage;
