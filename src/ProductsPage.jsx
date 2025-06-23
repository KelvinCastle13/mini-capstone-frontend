import axios from "axios";
import {useState, useEffect} from "react";
import { ProductsIndex } from "./ProductsIndex";
import { ProductsNew } from "./ProductsNew";
import { Modal } from "./Modal";


export function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [isProductsShowVisible, setIsProductsShowVisible] = useState(false);
  
  const handleIndex = () => {
    console.log("handleIndex");
    axios.get("/products.json").then((response) => {
      console.log(response.data);
      setProducts(response.data);
    });
  };
  
    const handleCreate = (params, successCallback) => {
      console.log("handleCreate");
      axios.post("/products.json", params).then((response) => {
        setProducts([...products, response.data]);
        successCallback();
      });
    };

    const handleShow = (product) => {
      console.log("handleShow", product);
      setIsProductsShowVisible(true);
    };

    useEffect(handleIndex, []);

  return (
    <main>
      <ProductsNew onCreate={handleCreate}/>
      <ProductsIndex products={products} onShow={handleShow}/>
      <Modal show={isProductsShowVisible} onClose={() => setIsProductsShowVisible(false)}>
        <h1>Test</h1>
      </Modal>
    </main>
  )
}