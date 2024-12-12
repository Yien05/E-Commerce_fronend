import { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Header from "../../components/Header";
import Container from "@mui/material/Container";
import TableList from "../../components/TableList";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { getCategories, getProducts } from "../../utils/api";

function Products() {
  const [category, setCategory] = useState("");
  const [list, setList] = useState([]);
  const [categories, setCategories] = useState([]);


  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    });
  }, []); // only when page first loaded

  useEffect(() => {
    getProducts(category).then((data) => {
      setList(data);
    });
  }, [category]); // only when genre is changed
  
  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div>
      <Header />
      <Container>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Products
          </Typography>
          <Box>
            <Button variant="contained" color="success">
              Add New
            </Button>
          </Box>
        </Toolbar>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            padding: "15px 0",
          }}
        >
          <FormControl variant="filled" style={{ minWidth: 220 }}>
            <InputLabel id="demo-simple-select-filled-label">
              All Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={category}
              onChange={handleChange}
            >
              {categories.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <TableList list={list} />
      </Container>
    </div>
  );
}
export default Products;
