const cors = require("cors")
const express = require("express")
const stripe = require("stripe")("sk_test_51LYC6vEybTulbeVH7zHyLzCRccYCexkrwz7KvG5vfGSi9jTglqOMWoMHPx3dWu62lSTWZfO7SpUco4JrbcBsSlhi00HnZl2BrZ")
const PORT = 8080 ;
const app = express()



// MiddleWare


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : true}))



app.post("/payment" , (req,res)=>{


    const {token , product} = req.body;


    console.log(token  , "token")

    console.log(product , "product")



    return stripe.customers.create({
        email : token.email ,
        source : token.id
    })
    .then(customers=>{

        stripe.charges.create({
 

            amount : product.price * 100 ,
            currency : "usd" ,
            customer : customers.id ,
            receipt_email : token.email ,
            description : "Purchase fo Iphone" ,
            shipping : {
                name : token.card.name ,
                address : {
                    country  : token.card.address_country
                }
            }



        })

    })
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err=>{
        console.log(err)
    })





})







app.listen(PORT , ()=>{

    console.log(`App is listening at ${PORT}`)

} )