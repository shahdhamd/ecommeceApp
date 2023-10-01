import  jwt  from "jsonwebtoken";
import { userModel } from "../../DB/model/user.model.js";
export const auth=(acessRole=[])=>{
    return async(req,res,next)=>{
        try{
            var {token}=req.headers;
            // res.json(token)
            if(!token.startsWith(process.env.Bearerkey)){
                res.status(400).json({message:'invalid bearer Key'})
            }else{
                token=token.split(process.env.Bearerkey)[1]
                const decoded=jwt.verify(token,process.env.TokenSignIn)
                const user=await userModel.findById(decoded.id).select('role');
                // res.json(user)
                if(!user){
                    res.status(404).json({message:'not register user'})
                }else{
                    if(user.blocked){
                        res.status(400).json({message:"blocked account"})
                    }else{
                        if(!acessRole.includes(user.role)){
                        res.status(403).json({message:'not auth user'}) // ليس لديه صلاحية دخول
                    }else{
                        req.user=user;  // ضيف على الريكوست حقل اسمه يوزر وقيمته يوزر
                    // res.json(req.user)
                    next(); //
                    }
                    
                    }
                }
            }
        }catch(error){
            res.status(500).json({message:'catch error'},error.stack)
        }
    }
}