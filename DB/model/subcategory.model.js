import { Schema, model , Types} from "mongoose";
export const subcategorySchema=new Schema({
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
    categoryId:{
        type:Types.ObjectId,
        ref:'category',
        required:[true,'subcategory is required']
    },
    image:{
        type:String,
        ref:'category'
    },
    ImagePublicId:{
        type:String
    },
    createdBy:{
        type:Types.ObjectId,
        ref:'user',
        required:[true,'subcategory is required']
    }
},{timestamps:true})



const subcategoryModel=model('subcategory',subcategorySchema)

export {subcategoryModel}