import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Box, Typography } from "@mui/material";

function ProductCart({ cart, handleRemoveFromCart }) {
  // Calculate subtotal by summing all item totals
  const subtotal = cart.reduce((acc, item) => {
    const price = Number(item.price);
    const quantity = Number(item.quantity) || 1;
    return acc + price * quantity;
  }, 0);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.length > 0 ? (
            cart.map((item) => {
              const price = Number(item.price); // Ensure price is a number
              const quantity = Number(item.quantity) || 1; // Default quantity to 1 if not defined
              const total = price * quantity;

              return (
                <TableRow key={item._id}>
                  <TableCell component="th" scope="row">
                    {item.name}
                  </TableCell>
                  <TableCell align="right">${price}</TableCell>
                  <TableCell align="right">{quantity}</TableCell>
                  <TableCell align="right">${total.toFixed(2)}</TableCell> {/* Format the total to 2 decimal places */}
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      sx={{ textTransform: "none" }}
                      onClick={() => handleRemoveFromCart(item._id)}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No Products Added Yet!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
        <Typography variant="h6" sx={{ mr: 2 }}>
          ${subtotal.toFixed(2)}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="small"
          sx={{ textTransform: "none" }}
        >
          Checkout
        </Button>
      </Box>
    </TableContainer>
  );
}

export default ProductCart;
