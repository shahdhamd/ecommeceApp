import { Schema, model , Types} from "mongoose";

export const brandSchema=new Schema({
    name:{
        type:String,
        required:[true,'username is required'],
        min:[3,'min length is 3'],
        max:[25,'max length is 25'],
        unique:[true,'brand name is unique']
    },
    image:{
        type:String,
    },
    slug:{
        type:String
    },
    createdBy:{
        type:Types.ObjectId,
        ref:'user',
        required:[true,'brand owner is required']
    },
    ImagePublicId:{
        type:String
    },

},{timestamps:true})


const brandModel=model('brand',brandSchema)

export {brandModel}