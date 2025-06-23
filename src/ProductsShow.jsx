export function ProductsShow({ product }) {
return (
<div>
  <h1>Product information</h1>
  <p>Name: {product.name}</p>
  <p>Price: {product.Price}</p>
  <p>Description: {product.Description}</p>
  <p>Supplier ID: {product.supplier_id}</p>
</div>
);
}