import { Schema, model , Types} from "mongoose";

export const orderSchema=new Schema({
    userId:{ //unique بقدر يعمل قد ما بدو اوردر اذا ما في 
        type:Types.ObjectId,
        ref:'user',
    },
    products:[{
        productId:{
            type:Types.ObjectId,
            ref:'product'
        },
        quantity:{
            type:Number,
            default:1
        },
        totalPrice:{
            type:Number,
            default:1
        }
    }],
    adress:String,
    phone:String,
    totalPrice:{
        type:Number,
        default:1
    },
    statusCode:{    ///زي اتصال على الزبون لتاكيد الطلب
        type:String,
        default:'pending', // يعني تحت الانتظار ما وافقوا على الطلب
        enum:['pending','cancelled','approved']
    },
    paymentMethod:{
        type:String,
        default:'cach',
        enum:['cach','paypal','visa']
    }

},{timestamps:true})


const orderModel=model('order',orderSchema)

export {orderModel}