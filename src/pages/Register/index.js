import Header from "../../components/Header";
import { Button, Paper, TextField, Box, Container } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import Grid from "@mui/material/Grid2";
import { signup } from "../../utils/api_register";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [comfirm_password, setComfirm_password] = useState("");

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (!name || !email || !password || !comfirm_password) {
        // check for error
          toast.error("Please fill out all the required fields");
        }
    
        // trigger the add new User API
        const newUserData = await signup(
          name,
          email,
          password,
          comfirm_password
        );
    
        // check if the newUserData exists or not
        if (newUserData) {
          // show success message
          toast.success("User has been added successfully");
          console.log(newUserData)
          // redirect back to home page
          navigate("/login");
        }
      };
    
  return (
    <Container>
      <Header title="Link To Your Account" />

      <Grid item size={{ xs: 12, md: 6, lg: 6 }}>
        <Paper elevation={3} sx={{ p: 4 , m:10}}>
          <TableCell component="th" scope="row"  value={name} >
            Name
          </TableCell>
          <Box mb={2}>
            <TextField label="Name" required fullWidth  onChange={(event) => setName(event.target.value)}/>
          </Box>
          <TableCell component="th" scope="row"   value={email}>
            Email
          </TableCell>
          <Box mb={2}>
            <TextField label="Email" required fullWidth  onChange={(event) => setEmail(event.target.value)}/>
          </Box>
          <TableCell component="th" scope="row"  value={password}>
            Password
          </TableCell>
          <Box mb={2}>
            <TextField label="Password" required fullWidth  onChange={(event) => setPassword(event.target.value)} />
          </Box>
          <TableCell component="th" scope="row" value={comfirm_password}>
            Comfirm Password
          </TableCell>
          <Box mb={2}>
            <TextField label="Comfirm Password" required fullWidth onChange={(event) => setComfirm_password(event.target.value)}/>
          </Box>
          <Button
            variant="contained"
            fullWidth
            color="primary"
            size="large"
            sx={{ textTransform: "none" }}
            onClick={handleFormSubmit}
          >
            Sign Up
          </Button>
        </Paper>
      </Grid>
    </Container>
  );
}
export default Register;
