import { productModel } from "../../../../DB/model/product.model.js";
import cloudinary from "../../../services/cloudinary.js";
import slugify from 'slugify'
import { pagination } from "../../../services/pagination.js";
import { subcategoryModel } from "../../../../DB/model/subcategory.model.js";
import { brandModel } from "../../../../DB/model/brand.model.js";

export const createdProduct=async(req,res,next)=>{
    if(!req.files?.length){ //جواا الفايل length بروح بفحص اذا في 
        next(new Error('image is required',{cause:400}))
    }else{
        const {name,amount,price,discount,categoryId,subcategoryId,brandId}=req.body;
        // res.json(name)
        const slug=slugify(name)
        req.body.stock=amount;  //stock ضفت على الريكوست 
        // res.body.finalPrice=(price - ( price * ( ( discount || 0 ) / 100 )));
        const f=price - ( price * ( ( discount || 0 ) / 100 ));
        req.body.finalPrice=f;
        const category = await subcategoryModel.findOne({_id:subcategoryId,categoryId:categoryId}) 
        // هيك بتاكد انه كايتيجوري اي دي صح وبرضو السب ماتيجوري
        if(!category){
            next(new Error('invaild category or sub category',{cause:404}))
        }else{
            const brand= await brandModel.findOne({_id:brandId})
            // res.json(brand) 
            if(!brand){
                next(new Error('invaild brand',{cause:404}))
            }else{
                const images=[];
                const imagesPublicIds=[];
                for( const file of req.files){ // بدي اعمل زي لوب على الصور الي عندي
                    const {secure_url,public_id}=await cloudinary.uploader.upload(file.path,{folder:`ecommece/product/${name}`});
                    images.push(secure_url);
                    imagesPublicIds.push(public_id)
                    // res.json(public_id)
                }
                req.body.images=images;
                req.body.ImagePublicIds=imagesPublicIds
                req.body.createdBy=req.user._id  ///auth من 
                // res.json(req.body)
                const product=await productModel.create(req.body)  // بقدر اضيف هبك لما اكون كتابة الريكوست نفس الداتا بيس
                if(!product){
                    next(new Error("fail create product",{cause:400}))
                }else{
                    res.status(201).json({message:'sucess',product})
                }
            }
        }
    }
}

export const updateProduct=async(req,res,next)=>{
    const {id}=req.params;
    // res.json(id)
    let product=await productModel.findById(id)
    if(!product){
        next(new Error('invalid product id',{cause:400}))
    }else{
        // res.json('prooo')
        const{name,amount,discount,price,categoryId,subcategoryId,brandId}=req.body
        if(name){  //body على slug ضيف  body في حال بعتلي الاسم في 
            req.body.slug=slugify(req.body.name) // ضفنا 
        }
        // res.json(req.body)
        if(amount){
            const calStock=amount- product.soldItems
            if(calStock>0){
                req.body.stock=calStock
            }else{
                req.body.stock=0;
            }
        }
        if(discount && price){
            req.body.finalPrice=(price-(price*((discount || 0)/100)))
        }
        else if(price){
            req.body.finalPrice=(price-(price*((product.discount || 0)/100)))
        }
        else if(discount){
            req.body.finalPrice=(product.price-(product.price*((discount || 0)/100)))
        }
        if(categoryId  && subcategoryId){
            const category=await subcategoryModel.findOne({_id:subcategoryId,categoryId:categoryId});
            if(!category){
                next(new Error('invaild category or sub category',{cause:404}))
            }
        }

        if(brandId){
                const brand= await brandModel.findOne({_id:brandId})
                    // res.json(brand)
                if(!brand){
                    next(new Error('invaild brand',{cause:404}))
                }
        }
        // console.log(req.files)
            
        if(req.files.length){ //جواا الفايل length بروح بفحص اذا في 
            const images=[];
            const imagesPublicIds=[];
            for( const file of req.files){ // بدي اعمل زي لوب على الصور الي عندي
                const {secure_url,public_id}=await cloudinary.uploader.upload(file.path,{folder:`ecommece/product/${name}`});
                images.push(secure_url);
                imagesPublicIds.push(public_id)
                req.body.images=images;
                req.body.ImagePublicIds=imagesPublicIds
                req.body.createdBy=req.user._id  ///auth من 
             }
            }  
            const updateproduct=await productModel.findOneAndUpdate({_id:product.id},req.body,{new:false})  // بقدر اضيف هبك لما اكون كتابة الريكوست نفس الداتا بيس
            if(!updateproduct){
                next(new Error(`fail update product ${product._id}`,{cause:400}))
            }else{
                for(const imageId of product.ImagePublicIds){
                    await cloudinary.uploader.destroy(imageId)
                }
                res.status(200).json({message:'sucess',updateproduct})
        }
    }
}

export const getAllProducts=async(req,res,next)=>{
    const {page}=req.query;
    const {skip,limit}=pagination(page)
    const product =await productModel.find({}).limit(limit).skip(skip).populate([{
        path:"createdBy",
        select:'userName'
    },{
        path:"categoryId",
        select:"name"
    },{
        path:"subcategoryId",
        select:"name"
    },{
        path:"brandId",
        select:"name"
    },{
        path:"reviews",
    }])
    if(!product){
        next(new Error("fail",{cause:400}))
    }else{
        res.status(200).json({message:"sucess",product})
    }
}