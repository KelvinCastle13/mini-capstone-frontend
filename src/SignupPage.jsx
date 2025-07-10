import axios from "axios";
import { useState } from "react";
import {useNavigate} from "react-router-dom";

export function SignupPage() {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);
    axios
      .post("/signup", params)
      .then((response) => {
        console.log(response.data);
        event.target.reset();
        navigate("/login"); 
      })
      // .catch((error) => {
      //   setStatus(error.response.status);
      //   console.log(error.response.data.errors);
      //   setErrors(error.response.data.errors);
      // });

      .catch((error) => {
      setStatus(error.response.status);
      const errs = error.response?.data?.errors || ["Something went wrong."];
      console.log(errs);
      setErrors(errs);
    });
  };

  return (
    <div id="signup">
      <h1>Signup</h1>
      <ul>
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <div>
          Name: 
          <input 
          name="name" 
          type="text" 
          value={name} 
          onChange={(event) => setName(event.target.value.slice(0, 20))}
          />
        </div>
        {name.length > 0 && (
        <small>{20 - name.length} charaters remaining</small>
        )}
        <div>
          Email: <input name="email" type="email" />
        </div>
        <div>
          Password: <input name="password" type="password" />
        </div>
        <div>
          Password confirmation: <input name="password_confirmation" type="password" />
        </div>
        {status ? <img src={`http.cat/${status}`} /> : null}
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}