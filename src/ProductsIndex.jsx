export function ProductsIndex({products, onShow, onAddToCart}) {
  if (products.length === 0) {
    return <p>No products avalable.</p>
  }
  
  return (
    <div style={{ padding: "20px" }}>
      <h1 >All Products ({products.length} total)</h1>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "20px",
        justifyItems: "center",
        padding: "20px"
      }}>
      {products.map((product) => (
        <div key={product.id} style={{
          width: "200px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          padding: "15px",
          textAlign: "center",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff"
        }}>
          <h2>{product.name}</h2>
          <img src={product.primary_image_url} 
          style={{ width: "160px", height: "150px", objectFit: "cover" }}
          />
          <p><strong>Price:</strong> ${product.price}</p>
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Supplier ID:</strong> {product.supplier_id}</p>
          <button onClick={() => onShow(product)}>More Info</button>
          <button onClick={() => onAddToCart(product)}>Add to Cart</button>
        </div>
      ))}
      </div>
    </div>
  );
}