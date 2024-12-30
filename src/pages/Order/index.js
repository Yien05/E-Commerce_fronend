import { useState, useEffect } from "react";
import { Container, Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Header from "../../components/Header";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { getOrders, deleteOrder, editOrder } from "../../utils/api_orders";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders().then((data) => {
      console.log(data);
      setOrders(data);
    });
  }, []);

  return (
    <Container>
      <Header title="My Orders" />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell align="right">Products</TableCell>
              <TableCell align="right">Total Amount</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Payment Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.length > 0 ? (
              orders.map((item) => (
                <TableRow>
                  <TableCell component="th" scope="row">
                    <div>{item.customerName}</div>({item.customerEmail})
                  </TableCell>
                  <TableCell align="right">
                    {item.products.map((product) => (
                      <div> {product.name}</div>
                    ))}
                  </TableCell>
                  <TableCell align="right">{item.totalPrice}</TableCell>

                  <TableCell align="right">
                    <Select
                      value={item.status}
                      onChange={(e) => {
                        const newStatus = e.target.value;
                        editOrder(item._id, newStatus).then(() => {
                          setOrders((prevOrders) =>
                            prevOrders.map((order) =>
                              order._id === item._id
                                ? { ...order, status: newStatus }
                                : order
                            )
                          );
                        });
                      }}
                    >
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="failed">Failed</MenuItem>
                      <MenuItem value="paid">Paid</MenuItem>
                      <MenuItem value="completed">Completed</MenuItem>
                    </Select>
                  </TableCell>

                  <TableCell align="right">{item.paid_at}</TableCell>
                  <TableCell align="right">
                    {item.status === "pending" && (
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        sx={{ textTransform: "none" }}
                        onClick={() => {
                          deleteOrder(item._id).then(() => {
                            setOrders((prevOrders) =>
                              prevOrders.filter(
                                (order) => order._id !== item._id
                              )
                            );
                          });
                        }}
                      >
                        Delete
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No Products Added Yet!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Orders;
