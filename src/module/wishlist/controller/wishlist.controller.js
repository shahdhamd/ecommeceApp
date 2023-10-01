import { userModel } from "../../../../DB/model/user.model.js";

export const createWishlist=async(req,res,next)=>{
    const {productId}=req.params; //{mergeParams:true} مشان اقدر اوصل للاي دي لازم احط 
    // res.json(productId)
    let addWishlist=await userModel.findByIdAndUpdate(req.user._id,{
        $addToSet:{wishList:productId}  // addToSet بمعنى ضيف على الاريه وفي حال كان البرودكت متكرر ما تضيف
    })
    if(!addWishlist){
        next(new Error('fail create wish list',{cause:400}))
    }else{
        res.status(200).json({message:'sucess',addWishlist})
    }

}

export const remove=async(req,res,next)=>{
    const {productId}=req.params; //{mergeParams:true} مشان اقدر اوصل للاي دي لازم احط 
    // res.json(productId)
    let removeWishlist=await userModel.findByIdAndUpdate(req.user._id,{
        $pull:{wishList:productId}  // مشان يحذف اخر عنصر ضفناه
    })
    if(!removeWishlist){
        next(new Error('fail remove from wish list',{cause:400}))
    }else{
        res.status(200).json({message:'sucess',removeWishlist})
    }
}