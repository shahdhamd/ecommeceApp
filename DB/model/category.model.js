import { Schema, model , Types} from "mongoose";
export const categorySchema=new Schema({
    name:{
        type:String,
        required:[true,'username is required'],
        min:[3,'min length is 3'],
        max:[25,'max length is 25'],
        unique:[true,'name is unique']
    },
    slug:{
        type:String
    },
    image:{
        type:String,
    },
    ImagePublicId:{
        type:String
    },
    createdBy:{
        type:Types.ObjectId,
        ref:'user',
        required:[true,'category is required']
    }
},{timestamps:true ,toJSON:{virtuals:true},toObject:{virtuals:true}})

categorySchema.virtual('subCategory',{
    ref:'subcategory',
    localField:'_id',
    foreignField:'categoryId' //مع مين بدي اربطه من الجدول الثاني
})

const categoryModel=model('category',categorySchema)

export {categoryModel}