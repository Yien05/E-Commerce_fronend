import { Container, Typography, TextField, Box, Button } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Header from "../../components/Header";
import { toast } from "sonner";
import { editCategory,getCategories, getCategory } from "../../utils/api_categories";
import { getUserToken } from "../../utils/api_auth";
import { useCookies } from "react-cookie";

function CategoryEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cookies] = useCookies(["currentUser"]);
  const token = getUserToken(cookies);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  // const [category, setCategory] = useState("");

  useEffect(() => {
    getCategory(id).then((categoryData) => {
      setLoading(false);
      setName(categoryData.name);
    });
  }, [id]);

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // check for error
    if (!name) {
      toast.error("Please fill out all the required fields");
    } else {
      // trigger the API
      const updatedCategory = await editCategory(
        id,
        name,
        token
      );

      if (updatedCategory) {
        toast.success("Category has been edited successfully!");
        navigate("/category");
      }
    }
  };

  return (
    <>
      <Container>
        <Header />
        <Card>
          <CardContent>
            <Typography variant="h4" align="center" mb={4}>
              Edit Category
            </Typography>
            <Box mb={2}>
              <TextField
                label="Name"
                required
                fullWidth
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </Box>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleFormSubmit}
            >
              Update
            </Button>
          </CardContent>
        </Card>
      </Container>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
        <Typography variant="h6" ml={2}>
          Loading...
        </Typography>
      </Backdrop>
    </>
  );
}

export default CategoryEdit;
