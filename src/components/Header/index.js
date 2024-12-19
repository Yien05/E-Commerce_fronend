import { Typography, Box, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

function Header({ title }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <Box
      sx={{
        padding: "40px 0 30px 0",
        marginBottom: "30px",
        borderBottom: "1px solid #000",
      }}
    >
      <Typography
        variant="h1"
        align="center"
        sx={{
          fontSize: "36px",
          fontWeight: "bold",
        }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <Button
          variant={isActive("/") ? "contained" : "outlined"} // Active style
          color="primary"
          size="large"
          sx={{ textTransform: "none" }}
          onClick={() => navigate("/")}
        >
          Home
        </Button>
        <Button
          variant={isActive("/products/cart") ? "contained" : "outlined"} // Active style
          color="primary"
          size="large"
          sx={{ textTransform: "none" }}
          onClick={() => navigate("/products/cart")}
        >
          Cart
        </Button>
      </Box>
    </Box>
  );
}

export default Header;
