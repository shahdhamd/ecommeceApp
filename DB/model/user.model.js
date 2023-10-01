import { Schema,model ,Types} from "mongoose";

const userSchema=new Schema({
    userName:{
        type:String,
        required:[true,'username is required'],
        min:[3,'min length is 3'],
        max:[25,'max length is 25']
    },
    email:{
        type:String,
        unique:[true,'email exist'],
        required:[true,'email is required']
    },
    password:{
        type:String,
        required:[true,'password is required']
    },
    phone:{
        type:String,
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    confirmEmail:{
        type:Boolean,
        default:false
    },
    blocked:{
        type:Boolean,
        default:false
    },
    image:{
        type:String
    },
    wishList:[{
        type:Types.ObjectId,
        ref:'product'
    }],
},{timestamps:true})

// user.model.js
 const userModel = model('user', userSchema);
 export { userModel }