import { subcategoryModel } from "../../../../DB/model/subcategory.model.js";
import { categoryModel } from "../../../../DB/model/category.model.js";
import cloudinary from "../../../services/cloudinary.js";
import slugify from 'slugify'
import { pagination } from "../../../services/pagination.js";

export const createdSubCategory=async(req,res,next)=>{

    if(!req.file){
        next(new Error("image is required",{cause:400}))
        // res.json("error")
    }else{
        const {categoryId}=req.params;
        // res.json(categoryId)
        const category=await categoryModel.findById(categoryId);
        // res.json(categoryId)
        if(!category){
            next(new Error("not found category",{cause:404}))
        }else{
            const {secure_url , public_id}= await cloudinary.uploader.upload(req.file.path,{folder:"ecommece/subcategory"})
            const {name}=req.body;

            const slug= slugify(name)
            // res.json(public_id)

            // const category=await subcategoryModel.create({image:secure_url,name:name,slug:slug,categoryId:categoryId,ImagePublicId:public_id,createdBy:req.user._id})
            const subcategory=await subcategoryModel.create({image:secure_url,name:name,slug:slug,categoryId:categoryId,ImagePublicId:public_id,createdBy:(req.user._id)})
            // res.json(subcategory)
            if(!subcategory){
                next(new Error("fail to add subcategory",{cause:400}))
            }else{
                res.status(200).json({message:"created subcategory sucess",category})
            }
        }
    }
}

export const updateSubCategory=async(req,res,next)=>{
    const {id,categoryId}=req.params;
    // res.json({id,categoryId})
    const sub =await subcategory.findById(id)
    if(!sub){
        next(new Error("sub category not found",{cause:404}))
    }else{
        if(req.file){ // اذا رفعت صورة اذا لازم اغير الصورة
        const {secure_url ,public_id}= await cloudinary.uploader.upload(req.file.path,{folder:"ecommece/subcategory"}) // رفعت الصورة على الكلاود
        req.body.image=secure_url;  /// بضيف على الريكوست اوبجكت جديد والاسم مهم لازم نفس الداتا بيس
        req.body.ImagePublicId=public_id  
    }
    if(req.body.name){
        req.body.slug=slugify(req.body.name) // ضفنا 
    }
    const subcategory=await categoryModel.findOneAndUpdate({_id:id,categoryId:categoryId},req.body,{new:false}) //وبعدلها req.body بوخد القيم الموجودة في  
    // new: false ==> يعني رجعلي المعلومات القديمة
    // findOneAndUpdate ==> استخدمتها لانه بدي افحص اكثر من شرط
    
    if(!subcategory){
        next(new Error("fail to add subcategory",{cause:400}))
    }else{
        if(req.file){
            await cloudinary.uploader.destroy(subcategory.ImagePublicId) // احذف الصورة الي رقمها قديم
        }
        res.status(200).json({message:"sucess",subcategory})
    }
    }
    
    // res.json(req.body)
}

export const getAllcats=async(req,res)=>{
    const {page}=req.query;
    const {skip,limit}=pagination(page)
    const subcategory =await subcategoryModel.find({}).limit(limit).skip(skip).populate({
        path:"createdBy",
        select:'userName'
    })
    if(!subcategory){
        next(new Error("fail",{cause:400}))
    }else{
        res.status(200).json({message:"sucess",subcategory})
    }
}

export const getSubCat=async(req,res)=>{
    const {id}=req.params;
    const subcategory=await subcategoryModel.findOne({_id:id}).populate({
        path:"createdBy",
        select:'userName'
    })
    if(!subcategory){
        next(new Error("fail",{cause:400}))
    }else{
        res.status(200).json({message:"sucess",subcategory})
    }
}