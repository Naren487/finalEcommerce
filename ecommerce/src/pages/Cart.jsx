import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseQty,
  deleteProduct,
} from "../app/features/cart/cartSlice";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate=useNavigate();
  const { cartList } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  // middlware to localStorage
  const totalPrice = cartList.reduce(
    (price, item) => price + item.qty * item.price,
    0
  );
  
  const checkUser=()=>{

    const getEmail=localStorage.getItem("email");
    console.log(getEmail,"ADAD");
    if(getEmail==null){
        navigate("/");
    }
  }
  useEffect(() => {
    checkUser();
    // window.scrollTo(0, 0);
    // if(CartItem.length ===0) {
    //   const storedCart = localStorage.getItem("cartItem");
    //   setCartItem(JSON.parse(storedCart));
    // }
  }, []);


  //payment integration
  const makepayment=async()=>{
    const stripe=await loadStripe("pk_test_51O2AJnSDHbApW9pLTBsW3WWMByH5r2nyHuGEXR1YlUHZG7xyeAoULMB1QLr1oUBdCybdk6BHMcbBVC1qYK9w49Ls00Vsr6jus4");
    const body={
      products:cartList
    }
    const headers={
      "Content-Type":"application/json"
    }
    const response=await fetch("http://localhost:7000/api/create-checkout-session",{
      method:"POST",
      headers:headers,
      body:JSON.stringify(body)
    });
    const session=await response.json();
    const result=stripe.redirectToCheckout({
      sessionId:session.id
    });
    if(result.error){
      console.log(result.error);
    }
  }
  return (
    <section className="cart-items">
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            {cartList.length === 0 && (
              <h1 className="no-items product">No Items are add in Cart</h1>
            )}
            {cartList.map((item) => {
              const productQty = item.price * item.qty;
              return (
                <div className="cart-list" key={item.id}>
                  <Row>
                    <Col className="image-holder" sm={4} md={3}>
                      <img src={item.imgUrl} alt="" />
                    </Col>
                    <Col sm={8} md={9}>
                      <Row className="cart-content justify-content-center">
                        <Col xs={12} sm={9} className="cart-details">
                          <h3>{item.productName}</h3>
                          <h4>
                            ${item.price}.00 * {item.qty}
                            <span>${productQty}.00</span>
                          </h4>
                        </Col>
                        <Col xs={12} sm={3} className="cartControl">
                          <button
                            className="incCart"
                            onClick={() =>
                              dispatch(addToCart({ product: item, num: 1 }))
                            }
                          >
                            <i className="fa-solid fa-plus"></i>
                          </button>
                          <button
                            className="desCart"
                            onClick={() => dispatch(decreaseQty(item))}
                          >
                            <i className="fa-solid fa-minus"></i>
                          </button>
                        </Col>
                      </Row>
                    </Col>
                    <button
                      className="delete"
                      onClick={() => dispatch(deleteProduct(item))}
                    >
                      <ion-icon name="close"></ion-icon>
                    </button>
                  </Row>
                </div>
              );
            })}
          </Col>
          <Col md={4}>
            <div className="cart-total">
              <h2>Cart Summary</h2>
              <div className=" d_flex">
                <h4>Total Price :</h4>
                <h3>${totalPrice}.00</h3>
              </div>
            </div>
          </Col>
        </Row>
        <button className="btn btn-primary" onClick={makepayment}>Checkout</button>
      </Container>
    </section>
  );
};

export default Cart;
