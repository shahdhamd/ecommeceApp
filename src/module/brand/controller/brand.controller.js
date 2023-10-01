import { brandModel } from "../../../../DB/model/brand.model.js";
import { categoryModel } from "../../../../DB/model/category.model.js";
import cloudinary from "../../../services/cloudinary.js";
import slugify from 'slugify'
import { pagination } from "../../../services/pagination.js";

export const createdBrand=async(req,res,next)=>{

    if(!req.file){
        next(new Error("image is required",{cause:400}))
        // res.json("error")
    }else{
        // res.json(categoryId)
        
            const {secure_url , public_id}= await cloudinary.uploader.upload(req.file.path,{folder:"ecommece/brand"})
            const {name}=req.body;

            const slug= slugify(name)
            // res.json(public_id)

            // const category=await subcategoryModel.create({image:secure_url,name:name,slug:slug,categoryId:categoryId,ImagePublicId:public_id,createdBy:req.user._id})
            const brand=await brandModel.create({image:secure_url,name:name,slug:slug,ImagePublicId:public_id,createdBy:(req.user._id)})
            // res.json(subcategory)
            if(!brand){
                next(new Error("fail to add subcategory",{cause:400}))
            }else{
                res.status(200).json({message:"created subcategory sucess",brand})
            }
        }
    }


export const updatebrand=async(req,res,next)=>{
    const {id}=req.params;
    // res.json({id})
    const brand =await brandModel.findById(id)
    // res.json(brand)
    if(!brand){
        next(new Error("brand not found",{cause:404}))
    }else{

        if(req.file){ // اذا رفعت صورة اذا لازم اغير الصورة
        const {secure_url , public_id}= await cloudinary.uploader.upload(req.file.path,{folder:"ecommece/brand"}) // رفعت الصورة على الكلاود
        req.body.image=secure_url;  /// بضيف على الريكوست اوبجكت جديد والاسم مهم لازم نفس الداتا بيس
        req.body.ImagePublicId=public_id  
        // res.json(req.file)
    }
    if(req.body.name){
        req.body.slug=slugify(req.body.name) // ضفنا 
    }
    const brand=await brandModel.findByIdAndUpdate({_id:id},req.body,{new:false}) //وبعدلها req.body بوخد القيم الموجودة في  
    // new: false ==> يعني رجعلي المعلومات القديمة    
    if(!brand){
        next(new Error("fail to add brand",{cause:400}))
    }else{
        if(req.file){
            await cloudinary.uploader.destroy(brand.ImagePublicId) // احذف الصورة الي رقمها قديم
        }
        res.status(200).json({message:"sucess",brand})
    }
    }
    
    // res.json(req.body)
}

export const getAllBreand=async(req,res)=>{
    const {page}=req.query;
    const {skip,limit}=pagination(page)
    const brand =await brandModel.find({}).limit(limit).skip(skip).populate({
        path:"createdBy",
        select:'userName'
    })
    if(!brand){
        next(new Error("fail",{cause:400}))
    }else{
        res.status(200).json({message:"sucess",brand})
    }
}

