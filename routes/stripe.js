import express from "express";
import Stripe from "stripe";
import { v4 as uuidv4 } from "uuid";
const stripe = new Stripe("sk_test_51KZ7tgSCLtg0NGDARCRWN60BEazDD7nxrNRjuQQQ2tUjNQGOXTUJ4ynZLXLsNURNInv60akmL7UdkrA3DwPocG9g00Hlq1Hnxx");


const router=express.Router();

router.post("/payment",async(request,response)=>{
    console.log("Request:",request.body);
    let error;
    let status; 
    try {
        const {rooms,token}=request.body;

        const customer=await stripe.customers.create({
            email:token.email,
            source:token.id
        });
       
        const  idempotency_Key=uuidv4();
        const charge=await stripe.charges.create({
            amount:rooms.total * 100,
            currency:"usd",
            customer:customer.id,
            receipt_email:token.email,
            description:`Book the ${rooms.title}`,
            shipping:{
                name:token.card.title,
                address:{
                    line1:token.card.address_line1,
                    line2:token.card.address_line2,
                    city:token.card.address_city,
                    country:token.card.address_country,
                    postal_code:token.card.address_zip
                }
            }

        },{
            idempotency_Key
        
        });
        console.log("Charge:",{charge});
        status="success";
      } catch (error) {
      console.log(error)
      status="failure"  
    }
    response.json({error,status})
})


export const StripeRouter=router;