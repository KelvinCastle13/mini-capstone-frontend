import axios from "axios";
import { useOutletContext, Link, useNavigate } from "react-router-dom";

export function CartPage() {
  const { cartItems, onRemoveFromCart } = useOutletContext();
  const navigate = useNavigate();

  const handleCreateOrder = () => {
    console.log("handleCreateOrder");
    axios.post("/orders.json").then((response) => {
      console.log("Order Created!:", response.data);
      navigate("/orders");
    }).catch((error) => {
      console.error("Error creating order:", error);
    });
  }
  
  

  return (
    <main>
      <h1>Your Shopping Cart</h1>
      
      <p>You have {cartItems.length} items in your cart</p>
      
      {cartItems.map((cartItem) => (
        <div key={cartItem.id}>
          <h3>{cartItem.product.name}</h3>
          <p>Price: ${cartItem.product.price}</p>
          <p>Quantity: {cartItem.quantity}</p>
          <button onClick={() => onRemoveFromCart(cartItem)}>Remove from Cart</button>
        </div>
      ))}

      {cartItems.length > 0 && (
        <button onClick={handleCreateOrder}>Place Order</button>
      )}
      
      <p><Link to="/">Back to Products</Link></p>
    </main>
  );
} 