export function ProductsIndex({products}) {
  return (
    <div>
      <h1>All Products ({products.length} total)</h1>
      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
        </div>
      ))}
    </div>
  );
}