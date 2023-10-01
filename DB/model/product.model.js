import { Schema ,Types , model } from "mongoose";

export const productSchema=new Schema({
    name:{
        type:String,
        required:[true,'username is required'],
        min:[3,'min length is 3'],
        max:[25,'max length is 25'],
        // unique:[true,'product name is unique'],
        trim:true // في حال دخلنا الاسم بدون مع مسافات بشيل المسافة
    },
    description:String,
    images:[String],
    slug:{
        type:String
    },
    ImagePublicIds:[String]
    ,
    amount:{
        type:Number,
        default:0,
    },
    soldItems:{
        type:Number,
        default:0
    },
    stock:{
        type:Number,
        default:0
    },
    paymentPrice:{
        type:Number,
        default:0
    },
    discount:{
        type:Number,
        default:0
    },
    finalPrice:{
        type:Number,
        default:0
    },
    colors:[String],
    sizes:{Type:[String],enum:['s','m','l','xl']},
    createdBy:{
        type:Types.ObjectId,
        ref:'user',
        required:[true,'product owner is required']
    },
    categoryId:{
        type:Types.ObjectId,
        ref:'category',
    },
    subcategoryId:{
        type:Types.ObjectId,
        ref:'subcategory',
    },
    brandId:{
        type:Types.ObjectId,
        ref:'brand',
    },
    

},{timestamps:true,
toJSON:{virtuals:true},
toObject:{virtual:true}})

productSchema.virtual('reviews',{
    ref:'review',
    localField:"_id",
    foreignField:"productId"
})
const productModel=model('product',productSchema);

export {productModel}