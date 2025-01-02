import Header from "../../components/Header";
import { Container, Paper, TextField, Box, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import TableCell from "@mui/material/TableCell";
import { useState } from "react";
import { login } from "../../utils/api_login";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      // check for error
      toast.error("Please fill out all the required fields");
    }

    // trigger the add new User API
    const newUserData = await login(email, password);
    

    // check if the newUserData exists or not
    if (newUserData) {
      // show success message
      toast.success("User has been added successfully");
      console.log(newUserData);
      // redirect back to home page
      navigate("/login");
    }
  };

  return (
    <Container>
      <Header title="Link To Your Account" />

      <Grid item size={{ xs: 12, md: 6, lg: 6 }}>
        <Paper elevation={3} sx={{ p: 3, m: 10 }}>
          <TableCell component="th" scope="row" value={email}>
            Email
          </TableCell>
          <Box mb={2}>
            <TextField
              label="Email"
              required
              fullWidth
              onChange={(event) => setEmail(event.target.value)}
            />
          </Box>
          <TableCell component="th" scope="row" value={password}>
            Password
          </TableCell>
          <Box mb={2}>
            <TextField
              label="Password"
              required
              fullWidth
              onChange={(event) => setPassword(event.target.value)}
            />
          </Box>
          <Button
            variant="contained"
            fullWidth
            color="primary"
            size="large"
            sx={{ textTransform: "none" }}
            onClick={handleFormSubmit}
          >
            Login
          </Button>
        </Paper>
      </Grid>
    </Container>
  );
}
export default Login;
