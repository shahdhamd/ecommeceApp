import { orderModel } from "../../../../DB/model/order.model.js";
import { productModel} from "../../../../DB/model/product.model.js"
import {couponModel } from  "../../../../DB/model/coupon.model.js"
import e from "express";
export const createOrder=async(req,res,next)=>{
    const {products,address,phone,couponId}=req.body;
    let sumTotal=0;
    let finalList=[]
    for(let i=0;i<products.length;i++){
        const checkItem=await productModel.findOne({_id:products[i].productId, // تاكد من الاي دي للبرودكت
            stock:{$gte:products[i].quantity}  // يتاكد انه الكمية الموجودة من المنتج بتكفي مشان الطلب
        })    // اذا بدي يجيب المنتج الي الكميته بتكفي للطلب و اتاكد من الاي دي تبعه
        // res.json(checkItem)
        if(!checkItem){
            return next(new Error("invalid product",{cause:400}))
        }else{
            products[i].totalPrice=checkItem.finalPrice * products[i].quantity;
            sumTotal+=products[i].totalPrice
            finalList.push(products[i])
        }
    }
    req.body.totalPrice=sumTotal
    // res.json(sumTotal)
    if(couponId){
        const checkcounpon=await couponModel.findOne({
            _id:couponId
        , // بدي اتاكد من الاي دي انه صح
             // بدي اتاكد انه اول اليوزر مش مستخدم الكوبون من قبل
                usedBy:{$nin:req.user._id}  //هيك بتاكد انه الاي دي لليوزر مش موجود في الاريه not in 
            
         } )
        if(!checkcounpon){
            return next(new Error('invalid coupon ',{cause:400}))
        }else{
            req.body.totalPrice=sumTotal-(sumTotal*(checkcounpon.amount/100))
        }
    }
    req.body.userId=req.user._id
    req.body.products=finalList
    const order=await orderModel.create(req.body)
    if(!order){
        return next(new Error('fail',{cause:400}))
    }else{
        if(couponId){ // لازم اخزن اليوزر في الاريه مشان كل يوزر يستخدم الكوبون مرة وحدة
            await couponModel.findByIdAndUpdate({_id:couponId},{
                $addToSet:{usedBy:req.user._id}
            })
        }
        return res.status(200).json({message:'sucess',order})
    }
}
