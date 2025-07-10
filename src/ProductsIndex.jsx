import {useState} from "react";

export function ProductsIndex({products, onShow, onAddToCart}) {
  const [searchFilter, setSearchFilter] = useState("");
  const [sortOption, setSortOption] = useState("");
  
  if (products.length === 0) {
    return <p>No products avalable.</p>
  }
  
  return (
    <div style={{ padding: "20px" }}>
      <h1 >All Products ({products.length} total)</h1>
      Search filter: 
      <input 
      type="text" 
      value={searchFilter} 
      onChange={(event) => setSearchFilter(event.target.value)} 
      list="names" />
      <datalist id="names">
          {products.map(product => 
            <option key={product.id} value={product.name} />
          )}
      </datalist>

      Sort by: 
      <select value={sortOption} onChange={(event) => setSortOption(event.target.value)}>
        <option value="">No Sort</option>
        <option value="a-z">A-Z</option>
        <option value="z-a">Z-A</option>
        <option value="price-high-low">High - Low</option>
        <option value="price-low-high">Low - High</option>
      </select>
      
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "20px",
        justifyItems: "center",
        padding: "20px"
      }}>
      {products
        .filter((product) => product.name.toLowerCase().includes(searchFilter.toLowerCase()))
        // .sort() takes two items (a, b) and asks: "Which should come first?"
        // JavaScript calls this function many times until the whole array is sorted [1, 2, 3, 4, 5]
        .sort((a, b) => {
          if (sortOption === "a-z") {
            // localeCompare() compares two strings alphabetically
            // Returns: negative (a first), positive (b first), or 0 (same)
            return a.name.localeCompare(b.name);
          } else if (sortOption === "z-a") {
            // Flip the comparison to reverse the order (Z to A)
            return b.name.localeCompare(a.name);
          } else if (sortOption === "price-high-low") {
            return b.price - a.price;
          } else if (sortOption === "price-low-high") {
            return a.price - b.price;
          }
          return 0; // no sorting - keep original order
        })
        .map((product) => (
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