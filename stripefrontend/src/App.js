import React ,{useState}  from "react"
import './App.css';
import axios from "axios"
import StripeCheckout from "react-stripe-checkout" 

function App() {


  const [product,setProduct] =useState({

    name : "Iphone",
    price : 40 ,
    productBy : "Abdur Rahman",

  })


  const makePayment = token =>{

    const body = {
      token,
      product

    }


    axios.post("http://localhost:8080/payment" , body )
    .then(response=>{

      console.log(response)



    })
    .catch(err=>{console.log(err)})




  }

  return (
    <div className="App">

<h1>Name of the Product is {product.name}</h1>
<h1>Price of the Product is : {product.price}</h1>
<StripeCheckout 

stripeKey="pk_test_51LYC6vEybTulbeVHkwGUZOuxxBveo88F1J42YnPXRXy94eZ1NlxBCLxSTaUsksu6NUoETjQWIuZ8dLg2LbYW64Ny004HLYgqcU"
token={makePayment}
name={product.name}
amount={product.price * 100}
shippingAddress
/>
    
 
    </div>
  );
}

export default App;
