import axios from "axios";
import { Header } from "./Header";
import { ProductsPage } from "./ProductsPage";
import { Footer } from "./Footer";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <div>
      <Header />
      <ProductsPage />
      <Footer />
    </div>
  )
}

export default App;