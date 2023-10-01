import { categoryModel } from "../../../../DB/model/category.model.js";
import cloudinary from "../../../services/cloudinary.js";
import slugify from 'slugify'
import { pagination } from "../../../services/pagination.js";

export const createdCategory=async(req,res,next)=>{
    // if(!req.file){
    //     next(new Error("image is required",{cause:400}))
    // }
    if(!req.file){
        next(new Error("image is required",{cause:400}))
        // res.json("error")
    }else{
        const {name}=req.body;
        const slug= slugify(name)
        const {secure_url , public_id}= await cloudinary.uploader.upload(req.file.path,{folder:"ecommece/category"})
        const category=await categoryModel.create({image:secure_url,name:name,slug:slug,ImagePublicId:public_id,createdBy:req.user._id})
        if(!category){
            next(new Error("fail to add category",{cause:400}))
        }else{
            res.status(200).json("created category sucess")
        }
    }
}

export const updateCategory=async(req,res,next)=>{
    if(req.file){ // اذا رفعت صورة اذا لازم اغير الصورة
        const {secure_url ,public_id}= await cloudinary.uploader.upload(req.file.path,{folder:"ecommece/category"}) // رفعت الصورة على الكلاود
        req.body.image=secure_url;  /// بضيف على الريكوست اوبجكت جديد والاسم مهم لازم نفس الداتا بيس
        req.body.ImagePublicId=public_id  
    }
    const {id}=req.params;
    if(req.body.name){
        req.body.slug=slugify(req.body.name) // ضفنا 
    }
    const category=await categoryModel.findByIdAndUpdate(id,req.body,{new:false}) //وبعدلها req.body بوخد القيم الموجودة في  
    // new: false ==> يعني رجعلي المعلومات القديمة
    if(req.file){
        await cloudinary.uploader.destroy(category.ImagePublicId) // احذف الصورة الي رقمها قديم
    }
    if(!category){
        next(new Error("fail to add category",{cause:400}))
    }else{
        res.status(200).json({message:"sucess",category})
    }
    // res.json(req.body)
}

export const getAllcats=async(req,res)=>{
    const {page}=req.query;
    const {skip,limit}=pagination(page)
    const category =await categoryModel.find({}).limit(limit).skip(skip).populate([{
        path:"createdBy",
        select:'userName'
    },{
        path:'subCategory'
    }])
    if(!category){
        next(new Error("fail",{cause:400}))
    }else{
        res.status(200).json({message:"sucess",category})
    }
}

export const getCat=async(req,res)=>{
    const {id}=req.params;
    const category=await categoryModel.findOne({_id:id}).populate({
        path:"createdBy",
        select:'userName'
    })
    if(!category){
        next(new Error("fail",{cause:400}))
    }else{
        res.status(200).json({message:"sucess",category})
    }
}