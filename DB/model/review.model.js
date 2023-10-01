import { Schema, model , Types} from "mongoose";

export const reviewSchema=new Schema({
    message:{
        type:String,
        required:[true,'message is required']
    },
    userId:{
        type:Types.ObjectId,
        ref:'user',
        required:[true,'user id is required in review']
    },
    productId:{
        type:Types.ObjectId,
        ref:'product',
        required:[true,'product id is required']
    },
    rating:{
        type:Number,
        default:1,
        min:[1,'min is 1'],
        max:[5,'max is 5']
    }
    
},{timestamps:true})


const reviewModel=model('review',reviewSchema)

export {reviewModel}