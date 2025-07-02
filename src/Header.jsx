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
              <LogoutLink setIsLoggedIn={setIsLoggedIn}/>
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