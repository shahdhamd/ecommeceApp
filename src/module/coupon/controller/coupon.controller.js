import { couponModel } from "../../../../DB/model/coupon.model.js";
import cloudinary from "../../../services/cloudinary.js";
import slugify from 'slugify'
import { pagination } from "../../../services/pagination.js";
import moment from 'moment';
export const createdCoupon=async(req,res,next)=>{
    const findCoupon=await couponModel.findOne({name:req.user.name})
    // res.json(findCoupon)
    if(findCoupon){
        next(new Error('coupon name already exist ',{cause:409}))
    }else{

        req.body.createdBy=req.user._id; 
        // res.json(req.body)
        const coupon=await couponModel.create(req.body)
        // res.json(coupon)
        if(!coupon){
            next(new Error('fail create coupon',{cause:400}))
        }else{
            res.status(201).json({message:'sucess',coupon})
        }
    }

}
export const updateCoupon=async(req,res,next)=>{
    const {id}=req.params;
    // res.json({id})
    const coupon =await couponModel.findByIdAndUpdate(id,req.body,{new:true})
    // res.json(brand)
    if(!coupon){
       return next(new Error("coupon not found",{cause:404}))
    }else{
        return res.status(201).json({message:'sucess',coupon})
    }
    
    // res.json(req.body)
}
export const deleteCoupon=async(req,res)=>{
    const {id}=req.params;
    const coupon=await couponModel.findByIdAndDelete(id)
    if(!coupon){
        next(new Error('not found coupon',{case:400}))
    }else{
        res.status(200).json({message:'sucess delete coupon',coupon})
    }
}
export const getValidCoupon=async(req,res)=>{ 
    let now=moment()
    // res.json(now)  /// "2023-09-30T06:19:26.596Z"
    let coupons=await couponModel.find({})
    let date=[]
    for(const coupon of coupons){
        let exp=coupon.expireDate
        let diff=now.diff(exp,'days') 
        // res.json(diff)
        if(diff<0){
            date.push(coupon)
        }
    }
    res.status(200).json({message:'sucess',date})
    
    
}

