import React, { useEffect, useState } from "react";

import SearchBar from "./SearchBar";
import ProductCard from "./ProductCard";
import { getProducts } from "../services/productService";
import { useNavigate } from "react-router-dom";

const Products = () => {
    const navigate = useNavigate()
  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProducts({
          search,
          category,
        });

        setProducts(data.products);
      } catch (err) {
        console.log(err);

        setError("Something went wrong while loading products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [search, category]);

  const toHome = ()=>{
    navigate('/home')
  }
  const toCart = ()=>{
    navigate('/cart')
  }
  const toWishlist = ()=>{
    navigate('/wishlist')
  }

  return (
    <div>
      <h1>Products</h1>
      <button onClick={toWishlist}>Wishlist</button>
      <button onClick={toHome}>Back to Home Page</button>
      <button onClick={toCart}>Go to Cart</button>

      <SearchBar
        search={search}
        category={category}
        setSearch={setSearch}
        setCategory={setCategory}
      />

      {loading && <p>Loading products...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && products.length === 0 && <p>No products found.</p>}

      {!loading && !error && products.length > 0 && (
        <div>
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
