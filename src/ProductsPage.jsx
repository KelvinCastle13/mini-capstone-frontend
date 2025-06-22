import axios from "axios";
import {useState, useEffect} from "react";
import { ProductsIndex } from "./ProductsIndex";
import { ProductsNew } from "./ProductsNew";

export function ProductsPage() {
    const [products, setProducts] = useState([]);

    const handleIndex = () => {
      console.log("handleIndex");
      axios.get("/Products.json").then((response) => {
        console.log(response.data);
        setProducts(response.data);
      });
    };

    const handleCreate = (params, successCallback) => {
      console.log("handleCreate");
      axios.post("/products.json", params).then((response) => {
        setProducts([...products, response.data]);
        successCallback();
      })
    };

    const handleShow = (products) => {
      console.log("handeShow", products);
    };

    useEffect(handleIndex, []);

  return (
    <main>
      <ProductsNew onCreate={handleCreate}/>
      <ProductsIndex products={products} onShow={handleShow}/>
    </main>
  )
}