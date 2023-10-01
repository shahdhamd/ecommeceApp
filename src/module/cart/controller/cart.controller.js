import { brandModel } from "../../../../DB/model/brand.model.js";
import { cartModel } from "../../../../DB/model/cart.model.js";
import cloudinary from "../../../services/cloudinary.js";
import slugify from 'slugify'
import { pagination } from "../../../services/pagination.js";
import { productModel } from "../../../../DB/model/product.model.js";

export const addToCart=async(req,res,next)=>{
    const {_id}=req.user._id;
    // res.json(_id)
    const {products}=req.body;
    const findcart=await cartModel.findOne({userId:_id}) // بدي اتاكد انه كل يوزر عنده سلة وحدة
    if(!findcart){ // ما عنده سلة اذا بعمله سلة
        const cart=await cartModel.create({userId:_id,products:products})
        res.status(200).json({message:'sucess',cart})
    }else{ // في حال كان موجود سلة لازم اعمل لوب على المنتجات واشوف اذا في تكرار

        for(const product of products){ //body بمثل البرودكت الي دخاه اليوزر من 
            let macth=false
            for(let i=0;i<findcart.products.length;i++){
                //findcart.products.length ==>) بعني كم منتج مخزن في السلة products عبارة عن عدد  الكولم 
                if(findcart.products[i].productId==product.productId){ //الموجود من قبل productId في حال بعتلي نفس 
                    findcart.products[i]=product  //quntity هيك بعدل ل 
                    macth=true
                    break; // بطلع من لوب الداخلية وبرجع للرئيسبة
                }
            }
            if(!macth){
                findcart.products.push(product)
            }
        }
        const updateCart=await cartModel.findOneAndUpdate({userId:_id},{products:findcart.products},{new:true})
        res.status(200).json({message:'sucess',updateCart})
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

