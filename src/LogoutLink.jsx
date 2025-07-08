import axios from "axios";
import {useNavigate} from "react-router-dom";

export function LogoutLink({setIsLoggedIn}) {
  const navigate = useNavigate();
  
  const handleClick = (event) => {
    event.preventDefault();
    axios.delete("/logout").then((response) => {
      console.log(response);
      localStorage.removeItem("email");
      setIsLoggedIn(false);
      navigate("/");
    });
  };

  return (
    <button onClick={handleClick}>
      Logout
    </button>
  );
}