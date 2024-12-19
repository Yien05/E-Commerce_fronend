import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header"; 
import ProductsCart from "../../components/ProductsCart";
import { toast, Toaster } from "sonner"; // Correct import for Toaster

function ProductCart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Fetch cart from localStorage when the component mounts
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  // Function to remove an item from the cart
  const handleRemoveFromCart = (productId) => {
    // Filter out the item to be removed
    const updatedCart = cart.filter((item) => item._id !== productId);
    setCart(updatedCart); // Update the cart in state
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update the cart in localStorage

    // Show toast notification
    toast.success("Product deleted successfully");
  };

  return (
    <div>
      <Header title="Cart" />
      <Container>
        <ProductsCart cart={cart} handleRemoveFromCart={handleRemoveFromCart} /> {/* Pass the function as prop */}
      </Container>
      
    </div>
  );
}

export default ProductCart;
