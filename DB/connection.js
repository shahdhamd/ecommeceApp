import mongoose from "mongoose";

const connectDB=async()=>{

    return await mongoose.connect(process.env.DBURL) // في حال زبط الاتصال اطبعلي 
    .then(res=>{
        console.log('connected')
    }).catch(error=>{
        console.log(`fail connec db ${erro} `)
    })
}

export default connectDB;