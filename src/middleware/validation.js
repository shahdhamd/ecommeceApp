const dataMethod=['body','headers','params','query']

export const validation=(schema)=>{
    return (req,res,next)=>{
        try{
            const validationArr=[]; // بدي اجمع فيها كل الايرور
            dataMethod.forEach((key)=>{
            if(schema[key]){
                const validationResult=schema[key].validate(req[key],{abortEarly:false}) // بلف على كل نوع ميثود وبعمل فاليديت عليه
                if(validationResult.error){
                    validationArr.push(validationResult.error.details)
                }else{
                    next()
                }
            }
        })
        if(validationArr.length){
            return res.status(400).json({message:'validation error',validationArr})
        }
        }catch(error){
            res.status(500).json({message:'catch error',error})
        }
    }
}