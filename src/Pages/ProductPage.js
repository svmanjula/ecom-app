import React, { useContext } from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import "./ProductPage.css";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { CartContext } from "../context/Context";
import { type } from "@testing-library/user-event/dist/type";
import Rating from "../components/Rating";

const ProductPage = () => {
  const {
    products,
    state: { cart, wishlist },
    dispatch,
  } = useContext(CartContext);
  console.log(cart);
  return (
    <div>
      <Header />
      <div className="products-container">
        {products.map((product) => (
          <div key={product.id} className="product-container ">
            <img  alt ="img" src={product.image} className="prod-img" />

            {
              wishlist.some((prod)=> prod.id == product.id ) ? (<AiFillHeart onClick ={()=>{
                dispatch({
                  type:"REMOVE_FROM_WISHLIST",
                  payload:product,
                })
              }} className="wishlist-icon filled-icon"  /> ):( <AiOutlineHeart  onClick={()=>{
                dispatch({
                  type:"ADD_TO_WISHLIST",
                  payload:product
                })
              }}  className="wishlist-icon" />)
            }
            

            <div className="prod-title">
              {product.title.split(" ").slice(0, 3).join(" ")}
            </div>
            {/* <div className="prod-description">
            {product.description}
          </div> */}
            <div className="prod-cost">${product.price} </div>
            <Rating rating={product.rating.rate} />
            {cart.some((prod) => prod.id === product.id) ? (
              <button
                className="prod-button remove-button"
                onClick={() => {
                  dispatch({
                    type: "REMOVE_FROM_CART",
                    payload:product,
                    
                  });
                }}
              >
                Remove from cart
              </button>
            ) : (
              <button
                className="prod-button"
                onClick={() => {
                  dispatch({
                    type: "ADD_TO_CART",
                    payload: product,
                  });
                }}
              >
                Add to cart
              </button>
            )}
          </div>
        ))}
      </div>

    

      <Sidebar />
    </div>
  );
};

export default ProductPage;
