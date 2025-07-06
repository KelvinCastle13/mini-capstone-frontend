import axios from "axios";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

export function LoginPage() {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const {setIsLoggedIn} = useOutletContext();

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    
    const params = new FormData(event.target);

    axios
      .post("http://localhost:3000/login", params)
      .then((response) => {
        console.log("Login data", response.data);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("admin", response.data.admin);
        setIsLoggedIn(true);
        event.target.reset();
        navigate("/"); 
      })
      .catch((error) => {
        console.log(error.response);
        setErrors(["Invalid email or password"]);
      });
  };

  return (
    <div id="login">
      <h1>Login</h1>
      <ul>
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <div>
          Email: <input name="email" type="email" />
        </div>
        <div>
          Password: <input name="password" type="password" />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}