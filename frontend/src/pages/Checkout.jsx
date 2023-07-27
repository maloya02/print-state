import React, { useContext, useEffect, useState } from 'react';
import NavBar from '../components/NavBar/NavBar';
import Footer from '../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import { CheckoutItem } from '../components/Checkout/CheckoutItem';
import { ShopContext } from "../components/Ecom/EcomContext";
import { Link } from 'react-router-dom';
import CheckoutModal from '../components/Checkout/CheckoutModal'; // Import the modal component
import Payment from '../components/Checkout/Payment'; // Import the Payment component

const Checkout = () => {
  const { cartItems, getTotalCartAmount, isLoggedIn, products } = useContext(ShopContext); // Use 'products' from context
  const totalAmount = getTotalCartAmount();
  const navigate = useNavigate();
  const [isGuest, setIsGuest] = useState(true);
  const [showModal, setShowModal] = useState(false); // State variable for the modal

  useEffect(() => {
    if (isLoggedIn) {
      // If the user is logged in, check if the token is still valid (optional)
      const token = localStorage.getItem('token');
      const accessToken = JSON.parse(atob(token.split('.')[1]));
      // if(accessToken.iat * 1000 <  Date.now()) {
      //   localStorage.removeItem('token');
      //   navigate('/Login');
      // }
      if (!(accessToken.userType === 'admin' || accessToken.userType === 'user')) {
        setIsGuest(true);
        navigate('/');
      } else {
        setIsGuest(false);
      }
    }
  }, [isLoggedIn, navigate]);

  const handleCheckout = () => {
    if (isGuest && !isLoggedIn) {
      navigate("/Login");
    } else {
      setShowModal(true);
    }
  };

  return (
    <div>
      <NavBar />
      <div className='cart'>
        <div>
          <br />
          <h1>Your Cart Items</h1>
        </div>
        <div className="cartItems">
          {products.map((product) => {
            if (cartItems[product.id] !== 0) {
              return <CheckoutItem data={product} key={product.id} />;
            }
            return null;
          })}
        </div>
        <div className="checkout">
          <p> Subtotal: ${totalAmount}</p>
          {isGuest && !isLoggedIn ? (
            <>
              <div className="button-group">
                <button onClick={() => navigate("/Ecom")}> Continue Shopping </button>
                <button onClick={handleCheckout}> Checkout </button>
              </div>
              <p style={{ color: 'red' }}>You need to log in to proceed to checkout. <Link to='/Login'>Login Here</Link></p>
            </>
          ) : (
            <div className="button-group">
              <button onClick={() => navigate("/Ecom")}> Continue Shopping </button>
              <button onClick={handleCheckout}> Checkout </button>
            </div>
          )}
        </div>
        {totalAmount === 0 && <h1>Your Cart is Empty</h1>}
      </div>
      <Footer />

      {/* Render the modal */}
      <CheckoutModal isOpen={showModal} onClose={() => setShowModal(false)}>
        {/* Render the Payment component inside the modal */}
        <Payment />
      </CheckoutModal>
    </div>
  )
}

export default Checkout;
