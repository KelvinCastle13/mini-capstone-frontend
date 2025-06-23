export function ProductsShow({ product }) {
return (
<div>
  <h1>Product information</h1>
  <p>Name: {product.name}</p>
  <p>Price: {product.price}</p>
  <p>Description: {product.description}</p>
  <p>Supplier ID: {product.supplier_id}</p>
  <form>
    <div>
      Name: <input defaultValue={product.name} name="name" type="text" />
    </div>
    <div>
      Price: <input defaultValue={product.price} name="price" type="text" />
    </div>
    <div>
      Description: <input defaultValue={product.description} name="description" type="text" />
    </div>
    <div>
      Supplier ID: <input defaultValue={product.supplier_name} name="supplier_id" type="text" />
    </div>
    <button type="submit">Update</button>
  </form>
</div>
);
}