export function ProductsIndex({products, onShow}) {
  if (products.length === 0) {
    return <p>No products avalable.</p>
  }

  return (
    <div>
      <h1>All Products ({products.length} total)</h1>
      {products.map((product) => (
        <div key={product.id} style={{ border: "1px solid #ccc", marginBottom: "10px", padding: "10px" }}>
          <h2>{product.name}</h2>
          <p><strong>Price:</strong> ${product.price}</p>
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Supplier ID:</strong> {product.supplier_id}</p>
          <button onClick={() => onShow(product)}>More Info</button>
        </div>
      ))}
    </div>
  );
}