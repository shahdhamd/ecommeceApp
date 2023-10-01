import { Router } from "express";
import {auth} from '../../middleware/auth.js'
import { endPoint } from "./user.endpoint.js";
const router=Router();

router.get('/',auth([endPoint.profile]),(req,res)=>{
    res.status(200).json('sucess')
})

export default router;