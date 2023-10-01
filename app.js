import express from 'express';
import dotenv from 'dotenv'
import connectDB from './DB/connection.js';
dotenv.config()
const app=express()
app.use(express.json())
import * as indexRouter from './src/module/index.route.js'
const port=process.env.port
const baseURL=process.env.BASEURL
import morgan from 'morgan'
if(process.env.MOOD=='DEV'){  // MOOD=DEV
    app.use(morgan())
}
connectDB()
app.use(`${baseURL}user`,indexRouter.userRouter)
app.use(`${baseURL}auth`,indexRouter.authRouter)
app.use(`${baseURL}category`,indexRouter.categoryRouter)
app.use(`${baseURL}subcategory`,indexRouter.subcategoryRouter)
app.use(`${baseURL}brand`,indexRouter.brandRouter)
app.use(`${baseURL}product`,indexRouter.productRouter)
app.use(`${baseURL}coupon`,indexRouter.couponRouter)
app.use(`${baseURL}cart`,indexRouter.cartRouter)
app.use(`${baseURL}order`,indexRouter.orderRouter)
app.use('*',(req,res)=>{
    res.json({message:'error'})
})

//error handling middleware لماابعت 4 براميتر معناها انا في 
app.use((err,req,res,next)=>{
    if(err){
        return res.status(err['cause']).json({message:err.message})
    }
} )

app.listen(port,(req,res)=>{
    console.log(`running server port ${port}` )
})