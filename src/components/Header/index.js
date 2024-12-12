import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

function Header(props) {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="relative" component="nav" color="white">
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          Welcome to My Store
        </h1>
      </AppBar>
    </Box>
  );
}

export default Header;
