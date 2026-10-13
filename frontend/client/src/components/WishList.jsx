import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const WishList = () => {
  const [products, setProducts] = useState([]);
  const [err, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/customer/wishlist/products",
          {
            withCredentials: true,
          },
        );

        setProducts(response.data.products);
        
      } catch (error) {
        console.log(error);
        setError("Unable to load wishlist");
      }
    };

    fetchProducts();
  }, []);

  if (err) {
    return <p>{err}</p>;
  }
  const toProducts = () => {
    navigate("/products");
  };
  const deleteItem = async (productId) => {
    try {
      await axios.delete(
        `http://localhost:8000/customer/wishlist/delete/${productId}`,
        {
          withCredentials: true,
        },
      );
      setProducts((prev) =>
        prev.filter((product) => product._id !== productId),
      );
    } catch (error) {
      console.log(error);
      setError("Unable to load wishlist");
    }
  };
  return (
    <div>
      <button onClick={toProducts}>Back to Products</button>
      {products.length === 0 ? (
        <p>No items added!</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              {product.name} — ₹{product.price}
              <button onClick={() => deleteItem(product._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WishList;
