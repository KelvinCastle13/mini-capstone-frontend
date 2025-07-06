import axios from "axios";
import {useState, useEffect} from "react";
import { useOutletContext } from "react-router-dom";
import { ProductsIndex } from "./ProductsIndex";
import { ProductsNew } from "./ProductsNew";
import { ProductsShow } from "./ProductsShow";
import { Modal } from "./Modal";


export function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [isProductsShowVisible, setIsProductsShowVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});
  const {onAddToCart, isAdmin} = useOutletContext();

  console.log("isAdmin", isAdmin);
  
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
    setCurrentProduct(product);
  };

  const handleUpdate = (product, params, successCallback) => {
    console.log("handleUpdate");
    axios.patch(`/products/${product.id}.json`, params).then((response) => {
      setProducts(products.map(p => p.id === response.data.id ? response.data : p));
      successCallback();
      setIsProductsShowVisible(false);
    });
};

  const handleDestroy = (product) => {
    console.log("handelDestroy", product);
    axios.delete(`/products/${product.id}.json`).then(() => {
      setProducts(products.filter((p) => p.id !== product.id));
      setIsProductsShowVisible(false);
    })
  };

  useEffect(handleIndex, []);

  return (
    <main >
      {isAdmin && (
        <ProductsNew onCreate={handleCreate} userIsAdmin={isAdmin}/>
      )}
      <ProductsIndex products={products} onShow={handleShow} onAddToCart={onAddToCart} />
      <Modal show={isProductsShowVisible} onClose={() => setIsProductsShowVisible(false)}>
      <ProductsShow product={currentProduct} onUpdate={handleUpdate} onDestroy={handleDestroy} />
      </Modal>
    </main>
  )
}
