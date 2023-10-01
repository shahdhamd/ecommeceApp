import { reviewModel } from "../../../../DB/model/review.model.js";
import { orderModel } from "../../../../DB/model/order.model.js";
export const createReview=async(req,res,next)=>{
    const {productId}=req.params;
    const {_id}=req.user._id;
    const {message,rating}=req.body;
    // res.json(productId)

    const checkReview=await reviewModel.findOne({userId:_id,productId:productId}) //review بدي اتاكد اذا اليوزر معلق قبل او معطي review
    if(checkReview){
        return next(new Error('already review',{cause:400}))
    }else{
        // res.json(_id)
        const checkorder=await orderModel.create({userId:_id
        ,"products.productId":productId,statusCode:'approved'}) // لازم يكون اليوزر مشتري المنتج مشان يعمل تعليق عليه
        // res.json(checkorder)
        if(!checkorder){
            return next(new Error("can't review this product",{cause:400}))
        }else{
            const review=await reviewModel.create({message,userId:_id,productId,rating})
            if(!review){
                return next(new Error('fail',{cause:400}))
            }else{
                res.status(200).json({message:'sucess',review})
            }
        }
    }
}