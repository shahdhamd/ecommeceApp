
export const asyncHandler=(func)=>{
    return (req,res,next)=>{
        func(req,res,next).catch(error=>{
            return res.json({message:'catch error',err:error.message,stack:error.stack},{cause:500})
        })
    }
}