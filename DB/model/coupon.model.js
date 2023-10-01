import { Schema, model , Types} from "mongoose";

export const couponSchema=new Schema({
    name:{
        type:String,
        required:[true,'coupon name is required'],
        min:[3,'min length is 3'],
        max:[25,'max length is 25'],
        unique:[true,'coupon name is unique'],
        trim:true
    },
    createdBy:{
        type:Types.ObjectId,
        ref:'user',
        required:[true,'coupon owner is required']
    },
    usedBy:[{
        type:Types.ObjectId,
        ref:'user',
    }],
    expireDate:Date,
    amount:{
        type:Number,
        max:[100,'max is 100%'],
        min:[1,'min is 1%']
    }
},{timestamps:true})


const couponModel=model('coupon',couponSchema)

export {couponModel}