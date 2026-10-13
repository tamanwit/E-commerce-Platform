import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    return (
        <div>
            <img
                src={product.image}
                alt={product.name}
                width="200"
            />

            <h3>{product.name}</h3>

            <p>Category: {product.category}</p>

            <p>Price: ₹{product.price}</p>

            <p>
                {product.stock > 0
                    ? `${product.stock} units left`
                    : "Out of stock"}
            </p>

            <button
                onClick={() =>
                    navigate(`/products/${product._id}`)
                }
            >
                View Details
            </button>
        </div>
    );
};

export default ProductCard;