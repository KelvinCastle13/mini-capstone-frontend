import { Link } from "react-router-dom";
import { LogoutLink } from "./LogoutLink";

export function Header({isLoggedIn, setIsLoggedIn}) {
  return (
    <header>
      <nav>
        <div>
          <Link to="/">Products</Link>
          <div>
            {isLoggedIn ? (
              <>
                <Link to="/orders" style={{ marginRight: "10px" }}>Orders</Link> 
                <Link to="/cart" style={{ marginRight: "10px" }}>Cart</Link> | <LogoutLink setIsLoggedIn={setIsLoggedIn} />
              </>
            ) : (
              <>
                <Link to="/signup">Sign Up</Link> | <Link to="/login">Login</Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}