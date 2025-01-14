import Header from "../../components/Header";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Table,
  TableRow,
  TableBody,
  TableHead,
  TableContainer,
  TableCell,
  Paper,
} from "@mui/material";

import { getCategories } from "../../utils/api_categories";
import { addNewCategory } from "../../utils/api_categories";
import { deleteCategory } from "../../utils/api_categories";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { getUserToken, isAdmin } from "../../utils/api_auth";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function Categories() {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [cookies] = useCookies(["currentUser"]);
  const token = getUserToken(cookies);

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  // check if is admin or not
  useEffect(() => {
    if (!isAdmin(cookies)) {
      navigate("/login");
    }
  }, [cookies, navigate]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // check for error
    if (!name) {
      toast.error("Please fill out the required fields");
    }

    // trigger the add new Category API
    const newCategoryData = await addNewCategory(name, token);

    // check if the newCategoryData exists or not
    if (newCategoryData) {

      // show success message
      toast.success("Category has been added successfully");
      setCategories(await getCategories(token));
      setName("");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (confirmed) {
      const deleted = await deleteCategory(id, token);
      if (deleted) {
        // get the latest Categorys data from the API again
        const latestCategorys = await getCategories();
        // update the Categorys state with the latest data
        setCategories(latestCategorys);
        // show success message
        toast.success("Category deleted successfully");
      } else {
        toast.error("Failed to delete Category");
      }
    }
  };

  return (
    <Container>
      <Header />
      <Typography variant="h4" mb={4}>
        Categories
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableCell>
            <Box mb={2} display="flex">
              <TextField
                label="Category Name"
                fullWidth
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleFormSubmit}
              >
                ADD
              </Button>
            </Box>
          </TableCell>
        </Table>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {categories.map((category) => (
              <TableRow >
                <TableCell>{category.name}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    LinkComponent={Link}
                    color="primary"
                    size="small"
                    to={`/category/${category._id}/edit`}
                  >
                    EDIT
                  </Button>{" "}
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(category._id)}
                  >
                    DELETE
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Categories;
