import { Router } from "express";
import * as authRouter from './controller/auth.controller.js'
import { asyncHandler } from "../../middleware/asyncHandling.js";
const router=Router();
import {validation} from '../../middleware/validation.js'
import * as validator from './auth.validation.js'
router.get('/',(req,res)=>{
    res.json('sucess auth')
})

router.post('/signup',validation(validator.signup),authRouter.signup)
router.get('/confirmEmail/:token',authRouter.confirmEmail)
router.post('/signin',validation(validator.signin),asyncHandler(authRouter.signin))
export default router